<template>
  <Row>
    <i-col span="24">
      <Card class="search-card">
        <Form ref="searchForm" :model="searchForm" :label-width="100" inline>
          <Row>
            <FormItem :label="$t('platformData.accountingData.date')">
              <Row>
                <i-col span="11">
                  <DatePicker
                    type="date"
                    clearable
                    ref="createTimeStart"
                    :placeholder="$t('platformData.accountingData.timeStart')"
                    v-model="searchForm.createTimeStart"
                    style="width:100%;"
                  ></DatePicker>
                </i-col>
                <i-col span="2" style="text-align: center">
                  ~
                </i-col>
                <i-col span="11">
                  <DatePicker
                    clearable
                    type="date"
                    ref="createTimeEnd"
                    :placeholder="$t('platformData.accountingData.timeEnd')"
                    v-model="searchForm.createTimeEnd"
                  ></DatePicker>
                </i-col>
              </Row>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="search">{{$t('common.search')}}</Button>
              <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>
            </FormItem>
          </Row>
        </Form>
      </Card>
      <Row style="margin-top: 20px;margin-bottom: 20px">
        <i-col :span="24">
          <Button :class="dayType===1 ? 'primary' : ''" @click="setType(1)" >{{$t('platformData.accountingData.week')}}</Button>
          <Button :class="dayType===2 ? 'primary' : ''" @click="setType(2)" style="margin-left: 30px" >{{$t('platformData.accountingData.month')}}</Button>
        </i-col>
      </Row>
      <Card>
        <Row :gutter="20" style="margin-bottom: 20px">
          <i-col :span="24" style="margin-bottom: 20px">
            <h1>{{$t('platformData.accountingData.expenditureAccount')}}</h1>
            <hr/>
          </i-col>
          <i-col :span="16">
            <c-chart :conf="expenditure" v-if="expenditure"></c-chart>
          </i-col>
          <i-col :span="8">
            <table>
              <tr v-for="(item,index) in expenditureDataTotal" :key="index">
                <td>{{item['factorName']}}</td>
                <td>{{item['amount']}}</td>
              </tr>
              <tr>
                <td>{{$t('platformData.accountingData.grandTotal')}}</td>
                <td>{{expenditureData && expenditureData['totalAmount'] ? expenditureData['totalAmount'] : 0}}</td>
              </tr>
            </table>
          </i-col>
        </Row>
        <Row :gutter="20" style="margin-bottom: 20px">
          <i-col :span="24" style="margin-bottom: 20px">
            <h1>{{$t('platformData.accountingData.incomeAccount')}}</h1>
            <hr/>
          </i-col>
          <i-col :span="16">
            <c-chart :conf="income" v-if="income"></c-chart>
          </i-col>
          <i-col :span="8">
            <table>
              <tr v-for="(item,index) in totalPaymentsTypeStasticsVOS" :key="index">
                <td>{{item['factorName']}}</td>
                <td>{{item['amount']}}</td>
              </tr>
              <tr>
                <td>{{$t('platformData.accountingData.grandTotal')}}</td>
                <td>{{incomeData && incomeData['totalAmount'] ? incomeData['totalAmount'] : 0}}</td>
              </tr>
            </table>
          </i-col>
        </Row>
        <Row :gutter="20" style="margin-bottom: 20px">
          <i-col :span="24" style="margin-bottom: 20px">
            <h1>{{$t('platformData.accountingData.userVirtualBill')}}</h1>
            <hr/>
          </i-col>
          <i-col :span="14">
            <c-chart :conf="userVirtualBillChart" v-if="userVirtualBillChart"></c-chart>
          </i-col>
          <i-col :span="10">
            <table>
              <tr>
                <td>{{$t('platformData.accountingData.alreadyPosted')}}</td>
                <td>{{virtualbillData && virtualbillData['totalOutAccountCount'] ? virtualbillData['totalOutAccountCount'] : 0}}</td>
              </tr>
              <tr>
                <td>{{$t('platformData.accountingData.repaymentNumber')}}</td>
                <td>{{virtualbillData && virtualbillData['totalRepaymentCount'] ? virtualbillData['totalRepaymentCount'] : 0}}</td>
              </tr>
              <tr>
                <td>{{$t('platformData.accountingData.settleNumber')}}</td>
                <td>{{virtualbillData && virtualbillData['totalSettleCount'] ? virtualbillData['totalSettleCount'] : 0}}</td>
              </tr>
            </table>
          </i-col>
        </Row>
        <Row :gutter="20">
          <i-col :span="24" style="margin-bottom: 20px">
            <h1>{{$t('platformData.accountingData.userVirtualCredit')}}</h1>
            <hr/>
          </i-col>
          <i-col :span="14">
            <c-chart :conf="userVirtualCreditChart" v-if="userVirtualCreditChart"></c-chart>
          </i-col>
          <i-col :span="10">
            <table>
              <tr>
                <td>{{$t('platformData.accountingData.repaymentWillingness')}}</td>
                <td>{{virtualbillData && virtualbillData['totalRepaymentWill'] ? virtualbillData['totalRepaymentWill'] : 0}}</td>
              </tr>
              <tr>
                <td>{{$t('platformData.accountingData.settleWillingness')}}</td>
                <td>{{virtualbillData && virtualbillData['totalSettleWill'] ? virtualbillData['totalSettleWill'] : 0}}</td>
              </tr>
              <tr>
                <td>{{$t('platformData.accountingData.normalRate')}}</td>
                <td>{{virtualbillData && virtualbillData['totalNormalSettleRate'] ? virtualbillData['totalNormalSettleRate'] : 0}}</td>
              </tr>
              <tr>
                <td>{{$t('platformData.accountingData.overdueRate')}}</td>
                <td>{{virtualbillData && virtualbillData['totalOverdueSettleRate'] ? virtualbillData['totalOverdueSettleRate'] : 0}}</td>
              </tr>
            </table>
          </i-col>
        </Row>
      </Card>
    </i-col>
  </Row>
</template>

<script>
  import CChart from "@/components/charts/commonChart";
  import { payments,virtualbill } from '@/api/reportCenter'
  import { formatDate } from "@/assets/js/date";
    export default {
      name: "accountingData",
      components:{
        CChart
      },
      data(){
        return{
          dayType: 1,
          expenditure: null,
          expenditureData: null,
          incomeData: null,
          income: null,
          searchForm: {
            createTimeStart: null,
            createTimeEnd: null,
          },
          virtualbillData:null,
          totalPaymentsTypeStasticsVOS: null,
          expenditureDataTotal: null,
          userVirtualCreditChart:null,
          userVirtualBillChart:null,
        }
      },
      mounted(){
        let data=new Date();
        this.searchForm.createTimeStart=this.sevenDays();
        this.searchForm.createTimeEnd=data;
        this.getData();
      },
      methods:{
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
          this.getData();
        },
        getData(){
          if(this.searchForm.createTimeStart && this.searchForm.createTimeEnd) {
            let start=formatDate(new Date(this.searchForm.createTimeStart),"yyyy-MM-dd");
            let end=formatDate(new Date(this.searchForm.createTimeEnd),"yyyy-MM-dd");
            if (new Date(start).getTime() <= new Date(end).getTime()) {
              this.getPayment();
              this.getVirtualbill();
            }
          }
        },
        getPayment(){
          let start=formatDate(new Date(this.searchForm.createTimeStart),"yyyy-MM-dd");
          let end=formatDate(new Date(this.searchForm.createTimeEnd),"yyyy-MM-dd");
          let data={
            createTimeStart : start + " 00:00:00",
            createTimeEnd : end+" 23:59:59",
            paymentType : 1
          };
          payments(data).then(res => {
            this.tableLoading = false;
            if (res.data.success) {
              if (res.data.data) {
                this.expenditureData=res.data.data;
                this.expenditureDataTotal=res.data.data && res.data.data['totalPaymentsTypeStasticsVOS'] ? res.data.data['totalPaymentsTypeStasticsVOS'] : null;
                let totalPaymentsTypeStasticsVOS=this.expenditureData['totalPaymentsTypeStasticsVOS'];
                let typeData=[];
                if(totalPaymentsTypeStasticsVOS){
                  totalPaymentsTypeStasticsVOS.map(v=>{
                    typeData.push(v['factorName'])
                  })
                }
                let paymentsTypeStasticsEveryDayVOS=res.data.data['paymentsTypeStasticsEveryDayVOS'];
                paymentsTypeStasticsEveryDayVOS=paymentsTypeStasticsEveryDayVOS.sort(this.compare('date'));
                if(paymentsTypeStasticsEveryDayVOS){
                  let series=[];
                  typeData.forEach(type=>{
                    let obj={};
                    let data=[];
                    obj['name']=type;
                    obj['type']='line';
                    obj['data']=data;
                    paymentsTypeStasticsEveryDayVOS.forEach(list=>{
                      let value=list['pmsPmentLogVOS'].filter(v=>{
                        return v['factorName']===type;
                      });
                      let tt=value && value[0] && value[0]['amount'] ? value[0]['amount'] : 0;
                      obj['data'].push(tt);
                    });
                    series.push(obj);
                  });
                  let xAxis=[];
                  paymentsTypeStasticsEveryDayVOS.map(v=>{
                    xAxis.push(v['dateStr']);
                  });
                  this.expenditure={
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
                        type : 'value',
                      }
                    ],
                    series : series,
                    grid: {
                      left: 200
                    }
                  }
                }
              }
            } else {
              this.$Message.error(res.data.message)
            }
          });
          let params={
            createTimeStart : start + " 00:00:00",
            createTimeEnd : end+" 23:59:59",
            paymentType : 0
          };
          payments(params).then(res => {
            if (res.data.success) {
              if (res.data.data) {
                this.incomeData=res.data.data;
                this.totalPaymentsTypeStasticsVOS= this.incomeData && this.incomeData['totalPaymentsTypeStasticsVOS'] ? this.incomeData['totalPaymentsTypeStasticsVOS'] : null;
                let totalPaymentsTypeStasticsVOS=this.incomeData['totalPaymentsTypeStasticsVOS'];
                let typeData=[];
                if(totalPaymentsTypeStasticsVOS){
                  totalPaymentsTypeStasticsVOS.map(v=>{
                    typeData.push(v['factorName'])
                  })
                }
                let paymentsTypeStasticsEveryDayVOS=this.incomeData['paymentsTypeStasticsEveryDayVOS'];
                paymentsTypeStasticsEveryDayVOS=paymentsTypeStasticsEveryDayVOS.sort(this.compare('date'));
                if(paymentsTypeStasticsEveryDayVOS){
                  let series=[];
                  typeData.forEach(type=>{
                    let obj={};
                    let data=[];
                    obj['name']=type;
                    obj['type']='line';
                    obj['data']=data;
                    paymentsTypeStasticsEveryDayVOS.forEach(list=>{
                      let value=list['pmsPmentLogVOS'].filter(v=>{
                        return v['factorName']===type;
                      });
                      let tt=value && value[0] && value[0]['amount'] ? value[0]['amount'] : 0;
                      obj['data'].push(tt);
                    });
                    series.push(obj);
                  });
                  let xAxis=[];
                  paymentsTypeStasticsEveryDayVOS.map(v=>{
                    xAxis.push(v['dateStr']);
                  });
                  this.income={
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
                    series : series,
                    grid: {
                      left: 200
                    }
                  }

                }
              }
            } else {
              this.$Message.error(res.data.message)
            }
          });
        },
        getVirtualbill(){
          let start=formatDate(new Date(this.searchForm.createTimeStart),"yyyy-MM-dd");
          let end=formatDate(new Date(this.searchForm.createTimeEnd),"yyyy-MM-dd");
          let data={
            createTimeStart : start + " 00:00:00",
            createTimeEnd : end+" 23:59:59",
          };
          virtualbill(data).then(res => {
            if (res.data.success) {
              if (res.data.data) {
                this.virtualbillData=res.data.data;
                let everyDayVOS=this.virtualbillData['everyDayVOS'];
                let normalSettleRate=[],outAccountCount=[],overdueSettleRate=[],repaymentCount=[],repaymentWill=[],settleCount=[],settleWill=[],xAxis=[];
                if(everyDayVOS){
                  everyDayVOS.forEach(v=>{
                    xAxis.push(v['dateStr']);
                    normalSettleRate.push(v['normalSettleRate']);
                    outAccountCount.push(v['outAccountCount']);
                    overdueSettleRate.push(v['overdueSettleRate']);
                    repaymentCount.push(v['repaymentCount']);
                    repaymentWill.push(v['repaymentWill']);
                    settleCount.push(v['settleCount']);
                    settleWill.push(v['settleWill']);
                  });
                  this.userVirtualBillChart={
                    tooltip: {
                      trigger: 'axis'
                    },
                    legend: {
                      data:[this.$t("platformData.accountingData.alreadyPosted"),this.$t("platformData.accountingData.repaymentNumber"),this.$t("platformData.accountingData.settleNumber")]
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
                        name: this.$t('platformData.accountingData.alreadyPosted'),
                        type: 'line',
                        data: outAccountCount
                      },
                      {
                        name: this.$t('platformData.accountingData.repaymentNumber'),
                        type: 'line',
                        data: repaymentCount
                      },
                      {
                        name: this.$t('platformData.accountingData.settleNumber'),
                        type: 'line',
                        data: settleCount
                      }
                    ]
                  };
                  this.userVirtualCreditChart={
                    tooltip: {
                      trigger: 'axis'
                    },
                    legend: {
                      data:[this.$t("platformData.accountingData.repaymentWillingness"),this.$t("platformData.accountingData.settleWillingness"),this.$t("platformData.accountingData.normalRate"),this.$t("platformData.accountingData.overdueRate")]
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
                        name: this.$t('platformData.accountingData.repaymentWillingness'),
                        type: 'line',
                        data: repaymentWill
                      },
                      {
                        name: this.$t('platformData.accountingData.settleWillingness'),
                        type: 'line',
                        data: settleWill
                      },
                      {
                        name: this.$t('platformData.accountingData.normalRate'),
                        type: 'line',
                        data: normalSettleRate
                      },
                      {
                        name: this.$t('platformData.accountingData.overdueRate'),
                        type: 'line',
                        data: overdueSettleRate
                      }
                    ]
                  };
                }

              }
            } else {
              this.$Message.error(res.data.message)
            }
          });
        },
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
        compare(property){
          return function(a,b){
            let value1 = new Date(a[property]).getTime();
            let value2 = new Date(b[property]).getTime();
            return value1 - value2;
          }
        },
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
    width: 50%;
    border: 1px #cccccc solid;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
</style>
