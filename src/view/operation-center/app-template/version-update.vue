<template>
  <Row :gutter="10" class="set-message-center-page">
    <i-col span="24">
      <Card class="search-card">
        <Form ref="searchForm" :model="searchForm" :label-width="100" inline>
          <Row>
            <FormItem :label="$t('versionUpdate.version')">
              <Input
                v-model="searchForm.updateVersion"
                :placeholder="$t('versionUpdate.prompt.version')"
              >
              </Input>
            </FormItem>
          </Row>
          <FormItem>
            <Button type="primary" @click="search">{{$t('common.search')}}</Button>
            <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>
          </FormItem>
        </Form>
      </Card>

      <Card style="margin-top: 10px">
        <Button class="add-message-btn" type="primary" @click="showModal">{{$t('common.add')}}</Button>
        <version-update-modal
          :editModal="editModal"
          :chooseItem="chooseItem"
          v-on:changeModal="changeModal"
          v-on:editSuccess="editSuccess"
        ></version-update-modal>

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
      <Modal v-model="deleteModal" :title="$t('setUpPage.deleteTitle')" :loading="deleteLoading" @on-ok="versionDelete" width="300">
        <p>{{$t('setUpPage.deleteTip')}}</p>
      </Modal>
    </i-col>
  </Row>
</template>

<script>
  import { getApkVersion,deleteApkVersion } from "@/api/operationCenter";
  import VersionUpdateModal from "../../../components/operation-modal/versionUpdateModal";
  import { formatDate } from "@/assets/js/date";
  export default {
    name: "version-update",
    components: {
      VersionUpdateModal
    },
    data(){
      return{
        editModal: false,
        tableLoading: false,
        deleteModal: false,
        deleteLoading: false,
        pageSize: 10,
        totalNumber: 0,
        currentPage: 1,
        searchForm: {
          updateVersion:null,
        },
        chooseItem: {
          id: null,
          updateType: null,
          updateVersion: null,
          updateContent: null,
          googleLink: null,
          serviceLink: null
        },
        tableData: [],
        columns: [
          {
            title: this.$t("versionUpdate.id"),
            key: "id",
            align: "center",
            minWidth:150
          },
          {
            title: this.$t("versionUpdate.version"),
            key: "updateVersion",
            align: "center",
            minWidth:150
          },
          {
            title: this.$t("versionUpdate.updateType"),
            key: "updateType",
            align: "center",
            render: (h, params) => {
              let data = this.$t("versionUpdate.types");
              let type = data.filter(v => {
                return v.value === params.row.updateType;
              });
              let state = type.length > 0 && type[0].desc ? type[0].desc : params.row.updateType;
              return h("div", state);
            },
            minWidth:150
          },
          {
            title: this.$t("versionUpdate.updateContent"),
            key: "updateContent",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("versionUpdate.google"),
            key: "googleLink",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("versionUpdate.server"),
            key: "serviceLink",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("versionUpdate.createTime"),
            key: "createTime",
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
                    type: "text",
                    // size: "large",
                    icon: "md-close"
                  },
                  class: "edit-btn",
                  style: {
                    backgroundColor: 'transparent',
                    color: "#ed4014",
                  },
                  // props: {
                  //   type: 'text', size: 'large', icon: 'md-menu'
                  // },
                  // class: 'edit-btn',
                  // style: {
                  //   color: "#57a3f3",
                  //   marginRight: '5px',
                  //   cursor: "pointer"
                  // },
                  on: {
                    click: () => {
                      this.deleteModal=true;
                      let data={
                        id:params.row.id
                      };
                      sessionStorage.setItem("delete", JSON.stringify(data));
                      // this.editMessage(params)
                    }
                  }
                }, this.$t('common.delete'))
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
        this.searchForm.updateVersion = null;
        this.getTable();
      },
      showModal () {
        let params={
          row: {
          }
        };
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
          updateVersion:this.searchForm.updateVersion,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        };
        this.tableLoading = true;
        getApkVersion(params).then(res => {
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
        this.chooseItem.updateType = params.row.updateType-0;
        this.chooseItem.updateVersion = params.row.updateVersion;
        this.chooseItem.updateContent = params.row.updateContent;
        this.chooseItem.googleLink = params.row.googleLink;
        this.chooseItem.serviceLink = params.row.serviceLink;
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
      versionDelete(){
        this.deleteLoading=true;
        let data=sessionStorage.getItem("delete");
        let params = {
          id:JSON.parse(data).id
        };
        deleteApkVersion(params).then(res => {
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
