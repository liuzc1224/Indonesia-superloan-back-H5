<template>
  <Row style="min-width: 900px">
    <i-col span="24">
      <Card class="search-card">
        <Form ref="searchForm" :model="searchForm" :label-width="80" inline>
          <Row>
            <Row>
              <FormItem :label="$t('platformData.buriedPoint.date')">
                <Row>
                  <i-col span="11">
                    <DatePicker
                      type="date"
                      :clearable="false"
                      ref="startTime"
                      :placeholder="$t('platformData.buriedPoint.timeStart')"
                      v-model="searchForm.startTime"
                      style="width:100%;"
                    ></DatePicker>
                  </i-col>
                  <i-col span="2" style="text-align: center">~</i-col>
                  <i-col span="11">
                    <DatePicker
                      :clearable="false"
                      type="date"
                      ref="endTime"
                      :placeholder="$t('platformData.buriedPoint.timeEnd')"
                      v-model="searchForm.endTime"
                    ></DatePicker>
                  </i-col>
                </Row>
              </FormItem>
              <FormItem :label="$t('platformData.buriedPoint.type')">
                <Row>
                  <i-col span="24">
                    <Select
                      v-model="searchForm.userType"
                      class="search-select-item"
                      :placeholder="$t('platformData.buriedPoint.inputType')"
                      style="width:200px"
                    >
                      <Option v-for="(item, i) in $t('platformData.buriedPoint.userType')" :value="item.value" :key="i">{{item.desc}}</Option>
                    </Select>
                  </i-col>
                </Row>
              </FormItem>
            </Row>
            <FormItem>
              <Button type="primary" @click="search">{{$t('common.search')}}</Button>
              <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>
              <Button style="margin-left: 30px" @click="exportPlatformData">{{$t('platformData.buriedPoint.export')}}</Button>
            </FormItem>
          </Row>
        </Form>
      </Card>
      <Row style="margin-top: 20px;margin-bottom: 20px">
        <i-col :span="24">
          <Button :class="dayType===1 ? 'primary' : ''" @click="setType(1)" >{{$t('platformData.buriedPoint.week')}}</Button>
          <Button :class="dayType===2 ? 'primary' : ''" @click="setType(2)" style="margin-left: 30px" >{{$t('platformData.buriedPoint.month')}}</Button>
        </i-col>
      </Row>
      <Card>
        <Row :gutter="20" style="position: relative">
          <i-col :span="14">
            <table>
              <tr>
                <td>{{$t("platformData.buriedPoint.view")}}</td>
                <td>{{$t("platformData.buriedPoint.userNumber")}}</td>
                <td>{{$t("platformData.buriedPoint.frequency")}}</td>
                <td>{{$t("platformData.buriedPoint.averageClick")}}</td>
              </tr>
              <tr v-for="(item,index) in buriedPointData" class="tr" :class="activeIndex===index ? 'activeTd' : ''" @click="setActive(index)">
                <td>{{item['desc']}}</td>
                <td>
                  <span v-if="item['userCount']!=='facebookLoginClickUserCount' && item['userCount']!=='googleLoginClickUserCount'">
                    {{tableData[item['userCount']] ? tableData[item['userCount']] : 0}}
                  </span>
                  <span v-else>
                    --
                  </span>
                </td>
                <td>
                  <span v-if="item['clickCount']!=='finishFacebookRegisterClickCount' && item['clickCount']!=='finishGoogleRegisterClickCount'">
                    {{tableData[item['clickCount']] ? tableData[item['clickCount']] : 0}}
                  </span>
                  <span v-else>
                    --
                  </span>
                </td>
                <td>
                  <span v-if="item['averageCount']!=='facebookLoginClickAverageCount' && item['averageCount']!=='finishFacebookRegisterAverageCount' && item['averageCount']!=='googleLoginClickAverageCount' && item['averageCount']!=='finishGoogleRegisterAverageCount'">
                    {{tableData[item['averageCount']] ? tableData[item['averageCount']].toFixed(2) : 0}}
                  </span>
                  <span v-else>
                    --
                  </span>
                </td>
              </tr>
            </table>
          </i-col>
          <i-col :span="10">
            <Row>
              <i-col :span="22" :offset="1">
                <div style="width: 100%" :style="{'height':top+'px'}"></div>
                <div style="width: 100%;">
                  <c-chart :conf="chartsConf" v-if="chartsConf"></c-chart>
                </div>
              </i-col>
            </Row>
          </i-col>
        </Row>
      </Card>
    </i-col>
  </Row>
</template>

<script>
  import CChart from "@/components/charts/commonChart";
  import { platform,platformList,exportPlatform } from '@/api/reportCenter'
  import { formatDate } from "@/assets/js/date";
  export default {
    name: "buriedPoint",
    components:{
      CChart
    },
    data(){
      return{
        dayType: 1,
        buriedPointData:[],
        searchForm: {
          startTime: null,
          endTime: null,
          userType: null
        },
        chartsConf:null,
        top:0,
        activeIndex:0,
        tableData:{}
      }
    },
    mounted(){
      let data=new Date();
      this.searchForm.startTime=this.sevenDays();
      this.searchForm.endTime=data;
      this.buriedPointData=this.$t('platformData.buriedPoint.data');
      this.getData();
      this.getCharts();
    },
    methods:{
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
      },
      getData(){
        if(this.searchForm.userType===2){
          this.buriedPointData=this.$t('platformData.buriedPoint.data').slice(1);
        }else{
          this.buriedPointData=this.$t('platformData.buriedPoint.data');
        }
        let params = {
          startTime:this.searchForm.startTime,
          endTime:this.searchForm.endTime,
          userType:this.searchForm.userType ? this.searchForm.userType : 0,
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
        platform(params).then(res => {
          this.tableLoading = false;
          if(res.data.success) {
            if(res.data.data){
              this.tableData = res.data.data;
            }
          }else{
            this.$Message.error(res.data.message)
          }
        });
        this.getCharts();
      },
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
      setActive(data){
        this.top=data<2 ? 0 : 50*(data-2);
        this.activeIndex=data;
        this.getCharts();
      },
      getCharts(){
        let eventName=this.$t('platformData.buriedPoint.data')[this.activeIndex]['eventName'];
        let params={
          userType:this.searchForm.userType ? this.searchForm.userType : 0,
          eventName:eventName,
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
        platformList(params).then(res => {
          this.tableLoading = false;
          if(res.data.success) {
            if(res.data.data){
              let userNumber=[],frequency=[],averageClick=[],tableData =[],seriesData=[];
              tableData=res.data.data;
              let xAxis=[];
              tableData.forEach(v=>{
                xAxis.push(v['dateStr']);
                userNumber.push(v['userCount']);
                frequency.push(v['clickCount']);
                averageClick.push(v['averageCount'].toFixed(2));
              });
              if(eventName==='facebook_login_click' || eventName==='google_login_click'){
                seriesData=[
                  {
                    name:this.$t("platformData.buriedPoint.frequency"),
                    type:'line',
                    data:frequency
                  },
                ];
              }else if(eventName==='googleLoginAdd' || eventName==='facebookLoginAdd'){
                seriesData=[
                  {
                    name:this.$t("platformData.buriedPoint.userNumber"),
                    type:'line',
                    data:userNumber
                  }
                ];
              }else{
                seriesData=[
                  {
                    name:this.$t("platformData.buriedPoint.userNumber"),
                    type:'line',
                    data:userNumber
                  },
                  {
                    name:this.$t("platformData.buriedPoint.frequency"),
                    type:'line',
                    data:frequency
                  },
                  {
                    name:this.$t("platformData.buriedPoint.averageClick"),
                    type:'line',
                    data:averageClick
                  }
                ];
              }
              this.chartsConf={
                tooltip : {
                  trigger: 'axis'
                },
                legend: {
                  data:[this.$t("platformData.buriedPoint.userNumber"),this.$t("platformData.buriedPoint.frequency"),this.$t("platformData.buriedPoint.averageClick")]
                },
                calculable : true,
                xAxis : [
                  {
                    type : 'category',
                    axisLabel: {
                      interval:0,
                      rotate:30
                    },
                    data:xAxis
                    // boundaryGap : false,
                    // data : [this.$t("platformData.buriedPoint.userNumber"),this.$t("platformData.buriedPoint.frequency"),this.$t("platformData.buriedPoint.averageClick")]
                  }
                ],
                yAxis : [
                  {
                    type : 'value',
                  }
                ],
                series : seriesData
              };
            }else{
              this.chartsConf=null;
            }
          }else{
            this.$Message.error(res.data.message)
          }
        });
      },
      exportPlatformData(){
        let params = {
          startTime:this.searchForm.startTime,
          endTime:this.searchForm.endTime,
          userType:this.searchForm.userType ? this.searchForm.userType : 0,
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
        exportPlatform(params);
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
  td{
    border: 1px #cccccc solid;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .tr td:first-child:hover{
    cursor: pointer;
    background: #57a3f3;
    color: #ffffff;
  }
  .activeTd td:first-child{
    background: #57a3f3;
    color: #ffffff;
  }
</style>
