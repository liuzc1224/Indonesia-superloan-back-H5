<template>
  <Row class="set-message-center-page">
    <i-col span="24">
      <Row>
        <Form ref="searchForm" :model="searchForm" :label-width="100" inline>
          <Row>
            <FormItem :label="$t('userDetail.fundAccounts.createTime')">
              <Row>
                <Col span="11">
                  <DatePicker
                    type="date"
                    ref="createTimeStart"
                    :placeholder="$t('userDetail.timeStart')"
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
                    :placeholder="$t('userDetail.timeEnd')"
                    v-model="searchForm.createTimeEnd"
                  ></DatePicker>
                </Col>
              </Row>
            </FormItem>

            <FormItem :label="$t('userDetail.fundAccounts.type')">
              <Row>
                <Col span="24">
                  <Select
                    clearable
                    v-model="searchForm.accountType"
                    class="search-select-item"
                    :placeholder="$t('userDetail.fundAccounts.prompt.type')"
                  >
                    <Option v-for="(item, i) in $t('userDetail.fundAccounts.types')" :value="item.value" :key="i">{{item.desc}}</Option>
                  </Select>
                </Col>
              </Row>
            </FormItem>

          </Row>
          <FormItem>
            <Button type="primary" @click="search">{{$t('common.search')}}</Button>
            <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>
          </FormItem>
        </Form>
      </Row>

      <Row>
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
      </Row>
    </i-col>
  </Row>
</template>

<script>
  import { account } from "@/api/user";
  import { formatDate } from "@/assets/js/date";
  export default {
    name: "fundAccount",
    data(){
      return{
        imgLoading: false,
        tableLoading: false,
        pageSize: 10,
        totalNumber: 0,
        currentPage: 1,
        searchForm: {
          createTimeStart:null,
          createTimeEnd:null,
          accountType: null,
        },
        tableData: [],
        columns: [
          {
            title: this.$t("userDetail.fundAccounts.id"),
            key: "id",
            align: "center",
            minWidth:150
          },
          {
            title: this.$t("userDetail.fundAccounts.createTime"),
            key: "createTime",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("userDetail.fundAccounts.type"),
            key: "accountType",
            align: "center",
            render: (h, params) => {
              let data = this.$t("userDetail.fundAccounts.types");
              let type = data.filter(v => {
                return v.value === params.row.accountType;
              });
              let state = type.length > 0 && type[0].desc ? type[0].desc : "";
              return h("div", state);
            },
            minWidth:150
          },
          {
            title: this.$t("userDetail.fundAccounts.name"),
            key: "accountName",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("userDetail.fundAccounts.number"),
            key: "accountNumber",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("userDetail.fundAccounts.totalAmount"),
            key: "totalCreditAmount",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("userDetail.fundAccounts.availableCredit"),
            key: "availableCreditAmount",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("userDetail.fundAccounts.billingDate"),
            key: "monthOutAccountDate",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("userDetail.fundAccounts.repaymentDate"),
            key: "monthOutRepaymentDate",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("userDetail.fundAccounts.state"),
            key: "status",
            align: "center",
            render: (h, params) => {
              let data = this.$t("userDetail.fundAccounts.status");
              let type = data.filter(v => {
                return v.value === params.row.status;
              });
              let state = type.length > 0 && type[0].desc ? type[0].desc : "";
              return h("div", state);
            },
            minWidth:150
          },
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
        this.searchForm.createTimeEnd= null;
        this.searchForm.accountType = null;
        this.getTable();
      },
      getTable(){
        let queryData=JSON.parse(sessionStorage.getItem("user-details"));
        let params = {
          userId:queryData['id'],
          createTimeStart: this.searchForm.createTimeStart && formatDate(new Date(this.searchForm.createTimeStart), "yyyy-MM-dd hh:mm:ss"),
          createTimeEnd: this.searchForm.createTimeEnd && formatDate(new Date(this.searchForm.createTimeEnd), "yyyy-MM-dd") + ' 23:59:59',
          accountType: this.searchForm.accountType,
          pageSize: this.pageSize,
          currentPage: this.currentPage,
        };
        this.tableLoading = true;
        account(params).then(res => {
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

