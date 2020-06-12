<template>
  <Row>
    <i-col span="24">
      <Row>
        <Form ref="searchForm" :model="searchForm" :label-width="100" inline>
          <Row>
            <FormItem :label="$t('userDetail.invitationRecords.invitees')">
              <Row>
                <i-col span="24">
                  <Input
                    v-model="searchForm.phoneNumber"
                    :placeholder="$t('userDetail.invitationRecords.prompt.invitees')"
                  ></Input>
                </i-col>
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
import { inviteRecord } from "@/api/user";
import { formatDate } from "@/assets/js/date";
    export default {
      name: "invitationRecord",
      data(){
          return{
            searchForm: {
              phoneNumber:null,
            },
            tableLoading: false,
            pageSize: 10,
            totalNumber: 0,
            currentPage: 1,
            tableData: [],
            columns: [
              {
                title: this.$t("userDetail.invitationRecords.lockTime"),
                key: "createTime",
                align: "center",
                minWidth:150
              },
              {
                title: this.$t("userDetail.invitationRecords.userAccount"),
                key: "phoneNumber",
                align: "center",
                tooltip: true,
                minWidth:150
              },
              {
                title: this.$t("userDetail.invitationRecords.registration"),
                key: "modifyTime",
                align: "center",
                minWidth:150
              },
              {
                title: this.$t("userDetail.invitationRecords.redEnvelope"),
                key: "amount",
                align: "center",
                render:(h,params)=>{
                  let data=params.row.amount ? params.row.amount+"RP" : "";
                  return h('div',data);
                },
                minWidth:150
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
          this.searchForm.phoneNumber = null;
          this.getTable();
        },
        getTable(){
          let userData= JSON.parse(sessionStorage.getItem("user-details"));
          let params = {
            referrerId:userData['id'],
            phoneNumber:this.searchForm.phoneNumber,

            pageSize: this.pageSize,
            currentPage: this.currentPage
          };
          this.tableLoading = true;
          inviteRecord(params).then(res => {
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
