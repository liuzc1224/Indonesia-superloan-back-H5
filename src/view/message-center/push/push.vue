<template>
  <Row :gutter="10" class="set-message-center-page">
    <i-col span="24">
      <Card class="search-card">
        <Form ref="searchForm" :model="searchForm" :label-width="80" inline>
          <Row>
            <Row>
              <FormItem :label="$t('push.releaseDate')">
                <Row>
                  <Col span="11">
                    <DatePicker
                      type="date"
                      ref="createTimeStart"
                      :placeholder="$t('push.timeStart')"
                      v-model="searchForm.pushTimeStart"
                      style="width:100%;"
                    ></DatePicker>
                  </Col>
                  <Col span="2" style="text-align: center">
                    ~
                  </Col>
                  <Col span="11">
                    <DatePicker
                      type="date"
                      ref="createTimeEnd"
                      :placeholder="$t('push.timeEnd')"
                      v-model="searchForm.pushTimeEnd"
                    ></DatePicker>
                  </Col>
                </Row>
              </FormItem>
              <FormItem :label="$t('push.state')">
                <Row>
                  <Col span="24">
                    <Select
                      clearable
                      v-model="searchForm.pushStatus"
                      :placeholder="$t('push.prompt.state')"
                    >
                      <Option v-for="(item, i) in $t('push.status')" :value="item.value" :key="i">{{item.desc}}</Option>
                    </Select>
                  </Col>
                </Row>
              </FormItem>
              <FormItem :label="$t('push.theme')">
                <Row>
                  <Col span="24">
                    <Input
                      v-model="searchForm.subject"
                      :placeholder="$t('push.prompt.theme')"
                    ></Input>
                  </Col>
                </Row>
              </FormItem>
            </Row>
            <FormItem>
              <Button type="primary" @click="search">{{$t('common.search')}}</Button>
              <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>
            </FormItem>
          </Row>
        </Form>
      </Card>

      <Card style="margin-top: 10px">
        <Button class="add-message-btn" type="primary" @click="showModal">{{$t('common.add')}}</Button>
        <push-model
          class="admin-modal"
          :editModal="editModal"
          :chooseItem="chooseItem"
          v-on:changeModal="changeModal"
          v-on:editSuccess="editSuccess"
        ></push-model>

        <Table
          border
          class="person-table"
          :columns="columns"
          :data="tableData"
          :loading="tableLoading"
          style="margin-top: 10px"
        />
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;margin-bottom: 2px;">
            <Page
              :total="totalNumber"
              :current="currentPage"
              :page-size-opts="[10, 20, 30, 50]"
              @on-change="changePage"
              @on-page-size-change="pageSizeChange"
              show-elevator
              show-sizer
              show-total
            ></Page>
          </div>
        </div>
      </Card>
    </i-col>
    <Modal v-model="deleteModal" :title="$t('setUpPage.deleteTitle')" :loading="deleteLoading" @on-ok="pushDelete" width="300">
      <p>{{$t('setUpPage.deleteTip')}}</p>
    </Modal>
  </Row>
</template>

<script>
  import { formatDate } from "@/assets/js/date";
  import PushModel from "_c/msg-model/push-model";
  import { getMsgPush,deleteMsgPush } from "@/api/msgCenter";
  export default {
    name: "push",
    components: {
      PushModel
    },
    data(){
      return{
        deleteModal:false,
        deleteLoading:false,
        imgLoading: false,
        editModal: false,
        tableLoading: false,
        pageSize: 10,
        totalNumber: 0,
        currentPage: 1,
        searchForm: {
          subject:null,
          pushStatus:null,
          pushTimeStart: null,
          pushTimeEnd: null,
        },
        chooseItem: {
          id: null,
          subject: null,
          pushTime: null,
          pushType: null,
          pushContent: null,
          pushObj: null,
          pushExcel:null
        },
        tableData: [],
        columns: [
          {
            title: this.$t("push.id"),
            key: "id",
            align: "center",
            minWidth:150
          },
          {
            title: this.$t("push.createTime"),
            key: "createTime",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("push.theme"),
            key: "subject",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("push.releaseDate"),
            key: "pushTimeStr",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("push.state"),
            key: "pushStatus",
            align: "center",
            render: (h, params) => {
              let data = this.$t("push.status");
              let type = data.filter(v => {
                return v.value === params.row.pushStatus;
              });
              let state = type.length > 0 && type[0].desc ? type[0].desc : "";
              return h("div", state);
            },
            minWidth:150
          },
          {
            title: this.$t("push.type"),
            key: "pushType",
            align: "center",
            render: (h, params) => {
              let data = this.$t("push.types");
              let type = data.filter(v => {
                return v.value === params.row['pushType'];
              });
              let state = type.length > 0 && type[0].desc ? type[0].desc : "";
              return h("div", state);
            },
            minWidth:150
          },
          {
            title: this.$t("push.operator"),
            key: "operatorName",
            align: "center",
            minWidth:150

          },
          {
            title: this.$t("push.updateTime"),
            key: "modifyTime",
            align: "center",
            minWidth:150
          },
          {
            title: this.$t("common.operating"),
            key: "action",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              let pushStatus =params.row.pushStatus ;
              let str=[];
              if(pushStatus ===1){
                str=[
                  h('span', {
                    props: {
                      type: 'text', size: 'large', icon: 'md-menu'
                    },
                    class: 'edit-btn',
                    style: {
                      color: "#57a3f3",
                      marginRight: '5px',
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.editMessage(params)
                      }
                    }
                  }, this.$t('common.info')),
                ]
              }else{
                str=[
                  h('span', {
                    props: {
                      type: 'text', size: 'large', icon: 'md-menu'
                    },
                    class: 'edit-btn',
                    style: {
                      color: "#57a3f3",
                      marginRight: '5px',
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.editMessage(params)
                      }
                    }
                  }, this.$t('common.edit')),
                  h('span', {
                    props: {
                      type: 'text', size: 'large', icon: 'md-menu'
                    },
                    class: 'edit-btn',
                    style: {
                      color: "#57a3f3",
                      marginRight: '5px',
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.deleteModal=true;
                        let data={
                          id:params.row.id
                        };
                        sessionStorage.setItem("delete", JSON.stringify(data));
                      }
                    }
                  }, this.$t('common.delete')),
                ]
              }
              return h("div", str)
            }
          }
        ]
      }
    },
    mounted: function () {
      this.getTable();
    },
    methods: {
      search() {
       this.currentPage=1;
        this.getTable();
      },
      cleanSearch() {
       this.currentPage=1;
        this.searchForm.subject = '';
        this.searchForm.pushStatus='';
        this.searchForm.pushTimeStart = '';
        this.searchForm.pushTimeEnd = '';

        this.getTable();
      },
      changeModal(param) {
        this.editModal = param;
        this.modelItem({'row': {}});
      },
      showModal(){
        let params={
          row: {
            id: null,
            subject: null,
            pushTime: null,
            pushType: null,
            pushContent: null,
            pushObj: null,
            pushExcel:null
          }
        };
        this.modelItem(params);
        this.editModal = true;
      },
      editMessage(data){
        this.modelItem(data);
        this.editModal = true;
      },
      getTable(){
        let params = {
          pushTimeStart: this.searchForm.pushTimeStart,
          pushTimeEnd: this.searchForm.pushTimeEnd,
          pushStatus: this.searchForm.pushStatus,
          subject: this.searchForm.subject,

          pageSize: this.pageSize,
          currentPage: this.currentPage,
        };
        if(params.pushTimeStart && params.pushTimeEnd){
          params.pushTimeStart=formatDate(new Date(params.pushTimeStart), "yyyy-MM-dd hh:mm:ss");
          params.pushTimeEnd=formatDate(new Date(params.pushTimeEnd), "yyyy-MM-dd")+" 23:59:59";
        }
        this.tableLoading = true;
        getMsgPush(params).then(res => {
          this.tableLoading = false;
          if(res.data.success){
            if( res.data.data && res.data.data.length !==0 ){
              this.tableData = res.data.data
            }else{
              this.tableData = []
            }
            this.currentPage = res.data.page.currentPage;
            this.pageSize = res.data.page.pageSize;
            this.totalNumber = res.data.page.totalNumber;
          }else{
            this.$Message.error(res.data.message)
          }
        })
      },
      modelItem(params){
        this.chooseItem.id = params.row.id;
        this.chooseItem.subject = params.row.subject;
        this.chooseItem.pushTime = params.row.pushTimeStr;
        this.chooseItem.pushType = params.row.pushType;
        this.chooseItem.pushContent = params.row.pushContent;
        this.chooseItem.pushObj = params.row.pushObj;
        this.chooseItem.pushExcel = params.row.status;
      },
      editSuccess (param) {
        this.tableLoading = true;
        this.getTable();
      },
      changePage (params) {
        this.currentPage = params;
        this.getTable();
      },
      pageSizeChange (params) {
        this.pageSize = params;
        this.getTable()
      },
      pushDelete(){
        this.deleteLoading=true;
        let data=sessionStorage.getItem("delete");
        let params = {
          id:JSON.parse(data).id
        };
        deleteMsgPush(params).then(res => {
          this.deleteLoading = false;
          if (res.data.success) {
            this.$Message.success(this.$t('common.deleteSuccess'));
            this.getTable();
          } else {
            this.$Message.error(res.data.message);
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
