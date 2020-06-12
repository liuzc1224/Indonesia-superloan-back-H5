<template>
  <Row>
    <i-col :span="24">
      <Card class="search-card">
        <Form ref="searchForm" :model="searchForm" :label-width="100" style="margin-top: 20px" inline>
          <FormItem :label="$t('activityData.activityHeatMap.dateTime')">
            <Row>
              <i-col span="11">
                <DatePicker
                  type="date"
                  ref="startTime"
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
                  ref="searchForm"
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
      <Row style="margin-top: 20px;margin-bottom: 20px">
        <i-col :span="24">
          <Button :class="dayType===1 ? 'primary' : ''" @click="setType(1)" >{{$t('activityData.activityHeatMap.week')}}</Button>
          <Button :class="dayType===2 ? 'primary' : ''" @click="setType(2)" style="margin-left: 30px" >{{$t('activityData.activityHeatMap.month')}}</Button>
        </i-col>
      </Row>
      <Card>
        <Row>
          <i-col :span="24" style="background-color: #cccccc;padding-left: 10px">
            <h1>{{$t('activityData.activityHeatMap.lotteryHeatMap')}}</h1>
          </i-col>
        </Row>
        <Row style="margin-top: 10px" :gutter="10">
          <i-col :span="12">
            <table>
              <tr>
                <td>
                  {{$t('activityData.activityHeatMap.luckyDraw')}}
                </td>
                <td>{{tableData['lotteryTimes'] ? tableData['lotteryTimes'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.activityHeatMap.free')}}
                </td>
                <td>{{tableData['freeLotteryTimes'] ? tableData['freeLotteryTimes'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.activityHeatMap.paid')}}
                </td>
                <td>{{tableData['costLotteryTimes'] ? tableData['costLotteryTimes'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.activityHeatMap.integral')}}
                </td>
                <td>{{tableData['costIntegrals'] ? tableData['costIntegrals'] : 0}}</td>
              </tr>
            </table>
          </i-col>
          <i-col :span="12">
            <c-chart :conf="chartLottery" v-if="chartLottery"></c-chart>
          </i-col>
        </Row>
        <Row style="margin-top: 20px">
          <i-col :span="24" style="background-color: #cccccc;padding-left: 10px">
            <h1>{{$t('activityData.activityHeatMap.winningTrendChart')}}</h1>
          </i-col>
        </Row>
        <Row style="margin-top: 10px" :gutter="10">
          <i-col :span="12">
            <table>
              <tr>
                <td>
                  {{$t('activityData.activityHeatMap.integralTotal')}}
                </td>
                <td>{{tableData['lotteriedLotteryIntegrals'] ? tableData['lotteriedLotteryIntegrals'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.activityHeatMap.GameCurrency')}}
                </td>
                <td>{{tableData['lotteriedLotteryCoins'] ? tableData['lotteriedLotteryCoins'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.activityHeatMap.lotteryOpportunity')}}
                </td>
                <td>{{tableData['lotteriedLotteryTimes'] ? tableData['lotteriedLotteryTimes'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.activityHeatMap.otherTypes')}}
                </td>
                <td>{{tableData['lotteriedOtherTimes'] ? tableData['lotteriedOtherTimes'] : 0}}</td>
              </tr>
            </table>
          </i-col>
          <i-col :span="12">
            <c-chart :conf="chartWinning" v-if="chartWinning"></c-chart>
          </i-col>
        </Row>
      </Card>
    </i-col>
  </Row>
</template>

<script>
  import CChart from "@/components/charts/commonChart";
  import { formatDate } from "@/assets/js/date";
  import { lotteryHeat,lotteryDayHeat } from '@/api/reportCenter'
    export default {
      name: "activityHeatMap",
      components:{
        CChart
      },
      data(){
        return{
          dayType:1,
          searchForm: {
            startTime:null,
            endTime:null
          },
          tableData:[],
          chartLottery:null,
          chartWinning:null,
        }
      },
      mounted(){
        let data=new Date();
        this.searchForm.startTime=this.sevenDays();
        this.searchForm.endTime=data;
        this.getData();
      },
      methods:{
        setType(data){
          this.dayType=data;
          if(data===1){
            let data=new Date();
            this.searchForm.startTime=this.sevenDays();
            this.searchForm.endTime=data;
            this.getData();
          }
          else if(data===2){
            let data=new Date();
            this.searchForm.startTime=this.months();
            this.searchForm.endTime=data;
            this.getData();
          }
        },
        sevenDays(){
          let date1 = new Date();
          let time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
          let date2 = new Date(date1);
          date2.setDate(date1.getDate()-7);
          let time2 = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
          return formatDate(new Date(time2),"yyyy-MM-dd");
        },
        months(){
          let date1 = new Date();
          let year=date1.getFullYear();
          let month=date1.getMonth();
          if(month===0){
            year=year-1;
            month=12;
          }
          let time1=year+"-"+month+"-"+date1.getDate();
          return formatDate(new Date(time1),"yyyy-MM-dd");
        },
        getData(){
          let params = {
            startTime:this.searchForm.startTime,
            endTime:this.searchForm.endTime,
          };
          if(params.startTime && params.endTime){
            params.startTime=formatDate(new Date(params.startTime), "yyyy-MM-dd")+" 00:00:00";
            params.endTime=formatDate(new Date(params.endTime), "yyyy-MM-dd")+" 23:59:59";
          }else{
            params.startTime=null;
            params.endTime=null;
          }

          let start=(new Date(params.startTime)).getTime();
          let end=(new Date(params.endTime)).getTime();
          if( start - end >0 ){
            params.startTime=null;
            params.endTime=null;
          }
          this.tableLoading = true;
          lotteryHeat(params).then(res => {
            this.tableLoading = false;
            if(res.data.success) {
              if(res.data.data){
                this.tableData = res.data.data;
              }
            }else{
              this.$Message.error(res.data.message)
            }
          });
          lotteryDayHeat(params).then(res => {
            this.tableLoading = false;
            if(res.data.success) {
              if(res.data.data){
                let lotteryData = res.data.data.filter(v=>{
                  return v['type']<=4;
                });
                if(lotteryData && lotteryData.length>0){
                  let xAxis=[],typeData=[],series=[];

                  lotteryData.forEach(v=>{
                    xAxis=[];
                    let value=this.$t('activityData.activityHeatMap.data').filter(name=>{
                      return name['value']===v['type'];
                    });
                    let tt=value && value[0] && value[0]['desc'] ? value[0]['desc'] : null;
                    if(tt){
                      typeData.push(tt);
                      let obj={};
                      let data=[];
                      obj['name']=tt;
                      obj['type']='line';
                      obj['data']=data;
                      v['list'].forEach(item=>{
                        obj['data'].push(item['count']);
                        xAxis.push(item['date'])
                      });
                      series.push(obj)
                    }
                  });
                  this.chartLottery={
                    tooltip : {
                      trigger: 'axis'
                    },
                    legend: {
                      data:typeData
                    },
                    calculable : true,
                    xAxis : [
                      {
                        type : 'category',
                        data : xAxis
                      }
                    ],
                    yAxis : [
                      {
                        type : 'value'
                      }
                    ],
                    series : series
                  };
                }
                let winningData = res.data.data.filter(v=>{
                  return v['type']>4;
                });
                if(winningData){
                  let xAxis=[],typeData=[],series=[];

                  winningData.forEach(v=>{
                    xAxis=[];
                    let value=this.$t('activityData.activityHeatMap.data').filter(name=>{
                      return name['value']===v['type'];
                    });
                    let tt=value && value[0] && value[0]['desc'] ? value[0]['desc'] : null;
                    if(tt){
                      typeData.push(tt);
                      let obj={};
                      let data=[];
                      obj['name']=tt;
                      obj['type']='line';
                      obj['data']=data;
                      v['list'].forEach(item=>{
                        obj['data'].push(item['count']);
                        xAxis.push(item['date'])
                      });
                      series.push(obj)
                    }
                  });
                  this.chartWinning={
                    tooltip : {
                      trigger: 'axis'
                    },
                    legend: {
                      data:typeData
                    },
                    calculable : true,
                    xAxis : [
                      {
                        type : 'category',
                        data : xAxis
                      }
                    ],
                    yAxis : [
                      {
                        type : 'value'
                      }
                    ],
                    series : series
                  }
                }
              }
            }else{
              this.$Message.error(res.data.message)
            }
          });
        },
        search(){
         this.currentPage=1;
          let start=(new Date(formatDate(this.searchForm.startTime,"yyyy-MM-dd"))).getTime();
          let end=(new Date(formatDate(this.searchForm.endTime,"yyyy-MM-dd"))).getTime();
          if((new Date(formatDate(new Date(),"yyyy-MM-dd"))).getTime()===end && (new Date(this.sevenDays())).getTime()===start){
            this.dayType=1;
          }
          else if((new Date(formatDate(new Date(),"yyyy-MM-dd"))).getTime()===end && (new Date(this.months())).getTime()===start){
            this.dayType=2;
          }
          else {
            this.dayType=null;
          }
          this.getData();
        },
        cleanSearch(){
         this.currentPage=1;
          this.dayType=1;
          let data=new Date();
          this.searchForm.startTime=this.sevenDays();
          this.searchForm.endTime=data;
          this.searchForm.userType=null;
          this.getData();
        }
      }
    }
</script>

<style scoped>
  .primary{
    background-color: #2d8cf0;
    color: #ffffff;
  }
  table{
    border-collapse: collapse;
    width: 100%;
  }
  tr{
    width: 100%;
  }
  td{
    border: 1px #cccccc solid;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  tr td:last-child{
    width: 40%;
  }
</style>
