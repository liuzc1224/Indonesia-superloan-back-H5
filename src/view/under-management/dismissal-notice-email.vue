<template>
  <Row>
    <i-col :span="24">
      <Card class="search-card">
        <Form ref="searchForm" :model="searchForm" :label-width="100" style="margin-top: 20px" inline>
          <FormItem :label="$t('dismissalNotice.mailbox.recipient')">
            <Input v-model="searchForm.receiver" :placeholder="$t('dismissalNotice.mailbox.prompt.recipient')"></Input>
          </FormItem>
          <FormItem :label="$t('dismissalNotice.mailbox.recipientEmail')">
            <Input v-model="searchForm.email" :placeholder="$t('dismissalNotice.mailbox.prompt.recipientEmail')"></Input>
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
        <Button class="add-message-btn" type="primary" @click="showModal">{{$t('dismissalNotice.add')}}</Button>
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
      <dismissal-notice-email-modal
        :editModal="editModal"
        :chooseItem="chooseItem"
        v-on:changeModal="changeModal"
        v-on:editSuccess="editSuccess"
      ></dismissal-notice-email-modal>
      <Modal v-model="deleteModal" :title="$t('setUpPage.deleteTitle')" :loading="deleteLoading" @on-ok="dismissalDelete" width="300">
        <p>{{$t('setUpPage.deleteTip')}}</p>
      </Modal>
    </i-col>
  </Row>
</template>

<script>
  import { productinvalidnotifyemailGet,productinvalidnotifyemailDelete } from "@/api/underManagement";
  import dismissalNoticeEmailModal from "../../components/under-management/dismissalNoticeEmail-modal";
  export default {
    name: "dismissal-notice-email",
    components:{
      dismissalNoticeEmailModal
    },
    data(){
      return{
        deleteModal:false,
        deleteLoading:false,
        searchForm: {
          email:null,
          receiver:null
        },
        chooseItem: {
          id: null,
          receiver: null,
          email: null,
          status:null
        },
        editModal: false,
        tableLoading: false,
        pageSize: 10,
        totalNumber: 0,
        currentPage: 1,
        tableData: [],
        columns: [
          {
            title: this.$t("dismissalNotice.mailbox.id"),
            key: "id",
            align: "center",
            minWidth:150
          },
          {
            title: this.$t("dismissalNotice.mailbox.recipient"),
            key: "receiver",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("dismissalNotice.mailbox.recipientEmail"),
            key: "email",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("dismissalNotice.mailbox.createTime"),
            key: "createTime",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t('dismissalNotice.mailbox.state'), key: 'status',align: 'center',
            render:(h,params)=>{
              let data=this.$t('dismissalNotice.mailbox.status');
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
              ])
            }
          }
        ]
      }
    },
    mounted(){
      this.getTable();
    },
    methods:{
      search(){
       this.currentPage=1;
        this.getTable();
      },
      cleanSearch(){
       this.currentPage=1;
        this.searchForm.receiver = null;
        this.searchForm.email=null;
        this.getTable();
      },
      showModal () {
        let params={row: {}};
        this.modelItem(params);
        this.editModal = true;
      },
      changeModal(param) {
        this.editModal = param;
        this.modelItem({'row': {}});
      },
      editMessage(params){
        this.modelItem(params);
        this.editModal = true;
      },
      getTable(){
        let params = {
          receiver: this.searchForm.receiver,
          email: this.searchForm.email,

          pageSize: this.pageSize,
          currentPage: this.currentPage,
        };

        this.tableLoading = true;
        productinvalidnotifyemailGet(params).then(res => {
          this.tableLoading = false;
          if(res.data.success){
            if( res.data.data && res.data.data.length !==0 ){
              this.tableData = res.data.data;
              this.currentPage = res.data.page.currentPage;
              this.pageSize = res.data.page.pageSize;
              this.totalNumber = res.data.page.totalNumber;
            }else{
              this.tableData = [];
              this.currentPage = 1;
              this.pageSize = 10;
              this.totalNumber = 0;
            }
          }else{
            this.$Message.error(res.data.message)
          }
        })
      },
      modelItem(params){
        this.chooseItem.id = params.row.id;
        this.chooseItem.receiver = params.row.receiver;
        this.chooseItem.email = params.row.email;
        this.chooseItem.status = params.row.status;
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
      dismissalDelete(){
        this.deleteLoading=true;
        let data=sessionStorage.getItem("delete");
        let params = {
          id:JSON.parse(data).id
        };
        productinvalidnotifyemailDelete(params).then(res => {
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
