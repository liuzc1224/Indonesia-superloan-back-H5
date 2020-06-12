<template>
  <Row :gutter="10" class="set-department-page">
    <i-col span="24">
      <Card>
        <Row>
          <Col span="20" offset="2">
            <table class="table">
              <tr>
                <td colspan="4">{{$t('userDetail.basicInfo')}}</td>
              </tr>
              <tr>
                <td>{{$t('userDetail.createTime')}}</td>
                <td>{{queryData['createTime']}}</td>
                <td>{{$t('userDetail.userLevel')}}</td>
                <td>{{queryData['userLevel'] ? "level "+queryData['userLevel'] : "level 0"}}</td>
              </tr>
              <tr>
                <td>{{$t('userDetail.userId')}}</td>
                <td>{{queryData['id']}}</td>
                <td>{{$t('userDetail.membershipLevel')}}</td>
                <td>{{queryData['memberLevelName']}}</td>
              </tr>
              <tr>
                <td>{{$t('userDetail.phoneNumber')}}</td>
                <td>{{queryData['phoneNumber']}}</td>
                <td>
                  {{$t('userDetail.walletBalance')}}
                </td>
                <td>
                  {{queryData['walletAmout']}}
                </td>
              </tr>
            </table>
          </Col>
        </Row>
      </Card>
      <Card style="margin-top: 10px">
        <Tabs>
          <TabPane :label="$t('userDetail.billList')">
            <bill-list></bill-list>
          </TabPane>
          <TabPane :label="$t('userDetail.expensesRecord')">
            <expenses-record></expenses-record>
          </TabPane>
          <TabPane :label="$t('userDetail.fundAccount')" >
            <fund-account></fund-account>
          </TabPane>
<!--          <TabPane :label="$t('userDetail.conversion')" >-->
<!--            <conversion></conversion>-->
<!--          </TabPane>-->
          <TabPane :label="$t('userDetail.invitationRecord')" >
            <invitation-record></invitation-record>
          </TabPane>
        </Tabs>
      </Card>
    </i-col>
  </Row>
</template>

<script>
  import billList from './billList.vue'
  import expensesRecord from './expensesRecord.vue'
  import fundAccount from './fundAccount.vue'
  import invitationRecord from './invitationRecord'
  import conversion from './conversion.vue'
    export default {
      name: "user-details",
      components: {
        invitationRecord,
        billList,
        expensesRecord,
        fundAccount,
        conversion
      },
      data(){
        return{
          queryData:{},
          imgLoading: false,
          editModal: false,
          tableLoading: false,
          pageSize: 10,
          totalNumber: 0,
          currentPage: 1,
          searchForm: {
            channelId: null,
            channelName: null,
            status: null
          },
          chooseItem: {
            id: "",
            sortWeight: "",
            bannerSource: "",
            bannerUrl: "",
            bannerExplain: "",
            forwardUrl: "",
            status: ""
          },
          // tableData: [],
          // columns: [
          //   {
          //     title: this.$t("channel.tabData.channelId"),
          //     key: "channelId",
          //     align: "center"
          //   },
          //   {
          //     title: this.$t("channel.tabData.channelName"),
          //     key: "channelName",
          //     align: "center",
          //     tooltip: true
          //   },
          //   {
          //     title: this.$t("channel.tabData.registerIp"),
          //     key: "registerIp",
          //     align: "center",
          //     tooltip: true
          //   },
          //   {
          //     title: this.$t("channel.tabData.applyIp"),
          //     key: "applyIp",
          //     align: "center",
          //     tooltip: true
          //   },
          //   {
          //     title: this.$t("channel.tabData.loanIp"),
          //     key: "loanIp",
          //     align: "center",
          //     tooltip: true
          //   },
          //   {
          //     title: this.$t("channel.tabData.status"),
          //     key: "status",
          //     align: "center",
          //     render: (h, params) => {
          //       let data = this.$t("channel.status");
          //       let type = data.filter(v => {
          //         return v.value === params.row.status;
          //       });
          //       let state = type.length > 0 && type[0].desc ? type[0].desc : "";
          //       return h("div", state);
          //     }
          //   },
          //   {
          //     title: this.$t("channel.tabData.modifyTime"),
          //     key: "modifyTime",
          //     align: "center",
          //     render: function(h, params) {
          //       return h(
          //         "span",
          //         formatDate(new Date(this.row.modifyTime), "yyyy-MM-dd  hh:mm:ss")
          //       );
          //     },
          //   },
          //   {
          //     title: this.$t("common.operating"),
          //     key: "action",
          //     width: 120,
          //     align: "center",
          //     render: (h, params) => {
          //       return h("div", [
          //         h('span', {
          //           props: {
          //             type: 'text', size: 'large', icon: 'md-menu'
          //           },
          //           class: 'edit-btn',
          //           style: {
          //             color: "#57a3f3",
          //             marginRight: '5px',
          //             cursor: "pointer"
          //           },
          //           on: {
          //             click: () => {
          //               this.editMessage(params)
          //             }
          //           }
          //         }, this.$t('common.edit')),
          //         h('span', {
          //           props: {type: 'text', size: 'large', icon: 'md-trash'
          //           },
          //           style: {
          //             color: "#57a3f3",
          //             marginRight: '5px',
          //             cursor: "pointer"
          //           },
          //           class: 'delete-btn',
          //           on: {
          //             click: () => {
          //               window.open('http://h5.51fastloan.com/sdk.zip');
          //             }
          //           }
          //         }, this.$t('channel.modal.downLoad'))
          //       ])
          //     }
          //   }
          // ]
        }
      },
      mounted: function () {
        this.getTable();
      },
      methods: {
        getTable() {
          this.queryData = JSON.parse(sessionStorage.getItem("user-details"));
        }
      }
    }
</script>

<style lang="less">
.table{
  border-collapse: collapse;
  width: 100%;
  tr{
    td{
      height: 50px;
      width: 25%;
      text-align: center;
      border: 1px #cccccc solid;
    }
  }
}
</style>
