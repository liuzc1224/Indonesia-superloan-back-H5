<template>
  <Row>
    <i-col :span="24">
      <Card class="search-card">
        <Row style="margin-bottom: 5px">
          <i-col :span="5">
            <h1>{{$t('activityData.inviteFriends.inviteFriends')}}</h1>
          </i-col>
          <i-col :span="19" style="text-align: right">
            <Button size="large" :loading="loading" @click="showModal()">{{$t('activityData.inviteFriends.edit')}}</Button>
          </i-col>
        </Row>
        <hr/>
        <Form ref="searchForm" :model="searchForm" :label-width="100" style="margin-top: 20px" inline>
          <FormItem :label="$t('activityData.inviteFriends.dateTime')">
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
          </FormItem>
        </Form>
      </Card>
      <Card style="margin-top: 10px">
        <Row>
          <i-col :span="24" style="background-color: #cccccc;padding-left: 10px">
            <h1>{{$t('activityData.inviteFriends.buriedPoint')}}</h1>
          </i-col>
        </Row>
        <Row style="margin-top: 10px" :gutter="10">
          <i-col :span="8">
            <table>
              <tr>
                <td>
                  {{$t('activityData.inviteFriends.inviteIconClick')}}
                </td>
                <td>{{buriedPoint['inviteShareIconClickCount'] ? buriedPoint['inviteShareIconClickCount'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.inviteFriends.inviteFriendsClick')}}
                </td>
                <td>{{buriedPoint['inviteShareToFriendClickCount'] ? buriedPoint['inviteShareToFriendClickCount'] : 0}}</td>
              </tr>
              <!--              <tr>-->
              <!--                <td>-->
              <!--                  {{$t('activityData.inviteFriends.inviteIconClickPage')}}-->
              <!--                </td>-->
              <!--                <td>{{buriedPoint['inviteH5ShareToFriendClickCount'] ? buriedPoint['inviteH5ShareToFriendClickCount'] : 0}}</td>-->
              <!--              </tr>-->
              <tr>
                <td>
                  {{$t('activityData.inviteFriends.inviteIconClickPackage')}}
                </td>
                <td>{{buriedPoint['inviteH5RedPackageCount'] ? buriedPoint['inviteH5RedPackageCount'] : 0}}</td>
              </tr>
            </table>
          </i-col>
          <i-col :span="8">
            <table>
              <tr>
                <td>
                  {{$t('activityData.inviteFriends.sweepstakesIconClick')}}
                </td>
                <td>{{buriedPoint['lotteryShareIconCount'] ? buriedPoint['lotteryShareIconCount'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.inviteFriends.sweepstakesFriendsClick')}}
                </td>
                <td>{{buriedPoint['lotteryShareCount'] ? buriedPoint['lotteryShareCount'] : 0}}</td>
              </tr>
            </table>
          </i-col>
          <i-col :span="8">
            <table>
              <tr>
                <td>
                  {{$t('activityData.inviteFriends.faceBook')}}
                </td>
                <td>{{buriedPoint['facebookCount'] ? buriedPoint['facebookCount'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.inviteFriends.twitter')}}
                </td>
                <td>{{buriedPoint['twitterCount'] ? buriedPoint['twitterCount'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.inviteFriends.linkedIn')}}
                </td>
                <td>{{buriedPoint['linkedInCount'] ? buriedPoint['linkedInCount'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.inviteFriends.whatsApp')}}
                </td>
                <td>{{buriedPoint['whatsAppCount'] ? buriedPoint['whatsAppCount'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.inviteFriends.copyLink')}}
                </td>
                <td>{{buriedPoint['copyLinkCount'] ? buriedPoint['copyLinkCount'] : 0}}</td>
              </tr>
            </table>
          </i-col>
        </Row>
        <Row style="margin-top: 20px">
          <i-col :span="24" style="background-color: #cccccc;padding-left: 10px">
            <h1>{{$t('activityData.inviteFriends.pullNew')}}</h1>
          </i-col>
        </Row>
        <Row style="margin-top: 10px" :gutter="10">
          <i-col :span="8">
            <table>
              <tr>
                <td>
                  {{$t('activityData.inviteFriends.shareIt')}}
                </td>
                <td>{{pullNew['sendInviteUserCount'] ? pullNew['sendInviteUserCount'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.inviteFriends.inviteUserCount')}}
                </td>
                <td>{{pullNew['inviteUserCount'] ? pullNew['inviteUserCount'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.inviteFriends.shareItEffective')}}
                </td>
                <td>{{pullNew['invitedUserCount'] ? pullNew['invitedUserCount'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.inviteFriends.effective')}}
                </td>
                <td>{{pullNew['inviteValidUserCount'] ? pullNew['inviteValidUserCount'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.inviteFriends.registered')}}
                </td>
                <td>{{pullNew['inviteRegisterUserCount'] ? pullNew['inviteRegisterUserCount'] : 0}}</td>
              </tr>
            </table>
          </i-col>
        </Row>
        <Row style="margin-top: 10px" :gutter="10">
          <i-col :span="8">
            <table>
              <tr>
                <td>
                  {{$t('activityData.inviteFriends.redEnvelope')}}
                </td>
                <td>{{pullNew['inviteOldUserRedPackageAmount'] ? pullNew['inviteOldUserRedPackageAmount'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.inviteFriends.oldLotteryNumber')}}
                </td>
                <td>{{pullNew['inviteOldUserLotteryTimesCount'] ? pullNew['inviteOldUserLotteryTimesCount'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.inviteFriends.newLotteryNumber')}}
                </td>
                <td>{{pullNew['inviteNewUserLotteryTimesCount'] ? pullNew['inviteNewUserLotteryTimesCount'] : 0}}</td>
              </tr>
            </table>
          </i-col>
        </Row>
      </Card>
      <edit-rule-modal :editModal="editModal" :chooseItem="chooseItem" v-on:changeModal="changeModal" ></edit-rule-modal>
    </i-col>
  </Row>
</template>

<script>
  import { formatDate } from "@/assets/js/date";
  import { activity,inviteData,withdraw } from '@/api/reportCenter'
  import editRuleModal from '_c/report-modal/editRule-modal.vue'
  export default {
    name: "inviteFriends",
    components:{
      editRuleModal
    },
    data(){
      return{
        editModal:false,
        loading:false,
        buriedPoint:[],
        pullNew:[],
        searchForm: {
          startTime:null,
          endTime:null
        },
        chooseItem:{
          id: null,
          min: null,
          middle : null,
          max : null,
        },
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
        this.searchForm.startTime=null;
        this.searchForm.endTime=null;
      },
      showModal(){
        this.loading=true;
        withdraw().then(res => {
          this.loading=false;
          if(res.data.success){
            this.chooseItem.id=res.data.data['id'];
            this.chooseItem.min=res.data.data['min'];
            this.chooseItem.middle=res.data.data['middle'];
            this.chooseItem.max=res.data.data['max'];
            this.editModal=true;
          }else{
            this.$Message.error(res.data.message)
          }
        });
      },
      changeModal (param) {
        this.editModal = param;
      },
      getTable(){
        let params = {
          startTime:this.searchForm.startTime,
          endTime:this.searchForm.endTime,
        };
        if(params.endTime && params.startTime){
          params.endTime=formatDate(new Date(params.endTime), "yyyy-MM-dd")+" 23:59:59";
          params.startTime=formatDate(new Date(params.startTime), "yyyy-MM-dd")+" 00:00:00";
        }

        let start=(new Date(params.startTime)).getTime();
        let end=(new Date(params.endTime)).getTime();
        if( start - end >0 ){
          params.endTime=null;
          params.startTime=null;
        }
        activity(params).then(res => {
          if(res.data.success){
            this.buriedPoint=res.data.data;
          }else{
            this.$Message.error(res.data.message)
          }
        });
        inviteData(params).then(res => {
          if(res.data.success){
            this.pullNew=res.data.data;
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
