<template>
  <Row>
    <i-col :span="24">
      <Card class="search-card">
        <Form ref="searchForm" :model="searchForm" :label-width="100" style="margin-top: 20px" inline>
          <FormItem :label="$t('activityData.inviteFriendsTwo.dateTime')">
            <Row>
              <i-col span="11">
                <DatePicker
                  type="date"
                  ref="createTimeStart"
                  :placeholder="$t('common.timeStart')"
                  v-model="searchForm.startTime"
                  style="width:100%;"
                ></DatePicker>
              </i-col>
              <i-col span="2" style="text-align: center">
                ~
              </i-col>
              <i-col span="11">
                <DatePicker
                  type="date"
                  ref="createTimeEnd"
                  :placeholder="$t('common.timeEnd')"
                  v-model="searchForm.endTime"
                ></DatePicker>
              </i-col>
            </Row>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="search">{{$t('common.search')}}</Button>
            <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>
            <Button style="margin-left: 30px" :disabled="totalNumber===0" @click="exportData">{{$t('common.export')}}</Button>
          </FormItem>
        </Form>
      </Card>
      <Card style="margin-top: 10px">
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
  import { formatDate } from "@/assets/js/date";
  import { inviteDataTwo , inviteExport} from '@/api/reportCenter'
  import editRuleModal from '_c/report-modal/editRule-modal.vue'
  export default {
    name: "inviteFriends",
    components:{
      editRuleModal
    },
    data(){
      return{
        pageSize: 10,
        totalNumber: 0,
        currentPage: 1,
        tableLoading: false,
        searchForm: {
          startTime: this.sevenDays(),
          endTime: formatDate(new Date(), "yyyy-MM-dd"),
          tooltip: true,
        },
        tableData: [],
        columns: [
          {
            title: this.$t("activityData.inviteFriendsTwo.dateTime"),
            key: "date",
            align: "center",
            width: 100,
            fixed: 'left'
          },
          {
            title: this.$t("activityData.inviteFriendsTwo.shareIt"),
            key: "shareUserCount",
            align: "center",
            width: 150,
            fixed: 'left'
          },
          {
            title: this.$t("activityData.inviteFriendsTwo.total"),
            align: "center",
            children:[
              {
                title: this.$t("activityData.inviteFriendsTwo.shareRegister"),
                key: "totalShareRegisterUserCount",
                align: "center",
                width: 150,
              },{
                title: this.$t("activityData.inviteFriendsTwo.clickDownloadButton"),
                key: "totalClickDownButtonUserCount",
                align: "center",
                width: 150,
              },{
                title: this.$t("activityData.inviteFriendsTwo.clickDownloadButtonFrequency"),
                key: "totalClickDownButtonCount",
                align: "center",
                width: 150,
              }
            ]
          },
          {
            title: this.$t("activityData.inviteFriendsTwo.sameDayRegistrationFee"),
            key: "currentInviteRegisterFee",
            align: "center",
            width: 150,
          },
          {
            title: this.$t("activityData.inviteFriendsTwo.game"),
            align: "center",
            children:[
              {
                title: this.$t("activityData.inviteFriendsTwo.shareRegister"),
                key: "gameShareRegisterUserCount",
                align: "center",
                width: 150,
              },{
                title: this.$t("activityData.inviteFriendsTwo.clickDownloadButton"),
                key: "gameClickDownButtonUserCount",
                align: "center",
                width: 150,
              },{
                title: this.$t("activityData.inviteFriendsTwo.clickDownloadButtonFrequency"),
                key: "gameClickDownButtonCount",
                align: "center",
                width: 150,
              }
            ]
          },
          {
            title: this.$t("activityData.inviteFriendsTwo.lottery"),
            align: "center",
            children:[
              {
                title: this.$t("activityData.inviteFriendsTwo.shareRegister"),
                key: "lotteryShareRegisterUserCount",
                align: "center",
                width: 150,
              },{
                title: this.$t("activityData.inviteFriendsTwo.clickDownloadButton"),
                key: "lotteryClickDownButtonUserCount",
                align: "center",
                width: 150,
              },{
                title: this.$t("activityData.inviteFriendsTwo.clickDownloadButtonFrequency"),
                key: "lotteryClickDownButtonCount",
                align: "center",
                width: 150,
              }
            ]
          },
          {
            title: this.$t("activityData.inviteFriendsTwo.loanDetailsPage"),
            align: "center",
            children:[
              {
                title: this.$t("activityData.inviteFriendsTwo.shareRegister"),
                key: "detailShareRegisterUserCount",
                align: "center",
                width: 150,
              },{
                title: this.$t("activityData.inviteFriendsTwo.clickDownloadButton"),
                key: "detailClickDownButtonUserCount",
                align: "center",
                width: 150,
              },{
                title: this.$t("activityData.inviteFriendsTwo.clickDownloadButtonFrequency"),
                key: "detailClickDownButtonCount",
                align: "center",
                width: 150,
              }
            ]
          },
          {
            title: this.$t("activityData.inviteFriendsTwo.personalCenterInviteFriends"),
            align: "center",
            children:[
              {
                title: this.$t("activityData.inviteFriendsTwo.shareRegister"),
                key: "centerShareRegisterUserCount",
                align: "center",
                width: 150,
              },{
                title: this.$t("activityData.inviteFriendsTwo.clickDownloadButton"),
                key: "centerClickDownButtonUserCount",
                align: "center",
                width: 150,
              },{
                title: this.$t("activityData.inviteFriendsTwo.clickDownloadButtonFrequency"),
                key: "centerClickDownButtonCount",
                align: "center",
                width: 150,
              }
            ]
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
        this.searchForm.startTime=this.sevenDays();
        this.searchForm.endTime=formatDate(new Date(), "yyyy-MM-dd");
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
      exportData(){
        let params = {
          startTime:this.searchForm.startTime,
          endTime:this.searchForm.endTime,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        };
        if(params.endTime && params.startTime){
          params.endTime=formatDate(new Date(params.endTime), "yyyy-MM-dd")+" 23:59:59";
          params.startTime=formatDate(new Date(params.startTime), "yyyy-MM-dd")+" 00:00:00";
        }

        let start=(new Date(params.startTime)).getTime();
        let end=(new Date(params.endTime)).getTime();
        if( start - end >0 ){
          return;
        }
        inviteExport(params);
      },
      sevenDays(){
        let date1 = new Date();
        let time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
        let date2 = new Date(date1);
        date2.setDate(date1.getDate()-7);
        let time2 = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
        return formatDate(new Date(time2),"yyyy-MM-dd");
      },
      getTable(){
        let params = {
          startTime:this.searchForm.startTime,
          endTime:this.searchForm.endTime,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        };
        if(params.endTime && params.startTime){
          params.endTime=formatDate(new Date(params.endTime), "yyyy-MM-dd")+" 23:59:59";
          params.startTime=formatDate(new Date(params.startTime), "yyyy-MM-dd")+" 00:00:00";
        }

        let start=(new Date(params.startTime)).getTime();
        let end=(new Date(params.endTime)).getTime();
        if( start - end >0 ){
          return;
        }
        inviteDataTwo(params).then(res => {
          if(res.data.success){
            if( res.data.data && res.data.data.length !==0 ){
              this.tableData = res.data.data;
              this.currentPage = res.data.page.currentPage;
              this.pageSize = res.data.page.pageSize;
              this.totalNumber = res.data.page.totalNumber;
            }else{
              this.tableData = []
            }
          }else{
            this.$Message.error(res.data.message)
          }
        });
      }
    }
  }
</script>

<style scoped>
  table,tr{
    width: 100%;
  }
  table{
    border-collapse: collapse;
  }
  td{
    border: 1px #cccccc solid;
    height: 50px;
    text-align: center;
  }
  tr td:last-child{
    width: 40%;
  }
</style>
