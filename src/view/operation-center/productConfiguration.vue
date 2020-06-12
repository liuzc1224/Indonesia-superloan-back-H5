<template>
  <Row :gutter="10" class="product-config-page">
    <i-col span="24">
      <Card class="search-card">
        <Form ref="searchForm" :model="searchForm" :label-width="100" inline>
          <Row>
            <FormItem :label="$t('product.tabData.ShelfTime')">
              <Row>
                <Col span="11">
                  <DatePicker
                    type="date"
                    clearable
                    ref="createTimeStart"
                    :placeholder="$t('product.prompt.timeStart')"
                    v-model="searchForm.startShelfTime"
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
                    :placeholder="$t('product.prompt.timeEnd')"
                    v-model="searchForm.endShelfTime"
                  ></DatePicker>
                </Col>
              </Row>
            </FormItem>


            <FormItem :label="$t('product.tabData.ObtainedTime')">
              <Row>
                <Col span="11">
                  <DatePicker
                    type="date"
                    clearable
                    ref="createTimeStart"
                    :placeholder="$t('product.prompt.timeStart')"
                    v-model="searchForm.startObtainedTime"
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
                    :placeholder="$t('product.prompt.timeEnd')"
                    v-model="searchForm.endObtainedTime"
                  ></DatePicker>
                </Col>
              </Row>
            </FormItem>


            <FormItem :label="$t('product.tabData.activeStatus')">
              <Row>
                <Col span="24">
                  <Select
                    v-model="searchForm.activityStatus"
                    class="search-select-item"
                    :placeholder="$t('product.prompt.activeStatus')"
                    style="width:200px"
                    clearable
                  >
                    <Option v-for="(item, i) in $t('product.activeStatus')" :value="item.value" :key="i">{{item.desc}}</Option>
                  </Select>
                </Col>
              </Row>
            </FormItem>
            <FormItem :label="$t('product.tabData.displayState')">
              <Row>
                <Col span="24">
                  <Select
                    v-model="searchForm.status"
                    class="search-select-item"
                    :placeholder="$t('product.prompt.displayState')"
                    style="width:200px"
                    clearable
                  >
                    <Option v-for="(item, i) in $t('product.displayState')" :value="item.value" :key="i">{{item.desc}}</Option>
                  </Select>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Row>
                <Col span="24">
                  <!-- <Input
                    v-model="searchForm.company"
                    :placeholder="$t('product.prompt.firm')"
                  ></Input> -->
                  <Input v-model="searchForm[selectWhat]">
                      <Select v-model="selectWhat" slot="prepend" style="width: 80px" @on-change="changeSelectWhat">
                        <Option v-for="(item, i) in $t('product.selectWhat')" :value="item.value" :key="i">{{item.desc}}</Option>
                      </Select>
                  </Input>
                </Col>
              </Row>
            </FormItem>
            <!-- <FormItem :label="$t('product.tabData.name')">
              <Row>
                <Col span="24">
                  <Input v-model="searchForm.productName" :placeholder="$t('product.prompt.name')"></Input>
                </Col>
              </Row>
            </FormItem> -->
          </Row>
          <FormItem>
            <Button type="primary" @click="search">{{$t('common.search')}}</Button>
            <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>
          </FormItem>
        </Form>
      </Card>

      <Card>
        <Button class="add-message-btn" type="primary" @click="showModal">{{$t('product.add')}}</Button>
        <Button class="add-message-btn" style="margin-left: 20px" type="primary" @click="showDraft">{{$t('product.draft')}}</Button>
        <!--v-on:changeModal="changeModal"  v-on:editSuccess="editSuccess"-->

        <Table border class="person-table" :columns="columns" :data="tableData" :loading="tableLoading" style="margin-top: 10px"/>

        <product-modal class="admin-modal" ref="mychild" :editModal="editModal" :from="from" :chooseItem="chooseItem" :isSortWeight="isSortWeight" v-on:changeModal="changeModal" :numberMax="numberMax" :isAble="isAble" :isNew="isNew" :isKsp="isKsp" :isStaging="isStaging" v-on:editSuccess="editSuccess" v-on:isNewChange="isNewC" v-on:isKspChange="isKspC" v-on:isStagingChange="isStagingC" ></product-modal>

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
  import ProductModal from '_c/operation-modal/product.vue';
  import { getProduct ,getProductNumberMax ,updateSortWeight,deleteProduct,updateComment} from '@/api/product';
  export default {
    name: "productConfiguration",
    components: {
      ProductModal
    },
    data(){
      return {
        deleteModal:false,
        deleteLoading:false,
        url:'',
        from:'productConfiguration',
        isUrl:false,
        imgLoading:false,
        isSortWeight:true,
        editModal:false,
        tableLoading:false,
        pageSize: 10,
        totalNumber: 0,
        currentPage: 1,
        selectWhat:"company",
        // createFALSEupdateTRUE:null,
        searchForm: {
          productName: null,
          company: null,
          activityStatus: null,
          status: null,
          startShelfTime:null,
          endShelfTime:null,

          startObtainedTime:null,
          endObtainedTime:null,
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
          monetaryUnit:null,
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
            title: this.$t('product.tabData.id'), key: 'id',align: 'center',fixed: 'left',width: 100
          },
          {
            title: this.$t('product.tabData.sort'), key: 'sortWeight',align: 'center',fixed: 'left',width: 100
          },
          {
            title: this.$t('product.tabData.name'), key: 'productName',align: 'center',tooltip: true,width: 100,fixed: 'left'
          },
          {
            title: this.$t('product.tabData.firm'), key: 'company',align: 'center',tooltip: true,width: 100,fixed: 'left'
          },
          {
            title: this.$t('product.tabData.icon'), key: 'bannerUrl',align: 'center',
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
            title: this.$t('product.tabData.max'), key: 'loanMoney',align: 'center',tooltip: true,
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
            title: this.$t('product.tabData.loanDays'), key: 'loanDaysMax',align: 'center',width: 100,
            render:(h,params)=>{
              if(params.row['loanDaysMax']!=null && params.row['loanDaysMin']!=null) {
                let data=this.$t('product.unit');
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
            title: this.$t('product.tabData.interestRate'), key: 'loanDayMoneyRate',align: 'center',width: 100,
            render:(h,params)=>{
              if(params.row['loanDayMoneyRateType']!=null && params.row['loanDayMoneyRate']!=null) {
                let data=this.$t('product.interestRate');
                let type=data.filter(v => {
                  return v.value===params.row['loanDayMoneyRateType'];
                });
                let interestRate=(type.length>0 && type[0].desc) ? type[0].desc : "";
                return h(
                  "p",
                  interestRate+(params.row['loanDayMoneyRate']*100).toFixed(2)+"%("+this.$t('product.rate')[params.row['loanRateType']]['desc']+")"
                );
              }else{
                return '';
              }
            },
          },
          {
            title: this.$t('product.tabData.arrivalTime'), key: 'applyDay',align: 'center',width: 100,
            render:(h,params)=>{
              if(params.row['applyDay']!=null && params.row['applyDayUnit']!=null){
                let data=this.$t('product.processDays');
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
          // {
          //   title: this.$t('product.tabData.dateAdded'),
          //   key: 'googleDateStr',
          //   align: 'center',
          //   tooltip: true,
          //   width: 200
          // },
          {
            title: this.$t('product.tabData.get'), key: 'forwardUrl',align: 'center',tooltip: true,width: 100
          },
          {
            title: this.$t('product.tabData.thirdPartyUrl'), key: 'thirdPartyUrl',align: 'center',tooltip: true,width: 100
          },
          {
            title: this.$t('product.tabData.shelfPeriod'), key: 'shelfTime',align: 'center',tooltip: true,width: 300,
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
            title: this.$t('product.tabData.shelfTime'), key: 'loanProductUpTimes',align: 'center',width: 120,
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
          // {
          //   title: this.$t('product.tabData.createTime'), key: 'createTimeStr',align: 'center',tooltip: true,width: 100
          // },
          {
            title: this.$t('product.tabData.operator'), key: 'operatorName',align: 'center',tooltip: true,width: 100
          },
          {
            title: this.$t('product.tabData.updateTime'), key: 'modifyTimeStr',align: 'center',tooltip: true,width: 100
          },
          {
            title: this.$t('product.tabData.displayState'), key: 'status',align: 'center',
            render:(h,params)=>{
              let data=this.$t('product.displayState');
              let type=data.filter(v => {
                return v.value===params.row.status;
              });
              let state=(type.length>0 && type[0].desc) ? type[0].desc : "";
              return h('div',state);
            },
            width: 100,
            fixed: "right"
          },
          {
            title: this.$t('product.tabData.activeStatus'), key: 'activityStatus',align: 'center',
            render:(h,params)=>{
              if(params.row['activityStatus']!==null){
                let data=this.$t('product.activeStatus');
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
            width: 460,
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
                      // icon: "md-arrow-up"
                    },
                    class: "edit-btn",
                    style: {
                      backgroundColor: 'transparent',
                      color: "#57a3f3",
                    },
                    on: {
                      click: () => {
                        this.moveUp(params);
                      }
                    }
                  }, this.$t('common.moveUp')),
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      size: "default",
                      // icon: "md-arrow-down"
                    },
                    class: "edit-btn",
                    style: {
                      backgroundColor: 'transparent',
                      color: "#57a3f3",
                    },
                    on: {
                      click: () => {
                        this.moveDown(params);
                      }
                    }
                  }, this.$t('common.moveDown')),
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      size: "default",
                      // icon: "md-text"
                    },
                    class: "edit-btn",
                    style: {
                      backgroundColor: 'transparent',
                      color: "#57a3f3",
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          name:"commentManagement",
                          params:{id:params.row.id}
                        })
                      }
                    }
                  }, this.$t('product.comment')),
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      size: "default",
                      // icon: "ios-brush"
                    },
                    class: "edit-btn",
                    style: {
                      backgroundColor: 'transparent',
                      color: "#57a3f3",
                    },
                    on: {
                      click: () => {
                        this.opCo(params.row.id,params.row.commentStatus===null? 0 : params.row.commentStatus)
                        // this.$router.push({
                        //   name:"commentManagement",
                        //   params:{id:params.row.id}
                        // })
                      }
                    }
                  }, this.$t('product.feedback')[params.row.commentStatus===null? 0 : params.row.commentStatus]),
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
      cleanSearch(){
        this.currentPage=1;
        this.pageSize=10;
        this.searchForm.productName='';
        this.searchForm.status='';
        this.searchForm.company='';
        this.searchForm.activityStatus='';
        this.searchForm.startShelfTime=null;
        this.searchForm.endShelfTime=null;
        this.searchForm.startObtainedTime=null;
        this.searchForm.endObtainedTime=null;
        this.selectWhat='company';
        this.getTable();
      },
      changeSelectWhat(){
        this.searchForm.company='';
        this.searchForm.productName='';
      },
      showModal () {
        // this.createFALSEupdateTRUE=false;
        getProductNumberMax().then(res => {
          if(res.data.success){
            if(res.data.data){
              let num=res.data.data;
              if(num<0){
                num=1
              }
              let params={
                row: {
                  id: null,
                  sortWeight:num,
                  productName:null,
                  company:null,
                  bannerUrl:null,
                  loanMoney:null,
                  monetaryUnit:null,
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
              this.numberMax=num;
              this.editModal = true;
              this.isAble=true;
              this.isNew=true;
            }else{
              let params={
                row: {
                  id: null,
                  sortWeight:1,
                  productName:null,
                  company:null,
                  bannerUrl:null,
                  loanMoney:null,
                  monetaryUnit:null,
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
            }
          }else{
            this.$Message.error(res.data.message)
          }
        });
      },
      changeModal (param) {
        this.editModal = param;
        this.modelItem({'row': {}});
      },
      editMessage(params){
        this.isAble= false;
        this.isSortWeight= params.row.status==0 ? false : true;
        // this.createFALSEupdateTRUE=true;
        this.$refs.mychild.setNew(params.row.isNew ? params.row.isNew : false);
        this.$refs.mychild.setKsp(params.row.isKsp ? params.row.isKsp : false);
        this.$refs.mychild.setStaging(params.row.isStaging ? params.row.isStaging : false);
        this.$refs.mychild.setTimeBetween(params.row.shelfTime , params.row.obtainedTime);
        // this.isNew=params.row.isNew ? params.row.isNew : false;
        // this.isKsp=params.row.isKsp ? params.row.isKsp : false;
        // this.isStaging=params.row.isStaging ? params.row.isStaging : false;
        // console.log(this.isNew,this.isKsp,this.isStaging);
        getProductNumberMax().then(res => {
          if(res.data.success){
            if(res.data.data){
              this.modelItem(params);
              if(this.chooseItem.status===0){
                this.chooseItem.sortWeight=res.data.data;
              }
              this.numberMax=res.data.data>1 ? res.data.data-1 : 1;
              setTimeout(()=>{
                this.editModal = true;
              },1)

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
        this.chooseItem.monetaryUnit=params.row.monetaryUnit-0;
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
        this.chooseItem.loanFlow1 = params.row.loanFlow1;
        this.chooseItem.loanFlow2 = params.row.loanFlow2;
        this.chooseItem.loanFlow3 = params.row.loanFlow3;
        this.chooseItem.loanFlow4 = params.row.loanFlow4;
        this.chooseItem.loanFlow5 = params.row.loanFlow5;

        this.chooseItem.loanProductUpTimeCount = params.row.loanProductUpTimeCount;
        this.chooseItem.loanProductUpTimes = params.row.loanProductUpTimes;
        // if(params.row.loanProductUpTimes) {
        //   for(let v of this.chooseItem.loanProductUpTimes){
        //     if(v.startTime && v.endTime){
        //       v.startTime=v.startTime.substring(11,16);
        //       v.endTime=v.endTime.substring(11,16);
        //     }
        //   }
        // }else{
        //   this.chooseItem.loanProductUpTimes=[];
        // }
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

        if(!this.chooseItem.loanProductRequires){
          this.chooseItem.loanProductRequires=[];
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
          startShelfTime:this.searchForm.startShelfTime,
          endShelfTime:this.searchForm.endShelfTime,

          startObtainedTime:this.searchForm.startObtainedTime,
          endObtainedTime:this.searchForm.endObtainedTime,

          company: this.searchForm.company,
          activityStatus: this.searchForm.activityStatus,
          productName: this.searchForm.productName,
          status: this.searchForm.status,
          columns : 'status,sort_weight' ,
          orderBy : 'true,false' ,
          pageSize: this.pageSize,
          currentPage: this.currentPage,
        };
        if(params.endShelfTime && params.startShelfTime){
          params.endShelfTime=formatDate(new Date(params.endShelfTime), "yyyy-MM-dd")+" 23:59:59";
          params.startShelfTime=formatDate(new Date(params.startShelfTime), "yyyy-MM-dd")+" 00:00:00";
        }

        let start=(new Date(params.startShelfTime)).getTime();
        let end=(new Date(params.endShelfTime)).getTime();
        if( start - end >0 ){
          params.endShelfTime=null;
          params.startShelfTime=null;
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
        getProduct(params).then(res => {
          this.tableLoading = false;
          if(res.data.success){
            if( res.data.data && res.data.data.length !==0 ){
              this.tableData = res.data.data;
              this.tableData=this.tableData.filter(v=>{
                return v.sortWeight>=0;
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
        deleteProduct(params).then(res => {
          this.deleteLoading = false;
          if (res.data.success) {
            this.$Message.success(this.$t('common.deleteSuccess'));
            this.getTable();
          } else {
            this.$Message.error(res.data.message);
          }
        })
      },
      opCo(id,commentStatus){
        let params={id:id,commentStatus:(commentStatus===1?0:1)}
        updateComment(params).then(res => {
          this.getTable();
          let newImg = new Image();
          newImg.src ='';
          newImg.onload=()=>{ // 图片加载成功后把地址给原来的img
            this.url = newImg.src;
            this.imgLoading=false;
          }
          // console.log(res.data);
        })
      },
      showDraft(){
        this.$router.push({
          name: 'productDraft'
        })
      },
      moveUp(data){
        let sortWeight=data.row.sortWeight;
        if(sortWeight>1){
          this.tableLoading=true;
          let params={
            id:data.row.id,
            sortWeight:sortWeight-1
          };
          updateSortWeight(params).then(res => {
            this.tableLoading = false;
            if (res.data.success) {
              this.$Message.success(this.$t('common.moveUpSuccess'));
              this.getTable();
            } else {
              this.$Message.error(res.data.message);
            }
          })
        }else{
          this.$Message.error(this.$t('common.moveUpMessage'));
        }
      },
      moveDown(_data){
        let sortWeight=_data.row.sortWeight;
        getProductNumberMax().then(res => {
          if(res.data.success){
            if(res.data.data){
              let numberMax=res.data.data;
              if(sortWeight<numberMax-1){
                let params={
                  id:_data.row.id,
                  sortWeight:sortWeight+1
                };
                updateSortWeight(params).then(res => {
                  this.tableLoading = false;
                  if (res.data.success) {
                    this.$Message.success(this.$t('common.moveDownSuccess'));
                    this.getTable();
                  } else {
                    this.$Message.error(res.data.message);
                  }
                })
              }else{
                this.$Message.error(this.$t('common.moveDownMessage'));
              }
            }
          }else{
            this.$Message.error(res.data.message)
          }
        });
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
