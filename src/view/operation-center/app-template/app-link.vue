<template>
  <Row :gutter="10" class="set-message-center-page">
    <i-col span="24">
      <Card class="search-card">
        <Form ref="searchForm" :model="searchForm" :label-width="100" inline>
          <Row>
            <FormItem :label="$t('appLink.theme')">
              <Input
                v-model="searchForm.theme"
                :placeholder="$t('appLink.prompt.theme')"
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

      <Card>
        <app-link-modal
          :editModal="editModal"
          :chooseItem="chooseItem"
          v-on:changeModal="changeModal"
          v-on:editSuccess="editSuccess"
        ></app-link-modal>

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
  </Row>
</template>

<script>
  import { getAppShare } from "@/api/operationCenter";
  import appLinkModal from "../../../components/operation-modal/appLinkModal";
  export default {
    name: "app-link",
    components: {
      appLinkModal
    },
    data(){
      return{
        editModal: false,
        tableLoading: false,

        pageSize: 10,
        totalNumber: 0,
        currentPage: 1,
        searchForm: {
          theme:null,
        },
        chooseItem: {
          id: null,
          linkUrl: null
        },
        tableData: [],
        columns: [
          {
            title: this.$t("appLink.id"),
            key: "id",
            align: "center",
            minWidth:150
          },
          {
            title: this.$t("appLink.theme"),
            key: "theme",
            align: "center",
            minWidth:150
          },
          {
            title: this.$t("appLink.link"),
            key: "linkUrl",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("appLink.state"),
            key: "status",
            align: "center",
            render: (h, params) => {
              let data = this.$t("appLink.status");
              let type = data.filter(v => {
                return v.value === params.row.status;
              });
              let state = type.length > 0 && type[0].desc ? type[0].desc : params.row.status;
              return h("div", state);
            },
            minWidth:150
          },
          {
            title: this.$t("common.operating"),
            key: "action",
            minWidth: 150,
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
        this.searchForm.theme = null;
        this.getTable();
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
          theme:this.searchForm.theme,

          pageSize: this.pageSize,
          currentPage: this.currentPage
        };
        this.tableLoading = true;
        getAppShare(params).then(res => {
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
        this.chooseItem.linkUrl  = params.row.linkUrl ;
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
      }
    }
  }
</script>

<style scoped>

</style>
