<template>
  <Row>
    <i-col :span="24">
      <Card class="search-card">
        <Form ref="searchForm" :model="searchForm" :label-width="100" style="margin-top: 20px" inline>
          <FormItem :label="$t('monitoringLink.createTime')">
            <Row>
              <i-col span="11">
                <DatePicker
                  type="date"
                  ref="createTimeStart"
                  :placeholder="$t('common.timeStart')"
                  v-model="searchForm.createTimeStart"
                  style="width:100%;"
                ></DatePicker>
              </i-col>
              <i-col span="2" style="text-align: center">
                ~
              </i-col>
              <i-col span="11">
                <DatePicker
                  type="date"
                  ref="createTimeEnd"
                  :placeholder="$t('common.timeEnd')"
                  v-model="searchForm.createTimeEnd"
                ></DatePicker>
              </i-col>
            </Row>
          </FormItem>
<!--          <FormItem :label="$t('monitoringLink.linkType')">-->
<!--            <Select clearable v-model="searchForm.type" :placeholder="$t('monitoringLink.prompt.linkType')">-->
<!--              <Option v-for="(item,index) in $t('monitoringLink.linkTypes')" :key="index" :value="item.value">{{item.desc}}</Option>-->
<!--            </Select>-->
<!--          </FormItem>-->
          <FormItem :label="$t('monitoringLink.name')">
            <Input v-model="searchForm.productName" :placeholder="$t('monitoringLink.prompt.name')"></Input>
          </FormItem>
          <FormItem :label="$t('monitoringLink.packageName')">
            <Input v-model="searchForm.packageName" :placeholder="$t('monitoringLink.prompt.packageName')"></Input>
          </FormItem>
          <Row>
            <FormItem>
              <Button type="primary" @click="search">{{$t('common.search')}}</Button>
              <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>
            </FormItem>
          </Row>
        </Form>
      </Card>
      <Card style="margin-top: 10px">
        <Button class="add-message-btn" type="primary" @click="showModal">{{$t('monitoringLink.add')}}</Button>
        <monitoring-link-modal
          :editModal="editModal"
          :chooseItem="chooseItem"
          v-on:changeModal="changeModal"
          v-on:editSuccess="editSuccess"
        ></monitoring-link-modal>

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
      <Modal v-model="deleteModal" :title="$t('setUpPage.deleteTitle')" :loading="deleteLoading" @on-ok="linkDelete" width="300">
        <p>{{$t('setUpPage.deleteTip')}}</p>
      </Modal>
    </i-col>
  </Row>
</template>

<script>
  import { formatDate } from "@/assets/js/date";
  import monitoringLinkModal from "../../components/under-management/monitoringLink-modal";
  import { getGoogleUrl,deleteGoogleUrl } from "@/api/underManagement";
    export default {
      name: "monitoring-link",
      components:{
        monitoringLinkModal
      },
      data() {
        return {
          deleteModal:false,
          deleteLoading:false,
          editModal: false,
          tableLoading: false,
          pageSize: 10,
          totalNumber: 0,
          currentPage: 1,
          searchForm: {
            createTimeStart: null,
            createTimeEnd: null,
            packageName: null,
            productName: null,
            type: null
          },
          chooseItem: {
            productName:null,
            packageName:null
          },
          tableData: [],
          columns: [
            {
              title: this.$t("monitoringLink.id"),
              key: "id",
              align: "center",
              tooltip: true,
              minWidth:150
            },
            {
              title: this.$t("monitoringLink.createTime"),
              key: "createTime",
              align: "center",
              tooltip: true,
              minWidth:150
            },
            {
              title: this.$t("monitoringLink.name"),
              key: "productName",
              align: "center",
              tooltip: true,
              minWidth:150
            },
            {
              title: this.$t("monitoringLink.packageName"),
              key: "packageName",
              align: "center",
              tooltip: true,
              minWidth:150
            },
            // {
            //   title: this.$t('monitoringLink.linkType'), key: 'type',align: 'center',
            //   render:(h,params)=>{
            //     let data=this.$t('monitoringLink.linkTypes');
            //     let type=data.filter(v => {
            //       return v.value===params.row.type;
            //     });
            //     let state=(type.length>0 && type[0].desc) ? type[0].desc : params.row.type;
            //     return h('div',state);
            //   }
            // },
            {
              title: this.$t('monitoringLink.state'), key: 'status',align: 'center',
              render:(h,params)=>{
                let data=this.$t('monitoringLink.status');
                let type=data.filter(v => {
                  return v.value===params.row.status;
                });
                let state=(type.length>0 && type[0].desc) ? type[0].desc : params.row.status;
                return h('div',state);
              },
              minWidth:150
            },
            {
              title: this.$t("common.operating"),
              key: "action",
              minWidth: 120,
              align: "center",
              render: (h, params) => {
                return h("div", [
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
          this.searchForm.createTimeStart = null;
          this.searchForm.createTimeEnd=null;
          this.searchForm.packageName=null;
          this.searchForm.productName=null;
          this.searchForm.type = null;
          this.getTable();
        },
        showModal () {
          this.editModal = true;
        },
        changeModal(param) {
          this.editModal = param;
          this.modelItem({'row': {}});
        },
        // editMessage(data){
        //   this.modelItem(data);
        //   this.editModal = true;
        // },
        getTable(){
          let params = {
            createTimeStart: this.searchForm.createTimeStart,
            createTimeEnd: this.searchForm.createTimeEnd,
            packageName: this.searchForm.packageName,
            productName: this.searchForm.productName,
            type: this.searchForm.type,
            pageSize: this.pageSize,
            currentPage: this.currentPage,
          };
          if(params.createTimeStart && params.createTimeEnd){
            params.createTimeEnd=formatDate(new Date(params.createTimeEnd), "yyyy-MM-dd")+" 23:59:59";
            params.createTimeStart=formatDate(new Date(params.createTimeStart), "yyyy-MM-dd")+" 00:00:00";
            let start=(new Date(params.createTimeStart)).getTime();
            let end=(new Date(params.createTimeEnd)).getTime();
            if( start - end >0 ){
              params.createTimeStart=null;
              params.createTimeEnd=null;
            }
          }
          this.tableLoading = true;
          getGoogleUrl(params).then(res => {
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
          this.chooseItem.productName = params.row.productName;
          this.chooseItem.packageName = params.row.packageName;
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
        linkDelete(){
          this.deleteLoading=true;
          let data=sessionStorage.getItem("delete");
          let params = {
            id:JSON.parse(data).id
          };
          deleteGoogleUrl(params).then(res => {
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
