<template>
  <Row :gutter="10" class="product-config-page">
    <i-col span="24">
      <Card class="search-card">
        <Form ref="searchForm" :model="searchForm" :label-width="100" inline>
          <Row>
            <FormItem :label="$t('productDraft.tabData.saveTime')">
              <Row>
                <Col span="11">
                  <DatePicker
                    type="date"
                    clearable
                    ref="createTimeStart"
                    :placeholder="$t('productDraft.prompt.timeStart')"
                    v-model="searchForm.createTimeStart"
                    style="width:100%;"
                  ></DatePicker>
                </Col>
                <Col span="2" style="text-align: center">
                  ~
                </Col>
                <Col span="11">
                  <DatePicker
                    type="date"
                    clearable
                    ref="createTimeEnd"
                    :placeholder="$t('productDraft.prompt.timeEnd')"
                    v-model="searchForm.createTimeEnd"
                  ></DatePicker>
                </Col>
              </Row>
            </FormItem>

            <FormItem :label="$t('productDraft.firmName')">
              <Row>
                <Col span="24">
                  <Input
                    v-model="searchForm.company"
                    :placeholder="$t('productDraft.prompt.firmName')"
                  ></Input>
                </Col>
              </Row>
            </FormItem>
            <FormItem :label="$t('productDraft.productName')">
              <Row>
                <Col span="24">
                  <Input v-model="searchForm.productName" :placeholder="$t('productDraft.prompt.productName')"></Input>
                </Col>
              </Row>
            </FormItem>
          </Row>
          <FormItem>
            <Button type="primary" @click="search">{{$t('common.search')}}</Button>
            <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>
          </FormItem>
        </Form>
      </Card>

      <Card>
<!--         <Button class="add-message-btn" type="primary" @click="showModal">{{$t('product.add')}}</Button>-->
        <Table border class="person-table" :columns="columns" :data="tableData" :loading="tableLoading" style="margin-top: 10px"/>

        <product-modal
          class="admin-modal"
          ref="mychild"
          :editModal="editModal"
          :isSortWeight="false"
          :chooseItem="chooseItem"
          v-on:changeModal="changeModal"
          :numberMax="numberMax"
          :isAble="isAble"
          :isNew="isNew"
          :isKsp="isKsp"
          :from="from"
          :isStaging="isStaging"
          v-on:editSuccess="editSuccess"
          v-on:isNewChange="isNewC"
          v-on:isKspChange="isKspC"
          v-on:isStagingChange="isStagingC"
        ></product-modal>

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
    </i-col>

    <Modal v-model="deleteModal" :title="$t('setUpPage.deleteTitle')" :loading="deleteLoading" @on-ok="productDelete" width="300">
      <p>{{$t('setUpPage.deleteTip')}}</p>
    </Modal>

    <Modal :title="$t('product.tabData.icon')" v-model="isUrl" width="360">
      <div class="flex-center">
        <Spin fix v-if="imgLoading"></Spin>
        <img :src="url" alt="" class="img-show " ref="imageShow" style="width:100px;height:100px;display:block;margin:0 auto;">
      </div>
      <div slot="footer">
        <Button type="primary" size="large" @click="iconClose">{{$t('cardManage.sure')}}</Button>
      </div>
    </Modal>
  </Row>
</template>

<script>
  import { formatDate } from "@/assets/js/date";
  import ProductModal from '_c/operation-modal/product.vue'
  import { getProductDraft ,getProductNumberMax ,updateSortWeight,deleteProductDraft} from '@/api/product'
  export default {
    name: "productDraft",
    components: {
      ProductModal
    },
    data(){
      return {
        deleteModal:false,
        deleteLoading:false,
        url:'',
        from:'productDraft',
        isUrl:false,
        imgLoading:false,
        editModal:false,
        tableLoading:false,
        pageSize: 10,
        totalNumber: 0,
        currentPage: 1,
        searchForm: {
          productName: null,
          company: null,
          activityStatus: null,
          status: null,
          createTimeStart:null,
          createTimeEnd:null,
        },
        numberMax:null,
        isAble:null,
        isNew:null,
        isKsp:null,
        isStaging:null,
        chooseItem: {
          id: null,
          productName:null,
          company:null,
          bannerUrl:null,
          loanMoney:null,
          loanDaysMin:null,
          loanDaysMax:null,
          applyDay:null,
          applyDayUnit:null,
          loanDayMoneyRate:null,
          loanDayMoneyRateType:null,
          loanRateType:null,

          googleDate:null,
          forwardUrl:null,
          forwardUrlType:null,
          thirdPartyUrl:null,

          loanProductRequireCount:null,
          loanProductRequires:[],
          loanFlowCount:null,
          loanFlow1:null,
          loanFlow2:null,
          loanFlow3:null,
          loanFlow4:null,
          loanFlow5:null,
          loanProductUpTimeCount:null,
          loanProductUpTimes:[],
          productAdvantage:null,

          loanPeriodUnit:null,
          shelfTime:null,
          obtainedTime:null,
          sortWeight:null,
          isNew:null,
          isKsp:null,
          isStaging:null,
          status:null,
          activityStatus:null,

        },
        tableData: [],
        columns: [
          {
            title: this.$t('productDraft.tabData.appName'), key: 'productName',align: 'center',fixed: 'left',width: 100
          },
          {
            title: this.$t('productDraft.tabData.firm'), key: 'company',align: 'center',fixed: 'left',width: 100
          },
          {
            title: this.$t('productDraft.tabData.icon'), key: 'bannerUrl',align: 'center',
            render:(h,params)=>{
              if(params.row.bannerUrl) {
                return h('div', {
                  props: {},
                  style: {
                    color: '#57a3f3',
                    cursor: "pointer",
                  },
                  on: {
                    click: () => {
                      this.showIcon(params.row.bannerUrl);
                    }
                  }
                }, this.$t('cardManage.check'))
              }
            },
            width: 100
          },
          {
            title: this.$t('productDraft.tabData.max'), key: 'loanMoney',align: 'center',tooltip: true,
            render:(h,params)=>{
              if(params.row['loanMoney']) {
                return h(
                  "p",
                  params.row['loanMoney']+"("+(params.row['monetaryUnit']!=null?this.$t('product.monetaryUnit')[params.row['monetaryUnit']]['desc']:"")+")"
                );
              }
            },
            width: 150
          },
          {
            title: this.$t('productDraft.tabData.loanDays'), key: 'loanDaysMax',align: 'center',width: 100,
            render:(h,params)=>{
              if(params.row['loanDaysMax']!=null && params.row['loanDaysMin']!=null) {
                let data=this.$t('productDraft.unit');
                let type=data.filter(v => {
                  return v.value===params.row['loanPeriodUnit']-0;
                });
                let loanPeriodUnit=(type.length>0 && type[0].desc) ? type[0].desc : "";
                return h(
                  "p",
                  params.row['loanDaysMin']+"-"+params.row['loanDaysMax']+"（"+loanPeriodUnit+"）"
                );
              }
            },
          },
          {
            title: this.$t('productDraft.tabData.interestRate'), key: 'loanDayMoneyRate',align: 'center',width: 100,
            render:(h,params)=>{
              if(params.row['loanDayMoneyRateType']!=null && params.row['loanDayMoneyRate']!=null) {
                let data=this.$t('productDraft.interestRate');
                let type=data.filter(v => {
                  return v.value===params.row['loanDayMoneyRateType'];
                });
                let interestRate=(type.length>0 && type[0].desc) ? type[0].desc : "";
                return h(
                  "p",
                  interestRate+(params.row['loanDayMoneyRate']*100).toFixed(2)+"%("+this.$t('product.rate')[params.row['loanDayMoneyRateType']]['desc']+")"
                );
              }else{
                return '';
              }
            },
          },
          {
            title: this.$t('productDraft.tabData.arrivalTime'), key: 'applyDay',align: 'center',width: 100,
            render:(h,params)=>{
              if(params.row['applyDay']!=null && params.row['applyDayUnit']!=null){
                let data=this.$t('productDraft.processDays');
                let type=data.filter(v => {
                  return v.value===params.row['applyDayUnit']-0;
                });
                let applyDayUnit=(type.length>0 && type[0].desc) ? type[0].desc : "";
                return h('div',
                  params.row['applyDay']+"（"+applyDayUnit+"）"
                );
              }
            },
          },
          {
            title: this.$t('product.tabData.get'), key: 'forwardUrl',align: 'center',tooltip: true,width: 100
          },
          {
            title: this.$t('product.tabData.thirdPartyUrl'), key: 'thirdPartyUrl',align: 'center',tooltip: true,width: 100
          },
          {
            title: this.$t('productDraft.tabData.shelfPeriod'), key: 'shelfTime',align: 'center',tooltip: true,width: 300,
            render:(h,params)=>{
              if(params.row['shelfTime'] && params.row['obtainedTime']) {
                return h(
                  "div",
                  params.row['shelfTime']+"——"+params.row['obtainedTime']
                );
              }
            },
          },
          {
            title: this.$t('productDraft.tabData.shelfTime'), key: 'loanProductUpTimes',align: 'center',width: 120,
            render:(h,params)=>{
              if(params.row['loanProductUpTimes']) {
                let time="";
                params.row['loanProductUpTimes'].forEach(v => {
                  time+=v.startTime.substring(11,16)+"-"+v.endTime.substring(11,16)+`，`
                });
                time=time.substring(0,time.length-1)
                return h(
                  "p",
                  time
                );
              }
            },
          },
          {
            title: this.$t('productDraft.tabData.saveTime'), key: 'createTimeStr',align: 'center',tooltip: true,width: 180
          },
          {
            title: this.$t('productDraft.tabData.displayState'), key: 'status',align: 'center',
            render:(h,params)=>{
              let data=this.$t('productDraft.displayState');
              let type=data.filter(v => {
                return v.value===params.row.status;
              });
              let state=(type.length>0 && type[0].desc) ? type[0].desc : "";
              return h('div',state);
            },
            fixed: "right",
            width: 100
          },
          {
            title: this.$t('productDraft.tabData.activeStatus'), key: 'activityStatus',align: 'center',
            render:(h,params)=>{
              if(params.row['activityStatus']!==null){
                let data=this.$t('productDraft.activeStatus');
                let type=data.filter(v => {
                  return v.value===params.row['activityStatus'];
                });
                let state=(type.length>0 && type[0].desc) ? type[0].desc : "";
                return h('div',state);
              }

            },
            fixed: "right",
            width: 100
          },
          {
            title: this.$t("common.operating"),
            key: "action",
            width: 200,
            align: "center",
            fixed: "right",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      size: "default",
                      // icon: "md-menu"
                    },
                    class: "edit-btn",
                    style: {
                      backgroundColor: 'transparent',
                      color: "#ff9900",
                    },
                    on: {
                      click: () => {
                        this.editMessage(params);
                      }
                    }
                  }, this.$t('common.edit')),
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      size: "default",
                      // icon: "md-close"
                    },
                    class: "edit-btn",
                    style: {
                      backgroundColor: 'transparent',
                      color: "#ed4014",
                    },
                    on: {
                      click: () => {
                        this.deleteModal=true;
                        let data={
                          id:params.row.id
                        };
                        sessionStorage.setItem("delete", JSON.stringify(data));
                        // this.delete(params);
                      }
                    }
                  }, this.$t('common.delete')),
              ])
            }
          }
        ]
      }
    },
    mounted: function () {
      this.getTable();
      let newImg = new Image();
      newImg.src ='';
      newImg.onload=()=>{ // 图片加载成功后把地址给原来的img
        this.url = newImg.src;
        this.imgLoading=false;
      }
    },
    methods:{
      isNewC(e){
        this.isNew=e;
      },
      isKspC(e){
        this.isKsp=e;
      },
      isStagingC(e){
        this.isStaging=e;
      },
      search(){
        this.currentPage=1;
        this.getTable();
      },
      cleanSearch() {
        this.currentPage=1;
        this.pageSize=10;
        this.searchForm.productName='';
        this.searchForm.status='';
        this.searchForm.company='';
        this.searchForm.activityStatus='';
        this.searchForm.createTimeStart=null;
        this.searchForm.createTimeEnd=null;
        this.getTable();
      },
      showModal () {
        // getProductNumberMax().then(res => {
        //   if(res.data.success){
        //     if(res.data.data){
        //       let num=res.data.data;
        //       if(num<0){
        //         num=1
        //       }else{
        //         num=num;
        //       }
        //       let params={
        //         row: {
        //           id: null,
        //           sortWeight:num,
        //           productName:null,
        //           company:null,
        //           bannerUrl:null,
        //           loanMoney:null,
        //           loanDaysMin:null,
        //           loanDaysMax:null,
        //           applyDay:null,
        //           applyDayUnit:null,
        //           loanDayMoneyRate:null,
        //           loanDayMoneyRateType:null,
        //           loanRateType:null,
        //
        //           googleDate:null,
        //           forwardUrl:null,
        //           forwardUrlType:null,
        //           loanProductRequireCount:null,
        //           loanProductRequires:[],
        //           loanFlowCount:null,
        //           loanFlow1:null,
        //           loanFlow2:null,
        //           loanFlow3:null,
        //           loanFlow4:null,
        //           loanFlow5:null,
        //           loanProductUpTimeCount:null,
        //           loanProductUpTimes:[],
        //           productAdvantage:null,
        //
        //           loanPeriodUnit:null,
        //           shelfTime:null,
        //           obtainedTime:null,
        //           isNew:true,
        //           status:null,
        //         }
        //       };
        //       this.modelItem(params);
        //       this.numberMax=num;
        //       this.editModal = true;
        //       this.isAble=true;
        //       this.isNew=true;
        //     }else{
              let params={
                row: {
                  id: null,
                  sortWeight:"",
                  productName:null,
                  company:null,
                  bannerUrl:null,
                  loanMoney:null,
                  loanDaysMin:null,
                  loanDaysMax:null,
                  applyDay:null,
                  applyDayUnit:null,
                  loanDayMoneyRate:null,
                  loanDayMoneyRateType:null,
                  loanRateType:null,

                  googleDate:null,
                  forwardUrl:null,
                  forwardUrlType:null,
                  thirdPartyUrl:null,
                  loanProductRequireCount:null,
                  loanProductRequires:[],
                  loanFlowCount:null,
                  loanFlow1:null,
                  loanFlow2:null,
                  loanFlow3:null,
                  loanFlow4:null,
                  loanFlow5:null,
                  loanProductUpTimeCount:null,
                  loanProductUpTimes:[],
                  productAdvantage:null,

                  loanPeriodUnit:null,
                  shelfTime:null,
                  obtainedTime:null,
                  isNew:true,
                  status:null,
                }
              };
              this.modelItem(params);
              this.numberMax=1;
              this.editModal = true;
              this.isAble=true;
              this.isNew=true;
        //     }
        //   }else{
        //     this.$Message.error(res.data.message)
        //   }
        // });
      },
      changeModal (param) {
        this.editModal = param;
        this.modelItem({'row': {}});
      },
      editMessage(params){
        this.isAble=false;
        // console.log(params)
        // console.log(this.isNew,this.isKsp,this.isStaging)
        params.row.id=null;
        this.$refs.mychild.setNew(params.row.isNew ? params.row.isNew : false);
        this.$refs.mychild.setKsp(params.row.isKsp ? params.row.isKsp : false);
        this.$refs.mychild.setStaging(params.row.isStaging ? params.row.isStaging : false);
        this.$refs.mychild.setTimeBetween(params.row.shelfTime , params.row.obtainedTime);
        getProductNumberMax().then(res => {
          if(res.data.success){
            if(res.data.data){
              this.modelItem(params);
              this.numberMax=res.data.data;
              this.chooseItem.sortWeight=res.data.data;
              this.editModal = true;
            }
          }else{
            this.$Message.error(res.data.message)
          }
        });
      },
      modelItem(params){
        this.chooseItem.id = params.row.id;
        this.chooseItem.sortWeight = params.row.sortWeight;
        this.chooseItem.productName = params.row.productName;
        this.chooseItem.company = params.row.company;
        this.chooseItem.bannerUrl = params.row.bannerUrl;
        this.chooseItem.loanMoney = params.row.loanMoney;
        this.chooseItem.loanDaysMin = params.row.loanDaysMin;
        this.chooseItem.loanDaysMax = params.row.loanDaysMax;
        this.chooseItem.applyDay = params.row.applyDay;
        this.chooseItem.applyDayUnit = params.row.applyDayUnit-0;
        this.chooseItem.loanDayMoneyRate = params.row.loanDayMoneyRate;
        this.chooseItem.loanDayMoneyRateType = params.row.loanDayMoneyRateType-0;
        this.chooseItem.loanRateType = params.row.loanRateType-0;

        this.chooseItem.googleDate = params.row.googleDate;
        this.chooseItem.forwardUrl = params.row.forwardUrl;
        this.chooseItem.forwardUrlType = params.row.forwardUrlType-0;
        this.chooseItem.thirdPartyUrl = params.row.thirdPartyUrl;
        this.chooseItem.loanProductRequireCount = params.row.loanProductRequireCount;
        this.chooseItem.loanProductRequires = params.row.loanProductRequires;
        this.chooseItem.loanFlowCount = params.row.loanFlowCount;

        this.chooseItem.loanProductUpTimeCount = params.row.loanProductUpTimeCount;

        this.chooseItem.loanProductUpTimes=[];
        if(params.row.loanProductUpTimes) {
          let data=JSON.stringify(params.row.loanProductUpTimes);
          JSON.parse(data).forEach(v=>{
            let data=v;
            data.startTime=v.startTime.substring(11,16);
            data.endTime=v.endTime.substring(11,16);
            this.chooseItem.loanProductUpTimes .push(data);
          });
        }else{
          this.chooseItem.loanProductUpTimes=[];
        }

        this.chooseItem.productAdvantage = params.row.productAdvantage;

        this.chooseItem.loanPeriodUnit = params.row.loanPeriodUnit-0;
        this.chooseItem.shelfTime = params.row.shelfTime;
        this.chooseItem.obtainedTime = params.row.obtainedTime;
        this.chooseItem.isNew = params.row.isNew;
        this.chooseItem.status = params.row.status;
        this.chooseItem.activityStatus = params.row.activityStatus;
        if(this.chooseItem.loanDayMoneyRate){
          this.chooseItem.loanDayMoneyRate=(this.chooseItem.loanDayMoneyRate*100).toFixed(2);
        }
      },
      editSuccess (param) {
        this.tableLoading = true;
        this.getTable()
      },
      changePage (params) {
        this.currentPage = params;
        this.getTable();
      },
      pageSizeChange (params) {
        this.pageSize = params;
        this.getTable()
      },
      getTable(){
        let params = {
          createTimeStart:this.searchForm.createTimeStart!==null&&this.searchForm.createTimeStart!=="" ? formatDate(new Date(this.searchForm.createTimeStart), "yyyy-MM-dd hh:mm:ss") : null,
          createTimeEnd:this.searchForm.createTimeEnd!==null&&this.searchForm.createTimeEnd!=="" ? formatDate(new Date(this.searchForm.createTimeEnd), "yyyy-MM-dd hh:mm:ss") : null,


          company: this.searchForm.company,
          activityStatus: this.searchForm.activityStatus,
          productName: this.searchForm.productName,
          status: this.searchForm.status,
          columns : 'status,sort_weight' ,
          orderBy : 'true,false' ,
          pageSize: this.pageSize,
          currentPage: this.currentPage,
        };
        if(params.createTimeEnd && params.createTimeStart){
          params.createTimeEnd=formatDate(new Date(params.createTimeEnd), "yyyy-MM-dd")+" 23:59:59";
          params.createTimeStart=formatDate(new Date(params.createTimeStart), "yyyy-MM-dd")+" 00:00:00";
        }

        let start=(new Date(params.createTimeStart)).getTime();
        let end=(new Date(params.createTimeEnd)).getTime();
        if( start - end >0 ){
          params.createTimeEnd=null;
          params.createTimeStart=null;
        }
        if(params.endObtainedTime && params.startObtainedTime){
          params.endObtainedTime=formatDate(new Date(params.endObtainedTime), "yyyy-MM-dd")+" 23:59:59";
          params.startObtainedTime=formatDate(new Date(params.startObtainedTime), "yyyy-MM-dd")+" 00:00:00";
        }
        let startObtained=(new Date(params.startObtainedTime)).getTime();
        let endObtained=(new Date(params.endObtainedTime)).getTime();
        if( startObtained - endObtained >0 ){
          params.endObtainedTime=null;
          params.startObtainedTime=null;
        }

        this.tableLoading = true;
        getProductDraft(params).then(res => {
          this.tableLoading = false;
          if(res.data.success){
            if( res.data.data && res.data.data.length !==0 ){
              this.tableData = res.data.data;
              this.tableData=this.tableData.filter(v=>{
                return v.sortWeight>0;
              })
            }else{
              this.tableData = []
            }
            this.currentPage = res.data.page.currentPage;
            this.pageSize = res.data.page.pageSize;
            this.totalNumber = res.data.page.totalNumber;
          }else{
            this.$Message.error(res.data.message)
          }
        })
      },
      showIcon(url){
        this.isUrl=true;
        this.imgLoading=true;
        // let newImg = new Image();
        // newImg.src =url;
        // newImg.onload=()=>{ // 图片加载成功后把地址给原来的img
        this.url = url;
        this.imgLoading=false;
        // }
      },
      iconClose(){
        this.url='';
        this.imgLoading=false;
        this.isUrl=false;
      },
      productDelete(){
        this.deleteLoading=true;
        let data=sessionStorage.getItem("delete");
        let params = {
          id:JSON.parse(data).id
        };
        deleteProductDraft(params).then(res => {
          this.deleteLoading = false;
          if (res.data.success) {
            this.$Message.success(this.$t('common.deleteSuccess'));
            this.getTable();
          } else {
            this.$Message.error(res.data.message);
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .product-config-page{
    .search-card{
      margin-bottom: 20px;
    }
  }
</style>
