<template>
  <Row :gutter="10" class="banner-config-page">
    <i-col span="24">
      <Card class="search-card">
        <Form ref="searchForm" :model="searchForm" :label-width="100" inline>
          <Row>

            <Row>
              <FormItem :label="$t('banner.tabData.upTime')">
                <Row>
                  <Col span="24">
                    <DatePicker type="daterange" placement="bottom-start" :placeholder="$t('banner.prompt.upTime')" style="width: 200px" :editable="false" v-model="searchForm.up"></DatePicker>
                  </Col>
                </Row>
              </FormItem>
              <FormItem :label="$t('banner.tabData.downTime')">
                <Row>
                  <Col span="24">
                    <DatePicker type="daterange" placement="bottom-end" :placeholder="$t('banner.prompt.downTime')" style="width: 200px" :editable="false" v-model="searchForm.down"></DatePicker>
                  </Col>
                </Row>
              </FormItem>
            </Row>


            <Row>
              <FormItem :label="$t('banner.tabData.activeStatus')">
                <Row>
                  <Col span="24">
                    <Select
                      v-model="searchForm.activityStatus"
                      class="search-select-item"
                      :placeholder="$t('banner.prompt.activeStatus')"
                      style="width:200px"
                    >
                      <Option v-for="(item, i) in $t('banner.activeStatus')" :value="item.value" :key="i">{{item.desc}}</Option>
                    </Select>
                  </Col>
                </Row>
              </FormItem>
              <FormItem :label="$t('banner.tabData.displayState')">
                <Row>
                  <Col span="24">
                    <Select
                      v-model="searchForm.status"
                      class="search-select-item"
                      :placeholder="$t('banner.prompt.displayState')"
                      style="width:200px"
                    >
                      <Option v-for="(item, i) in $t('banner.displayState')" :value="item.value" :key="i">{{item.desc}}</Option>
                    </Select>
                  </Col>
                </Row>
              </FormItem>
              <FormItem>
                <Row>
                  <Col span="24">
                    <Input v-model="searchForm[selectWhat]">
                        <Select v-model="selectWhat" slot="prepend" style="width: 80px" @on-change="changeSelectWhat">
                          <Option v-for="(item, i) in $t('banner.selectWhat')" :value="item.value" :key="i">{{item.desc}}</Option>
                        </Select>
                    </Input>
                  </Col>
                </Row>
              </FormItem>
            </Row>

            <FormItem>
              <Button type="primary" @click="search">{{$t('common.search')}}</Button>
              <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>
            </FormItem>
          </Row>
        </Form>
      </Card>

      <Card>
        <Button class="add-message-btn" type="primary" @click="showModal">{{$t('banner.add')}}</Button>
        <Button class="add-message-btn left" type="primary" @click="showDraft">{{$t('banner.draft')}}</Button>
        <!--v-on:changeModal="changeModal"  v-on:editSuccess="editSuccess"-->

        <banner-modal
          class="admin-modal"
          ref="mychild"
          :editModal="editModal"
          :chooseItem="chooseItem"
          v-on:changeModal="changeModal"
          :numberMax="numberMax"
          :from="from"
          :isSortWeight="isSortWeight"
          :isAble="isAble"
          v-on:editSuccess="editSuccess"
        ></banner-modal>

        <Table
          border
          class="person-table"
          :columns="columns"
          :data="tableData"
          :loading="tableLoading"
          style="margin-top: 10px"
        ></Table>

        <!--<Modal v-model="deleteModal" :title="$t('setUpPage.deleteTitle')" @on-ok="deleteItem">-->
        <!--<p>{{$t('setUpPage.deleteTip')}}</p>-->
        <!--</Modal>-->
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;margin-bottom: 2px;">
            <Page
              :total="totalNumber"
              :current="currentPage"
              :page-size-opts="[10, 20, 30, 50]"
              @on-change="changePage"
              @on-page-size-change="pageSizeChange"
              show-elevator
              show-sizer
              show-total
            ></Page>
          </div>
        </div>
      </Card>
    </i-col>
    <Modal :title="$t('banner.tabData.banner')" v-model="isUrl" width="360">
      <div class="flex-center">
        <Spin fix v-if="imgLoading"></Spin>
        <img
          :src="url"
          alt
          class="img-show"
          ref="imageShow"
          style="width:100px;height:100px;display:block;margin:0 auto;"
        >
      </div>
      <div slot="footer">
        <Button type="primary" size="large" @click="iconClose">{{$t('cardManage.sure')}}</Button>
      </div>
    </Modal>
    <Modal v-model="deleteModal" :title="$t('setUpPage.deleteTitle')" :loading="deleteLoading" @on-ok="bannerDelete" width="300">
      <p>{{$t('setUpPage.deleteTip')}}</p>
    </Modal>
  </Row>
</template>

<script>
import BannerModal from "_c/operation-modal/banner.vue";
import { getBanner, getBannerNumberMax,updateSortWeight,deleteBanner,addDraft } from "@/api/banner";
export default {
  name: "bannerConfiguration",
  components: {
    BannerModal
  },
  data() {
    return {
      deleteModal:false,
      deleteLoading:false,
      numberMax: null,
      isAble: null,
      url: "",
      from: "bannerConfiguration",
      isUrl: false,
      isSortWeight: true,
      imgLoading: false,
      editModal: false,
      tableLoading: false,
      pageSize: 10,
      totalNumber: 0,
      currentPage: 1,
      selectWhat:'company',
      searchForm: {
        bannerSource: null,
        status: null,
        company: null,
        activityStatus: null,
        up: null,
        startShelfTime: null,
        endShelfTime: null,
        down: null,
        startObtainedTime: null,
        endObtainedTime: null,
      },
      chooseItem: {
        id: null,
        bannerSource: null,
        bannerExplain: null,
        company: null,
        bannerUrl: null,
        forwardUrl: null,
        forwardUrlType: null,
        thirdPartyUrl:null,
        shelfTime:null,
        obtainedTime:null,
        // dayShelfTime:null,
        // dayObtainedTime:null,
        sortWeight: null,
        status:null,
        activityStatus:null,
        bannerUpTimes:[],
      },
      tableData: [],
      columns: [
        {
          title: this.$t("banner.tabData.id"),
          key: "id",
          align: "center",
          tooltip: true,
          width:100
        },
        {
          title: this.$t("banner.tabData.sort"),
          key: "sortWeight",
          align: "center",
          tooltip: true,
          width:100
        },
        {
          title: this.$t("banner.tabData.name"),
          key: "bannerSource",
          align: "center",
          tooltip: true,
          width:100
        },
        {
          title: this.$t("banner.tabData.firm"),
          key: "company",
          align: "center",
          tooltip: true,
          width:100
        },
        {
          title: this.$t("banner.tabData.description"),
          key: "bannerExplain",
          align: "center",
          tooltip: true,
          width:100
        },
        {
          title: this.$t("banner.tabData.banner"),
          key: "bannerUrl",
          align: "center",
          render: (h, params) => {
            if (params.row.bannerUrl) {
              return h(
                "div",
                {
                  props: {},
                  style: {
                    color: "#57a3f3",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.showIcon(params.row.bannerUrl);
                    }
                  }
                },
                this.$t("cardManage.check")
              );
            }
          },
          width:100
        },
        {
          title: this.$t("banner.tabData.link"),
          key: "forwardUrl",
          align: "center",
          tooltip: true,
          width:200
        },
        {
          title: this.$t('banner.tabData.thirdPartyUrl'), key: 'thirdPartyUrl',align: 'center',tooltip: true,width: 100
        },
        {
          title: this.$t("banner.tabData.shelfPeriod"),
          key: "shelfTime",
          align: "center",
          width:300,
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
          title: this.$t('product.tabData.shelfTime'), key: 'bannerUpTimes',align: 'center',width: 120,
          render:(h,params)=>{
            if(params.row['bannerUpTimes']) {
              let time="";
              params.row['bannerUpTimes'].forEach(v => {
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
        //   title: this.$t("banner.tabData.createTime"),
        //   key: "createTimeStr",
        //   align: "center",
        //   tooltip: true,
        //   width:100
        // },
        {
          title: this.$t("banner.tabData.operator"),
          key: "operatorName",
          align: "center",
          tooltip: true,
          width:100
        },
        {
          title: this.$t("banner.tabData.updateTime"),
          key: "modifyTimeStr",
          align: "center",
          tooltip: true,
          width:200,
          render:(h,params)=>{
            if(!params.row['modifyTimeStr']) {
              return h("p",params.row['createTimeStr']);
            }else{
              return h("p",params.row['modifyTimeStr']);
            }
          }
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
          fixed:'right',
          width: 100
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
          fixed:'right',
          width: 100
        },
        {
          title: this.$t("common.operating"),
          key: "action",
          width: 250,
          fixed:'right',
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
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
                }, this.$t('common.moveDown'))
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
      search(){
        this.currentPage=1,
        this.getTable();
      },
      cleanSearch(){
        this.currentPage=1;
        this.pageSize=10;
        this.searchForm.bannerSource=null;
        this.searchForm.status=null;
        this.searchForm.company=null;
        this.searchForm.activityStatus=null;
        this.searchForm.up=null;
        this.searchForm.startShelfTime=null;
        this.searchForm.endShelfTime=null;
        this.searchForm.down=null;
        this.searchForm.startObtainedTime=null;
        this.searchForm.endObtainedTime=null;
        this.selectWhat='company';
        this.getTable();
      },
      changeSelectWhat(){
        this.searchForm.company='';
        this.searchForm.bannerSource='';
      },
      showModal () {
        getBannerNumberMax().then(res => {
          if(res.data.success){
            if(res.data.data){
              if(res.data.data<0){
                let params={
                  row: {
                    id: null,
                    sortWeight:1,
                    bannerSource:null,
                    bannerUrl:null,
                    bannerExplain:null,
                    forwardUrl:null,
                    forwardUrlType:null,
                    thirdPartyUrl:null,
                    status:null,
                    bannerUpTimes:[]
                  }
                };
                this.modelItem(params);
                this.numberMax=1;
              }else{
                let params={
                  row: {
                    id: null,
                    sortWeight:res.data.data,
                    bannerSource:null,
                    bannerUrl:null,
                    bannerExplain:null,
                    forwardUrl:null,
                    forwardUrlType:null,
                    thirdPartyUrl:null,
                    status:null,
                    bannerUpTimes:[]
                  }
                };
                this.modelItem(params);
                this.numberMax=res.data.data;
              }


              this.editModal = true;
              this.isAble=true;
            }else{
              let params={
                row: {
                  id: null,
                  sortWeight:1,
                  bannerSource:null,
                  bannerUrl:null,
                  bannerExplain:null,
                  forwardUrl:null,
                  forwardUrlType:null,
                  thirdPartyUrl:null,
                  status:null,
                }
              };
              this.modelItem(params);
              this.numberMax=1;
              this.editModal = true;
              this.isAble=true;
            }
          }else{
            this.$Message.error(res.data.message)
          }
        });
      },
      changeModal(param) {
        this.editModal = param;
        this.modelItem({'row': {}});
      },
      editMessage(params){
        this.isAble=false;
        this.isSortWeight= params.row.status==0 ? false : true;
        this.$refs.mychild.setTimeBetween(params.row.shelfTime , params.row.obtainedTime);
        getBannerNumberMax().then(res => {
          if(res.data.success){
            if(res.data.data){
              // console.log(params)
              this.modelItem(params);
              this.numberMax=res.data.data>1 ? res.data.data-1 : 1;
              if(this.chooseItem.status===0){
                this.chooseItem.sortWeight=res.data.data;
              }
              this.editModal = true;
            }
          }else{
            this.$Message.error(res.data.message)
          }
        });
      },
      modelItem(params){
        this.chooseItem.id = params.row.id;
        this.chooseItem.bannerSource = params.row.bannerSource;
        this.chooseItem.bannerExplain = params.row.bannerExplain;
        this.chooseItem.company = params.row.company;
        this.chooseItem.bannerUrl = params.row.bannerUrl;
        this.chooseItem.forwardUrl = params.row.forwardUrl;
        this.chooseItem.forwardUrlType = params.row.forwardUrlType!=null ? params.row.forwardUrlType-0 : null;

        this.chooseItem.thirdPartyUrl = params.row.thirdPartyUrl;
        this.chooseItem.shelfTime = params.row.shelfTime;
        this.chooseItem.obtainedTime = params.row.obtainedTime;
        this.chooseItem.bannerUpTimes=params.row.bannerUpTimes;
        // this.chooseItem.dayShelfTime = params.row.dayShelfTime;
        // this.chooseItem.dayObtainedTime = params.row.dayObtainedTime;
        this.chooseItem.sortWeight = params.row.sortWeight;
        this.chooseItem.activityStatus = params.row.activityStatus;
        this.chooseItem.status = params.row.status;
        this.chooseItem.bannerUpTimes = params.row.bannerUpTimes;
        this.chooseItem.bannerUpTimes=[];

        if(params.row.bannerUpTimes) {
          let data=JSON.stringify(params.row.bannerUpTimes);
          JSON.parse(data).forEach(v=>{
            let data=v;
            data.startTime=v.startTime.substring(11,16);
            data.endTime=v.endTime.substring(11,16);
            this.chooseItem.bannerUpTimes .push(data);
          });
        }else{
          this.chooseItem.bannerUpTimes=[];
        }
        // if(this.chooseItem.dayShelfTime) {
        //   this.chooseItem.dayShelfTime=this.chooseItem.dayShelfTime.substring(11,16);
        // }
        // if(this.chooseItem.dayObtainedTime) {
        //   this.chooseItem.dayObtainedTime=this.chooseItem.dayObtainedTime.substring(11,16);
        // }
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
        // console.log(this.searchForm)
        if(this.searchForm.up && this.searchForm.up[0]){
            let startTime=this.searchForm.up[0];
            let startTimeString=startTime.getFullYear()+"-"+(startTime.getMonth()+1)+"-"+startTime.getDate()+" 00:00:00";
            let endTime=this.searchForm.up[1];
            let endTimeString=endTime.getFullYear()+"-"+(endTime.getMonth()+1)+"-"+endTime.getDate()+" 23:59:59";
            this.searchForm.startShelfTime=startTimeString;
            this.searchForm.endShelfTime=endTimeString;
        }else{
            this.searchForm.startShelfTime='';
            this.searchForm.endShelfTime='';
        }
        if(this.searchForm.down && this.searchForm.down[0]){
            let startTime=this.searchForm.down[0];
            let startTimeString=startTime.getFullYear()+"-"+(startTime.getMonth()+1)+"-"+startTime.getDate()+" 00:00:00";
            let endTime=this.searchForm.down[1];
            let endTimeString=endTime.getFullYear()+"-"+(endTime.getMonth()+1)+"-"+endTime.getDate()+" 23:59:59";
            this.searchForm.startObtainedTime=startTimeString;
            this.searchForm.endObtainedTime=endTimeString;
        }else{
            this.searchForm.startObtainedTime='';
            this.searchForm.endObtainedTime='';
        }
        let params = {
          activityStatus: this.searchForm.activityStatus,
          bannerSource: this.searchForm.bannerSource,
          company: this.searchForm.company,
          status: this.searchForm.status,

          startShelfTime: this.searchForm.startShelfTime,
          endShelfTime: this.searchForm.endShelfTime,
          startObtainedTime: this.searchForm.startObtainedTime,
          endObtainedTime: this.searchForm.endObtainedTime,

          columns : 'status,sort_weight' ,
          orderBy : 'true,false' ,

          pageSize: this.pageSize,
          currentPage: this.currentPage,
        };
        // params.columns = "status,sort_weight";
        // params.orderBy = "true,false";

        this.tableLoading = true;
        getBanner(params).then(res => {
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
      bannerDelete(){
        this.deleteLoading=true;
        let data=sessionStorage.getItem("delete");
        let params = {
          id:JSON.parse(data).id
        };
        deleteBanner(params).then(res => {
          this.deleteLoading = false;
          if (res.data.success) {
            this.$Message.success(this.$t('common.deleteSuccess'));
            this.getTable();
          } else {
            this.$Message.error(res.data.message);
          }
        })
      },
      showDraft(){
        this.$router.push({
          name:"bannerDraft"
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
        getBannerNumberMax().then(res => {
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
.banner-config-page{
  .search-card{
    margin-bottom: 20px;
  }
}
  .left{
    margin-left: 30px;
  }
</style>
