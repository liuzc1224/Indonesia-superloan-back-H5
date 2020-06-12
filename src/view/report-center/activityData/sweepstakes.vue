<template>
  <Row>
    <i-col :span="24">
      <Card class="search-card">
        <Row style="margin-bottom: 5px">
          <i-col :span="5">
            <h1>{{$t('activityData.sweepstakes.sweepstakes')}}</h1>
          </i-col>
          <i-col :span="19" style="text-align: right">
            <Button size="large" @click="activityHeatMap()">{{$t('activityData.sweepstakes.activityHeatMap')}}</Button>
          </i-col>
        </Row>
        <hr/>
        <Form ref="searchForm" :model="searchForm" :label-width="100" style="margin-top: 20px" inline>
          <FormItem :label="$t('activityData.sweepstakes.dateTime')">
            <DatePicker
              type="date"
              ref="createTimeEnd"
              :placeholder="$t('activityData.sweepstakes.dateTime')"
              v-model="searchForm.endTime"
            ></DatePicker>
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
            <h1>{{$t('activityData.sweepstakes.lotteryStatistics')}}</h1>
          </i-col>
        </Row>
        <Row style="margin-top: 10px" :gutter="10">
          <i-col :span="12">
            <table>
              <tr>
                <td>
                  {{$t('activityData.sweepstakes.luckyDraw')}}
                </td>
                <td>{{dataInfo['lotteryTimesCount'] ? dataInfo['lotteryTimesCount'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.sweepstakes.lotteryUsers')}}
                </td>
                <td>{{dataInfo['lotteryUserCount'] ? dataInfo['lotteryUserCount'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.sweepstakes.free')}}
                </td>
                <td>{{dataInfo['lotteryByTimesCount'] ? dataInfo['lotteryByTimesCount'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.sweepstakes.paid')}}
                </td>
                <td>{{dataInfo['lotteryByIntegralCount'] ? dataInfo['lotteryByIntegralCount'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.sweepstakes.integral')}}
                </td>
                <td>{{dataInfo['lotteryIntegrals'] ? dataInfo['lotteryIntegrals'] : 0}}</td>
              </tr>
            </table>
          </i-col>
          <i-col :span="12">
            <table>
              <tr>
                <td>
                  {{$t('activityData.sweepstakes.remainingDraws')}}
                </td>
                <td>{{dataInfo['remainsLotteryTimes'] ? dataInfo['remainsLotteryTimes'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.sweepstakes.unusedUsers')}}
                </td>
                <td>{{dataInfo['remainsLotteryUserCount'] ? dataInfo['remainsLotteryUserCount'] : 0}}</td>
              </tr>
            </table>
          </i-col>
        </Row>
        <Row style="margin-top: 20px">
          <i-col :span="24" style="background-color: #cccccc;padding-left: 10px">
            <h1>{{$t('activityData.sweepstakes.eventPrizeGift')}}</h1>
          </i-col>
        </Row>
        <Row style="margin-top: 10px">
          <i-col :span="12">
            <table>
              <tr>
                <td>
                  {{$t('activityData.sweepstakes.integralTotal')}}
                </td>
                <td>{{dataInfo['amountForLotteryByIntegral'] ? dataInfo['amountForLotteryByIntegral'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.sweepstakes.GameCurrency')}}
                </td>
                <td>{{dataInfo['coinsForLottery'] ? dataInfo['coinsForLottery'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.sweepstakes.lotteryOpportunity')}}
                </td>
                <td>{{dataInfo['lotteryTimesForLottery'] ? dataInfo['lotteryTimesForLottery'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.sweepstakes.otherTypes')}}
                </td>
                <td>{{dataInfo['otherForLottery'] ? dataInfo['otherForLottery'] : 0}}</td>
              </tr>
            </table>
          </i-col>
        </Row>
      </Card>
    </i-col>
  </Row>
</template>

<script>
  import { formatDate } from "@/assets/js/date";
  import { lotteryData } from '@/api/reportCenter'
    export default {
      name: "sweepstakes",
      data(){
        return{
          dataInfo:[],
          searchForm: {
            endTime:null
          }
        }
      },
      mounted(){
        this.searchForm.endTime=formatDate(new Date(), "yyyy-MM-dd");
        this.getTable();
      },
      methods:{
        search(){
          this.currentPage=1;
          this.getTable();
        },
        cleanSearch(){
          this.currentPage=1;
          this.searchForm.endTime=formatDate(new Date(), "yyyy-MM-dd")
          this.getTable();
        },
        activityHeatMap(){
          this.$router.push({
            name:'activityHeatMap'
          })
        },
        getTable(){
          let params = {
            endTime:this.searchForm.endTime ? this.searchForm.endTime : null
          };
          if(params.endTime){
            params.endTime=formatDate(new Date(params.endTime), "yyyy-MM-dd")+" 23:59:59";
          }
          this.tableLoading = true;
          lotteryData(params).then(res => {
            this.tableLoading = false;
            if(res.data.success){
              this.dataInfo=res.data.data;
            }else{
              this.$Message.error(res.data.message)
            }
          })
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
