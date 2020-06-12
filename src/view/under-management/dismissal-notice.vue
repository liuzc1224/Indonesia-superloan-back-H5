<template>
  <Row>
    <i-col :span="24">
      <Card class="search-card">
        <Row style="margin-bottom: 5px">
          <i-col :span="5">
            <h1>{{$t('dismissalNotice.title')}}</h1>
          </i-col>
          <i-col :span="19" style="text-align: right">
            <Button size="large" @click="dismissalNoticeEmail()">{{$t('dismissalNotice.email')}}</Button>
          </i-col>
        </Row>
        <hr/>
        <Form ref="searchForm" :model="searchForm" :label-width="100" style="margin-top: 20px" inline>
          <FormItem :label="$t('dismissalNotice.monitoringTime')">
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
          <FormItem :label="$t('dismissalNotice.linkType')">
            <Select clearable v-model="searchForm.type" :placeholder="$t('dismissalNotice.prompt.linkType')">
              <Option v-for="(item,index) in $t('dismissalNotice.linkTypes')" :key="index" :value="item.value">{{item.desc}}</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('dismissalNotice.name')">
            <Input v-model="searchForm.productName" :placeholder="$t('dismissalNotice.prompt.name')"></Input>
          </FormItem>
          <FormItem :label="$t('dismissalNotice.packageName')">
            <Input v-model="searchForm.packageName" :placeholder="$t('dismissalNotice.prompt.packageName')"></Input>
          </FormItem>
          <Row>
            <FormItem>
              <Button type="primary" @click="search">{{$t('common.search')}}</Button>
              <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>
            </FormItem>
          </Row>
        </Form>
      </Card>
      <Card style="margin-top: 10px">
        <Table
          border
          class="person-table"
          :columns="columns"
          :data="tableData"
          :loading="tableLoading"
          style="margin-top: 10px"
        />
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
  </Row>
</template>

<script>
  import { formatDate } from "@/assets/js/date";
  import { productinvalidnotify } from "@/api/underManagement";
    export default {
      name: "dismissal-notice",
      data(){
        return{
          searchForm: {
            createTimeStart:null,
            createTimeEnd:null,
            type:null,
            productName:null,
            packageName:null
          },
          editModal: false,
          tableLoading: false,
          pageSize: 10,
          totalNumber: 0,
          currentPage: 1,
          tableData: [],
          columns: [
            {
              title: this.$t("dismissalNotice.monitoringTime"),
              key: "createTime",
              align: "center",
              minWidth:150
            },
            {
              title: this.$t("dismissalNotice.name"),
              key: "productName",
              align: "center",
              tooltip: true,
              minWidth:150
            },
            {
              title: this.$t("dismissalNotice.packageName"),
              key: "packageName",
              align: "center",
              tooltip: true,
              minWidth:150
            },
            {
              title: this.$t('dismissalNotice.linkType'), key: 'type',align: 'center',
              render:(h,params)=>{
                let data=this.$t('dismissalNotice.linkTypes');
                let type=data.filter(v => {
                  return v.value===params.row.type;
                });
                let state=(type.length>0 && type[0].desc) ? type[0].desc : "";
                return h('div',state);
              },
              minWidth:150
            },
            {
              title: this.$t("dismissalNotice.id"),
              key: "productId",
              align: "center",
              tooltip: true,
              minWidth:150
            }
            // ,
            // {
            //   title: this.$t('dismissalNotice.state'), key: 'status',align: 'center',
            //   render:(h,params)=>{
            //     let data=this.$t('dismissalNotice.status');
            //     let type=data.filter(v => {
            //       return v.value===params.row.status;
            //     });
            //     let state=(type.length>0 && type[0].desc) ? type[0].desc : "";
            //     return h('div',state);
            //   }
            // }
          ]
        }
      },
      mounted(){
        this.getTable();
      },
      methods:{
        search(){
         this.currentPage=1;
          this.getTable();
        },
        cleanSearch(){
         this.currentPage=1;
          this.searchForm.createTimeStart=null;
          this.searchForm.createTimeEnd=null;
          this.searchForm.type=null;
          this.searchForm.productName=null;
          this.searchForm.packageName=null;
          this.getTable();
        },
        getTable(){
          let params = {
            createTimeStart: this.searchForm.createTimeStart,
            createTimeEnd: this.searchForm.createTimeEnd,
            packageName: this.searchForm.packageName,
            productName: this.searchForm.productName,
            type: this.searchForm.type,
            pageSize: this.pageSize,
            currentPage: this.currentPage,
          };
          if(params.createTimeStart && params.createTimeEnd){
            params.createTimeEnd=formatDate(new Date(params.createTimeEnd), "yyyy-MM-dd")+" 23:59:59";
            params.createTimeStart=formatDate(new Date(params.createTimeStart), "yyyy-MM-dd")+" 00:00:00";
            let start=(new Date(params.createTimeStart)).getTime();
            let end=(new Date(params.createTimeEnd)).getTime();
            if( start - end >0 ){
              params.createTimeStart=null;
              params.createTimeEnd=null;
            }
          }
          this.tableLoading = true;
          productinvalidnotify(params).then(res => {
            this.tableLoading = false;
            if(res.data.success){
              if( res.data.data && res.data.data.length !==0 ){
                this.tableData = res.data.data
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
        dismissalNoticeEmail(){
          this.$router.push({
            name:"dismissal-notice-email"
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
      }
    }
</script>

<style scoped>

</style>
