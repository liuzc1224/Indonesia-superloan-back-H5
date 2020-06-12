<template>
  <Row :gutter="10" class="set-message-center-page">
    <i-col span="24">
      <Card class="search-card">
        <Form ref="searchForm" :model="searchForm" :label-width="100" inline>
          <Row>
            <FormItem :label="$t('helpCenter.createTime')">
              <Row>
                <Col span="11">
                  <DatePicker
                    type="date"
                    ref="createTimeStart"
                    :placeholder="$t('helpCenter.timeStart')"
                    v-model="searchForm.startTime"
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
                    :placeholder="$t('helpCenter.timeEnd')"
                    v-model="searchForm.endTime"
                  ></DatePicker>
                </Col>
              </Row>
            </FormItem>

            <FormItem :label="$t('helpCenter.status')">
              <Row>
                <Col span="24">
                  <Select
                    clearable
                    v-model="searchForm.isShow"
                    class="search-select-item"
                    :placeholder="$t('helpCenter.inputStatus')"
                  >
                    <Option v-for="(item, i) in $t('helpCenter.isShow')" :value="item.value" :key="i">{{item.desc}}</Option>
                  </Select>
                </Col>
              </Row>
            </FormItem>
            <FormItem :label="$t('helpCenter.type')">
              <Row>
                <Col span="24">
                  <Select
                    clearable
                    v-model="searchForm.textFlag"
                    class="search-select-item"
                    :placeholder="$t('helpCenter.inputType')"
                  >
                    <Option v-for="(item, i) in $t('helpCenter.textFlag')" :value="item.value" :key="i">{{item.desc}}</Option>
                  </Select>
                </Col>
              </Row>
            </FormItem>
            <FormItem :label="$t('helpCenter.problem')">
              <Row>
                <Col span="24">
                  <Input
                    v-model="searchForm.textQuestion"
                    :placeholder="$t('helpCenter.inputProblem')"
                  >
                  </Input>
                </Col>
              </Row>
            </FormItem>
          </Row>
          <FormItem>
            <Button type="primary" @click="search">{{$t('common.search')}}</Button>
            <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>
          </FormItem>
        </Form>
      </Card>

      <Card>
        <Button class="add-message-btn" type="primary" @click="showModal">{{$t('common.add')}}</Button>
        <help-modal
          :editModal="editModal"
          :chooseItem="chooseItem"
          :numberMax="numberMax"
          :isAble="isAble"
          v-on:changeModal="changeModal"
          v-on:editSuccess="editSuccess"
          v-on:setNumberMax="setNumberMax"
        ></help-modal>

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
      <Modal v-model="deleteModal" :title="$t('setUpPage.deleteTitle')" :loading="deleteLoading" @on-ok="helpCenterDelete" width="300">
        <p>{{$t('setUpPage.deleteTip')}}</p>
      </Modal>
    </i-col>
  </Row>
</template>

<script>
  import { getHelp,getTextFlag,deleteHple,updateHple} from "@/api/help";
  import HelpModal from "../../../components/operation-modal/help-modal";
  import { formatDate } from "@/assets/js/date";
  export default {
    name: "help-content",
    components: {
      HelpModal
    },
    data(){
      return{
        deleteModal:false,
        deleteLoading:false,
        imgLoading: false,
        editModal: false,
        isAble: null,
        tableLoading: false,
        numberMax: null,
        pageSize: 10,
        totalNumber: 0,
        currentPage: 1,
        searchForm: {
          startTime:null,
          endTime:null,
          isShow: null,
          textFlag: null,
          textQuestion: null
        },
        chooseItem: {
          id: "",
          textFlag: "",
          textOrder: "",
          textQuestion: "",
          textAnswer: "",
          isShow: ""
        },
        tableData: [],
        columns: [
          {
            title: this.$t("helpCenter.id"),
            key: "id",
            align: "center",
            minWidth:150
          },
          {
            title: this.$t("helpCenter.type"),
            key: "textFlag",
            align: "center",
            render: (h, params) => {
              let data = this.$t("helpCenter.textFlag");
              let type = data.filter(v => {
                return v.value === params.row.textFlag;
              });
              let state = type.length > 0 && type[0].desc ? type[0].desc : "";
              return h("div", state);
            },
            minWidth:150
          },
          {
            title: this.$t("helpCenter.sort"),
            key: "textOrder",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("helpCenter.problem"),
            key: "textQuestion",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("helpCenter.answer"),
            key: "textAnswer",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("helpCenter.updater"),
            key: "modifyOperatorName",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("helpCenter.updateTime"),
            key: "modifyTimes",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("helpCenter.status"),
            key: "isShow",
            align: "center",
            render: (h, params) => {
              let data = this.$t("helpCenter.isShow");
              let type = data.filter(v => {
                return v.value === params.row.isShow;
              });
              let state = type.length > 0 && type[0].desc ? type[0].desc : "";
              return h("div", state);
            },
            minWidth:150
          },
          {
            title: this.$t("common.operating"),
            key: "action",
            width: 300,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      // size: "large",
                      // icon: "md-menu"
                    },
                    class: "edit-btn",
                    style: {
                      backgroundColor: 'transparent',
                      color: "#ff9900",
                    },
                    on: {
                      click: () => {
                        this.editMessage(params);
                      }
                    }
                  }, this.$t('common.operating')),
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      // size: "large",
                      // icon: "md-arrow-up"
                    },
                    class: "edit-btn",
                    style: {
                      backgroundColor: 'transparent',
                      color: "#57a3f3",
                    },
                    on: {
                      click: () => {
                        this.moveUp(params);
                      }
                    }
                  }, this.$t('common.moveUp')),
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      // size: "large",
                      // icon: "md-arrow-down"
                    },
                    class: "edit-btn",
                    style: {
                      backgroundColor: 'transparent',
                      color: "#57a3f3",
                    },
                    on: {
                      click: () => {
                        this.moveDown(params);
                      }
                    }
                  }, this.$t('common.moveDown')),
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      // size: "large",
                      // icon: "md-close"
                    },
                    class: "edit-btn",
                    style: {
                      backgroundColor: 'transparent',
                      color: "#ed4014",
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
              ])
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
        this.searchForm.startTime = null;
        this.searchForm.endTime=null;
        this.searchForm.isShow = null;
        this.searchForm.textFlag = null;
        this.searchForm.textQuestion = null;
        this.getTable();
      },
      showModal () {
        let params={
          row: {
          }
        };
        this.modelItem(params);
        this.editModal = true;
        this.isAble=true;
      },
      changeModal(param) {
        this.editModal = param;
        this.modelItem({'row': {}});
      },
      editMessage(params){
        this.isAble=false;
        let data= {
          textFlag:params.row['textFlag']
        };
        getTextFlag(data).then(res => {
          if(res.data.success){
            if(res.data.data){
              this.modelItem(params);
              this.numberMax=res.data.data-1;
              this.editModal = true;
            }
          }else{
            this.$Message.error(res.data.message)
          }
        });
      },
      getTable(){
        let params = {
          startTime:this.searchForm.startTime,
          endTime:this.searchForm.endTime,
          isShow: this.searchForm.isShow,
          textFlag: this.searchForm.textFlag,
          textQuestion: this.searchForm.textQuestion,



          pageSize: this.pageSize,
          currentPage: this.currentPage,


        };
        if(params.endTime && params.startTime){
          params.endTime=formatDate(new Date(params.endTime), "yyyy-MM-dd")+" 23:59:59";
          params.startTime=formatDate(new Date(params.startTime), "yyyy-MM-dd")+" 00:00:00";
        }

        let start=(new Date(params.startTime)).getTime();
        let end=(new Date(params.endTime)).getTime();
        if( start - end >0 ){
          params.endTime=null;
          params.startTime=null;
        }
        this.tableLoading = true;
        getHelp(params).then(res => {
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
        this.chooseItem.textFlag = params.row.textFlag-0;
        this.chooseItem.textOrder = params.row.textOrder;
        this.chooseItem.textQuestion = params.row.textQuestion;
        this.chooseItem.textAnswer = params.row.textAnswer;
        this.chooseItem.isShow = params.row.isShow;

      },
      editSuccess () {
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
      setNumberMax(data){
        this.numberMax=data;
      },
      moveUp(data){
        let textOrder=data.row.textOrder;
        if(textOrder>1){
          this.tableLoading=true;
          let params={
            id:data.row.id,
            textFlag:data.row.textFlag,
            textOrder:textOrder-1
          };
          updateHple(params).then(res => {
            this.tableLoading = false;
            if (res.data.success) {
              this.$Message.success(this.$t('common.moveUpSuccess'));
              this.getTable();
            } else {
              this.$Message.error(res.data.message);
            }
          })
        }else{
          this.$Message.error(this.$t('common.moveUpMessage'));
        }
      },
      moveDown(_data){
        let textOrder=_data.row.textOrder;
        let params= {
          textFlag:_data.row['textFlag']
        };
        getTextFlag(params).then(res => {
          if(res.data.success){
            if(res.data.data){
              let numberMax=res.data.data;
              if(textOrder<numberMax-1){
                let params={
                  id:_data.row.id,
                  textFlag:_data.row.textFlag,
                  textOrder:textOrder+1
                };
                updateHple(params).then(res => {
                  this.tableLoading = false;
                  if (res.data.success) {
                    this.$Message.success(this.$t('common.moveDownSuccess'));
                    this.getTable();
                  } else {
                    this.$Message.error(res.data.message);
                  }
                })
              }else{
                this.$Message.error(this.$t('common.moveDownMessage'));
              }
            }
          }else{
            this.$Message.error(res.data.message)
          }
        });
      },
      helpCenterDelete(){
        this.deleteLoading=true;
        let data=sessionStorage.getItem("delete");
        let params = {
          id:JSON.parse(data).id
        };
        deleteHple(params).then(res => {
          this.deleteLoading = false;
          if (res.data.success) {
            this.$Message.success(this.$t('common.deleteSuccess'));
            this.getTable();
          } else {
            this.$Message.error(res.data.message);
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>

