<template>
  <Row :gutter="10" class="set-message-center-page">
    <i-col span="24">
      <Row>
        <Form ref="searchForm" :model="searchForm" :label-width="100" inline>
          <Row>
            <FormItem :label="$t('userDetail.billLists.time')">
              <Row>
                <Col span="11">
                  <DatePicker
                    type="date"
                    ref="createTimeStart"
                    :placeholder="$t('userDetail.timeStart')"
                    v-model="searchForm.outAccountDateStart"
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
                    v-model="searchForm.outAccountDateEnd"
                  ></DatePicker>
                </Col>
              </Row>
            </FormItem>

            <FormItem :label="$t('userDetail.billLists.type')">
              <Row>
                <Col span="24">
                  <Select
                    clearable
                    v-model="searchForm.accountType"
                    class="search-select-item"
                    :placeholder="$t('userDetail.billLists.prompt.type')"
                  >
                    <Option v-for="(item, i) in $t('userDetail.billLists.accountType')" :value="item.value" :key="i">{{item.desc}}</Option>
                  </Select>
                </Col>
              </Row>
            </FormItem>
            <FormItem :label="$t('userDetail.billLists.state')">
              <Row>
                <Col span="24">
                  <Select
                    clearable
                    v-model="searchForm.status"
                    class="search-select-item"
                    :placeholder="$t('userDetail.billLists.prompt.state')"
                  >
                    <Option v-for="(item, i) in $t('userDetail.billLists.status')" :value="item.value" :key="i">{{item.desc}}</Option>
                  </Select>
                </Col>
              </Row>
            </FormItem>
            <FormItem :label="$t('userDetail.billLists.accountName')">
              <Input v-model="searchForm.accountName" :placeholder="$t('userDetail.billLists.prompt.accountName')"></Input>
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
  import { bill } from "@/api/user";
  import { formatDate } from "@/assets/js/date";
  export default {
    name: "billList",
    props: ['id'],
    data(){
      return{
        imgLoading: false,
        tableLoading: false,
        pageSize: 10,
        totalNumber: 0,
        currentPage: 1,
        searchForm: {
          outAccountDateStart:null,
          outAccountDateEnd:null,
          accountType: null,
          accountName: null,
          status: null
        },
        tableData: [],
        columns: [
          {
            title: this.$t("userDetail.billLists.id"),
            key: "id",
            align: "center",
            minWidth:150
          },
          {
            title: this.$t("userDetail.billLists.accountName"),
            key: "accountName",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("userDetail.billLists.type"),
            key: "accountType",
            align: "center",
            render: (h, params) => {
              let data = this.$t("userDetail.billLists.accountType");
              let type = data.filter(v => {
                return v.value === params.row.accountType;
              });
              let state = type.length > 0 && type[0].desc ? type[0].desc : "";
              return h("div", state);
            },
            minWidth:150
          },
          {
            title: this.$t("userDetail.billLists.time"),
            key: "outAccountDate",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("userDetail.billLists.repaymentTime"),
            key: "repaymentDate",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("userDetail.billLists.amountDue"),
            key: "outAccountMoney",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("userDetail.billLists.account"),
            key: "lastRepayAccount",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("userDetail.billLists.repaidAmount"),
            key: "repaymentMoney",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("userDetail.billLists.state"),
            key: "status",
            align: "center",
            render: (h, params) => {
              let data = this.$t("userDetail.billLists.status");
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
        this.searchForm.outAccountDateStart = null;
        this.searchForm.outAccountDateEnd=null;
        this.searchForm.accountType = null;
        this.searchForm.accountName = null;
        this.searchForm.status = null;
        this.getTable();
      },
      getTable(){
        let queryData=JSON.parse(sessionStorage.getItem("user-details"));
        let params = {
          userId:queryData['id'],
          outAccountDateStart: this.searchForm.outAccountDateStart && formatDate(new Date(this.searchForm.outAccountDateStart), "yyyy-MM-dd hh:mm:ss"),
          outAccountDateEnd: this.searchForm.outAccountDateEnd && formatDate(new Date(this.searchForm.outAccountDateEnd), "yyyy-MM-dd") + ' 23:59:59',
          accountType: this.searchForm.accountType,
          accountName: this.searchForm.accountName,
          status: this.searchForm.status,
          pageSize: this.pageSize,
          currentPage: this.currentPage,
        };
        this.tableLoading = true;
        bill(params).then(res => {
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

