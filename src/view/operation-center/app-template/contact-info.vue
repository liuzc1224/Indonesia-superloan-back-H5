<template>
  <Row :gutter="10" class="set-message-center-page">
    <i-col span="24">
      <Card>
        <contact-modal
          :editModal="editModal"
          :chooseItem="chooseItem"
          v-on:changeModal="changeModal"
          v-on:editSuccess="editSuccess"
        ></contact-modal>

        <Table
          border
          class="person-table"
          :columns="columns"
          :data="tableData"
          :loading="tableLoading"
          style="margin-top: 10px"
        />
<!--        <div style="margin: 10px;overflow: hidden">-->
<!--          <div style="float: right;margin-bottom: 2px;">-->
<!--            <Page-->
<!--              :total="totalNumber"-->
<!--              :current="currentPage"-->
<!--              :page-size-opts="[10, 20, 30, 50]"-->
<!--              @on-change="changePage"-->
<!--              @on-page-size-change="pageSizeChange"-->
<!--              show-elevator-->
<!--              show-sizer-->
<!--              show-total-->
<!--            ></Page>-->
<!--          </div>-->
<!--        </div>-->
      </Card>
    </i-col>
  </Row>
</template>

<script>
  import { contact } from "@/api/contact";
  import contactModal from "../../../components/operation-modal/contact-modal";
  export default {
    name: "contact-info",
    components:{
      contactModal
    },
    data(){
      return{
        imgLoading: false,
        editModal: false,
        tableLoading: false,
        pageSize: 10,
        totalNumber: 0,
        currentPage: 1,
        // searchForm: {
        //   theme: null,
        //   status: null
        // },
        chooseItem: {
          id: "",
          downloadUrl: "",
          content: "",
          email: "",
        },
        tableData: [],
        columns: [
          {
            title: this.$t("contactInfo.id"),
            key: "id",
            align: "center",
            minWidth:150
          },
          {
            title: this.$t("contactInfo.contact"),
            key: "content",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("contactInfo.url"),
            key: "downloadUrl",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("contactInfo.email"),
            key: "email",
            align: "center",
            tooltip: true,
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
                }, this.$t('common.edit'))
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
        this.searchForm.channelId = '';
        this.searchForm.channelName='';
        this.searchForm.status = '';
        this.getTable();
      },
      showModal () {
        this.editModal = true;
      },
      changeModal(param) {
        this.editModal = param;
        this.modelItem({'row': {}});
      },
      editMessage(data){
        this.modelItem(data);
        this.editModal = true;
      },
      getTable(){
        let params = {
          // theme: this.searchForm.theme,
          // status: this.searchForm.status,
          // pageSize: this.pageSize,
          // currentPage: this.currentPage,
        };
        this.tableLoading = true;
        contact(params).then(res => {
          this.tableLoading = false;
          if(res.data.success){
            if( res.data.data && res.data.data.length !==0 ){
              this.tableData = res.data.data
            }else{
              this.tableData = []
            }
            // this.currentPage = res.data.page.currentPage;
            // this.pageSize = res.data.page.pageSize;
            // this.totalNumber = res.data.page.totalNumber;
          }else{
            this.$Message.error(res.data.message)
          }
        })
      },
      modelItem(params){
        this.chooseItem.id = params.row.id;

        this.chooseItem.content = params.row.content;
        this.chooseItem.downloadUrl = params.row.downloadUrl;
        this.chooseItem.email = params.row.email;
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
    }
  }
</script>

<style scoped>

</style>

