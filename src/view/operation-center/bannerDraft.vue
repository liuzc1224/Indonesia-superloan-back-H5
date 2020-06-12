<template>
  <Row :gutter="10" class="banner-config-page">
    <i-col span="24">
      <Card class="search-card">
        <Form ref="searchForm" :model="searchForm" :label-width="100" inline>
          <Row>
            <Row>
              <FormItem :label="$t('bannerDraft.tabData.saveTime')">
                <Row>
                  <Col span="11">
                    <DatePicker
                      type="date"
                      clearable
                      ref="createTimeStart"
                      :placeholder="$t('bannerDraft.prompt.timeStart')"
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
                      :placeholder="$t('bannerDraft.prompt.timeEnd')"
                      v-model="searchForm.createTimeEnd"
                    ></DatePicker>
                  </Col>
                </Row>
              </FormItem>
              <FormItem :label="$t('bannerDraft.tabData.name')">
                <Row>
                  <Col span="24">
                    <Input
                      v-model="searchForm.bannerSource"
                      :placeholder="$t('bannerDraft.prompt.name')"
                    ></Input>
                  </Col>
                </Row>
              </FormItem>
              <FormItem :label="$t('bannerDraft.tabData.firmName')">
                <Row>
                  <Col span="24">
                    <Input
                      v-model="searchForm.company"
                      :placeholder="$t('bannerDraft.prompt.firmName')"
                    ></Input>
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
        <!-- <Button class="add-message-btn" type="primary" @click="showModal">{{$t('bannerDraft.add')}}</Button> -->
        <banner-modal
          class="admin-modal"
          ref="mychild"
          :editModal="editModal"
          :chooseItem="chooseItem"
          :isSortWeight="isSortWeight"
          v-on:changeModal="changeModal"
          :numberMax="numberMax"
          :from="from"
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

        <Modal v-model="deleteModal" :title="$t('setUpPage.deleteTitle')" :loading="deleteLoading" @on-ok="bannerDelete" width="300">
          <p>{{$t('setUpPage.deleteTip')}}</p>
        </Modal>

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
    <Modal :title="$t('bannerDraft.tabData.banner')" v-model="isUrl" width="360">
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
  import { formatDate } from "@/assets/js/date";
  import { getBanner, getBannerNumberMax,deleteBanner,addDraft,getDraft } from "@/api/banner";
  export default {
    name: "bannerDraft",
    components: {
      BannerModal
    },
    data() {
      return {
        deleteModal:false,
        deleteLoading:false,
        numberMax: null,
        isAble: null,
        isSortWeight:false,
        url: "",
        from: "bannerDraft",
        isUrl: false,
        imgLoading: false,
        editModal: false,
        tableLoading: false,
        pageSize: 10,
        totalNumber: 0,
        currentPage: 1,
        searchForm: {
          bannerSource: null,
          status: null,
          company: null,
          activityStatus: null,
          createTimeStart:null,
          createTimeEnd:null
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
          dayShelfTime:null,
          dayObtainedTime:null,
          sortWeight: null,
          status:null,
          activityStatus:null,
          bannerUpTimes:[],
        },
        tableData: [],
        columns: [
          {
            title: this.$t("bannerDraft.tabData.name"),
            key: "bannerSource",
            align: "center",
            tooltip: true,
            width:200
          },
          {
            title: this.$t("bannerDraft.tabData.firm"),
            key: "company",
            align: "center",
            tooltip: true,
            width:100
          },
          {
            title: this.$t("bannerDraft.tabData.description"),
            key: "bannerExplain",
            align: "center",
            tooltip: true,
            width:100
          },
          {
            title: this.$t("bannerDraft.tabData.banner"),
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
            title: this.$t("bannerDraft.tabData.link"),
            key: "forwardUrl",
            align: "center",
            tooltip: true,
            width:200
          },
          {
            title: this.$t('banner.tabData.thirdPartyUrl'), key: 'thirdPartyUrl',align: 'center',tooltip: true,width: 100
          },
          {
            title: this.$t("bannerDraft.tabData.shelfPeriod"),
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
            title: this.$t("bannerDraft.tabData.shelfTime"),key: "bannerUpTimes",align: "center",width:120,
            render:(h,params)=>{
              if(params.row['bannerUpTimes']) {
                let time="";
                params.row['bannerUpTimes'].forEach(v => {
                  time+=v.startTime.substring(11,16)+"-"+v.endTime.substring(11,16)+`，`
                });
                time=time.substring(0,time.length-1);
                return h(
                  "p",
                  time
                );
              }
            },
          },
          {
            title: this.$t("bannerDraft.tabData.saveTime"),
            key: "createTimeStr",
            align: "center",
            tooltip: true,
            width:200
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
            width: 200,
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
                      // size: "large",
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
      search(){
       this.currentPage=1;
        this.getTable();
      },
      cleanSearch(){
       this.currentPage=1;
        this.searchForm.bannerSource='';
        this.searchForm.status='';
        this.searchForm.company='';
        this.searchForm.activityStatus='';
        this.searchForm.createTimeStart='';
        this.searchForm.createTimeEnd='';
        this.getTable();
      },
      showModal () {
        getBannerNumberMax().then(res => {
          if(res.data.success){
            if(res.data.data){
              if(res.data.data<0){
                let num=res.data.data; 
                if(num<0){
                  num=1
                }
                let params={
                  row: {
                    id: null,
                    sortWeight:1,
                    company:null,
                    bannerSource:null,
                    bannerUrl:null,
                    bannerExplain:null,
                    forwardUrl:null,
                    forwardUrlType:null,
                    thirdPartyUrl:null,
                    status:null,
                    bannerUpTimes:[],
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
                    company:null,
                    bannerUrl:null,
                    bannerExplain:null,
                    forwardUrl:null,
                    forwardUrlType:null,
                    thirdPartyUrl:null,
                    status:null,
                    bannerUpTimes:[],
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
        params.row.id=null;
        this.$refs.mychild.setTimeBetween(params.row.shelfTime , params.row.obtainedTime);
        getBannerNumberMax().then(res => {
          if(res.data.success){
            if(res.data.data){
              // console.log(params)
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
        this.chooseItem.bannerSource = params.row.bannerSource;
        this.chooseItem.bannerExplain = params.row.bannerExplain;
        this.chooseItem.company = params.row.company;
        this.chooseItem.bannerUrl = params.row.bannerUrl;
        this.chooseItem.forwardUrl = params.row.forwardUrl;
        this.chooseItem.forwardUrlType = params.row.forwardUrlType ? params.row.forwardUrlType-0 : null;

        this.chooseItem.thirdPartyUrl = params.row.thirdPartyUrl;

        this.chooseItem.shelfTime = params.row.shelfTime;
        this.chooseItem.obtainedTime = params.row.obtainedTime;

        this.chooseItem.dayShelfTime = params.row.dayShelfTime;
        this.chooseItem.dayObtainedTime = params.row.dayObtainedTime;
        this.chooseItem.sortWeight = params.row.sortWeight;
        this.chooseItem.activityStatus = params.row.activityStatus;
        this.chooseItem.status = params.row.status;

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

        if(this.chooseItem.dayShelfTime) {
          this.chooseItem.dayShelfTime=this.chooseItem.dayShelfTime.substring(11,16);
        }
        if(this.chooseItem.dayObtainedTime) {
          this.chooseItem.dayObtainedTime=this.chooseItem.dayObtainedTime.substring(11,16);
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
          activityStatus:this.searchForm.activityStatus,
          bannerSource: this.searchForm.bannerSource,
          status: this.searchForm.status,
          company: this.searchForm.company,

          createTimeStart:this.searchForm.createTimeStart!==null&&this.searchForm.createTimeStart!=="" ? formatDate(new Date(this.searchForm.createTimeStart), "yyyy-MM-dd hh:mm:ss") : null,
          createTimeEnd:this.searchForm.createTimeEnd!==null&&this.searchForm.createTimeEnd!=="" ? formatDate(new Date(this.searchForm.createTimeEnd), "yyyy-MM-dd hh:mm:ss") : null,

          columns : 'status,sort_weight,create_time' ,
          orderBy : 'true,false,true' ,

          pageSize: this.pageSize,
          currentPage: this.currentPage,
        };
        // params.columns = "status,sort_weight";
        // params.orderBy = "true,false";
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
        getDraft(params).then(res => {
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
