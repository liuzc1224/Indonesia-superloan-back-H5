<template>
  <Row>
    <Card class="search-card">
      <Row :gutter="10">
        <i-col span="8">
          <Row class="dataTitle">
            <i-col span="8">
              <Icon type="md-person-add"  class="icon" />
            </i-col>
            <i-col span="16" style="text-align: center;">
              <div style="font-size: 30px;line-height: 80px">
                <p>{{registration}}</p>
              </div>
              <p style="line-height: 50px">{{$t("platformData.userData.register")}}</p>
            </i-col>
          </Row>

        </i-col>
        <i-col  span="8">
          <Row class="dataTitle">
            <i-col span="8">
              <Icon type="md-person-add"  class="icon" />
            </i-col>
            <i-col span="16" style="text-align: center;">
              <div style="font-size: 30px;line-height: 80px">
                <p>{{registrationToday}}</p>
              </div>
              <p style="line-height: 50px">{{$t("platformData.userData.registerToday")}}</p>
            </i-col>
          </Row>
        </i-col >
        <i-col  span="8">
          <Row class="dataTitle">
            <i-col span="8">
              <Icon type="md-person-add"  class="icon" />
            </i-col>
            <i-col span="16" style="text-align: center;">
              <div style="font-size: 30px;line-height: 80px">
                <p>{{todayLogin}}</p>
              </div>
              <p style="line-height: 50px">{{$t("platformData.userData.loginToday")}}</p>
            </i-col>
          </Row>
        </i-col >
        <!--        <i-col  span="6">-->
        <!--          <Row class="dataTitle">-->
        <!--            <i-col span="8">-->
        <!--              <Icon type="md-person-add"  class="icon" />-->
        <!--            </i-col>-->
        <!--            <i-col span="16" style="text-align: center;">-->
        <!--              <div style="font-size: 30px;line-height: 80px">-->
        <!--                <p>0</p>-->
        <!--              </div>-->
        <!--              <p style="line-height: 50px">{{$t("platformData.userData.downToday")}}</p>-->
        <!--            </i-col>-->
        <!--          </Row>-->
        <!--        </i-col >-->
      </Row>
      <br/>
      <Row>
        <p style="color: #cccccc">{{$t("platformData.userData.tip")}}</p>
      </Row>
      <br/>
      <Row :gutter="20">
        <i-col :span="12">
          <Row>
            <i-col :span="24">
              <h1>{{$t("platformData.userData.registerWeek")}}</h1>
              <hr/>
            </i-col>
            <i-col :span="24">
              <c-chart :conf="registerWeek" v-if="registerWeekData && registerWeekData.length>0"></c-chart>
            </i-col>
          </Row>

        </i-col>
        <i-col :span="12">
          <Row>
            <i-col :span="24">
              <h1>{{$t("platformData.userData.registerMonth")}}</h1>
              <hr/>
            </i-col>
            <i-col :span="24">
              <c-chart :conf="registerMonth" v-if="registerMonthData && registerMonthData.length>0"></c-chart>
            </i-col>
          </Row>
        </i-col>
        <i-col :span="12">
          <Row style="margin-top: 20px">
            <i-col :span="24">
              <h1>{{$t("platformData.userData.appNewWeek")}}</h1>
              <hr/>
            </i-col>
            <i-col :span="24">
              <c-chart :conf="appNewWeek" v-if="appNewWeekData && appNewWeekData.length>0"></c-chart>
            </i-col>
          </Row>
        </i-col>
        <i-col :span="12">
          <Row style="margin-top: 20px">
            <i-col :span="24">
              <h1>{{$t("platformData.userData.appWeek")}}</h1>
              <hr/>
            </i-col>
            <i-col :span="24">
              <c-chart :conf="appWeek" v-if="appWeekData && appWeekData.length>0"></c-chart>
            </i-col>
          </Row>
        </i-col>
      </Row>
    </Card>
  </Row>
</template>

<script>
  import CChart from "@/components/charts/commonChart";
  import { appstartup,newdevice,registration,countdaysin,todaylogin } from '@/api/reportCenter'
  export default {
    name: "userData",
    components:{
      CChart
    },
    data(){
      return{
        registration:null,
        registrationToday:null,
        todayLogin:null,
        registerWeek:null,
        registerWeekData:null,
        registerMonth:null,
        registerMonthData:null,
        appNewWeek:null,
        appNewWeekData:null,
        appWeek:null,
        appWeekData:null,
      }
    },
    mounted(){
      this.appstartupData();
      this.newdeviceData();
      this.registrationData();
      this.countdaysinData();
      this.todayloginData();
    },
    methods:{
      appstartupData(){
        let params={
          days : 7
        };
        appstartup(params).then(res => {
          if(res.data.success) {
            if(res.data.data){
              this.appWeekData=res.data.data;
              let xAxis=[],yAxis=[];
              this.appWeekData.forEach(v=>{
                xAxis.push(v['date']);
                yAxis.push(v['count']);
              });
              this.appWeek={
                tooltip : {
                  trigger: 'axis'
                },
                calculable : true,
                xAxis : [
                  {
                    type : 'category',
                    data:xAxis
                  }
                ],
                yAxis : [
                  {
                    type : 'value',
                  }
                ],
                series : [
                  {
                    name: this.$t('platformData.userData.appWeek'),
                    type: 'line',
                    areaStyle: {
                      normal: {
                        color: '#3FA7DC'
                      }
                    },
                    data: yAxis
                  }
                ]
              };
            }
          }else{
            this.$Message.error(res.data.message)
          }
        });
      },
      newdeviceData(){
        let params={
          days : 7
        };
        newdevice(params).then(res => {
          if(res.data.success) {
            if (res.data.data) {
              this.appNewWeekData = res.data.data;
              let xAxis = [], yAxis = [];
              this.appNewWeekData.forEach(v => {
                xAxis.push(v['date']);
                yAxis.push(v['count']);
              });
              this.appNewWeek = {
                tooltip: {
                  trigger: 'axis'
                },
                calculable: true,
                xAxis: [
                  {
                    type: 'category',
                    data: xAxis
                  }
                ],
                yAxis: [
                  {
                    type: 'value',
                  }
                ],
                series: [
                  {
                    name: this.$t('platformData.userData.appNewWeek'),
                    type: 'line',
                    areaStyle: {
                      normal: {
                        color: '#3FA7DC'
                      }
                    },
                    data: yAxis
                  }
                ]
              };
            }
          }
        });
      },
      registrationData(){
        let params={
          type : 0
        };
        registration(params).then(res => {
          if(res.data.success) {
            this.registration=res.data.data ? res.data.data : 0;
          }else{
            this.$Message.error(res.data.message)
          }
        });
        let data={
          type : 1
        };
        registration(data).then(res => {
          if(res.data.success) {
            this.registrationToday=res.data.data ? res.data.data : 0;
          }else{
            this.$Message.error(res.data.message)
          }
        });
      },
      countdaysinData(){
        let params={
          day : 7
        };
        countdaysin(params).then(res => {
          if(res.data.success) {
            if (res.data.data) {
              this.registerWeekData = res.data.data;
              let xAxis = [], yAxis = [];
              this.registerWeekData.forEach(v => {
                xAxis.push(v['date']);
                yAxis.push(v['count']);
              });
              this.registerWeek = {
                tooltip: {
                  trigger: 'axis'
                },
                calculable: true,
                xAxis: [
                  {
                    type: 'category',
                    data: xAxis
                  }
                ],
                yAxis: [
                  {
                    type: 'value',
                  }
                ],
                series: [
                  {
                    name: this.$t('platformData.userData.registerWeek'),
                    type: 'line',
                    data: yAxis
                  }
                ]
              };
            }
          }
        });
        let data={
          day : 30
        };
        countdaysin(data).then(res => {
          if(res.data.success) {
            if (res.data.data) {
              this.registerMonthData = res.data.data;
              let xAxis = [], yAxis = [];
              this.registerMonthData.forEach(v => {
                xAxis.push(v['date']);
                yAxis.push(v['count']);
              });
              this.registerMonth = {
                tooltip: {
                  trigger: 'axis'
                },
                calculable: true,
                xAxis: [
                  {
                    type: 'category',
                    data: xAxis
                  }
                ],
                yAxis: [
                  {
                    type: 'value',
                  }
                ],
                series: [
                  {
                    name: this.$t('platformData.userData.registerMonth'),
                    type: 'line',
                    data: yAxis
                  }
                ]
              };
            }
          }
        });
      },
      todayloginData(){
        todaylogin().then(res => {
          if(res.data.success) {
            this.todayLogin=res.data.data ? res.data.data : 0;
          }else{
            this.$Message.error(res.data.message)
          }
        });
      }
    }
  }
</script>

<style scoped>
  .dataTitle{
    height: 150px;
    color: #ffffff;
    background-color: #3399ff;
    font-size: 20px;
    line-height: 150px;
  }
  .icon{
    padding-left: 10px;
    line-height: 100px;
    font-size: 100px;
    text-align: center;
  }
</style>
