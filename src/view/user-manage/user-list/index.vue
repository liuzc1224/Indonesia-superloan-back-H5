<template>
  <div>
    <Card style="margin-bottom:10px">
      <table-search @tableSearch="search" @reset="reset"></table-search>
    </Card>
    <Card>
      <Table border :columns="columns" :data="tableData" :loading="loading"></Table>
      <div style="margin:10px;overflow: hidden;">
        <div class="flex-center">
          <Page
            :total="searchModal.totalNumber"
            :current="1"
            @on-change="changePage"
            show-elevator
            show-total
          ></Page>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
  import TableSearch from "./search";
  import { getList } from "@/api/user";
  import { formatDate } from "@/assets/js/date";
  import { SearchModal } from "./search.modal";
  export default {
    name: "user-list",
    components: {
      TableSearch
    },
    data() {
      return {
        loading: true,
        tableData: [],
        searchModal: new SearchModal(),
        columns: [
          {
            title: this.$t("userList.userId"),
            key: "id",
            align: "center",
            minWidth:150
          },
          {
            title: this.$t("userList.phoneNumber"),
            key: "phoneNumber",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("userList.userLevel"),
            key: "userLevel",
            align: "center",
            render: function(h, params) {
              return h(
                "div",
                this.row.userLevel ? "level "+this.row.userLevel : "level 0"
              );
            },
            minWidth:150
          },
          {
            title: this.$t("userList.membershipLevel"),
            key: "memberLevelName",
            align: "center",
            tooltip: true,
            minWidth:150

          },
          {
            title: this.$t("userList.countryPrefix"),
            key: "countryPrefix",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("userList.createTime"),
            key: "createTime",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("userList.registrationSource"),
            key: "sourceEvent",
            align: "center",
            tooltip: true,
            render:(h,params)=>{
              let data=this.$t('userList.sources');
              let type=data.filter(v => {
                return v.value===params.row['sourceEvent'];
              });
              let state=(type.length>0 && type[0].desc) ? type[0].desc : "";
              return h('div',state);
            },
            minWidth:150
          },
          {
            title: this.$t("userList.invitationMethod"),
            key: "source",
            align: "center",
            render:(h,params)=>{
              let data=this.$t('userList.methods');
              let type=data.filter(v => {
                return v.value===params.row.source;
              });
              let state=(type.length>0 && type[0].desc) ? type[0].desc : "";
              return h('div',state);
            },
            minWidth:150
          },
          {
            title: this.$t("userList.invitePeople"),
            key: "referrerPhoneNumber",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("userList.packageName"),
            key: "packageName",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("userList.status"),
            key: "status",
            align: "center",
            render: (h, params) => {
              let data = this.$t("userList.state");
              let type = data.filter(v => {
                return v.value === params.row['status'];
              });
              let state = type.length > 0 && type[0].desc ? type[0].desc : "";
              return h("div", state);
            },
            minWidth:150
          },
          {
            title: this.$t('common.operating'),
            key: 'action',
            fixed:'right',
            minWidth: 250,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text', size: 'large', icon: 'md-menu'
                  },
                  class: 'edit-btn',
                  style: {
                    color: "#57a3f3",
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: 'user-details',
                        // query:{
                        //   data:params.row
                        // }
                      });
                      sessionStorage.setItem("user-details",JSON.stringify(params.row));
                    }
                  }
                }, this.$t('userList.userInfo'))// ,
              ])
            }
          }
        ]
      };
    },
    created() {
      this.search();
    },
    methods: {
      changePage(page) {
        this.searchModal.currentPage = page;
        this.getList();
      },
      getList() {
        this.loading = true;
        getList(this.searchModal)
          .then(res => {
            this.loading = false;
            if (res && res.data.success) {
              this.tableData = res.data.data;
              if (res.data.page) {
                this.searchModal.totalNumber = res.data.page.totalNumber;
                this.searchModal.currentPage = res.data.page.currentPage;
              } else {
                this.searchModal.totalNumber = 0;
                this.searchModal.currentPage = 1;
              }
            } else {
              this.$Message.error(this.$t("error") + res.data.message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      search(data) {
        Object.assign(this.searchModal, data);
        this.getList();
      },
      reset() {
        this.searchModal = new SearchModal();
        this.getList();
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
</style>

