<template>
  <Row>
    <Card>
      <Form ref="searchForm" :model="searchForm" :label-width="100" inline>
        <Row>
          <FormItem :label="$t('operationalData.conversion.data')">
            <Row>
              <i-col span="11">
                <DatePicker
                  type="date"
                  :clearable="false"
                  ref="startTime"
                  :placeholder="$t('operationalData.conversion.timeStart')"
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
                  ref="endTime"
                  :placeholder="$t('operationalData.conversion.timeEnd')"
                  v-model="searchForm.endTime"
                ></DatePicker>
              </i-col>
            </Row>
          </FormItem>
          <FormItem :label="$t('operationalData.conversion.packageName')">
            <Select
              clearable
              v-model="searchForm.packageName"
              class="search-select-item"
              :placeholder="$t('operationalData.conversion.select')"
              style="width:200px"
            >
              <Option v-for="(item, i) in packageNameData" :value="item" :key="i">{{item}}</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('operationalData.conversion.productName')">
            <Select
              clearable
              v-model="searchForm.productId"
              class="search-select-item"
              :placeholder="$t('operationalData.conversion.select')"
              style="width:200px"
              @on-change="changeSelect"
            >
              <Option v-for="(item, i) in productNameData" :value="item['productId']" :key="i">{{item['productName']}}</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('operationalData.conversion.marketingPlatform')">
            <Select
              clearable
              v-model="searchForm.platform"
              class="search-select-item"
              :placeholder="$t('operationalData.conversion.select')"
              style="width:200px"
            >
              <Option v-for="(item, i) in platformNameData" :value="item" :key="i">{{item}}</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('operationalData.conversion.channelID')">
            <Input v-model="searchForm.channelId" :placeholder="$t('operationalData.conversion.inputChannelID')"></Input>
          </FormItem>
          <FormItem :label="$t('operationalData.conversion.channelName')">
            <Input v-model="searchForm.channelName" :placeholder="$t('operationalData.conversion.inputChannelName')"></Input>
          </FormItem>
          <Row>
            <FormItem>
              <Button type="primary" @click="search">{{$t('common.search')}}</Button>
              <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>
              <Button style="margin-left: 30px" :disabled="totalNumber===0" @click="exportConversionData()">{{$t('common.export')}}</Button>
            </FormItem>
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
  import { promotionconversion,exportPromotionConversion } from '@/api/reportCenter'
  import { formatDate } from "@/assets/js/date";
  export default {
    name: "conversionInfo",
    props: ['platformNameData','packageNameData','productNameData'],
    data(){
      return {
        dayType: 1,
        tableLoading: false,
        pageSize: 10,
        totalNumber: 0,
        currentPage: 1,
        searchForm: {
          channelName: null,
          startTime: null,
          endTime: null,
          // firstSort: null,
          channelId: null,
          productName: null,
          productId: null,
          packageName: null,
          platform:null
        },
        tableData: [],
        columns: [
          {
            title: this.$t('operationalData.conversion.data'), key: 'dateStr', align: 'center',minWidth:150
          },
          {
            title: this.$t('operationalData.conversion.marketingPlatform'), key: 'platform', align: 'center',minWidth:150
          },
          {
            title: this.$t('operationalData.conversion.channelID'), key: 'channelId', align: 'center', tooltip: true,minWidth:150
          },
          {
            title: this.$t('operationalData.conversion.channelName'), key: 'channelName', align: 'center',minWidth:150
          },
          {
            title: this.$t('operationalData.conversion.packageName'),
            key: 'packageName',
            align: 'center',
            tooltip: true,minWidth:150
          },
          {
            title: this.$t('operationalData.conversion.installationNumber'),
            key: 'installCount',
            align: 'center',
            tooltip: true,minWidth:150
          },
          {
            title: this.$t('operationalData.conversion.registeredUsers'),
            key: 'registerCount',
            align: 'center',
            tooltip: true,minWidth:150
          },
          {
            title: this.$t('operationalData.conversion.downloadUsers'),
            key: 'clickUserCount',
            align: 'center',
            tooltip: true,minWidth:150
          },
          {
            title: this.$t('operationalData.conversion.clickDownloads'),
            key: 'userClickCount',
            align: 'center',
            tooltip: true,minWidth:150
          },
          {
            title: this.$t('operationalData.conversion.uninstalls'),
            key: 'reinstallCount',
            align: 'center',
            tooltip: true,minWidth:150
          },
          {
            title: this.$t('operationalData.conversion.install_registered'),
            key: 'installRegisterRate',
            align: 'center',
            tooltip: true,minWidth:150
          },
          {
            title: this.$t('operationalData.conversion.install_download'),
            key: 'installDownloadUserCountRate',
            align: 'center',
            tooltip: true,minWidth:150
          },
          {
            title: this.$t('operationalData.conversion.install_download_click'),
            key: 'installDownloadClickCountRate',
            align: 'center',
            tooltip: true,minWidth:150
          }
        ]
      }
    },
    mounted(){
      this.searchForm.startTime=formatDate(new Date(), "yyyy-MM-dd");
      this.searchForm.endTime=formatDate(new Date(), "yyyy-MM-dd");
      this.search();
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
        // this.searchForm.firstSort = null;
        this.searchForm.packageName = null;
        this.searchForm.productName = null;
        this.searchForm.productId = null;
        this.searchForm.platform = null;
        this.searchForm.channelId = null;
        this.searchForm.channelName = null;
        this.getTable();
      },
      getTable(){
        let params = {
          startTime: this.searchForm.startTime,
          endTime: this.searchForm.endTime,
          // firstSort: this.searchForm.firstSort ? this.searchForm.firstSort : 0,

          packageName: this.searchForm.packageName,
          productName: this.searchForm.productName,
          productId: this.searchForm.productId,
          platform: this.searchForm.platform,
          channelId: this.searchForm.channelId,
          channelName: this.searchForm.channelName,

          pageSize: this.pageSize,
          currentPage: this.currentPage,
        };
        if(params.endTime && params.startTime){
          params.endTime=formatDate(new Date(params.endTime), "yyyy-MM-dd")+" 23:59:59";
          params.startTime=formatDate(new Date(params.startTime), "yyyy-MM-dd")+" 00:00:00";
        }

        let start=(new Date(params.startTime)).getTime();
        let end=(new Date(params.endTime)).getTime();
        if( start - end >0 ){
          params.endTime=null;
          params.startTime=null;
        }
        this.tableLoading = true;
        promotionconversion(params).then(res => {
          this.tableLoading = false;
          if(res.data.success){
            if( res.data.data && res.data.data.length !==0 ){
              this.tableData = res.data.data;
              this.currentPage = res.data.page.currentPage;
              this.pageSize = res.data.page.pageSize;
              this.totalNumber = res.data.page.totalNumber;
            }else{
              this.tableData = [];
              this.totalNumber=0;
              this.currentPage=1;
            }
          }else{
            this.$Message.error(res.data.message)
          }
        })
      },
      changePage (params) {
        this.currentPage = params;
        this.getTable();
      },
      pageSizeChange (params) {
        this.pageSize = params;
        this.getTable()
      },
      exportConversionData(){
        if(this.tableData){
          let data = {
            startTime: this.searchForm.startTime,
            endTime: this.searchForm.endTime,
            // firstSort: this.searchForm.firstSort ? this.searchForm.firstSort : 0,
            packageName: this.searchForm.packageName,
            productName: this.searchForm.productName,
            productId: this.searchForm.productId,
            platform: this.searchForm.platform,
            channelId: this.searchForm.channelId,
            channelName: this.searchForm.channelName,
          };
          if(data.endTime && data.startTime){
            data.endTime=formatDate(new Date(data.endTime), "yyyy-MM-dd")+" 23:59:59";
            data.startTime=formatDate(new Date(data.startTime), "yyyy-MM-dd")+" 00:00:00";
          }

          let start=(new Date(data.startTime)).getTime();
          let end=(new Date(data.endTime)).getTime();
          if( start - end >0 ){
            data.endTime=null;
            data.startTime=null;
          }
          // exportWinningList(data);
          exportPromotionConversion(data);
        }

      },
      changeSelect($event){
        let id=$event;
        let name=this.productNameData.filter(v=>{
          return v['productId']===id
        });
        this.searchForm.productName= name && name[0] && name[0]['productName'] ? name[0]['productName'] : null;
      }
    }
  }
</script>

<style scoped>

</style>
