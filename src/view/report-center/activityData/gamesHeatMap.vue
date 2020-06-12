<template>
  <Row>
    <i-col :span="24">
      <Card class="search-card">
        <Form ref="searchForm" :model="searchForm" :label-width="100" style="margin-top: 20px" inline>
          <FormItem :label="$t('activityData.gameHeatMap.dateTime')">
            <Row>
              <i-col span="11">
                <DatePicker
                  type="date"
                  ref="createTimeStart"
                  :placeholder="$t('common.timeStart')"
                  v-model="searchForm.createTimeStart"
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
                  v-model="searchForm.createTimeEnd"
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
          <Button :class="dayType===1 ? 'primary' : ''" @click="setType(1)" >{{$t('activityData.gameHeatMap.week')}}</Button>
          <Button :class="dayType===2 ? 'primary' : ''" @click="setType(2)" style="margin-left: 30px" >{{$t('activityData.gameHeatMap.month')}}</Button>
        </i-col>
      </Row>
      <Card>
        <Row>
          <i-col :span="24" style="background-color: #cccccc;padding-left: 10px">
            <h1>{{$t('activityData.gameHeatMap.gameHeatMap')}}</h1>
          </i-col>
        </Row>
        <Row style="margin-top: 10px" :gutter="10">
          <i-col :span="12">
            <table>
              <tr v-for="(item, i) in $t('activityData.gameHeatMap.heatMap')" :key="i">
                <td>
                  {{item['desc']}}
                </td>
                <td>{{tableData[item['value']] ? tableData[item['value']] : 0}}</td>
              </tr>
<!--              <tr>-->
<!--                <td>-->
<!--                  {{$t('activityData.gameHeatMap.freeNumber')}}-->
<!--                </td>-->
<!--                <td>{{tableData['gratisGameCount'] ? tableData['gratisGameCount'] : 0}}</td>-->
<!--              </tr>-->
<!--              <tr>-->
<!--                <td>-->
<!--                  {{$t('activityData.gameHeatMap.freeUser')}}-->
<!--                </td>-->
<!--                <td>{{tableData['gratisGameUserCount'] ? tableData['gratisGameUserCount'] : 0}}</td>-->
<!--              </tr>-->
<!--              <tr>-->
<!--                <td>-->
<!--                  {{$t('activityData.gameHeatMap.paidUser')}}-->
<!--                </td>-->
<!--                <td>{{tableData['paidGameCount '] ? tableData['paidGameCount '] : 0}}</td>-->
<!--              </tr>-->
<!--              <tr>-->
<!--                <td>-->
<!--                  {{$t('activityData.gameHeatMap.paidNumber')}}-->
<!--                </td>-->
<!--                <td>{{tableData['paidGameUserCount'] ? tableData['paidGameUserCount'] : 0}}</td>-->
<!--              </tr>-->
            </table>
          </i-col>
          <i-col :span="12">
            <c-chart :conf="chartHeatMap" v-if="chartHeatMap"></c-chart>
          </i-col>
        </Row>
        <Row style="margin-top: 20px">
          <i-col :span="24" style="background-color: #cccccc;padding-left: 10px">
            <h1>{{$t('activityData.gameHeatMap.gameTrendChart')}}</h1>
          </i-col>
        </Row>
        <Row style="margin-top: 10px" :gutter="10">
          <i-col :span="12">
            <table>
              <tr v-for="(item, i) in $t('activityData.gameHeatMap.trend')" :key="i">
                <td>
                  {{item['desc']}}
                </td>
                <td>{{tableData[item['value']] ? tableData[item['value']] : 0}}</td>
              </tr>
<!--              <tr>-->
<!--                <td>-->
<!--                  {{$t('activityData.gameHeatMap.clickBattleUser')}}-->
<!--                </td>-->
<!--                <td>{{tableData['fightClickUserCount'] ? tableData['fightClickUserCount'] : 0}}</td>-->
<!--              </tr>-->
<!--              <tr>-->
<!--                <td>-->
<!--                  {{$t('activityData.gameHeatMap.battleShareNumber')}}-->
<!--                </td>-->
<!--                <td>{{tableData['inviteCount'] ? tableData['inviteCount'] : 0}}</td>-->
<!--              </tr>-->
<!--              <tr>-->
<!--                <td>-->
<!--                  {{$t('activityData.gameHeatMap.battleShareUser')}}-->
<!--                </td>-->
<!--                <td>{{tableData['inviteUserCount'] ? tableData['inviteUserCount'] : 0}}</td>-->
<!--              </tr>-->
<!--              <tr>-->
<!--                <td>-->
<!--                  {{$t('activityData.gameHeatMap.cancelBattleShareNumber')}}-->
<!--                </td>-->
<!--                <td>{{tableData['cancelIviteCount'] ? tableData['cancelIviteCount'] : 0}}</td>-->
<!--              </tr>-->
<!--              <tr>-->
<!--                <td>-->
<!--                  {{$t('activityData.gameHeatMap.cancelBattleShareUser')}}-->
<!--                </td>-->
<!--                <td>{{tableData['cancelIviteUserCount'] ? tableData['cancelIviteUserCount'] : 0}}</td>-->
<!--              </tr>-->
            </table>
          </i-col>
          <i-col :span="12">
            <c-chart :conf="chartTrend" v-if="chartTrend"></c-chart>
          </i-col>
        </Row>
      </Card>
    </i-col>
  </Row>
</template>

<script>
  import CChart from "@/components/charts/commonChart";
  import { formatDate } from "@/assets/js/date";
  import { gameHeatMap } from '@/api/reportCenter'
  export default {
    name: "gamesHeatMap",
    components:{
      CChart
    },
    data(){
      return{
        dayType:1,
        searchForm: {
          createTimeStart:null,
          createTimeEnd:null
        },
        tableData:[],
        chartHeatMap:null,
        chartTrend:null,
      }
    },
    mounted(){
      let data=new Date();
      this.searchForm.createTimeStart=this.sevenDays();
      this.searchForm.createTimeEnd=data;
      this.getData();
    },
    methods:{
      setType(data){
        this.dayType=data;
        if(data===1){
          let data=new Date();
          this.searchForm.createTimeStart=this.sevenDays();
          this.searchForm.createTimeEnd=data;
          this.getData();
        }
        else if(data===2){
          let data=new Date();
          this.searchForm.createTimeStart=this.months();
          this.searchForm.createTimeEnd=data;
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
          createTimeStart:this.searchForm.createTimeStart,
          createTimeEnd:this.searchForm.createTimeEnd,
        };
        if(params.createTimeStart && params.createTimeEnd){
          params.createTimeStart=formatDate(new Date(params.createTimeStart), "yyyy-MM-dd")+" 00:00:00";
          params.createTimeEnd=formatDate(new Date(params.createTimeEnd), "yyyy-MM-dd")+" 23:59:59";
        }else{
          params.createTimeStart=null;
          params.createTimeEnd=null;
        }

        let start=(new Date(params.createTimeStart)).getTime();
        let end=(new Date(params.createTimeEnd)).getTime();
        if( start - end >0 ){
          params.createTimeStart=null;
          params.createTimeEnd=null;
        }
        this.tableLoading = true;
        gameHeatMap(params).then(res => {
          this.tableLoading = false;
          if(res.data.success) {
            if(res.data.data){
              this.tableData = res.data.data['totalVO'];
              let everydayGameStatisticsVOS=res.data.data['everydayGameStatisticsVOS'];
              if(everydayGameStatisticsVOS && everydayGameStatisticsVOS.length>0){
                let heatMap=this.$t('activityData.gameHeatMap.heatMap');
                let xAxisHeatMap=[],typeDataHeatMap=[],seriesHeatMap=[];
                heatMap.forEach(v=>{
                  xAxisHeatMap=[];
                  let tt=v  && v['desc'] ? v['desc'] : null;
                  if(tt){
                    typeDataHeatMap.push(tt);
                    let obj={};
                    let data=[];
                    obj['name']=tt;
                    obj['type']='line';
                    obj['data']=data;
                    everydayGameStatisticsVOS.forEach(item=>{
                      let num=item['gameStatisticsTrendVO'][v['value']] ? item['gameStatisticsTrendVO'][v['value']] : 0;
                      obj['data'].push(num);
                      xAxisHeatMap.push(item['createTimeStr'])
                    });
                    seriesHeatMap.push(obj)
                  }
                });
                this.chartHeatMap={
                  tooltip : {
                    trigger: 'axis'
                  },
                  legend: {
                    data:typeDataHeatMap
                  },
                  calculable : true,
                  xAxis : [
                    {
                      type : 'category',
                      axisLabel: {
                        interval:0,
                        rotate:30
                      },
                      data:xAxisHeatMap
                    }
                  ],
                  yAxis : [
                    {
                      type : 'value'
                    }
                  ],
                  series : seriesHeatMap
                };
                let trend=this.$t('activityData.gameHeatMap.trend');
                let xAxisTrend=[],typeDataTrend=[],seriesTrend=[];
                trend.forEach(v=>{
                  xAxisTrend=[];
                  let tt=v  && v['desc'] ? v['desc'] : null;
                  if(tt){
                    typeDataTrend.push(tt);
                    let obj={};
                    let data=[];
                    obj['name']=tt;
                    obj['type']='line';
                    obj['data']=data;
                    everydayGameStatisticsVOS.forEach(item=>{
                      let num=item['gameStatisticsTrendVO'][v['value']] ? item['gameStatisticsTrendVO'][v['value']] : 0;
                      obj['data'].push(num);
                      xAxisTrend.push(item['createTimeStr'])
                    });
                    seriesTrend.push(obj)
                  }
                });
                this.chartTrend={
                  tooltip : {
                    trigger: 'axis'
                  },
                  legend: {
                    data:typeDataTrend
                  },
                  calculable : true,
                  xAxis : [
                    {
                      type : 'category',
                      axisLabel: {
                        interval:0,
                        rotate:30
                      },
                      data:xAxisTrend
                    }
                  ],
                  yAxis : [
                    {
                      type : 'value'
                    }
                  ],
                  series : seriesTrend
                };
              }
            }
          }else{
            this.$Message.error(res.data.message)
          }
        });
      },
      search(){
       this.currentPage=1;
        let start=(new Date(formatDate(this.searchForm.createTimeStart,"yyyy-MM-dd"))).getTime();
        let end=(new Date(formatDate(this.searchForm.createTimeEnd,"yyyy-MM-dd"))).getTime();
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
        this.searchForm.createTimeStart=this.sevenDays();
        this.searchForm.createTimeEnd=data;
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
