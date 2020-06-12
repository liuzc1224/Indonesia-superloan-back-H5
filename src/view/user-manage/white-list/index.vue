<template>
  <div>
    <Row>
      <Card style="margin-bottom:10px">
        <Form ref="searchForm" :model="searchForm" :label-width="100" inline>
        <Row>
          <FormItem :label="$t('userList.fallTime')">
            <Row>
              <Col span="11">
                <DatePicker
                  type="date"
                  ref="createTimeStart"
                  :placeholder="$t('userList.startTime')"
                  v-model="searchForm.createTimeStart"
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
                  :placeholder="$t('userList.endTime')"
                  v-model="searchForm.createTimeEnd"
                ></DatePicker>
              </Col>
            </Row>
          </FormItem>

          <FormItem :label="$t('userList.customerSource')">
            <Row>
              <Col span="24">
                <Select
                  clearable
                  v-model="searchForm.source"
                  class="search-select-item"
                  :placeholder="$t('userList.prompt.customerSource')"
                  style="width: 182px"
                >
                  <Option v-for="(item, i) in $t('userList.source')" :value="item.value" :key="i">{{item.desc}}</Option>
                </Select>
              </Col>
            </Row>
          </FormItem>
          <FormItem :label="$t('userList.white.state')">
            <Row>
              <Col span="24">
                <Select
                  clearable
                  v-model="searchForm.creditStatus"
                  class="search-select-item"
                  :placeholder="$t('userList.prompt.creditStatus')"
                  style="width: 182px"
                >
                  <Option v-for="(item, i) in $t('userList.white.status')" :value="item.value" :key="i">{{item.desc}}</Option>
                </Select>
              </Col>
            </Row>
          </FormItem>
          <FormItem :label="$t('userList.phoneNumber')">
            <Input v-model="searchForm.phoneNumber" :placeholder="$t('userList.prompt.phoneNumber')"></Input>
          </FormItem>
        </Row>
        <FormItem>
          <Button type="primary" @click="search">{{$t('common.search')}}</Button>
          <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>
        </FormItem>
      </Form>
      </Card>
    </Row>
<!--    <Card style="margin-bottom:10px">-->
<!--      <table-search @tableSearch="search" @reset="reset"></table-search>-->
<!--    </Card>-->
    <Card>
      <Row style="margin-bottom:20px;">
        <Button
          type="primary"
          @click="getDownloadUrl"
        >{{$t('userList.down')}}</Button>
        <Button
          class="left"
          type="primary"
          @click="importData"
        >{{$t('userList.import')}}</Button>
        <Button class="left" type="primary" @click="exportData">{{$t('userList.export')}}</Button>
      </Row>
      <Table border :columns="columns" :data="tableData" :loading="loading"></Table>
      <edit-modal
        class="admin-modal"
        :editModal="isEditModal"
        :chooseItem="chooseItem"
        v-on:changeModal="changeModal"
        v-on:editSuccess="editSuccess"
      ></edit-modal>
      <import-modal
        class="admin-modal"
        :editModal="isImportModal"
        v-on:changeModal="changeImportModal"
        v-on:editSuccess="editSuccess">
      </import-modal>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;margin-bottom: 2px;">
          <Page
            :total="searchForm.totalNumber"
            :current="searchForm.currentPage"
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
  </div>
</template>
<script>
import {
  blacklist,
  blacklistImport,
  blacklistUpdate,
  blacklistExport,
  blacklistTemplate
} from "@/api/user";
import { formatDate } from "@/assets/js/date";
import { SearchModal } from "./search.modal";
import EditModal from "../../../components/white-list/edit-modal";
import importModal from "../../../components/white-list/import-modal";
export default {
  name: "white-list",
  components: {EditModal,importModal},
  data() {
    return {
      delModal: false,
      isEditModal: false,
      isImportModal: false,
      isEditAll: false,
      modal_loading: false,
      uploadCount: null,
      modalOption: {
        name: "",
        data: null,
        type: "",
        title: ""
      },
      editForm: {
        identityCard: null,
        companyName: null,
        phoneNumber: null,
        listType: null,
        listBelong: null,
        remarks: null
      },
      searchForm:{
        phoneNumber:null,
        source:null,
        createTimeStart:null,
        createTimeEnd:null,
        creditStatus:null,
        pageSize: 10,
        totalNumber: 0,
        currentPage: 1,
      },
      chooseItem:{
        id: null,
        phoneNumber: null,
        creditStatus:null
      },
      loading: true,
      tableData: [],
      searchModal: new SearchModal(),
      columns: [
        {
          title: this.$t("userList.phoneNumber"),
          key: "phoneNumber",
          align: "center",
          tooltip: true,
          minWidth:150
        },
        {
          title: this.$t("userList.fallTime"),
          key: "storageTime",
          align: "center",
          tooltip: true,
          minWidth:150
        },
        {
          title: this.$t("userList.customerSource"),
          key: "source",
          align: "center",
          render: (h, params)=> {
            if(params.row['source']!=null){
              let data = this.$t("userList.source");
              let type = data.filter(v => {
                return v.value === params.row['source'];
              });
              let state = type.length > 0 && type[0].desc ? type[0].desc : "";
              return h("div", state);
            }

          },
          minWidth:150
        },
        {
          title: this.$t("userList.white.state"),
          key: "creditStatus",
          align: "center",
          render: (h, params)=> {
            if(params.row['creditStatus']!=null) {
              let data = this.$t("userList.white.status");
              let type = data.filter(v => {
                return v.value === params.row['creditStatus'];
              });
              let state = type.length > 0 && type[0].desc ? type[0].desc : "";
              return h("div", state);
            }
          },
          minWidth:150
        },
        {
          title: this.$t("userList.updateTime"),
          key: "creditUpdateTime",
          align: "center",
          minWidth:150
        },
        {
          title: this.$t("common.operating"),
          key: "action",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  props: {},
                  style: {
                    color: "#57a3f3",
                    cursor: "pointer",
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.modelItem(params);
                      this.isEditModal=true;
                    }
                  }
                },
                this.$t("com-edit")
              ),
            ]);
          }
        }
      ]
    };
  },
  mounted(){
    this.getList();
  },
  methods: {
    getList() {
      let params = {
        createTimeStart: this.searchForm.createTimeStart,
        createTimeEnd: this.searchForm.createTimeEnd,
        source: this.searchForm.source,
        phoneNumber: this.searchForm.phoneNumber,
        creditStatus: this.searchForm.creditStatus,

        pageSize: this.searchForm.pageSize,
        currentPage: this.searchForm.currentPage,
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
      this.loading = this.loading === false ? true : this.loading;
      blacklist(params)
        .then(res => {
          this.loading = false;
          if (res && res.data.success) {
            this.tableData = res.data.data;
            if (res.data.page) {
              this.searchForm.totalNumber = res.data.page.totalNumber;
              this.searchForm.currentPage = res.data.page.currentPage;
            } else {
              this.searchForm.totalNumber = 0;
              this.searchForm.currentPage = 1;
            }
          } else {
            this.$Message.error(this.$t("error") + res.data.message);
          }
        })
        .catch(err => {});
    },
    search() {
      this.searchForm.currentPage=1;
      this.getList();
    },
    cleanSearch() {
      this.currentPage=1;
      this.searchForm.phoneNumber=null;
      this.searchForm.source=null;
      this.searchForm.createTimeEnd=null;
      this.searchForm.createTimeStart=null;
      this.searchForm.creditStatus=null;
      this.getList();
    },
    // del(id) {
    //   this.modal_loading = true;
    //   deleteBlackandWhiteList(id)
    //     .then(res => {
    //       this.modal_loading = false;
    //       if (res.data && res.data.success) {
    //         this.delModal = false;
    //         this.getList();
    //       } else {
    //         this.$Message.success(res.data.message);
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    //   this.delModal = false;
    // },
    submit(type) {

    },
    getDownloadUrl() {
      blacklistTemplate();
    },
    exportData(){
      blacklistExport(this.searchModal);
    },
    importData(){
      this.isImportModal=true;
    },
    close() {
      this.delModal = false;
      this.editModal = false;
      this.getList();
    },
    modelItem(params){
      this.chooseItem.id = params.row.id;
      this.chooseItem.phoneNumber = params.row.phoneNumber;

      this.chooseItem.creditStatus = params.row.creditStatus;
    },
    changePage (params) {
      this.searchForm.currentPage = params;
      this.getList();
    },
    pageSizeChange (params) {
      this.searchForm.pageSize = params;
      this.getList()
    },
    editSuccess () {
      this.loading = true;
      this.getList()
    },
    changeModal (param) {
      this.isEditModal = param;
      this.modelItem({'row': {}});
    },
    changeImportModal(param){
      this.isImportModal = param;
    }
  }
};
</script>
<style lang="less" scoped>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
  .left{
    margin-left: 20px;
  }
</style>

