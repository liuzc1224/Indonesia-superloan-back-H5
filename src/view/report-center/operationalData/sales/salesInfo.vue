<template>
  <Row>
    <Row>
      <i-col span="6">
        <Row class="colData">
          <i-col span="24" style="text-align: center;">
            <div style="font-size: 30px;line-height: 80px">
              <p>{{productData && productData['clickDownloadCount'] ? productData['clickDownloadCount'] : 0}}</p>
            </div>
            <p style="line-height: 40px;font-size: 15px">{{$t('operationalData.sales.clickDownload')}}</p>
          </i-col>
        </Row>
      </i-col>
      <i-col span="6">
        <Row class="colData">
          <i-col span="24" style="text-align: center;">
            <div style="font-size: 30px;line-height: 80px">
              <p>{{productData && productData['downloadCount'] ? productData['downloadCount'] : 0}}</p>
            </div>
            <p style="line-height: 40px;font-size: 15px">{{$t('operationalData.sales.userDownloadNumber')}}</p>
          </i-col>
        </Row>
      </i-col>
      <!--        <i-col span="4">-->
      <!--          <Row class="colData">-->
      <!--            <i-col span="24" style="text-align: center;">-->
      <!--              <div style="font-size: 30px;line-height: 80px">-->
      <!--                <p>{{productData && productData['applyCount'] ? productData['applyCount'] : 0}}</p>-->
      <!--              </div>-->
      <!--              <p style="line-height: 40px;font-size: 15px">{{$t('operationalData.sales.application')}}</p>-->
      <!--            </i-col>-->
      <!--          </Row>-->
      <!--        </i-col>-->
      <!--        <i-col span="4">-->
      <!--          <Row class="colData">-->
      <!--            <i-col span="24" style="text-align: center;">-->
      <!--              <div style="font-size: 30px;line-height: 80px">-->
      <!--                <p>{{productData && productData['applyUserCount'] ? productData['applyUserCount'] : 0}}</p>-->
      <!--              </div>-->
      <!--              <p style="line-height: 40px;font-size: 15px">{{$t('operationalData.sales.userApplication')}}</p>-->
      <!--            </i-col>-->
      <!--          </Row>-->
      <!--        </i-col>-->
      <!--        <i-col span="4">-->
      <!--          <Row class="colData">-->
      <!--            <i-col span="24" style="text-align: center;">-->
      <!--              <div style="font-size: 30px;line-height: 80px">-->
      <!--                <p>{{productData && productData['loanCount'] ? productData['loanCount'] : 0}}</p>-->
      <!--              </div>-->
      <!--              <p style="line-height: 40px;font-size: 15px">{{$t('operationalData.sales.loan')}}</p>-->
      <!--            </i-col>-->
      <!--          </Row>-->
      <!--        </i-col>-->
      <!--        <i-col span="4">-->
      <!--          <Row class="colData">-->
      <!--            <i-col span="24" style="text-align: center;">-->
      <!--              <div style="font-size: 30px;line-height: 80px">-->
      <!--                <p>{{productData && productData['loanUserCount'] ? productData['loanUserCount'] : 0}}</p>-->
      <!--              </div>-->
      <!--              <p style="line-height: 40px;font-size: 15px">{{$t('operationalData.sales.userLoan')}}</p>-->
      <!--            </i-col>-->
      <!--          </Row>-->
      <!--        </i-col>-->
      <i-col  span="6">
        <Row class="colData">
          <i-col span="24" style="text-align: center;">
            <div style="font-size: 30px;line-height: 80px">
              <p>{{productData && productData['todayClickDownloadCount'] ? productData['todayClickDownloadCount'] : 0}}</p>
            </div>
            <p style="line-height: 40px;font-size: 15px">{{$t('operationalData.sales.clickDownloadToday')}}</p>
          </i-col>
        </Row>
      </i-col>
      <i-col  span="6" >
        <Row class="colData">
          <i-col span="24" style="text-align: center;">
            <div style="font-size: 30px;line-height: 80px">
              <p>{{productData && productData['todayDownloadCount'] ? productData['todayDownloadCount'] : 0}}</p>
            </div>
            <p style="line-height: 40px;font-size: 15px">{{$t('operationalData.sales.userDownloadNumberToday')}}</p>
          </i-col>
        </Row>
      </i-col>
      <!--        <i-col span="4">-->
      <!--          <Row class="colData">-->
      <!--            <i-col span="24" style="text-align: center;">-->
      <!--              <div style="font-size: 30px;line-height: 80px">-->
      <!--                <p>{{productData && productData['todayApplyCount'] ? productData['todayApplyCount'] : 0}}</p>-->
      <!--              </div>-->
      <!--              <p style="line-height: 40px;font-size: 15px">{{$t('operationalData.sales.applicationToday')}}</p>-->
      <!--            </i-col>-->
      <!--          </Row>-->
      <!--        </i-col>-->
      <!--        <i-col span="4">-->
      <!--          <Row class="colData">-->
      <!--            <i-col span="24" style="text-align: center;">-->
      <!--              <div style="font-size: 30px;line-height: 80px">-->
      <!--                <p>{{productData && productData['todayApplyUserCount'] ? productData['todayApplyUserCount'] : 0}}</p>-->
      <!--              </div>-->
      <!--              <p style="line-height: 40px;font-size: 15px">{{$t('operationalData.sales.userApplicationToday')}}</p>-->
      <!--            </i-col>-->
      <!--          </Row>-->
      <!--        </i-col>-->
      <!--        <i-col span="4">-->
      <!--          <Row class="colData">-->
      <!--            <i-col span="24" style="text-align: center;">-->
      <!--              <div style="font-size: 30px;line-height: 80px">-->
      <!--                <p>{{productData && productData['todayLoanCount'] ? productData['todayLoanCount'] : 0}}</p>-->
      <!--              </div>-->
      <!--              <p style="line-height: 40px;font-size: 15px">{{$t('operationalData.sales.loanToday')}}</p>-->
      <!--            </i-col>-->
      <!--          </Row>-->
      <!--        </i-col>-->
      <!--        <i-col span="4">-->
      <!--          <Row class="colData">-->
      <!--            <i-col span="24" style="text-align: center;">-->
      <!--              <div style="font-size: 30px;line-height: 80px">-->
      <!--                <p>{{productData && productData['todayLoanUserCount'] ? productData['todayLoanUserCount'] : 0}}</p>-->
      <!--              </div>-->
      <!--              <p style="line-height: 40px;font-size: 15px">{{$t('operationalData.sales.userLoanToday')}}</p>-->
      <!--            </i-col>-->
      <!--          </Row>-->
      <!--        </i-col>-->
    </Row>
    <Card style="margin-top: 20px">
      <Form ref="searchForm" :model="searchForm" :label-width="100" inline>
        <Row>
          <FormItem :label="$t('operationalData.sales.date')">
            <Row>
              <i-col span="11">
                <DatePicker
                  type="date"
                  :clearable="false"
                  :placeholder="$t('operationalData.sales.timeStart')"
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
                  :clearable="false"
                  :placeholder="$t('operationalData.sales.timeEnd')"
                  v-model="searchForm.endTime"
                ></DatePicker>
              </i-col>
            </Row>
          </FormItem>
          <FormItem :label="$t('operationalData.sales.promotingMethod')">
            <Row>
              <i-col span="24">
                <Select
                  clearable
                  v-model="searchForm.platformType"
                  class="search-select-item"
                  :placeholder="$t('operationalData.sales.select')"
                  style="width:200px"
                >
                  <Option v-for="(item, i) in $t('operationalData.sales.methods')" :value="item.value" :key="i">{{item.desc}}</Option>
                </Select>
              </i-col>
            </Row>
          </FormItem>
          <FormItem :label="$t('operationalData.sales.productId')">
            <Input v-model="searchForm.productId" :placeholder="$t('operationalData.sales.inputProductId')"></Input>
          </FormItem>
          <FormItem :label="$t('operationalData.sales.productName')">
            <Input v-model="searchForm.productName" :placeholder="$t('operationalData.sales.inputProductName')"></Input>
          </FormItem>
          <FormItem :label="$t('operationalData.sales.companyName')">
            <Input v-model="searchForm.companyName" :placeholder="$t('operationalData.sales.inputCompanyName')"></Input>
          </FormItem>
          <Row>
            <i-col :span="20" :offset="2">
              <Button type="primary" @click="search">{{$t('common.search')}}</Button>
              <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>
              <Button style="margin-left: 30px" :disabled="totalNumber===0" @click="exportData">{{$t('common.export')}}</Button>
            </i-col>

          </Row>
        </Row>
      </Form>
    </Card>
    <Card style="margin-top: 10px">
      <Table border class="person-table" :columns="columns" :data="tableData" :loading="tableLoading" style="margin-top: 10px"/>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;margin-bottom: 2px;">
          <Page
            :total="totalNumber"
            :current="currentPage"
            :page-size-opts="[10, 20, 30, 50]"
            @on-change="changePage"
            @on-page-size-change="pageSizeChange"
            show-elevator show-sizer show-total></Page>
        </div>
      </div>
    </Card>
  </Row>
</template>

<script>
  import { product,productDetail,exportLoanProductSellDetail } from '@/api/reportCenter';
  import { formatDate } from "@/assets/js/date";
  export default {
    name: "salesInfo",
    data(){
      return {
        dayType: 1,
        tableLoading: false,
        pageSize: 10,
        totalNumber: 0,
        currentPage: 1,
        searchForm: {
          startTime: null,
          endTime: null,
          platformType: null,
          productId: null,
          productName: null,
          companyName: null
        },
        productData:null,
        tableData: [],
        columns: [
          {
            title: this.$t('operationalData.sales.dateTime'), key: 'dateStr', align: 'center', tooltip: true, minWidth:150
            // ,fixed: 'left',width:100
          },
          {
            title: this.$t('operationalData.sales.productId'), key: 'productId', align: 'center', tooltip: true, minWidth:150
            // ,fixed: 'left',width:100
          },
          {
            title: this.$t('operationalData.sales.productName'), key: 'productName', align: 'center', minWidth:150
            // ,fixed: 'left',width:100
            // render:(h,params)=>{
            //   let type="";
            //   if(params.row['categoryNameList']){
            //     type=params.row['categoryNameList'].join(",")
            //   }
            //   return h('div',type);
            // }
          },

          {
            title: this.$t('operationalData.sales.companyName'),
            key: 'companyName',
            align: 'center',
            tooltip: true,
            // fixed: 'left',
            minWidth:150
          },
          {
            title: this.$t('operationalData.sales.promotingMethod'),
            key: 'platformType',
            align: 'center',
            tooltip: true,
            // fixed: 'left',
            minWidth:150,
            render:(h,params)=>{
              let data=this.$t('operationalData.sales.methods');
              let type=data.filter(v => {
                return v.value===params.row.platformType;
              });
              let state=(type.length>0 && type[0].desc) ? type[0].desc : "";
              return h('div',state);
            }
          },
          {
            title: this.$t('operationalData.sales.ranking'),
            key: 'rank',
            align: 'center',
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t('operationalData.sales.clickDownloadBtn'),
            align: 'center',
            children: [
              {
                title: this.$t('operationalData.sales.number'), key: 'clickDownCount', align: 'center'
                ,minWidth:150
              },
              {
                title: this.$t('operationalData.sales.register'), key: 'clickDownUserCount', align: 'center'
                ,minWidth:150
              },
              {
                title: this.$t('operationalData.sales.device'), key: 'clickUniqueCodeCount', align: 'center'
                ,minWidth:150
              }
            ]
          }
          // {
          //   title: this.$t('operationalData.sales.downloadPartyA'),
          //   key: 'effectiveDownUserCount',
          //   align: 'center',
          //   tooltip: true,width:150
          // },
          // {
          //   title: this.$t('operationalData.sales.clickRegisterPartyA'),
          //   key: 'clickRegisterUserCount',
          //   align: 'center',
          //   tooltip: true,width:150
          // },
          // {
          //   title: this.$t('operationalData.sales.registerPartyA'),
          //   key: 'registerSuccessUserCount',
          //   align: 'center',
          //   tooltip: true,width:150
          // },
          // {
          //   title: this.$t('operationalData.sales.applicationPartyA'),
          //   key: 'applyUserCount',
          //   align: 'center',
          //   tooltip: true,width:150
          // },
          // {
          //   title: this.$t('operationalData.sales.reviewPartyA'),
          //   key: 'effectiveApplyUserCount',
          //   align: 'center',
          //   tooltip: true,width:150
          // },
          // {
          //   title: this.$t('operationalData.sales.loanPartyA'),
          //   key: 'paymentCount',
          //   align: 'center',
          //   tooltip: true,width:150
          // },
          // {
          //   title: this.$t('operationalData.sales.downloadRate'),
          //   key: 'downRegRate',
          //   align: 'center',
          //   tooltip: true,width:150
          // },
          // {
          //   title: this.$t('operationalData.sales.registrationRate'),
          //   key: 'regApplyRate',
          //   align: 'center',
          //   tooltip: true,width:150
          // },
          // {
          //   title: this.$t('operationalData.sales.applicationRate'),
          //   key: 'applyPaymentRate',
          //   align: 'center',
          //   tooltip: true,width:150
          // },
          // {
          //   title: this.$t('operationalData.sales.downloadLoanRate'),
          //   key: 'downPaymentRate',
          //   align: 'center',
          //   tooltip: true,width:150
          // }
        ],
      }
    },
    mounted(){
      this.searchForm.startTime=formatDate(new Date(), "yyyy-MM-dd");
      this.searchForm.endTime=formatDate(new Date(), "yyyy-MM-dd");
      this.getTable();
    },
    methods: {
      search() {
       this.currentPage=1;
        this.getTable();
      },
      cleanSearch(){
       this.currentPage=1;
        this.searchForm.startTime=formatDate(new Date(), "yyyy-MM-dd");
        this.searchForm.endTime=formatDate(new Date(), "yyyy-MM-dd");
        this.searchForm.platformType = null;
        this.searchForm.productId = null;
        this.searchForm.productName = null;
        this.searchForm.companyName = null;
        this.getTable();
      },
      getTable(){
        let params = {
          startTime:this.searchForm.startTime,
          endTime:this.searchForm.endTime,
          platformType:this.searchForm.platformType,
          productId:this.searchForm.productId,
          productName: this.searchForm.productName,
          companyName: this.searchForm.companyName,

          pageSize: this.pageSize,
          currentPage: this.currentPage,
        };
        if(params.startTime && params.endTime){
          params.endTime=formatDate(new Date(params.endTime), "yyyy-MM-dd")+" 23:59:59";
          params.startTime=formatDate(new Date(params.startTime), "yyyy-MM-dd")+" 00:00:00";
          let start=(new Date(params.startTime)).getTime();
          let end=(new Date(params.endTime)).getTime();
          if( start - end >0 ){
            params.startTime=null;
            params.endTime=null;
          }
        }
        this.tableLoading = true;
        product().then(res => {
          if(res.data.success) {
            if(res.data.data){
              this.productData=res.data.data;
            }
          }else{
            this.$Message.error(res.data.message)
          }
        });
        productDetail(params).then(res => {
          this.tableLoading = false;
          if(res.data.success) {
            if(res.data.data){
              this.tableData = res.data.data;
            }
            if(res.data.page){
              this.currentPage = res.data.page.currentPage;
              this.pageSize = res.data.page.pageSize;
              this.totalNumber = res.data.page.totalNumber;
            }
          }else{
            this.$Message.error(res.data.message)
          }
        });
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
          platformType:this.searchForm.platformType,
          productId:this.searchForm.productId,
          productName: this.searchForm.productName,
          companyName: this.searchForm.companyName,

          // pageSize: this.pageSize,
          // currentPage: this.currentPage,
        };
        if(params.startTime && params.endTime){
          params.endTime=formatDate(new Date(params.endTime), "yyyy-MM-dd")+" 23:59:59";
          params.startTime=formatDate(new Date(params.startTime), "yyyy-MM-dd")+" 00:00:00";
          let start=(new Date(params.startTime)).getTime();
          let end=(new Date(params.endTime)).getTime();
          if( start - end >0 ){
            params.startTime=null;
            params.endTime=null;
          }
        }
        exportLoanProductSellDetail(params);
      },
    }
  }
</script>

<style scoped>
  .colData{
    height: 150px;
    background-color: #57a3f3;
    color: #ffffff;
    text-align: center;
    margin: 5px;
  }
</style>
