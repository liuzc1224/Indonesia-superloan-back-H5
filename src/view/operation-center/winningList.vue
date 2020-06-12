<template>
  <Row>
    <i-col :span="24">
      <Card class="search-card">
        <Form ref="searchForm" :model="searchForm" :label-width="100" inline>
          <Row>
            <FormItem :label="$t('sweepstakes.winningTime')">
              <Row>
                <i-col span="11">
                  <DatePicker
                    type="date"
                    clearable
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
                    clearable
                    ref="createTimeEnd"
                    :placeholder="$t('common.timeEnd')"
                    v-model="searchForm.createTimeEnd"
                  ></DatePicker>
                </i-col>
              </Row>
            </FormItem>
            <FormItem :label="$t('sweepstakes.id')">
              <Row>
                <i-col span="24">
                  <Input
                    v-model="searchForm.prizeId"
                    :placeholder="$t('sweepstakes.inputId')"
                  ></Input>
                </i-col>
              </Row>
            </FormItem>
            <FormItem :label="$t('sweepstakes.userAccount')">
              <Row>
                <i-col span="24">
                  <Input v-model="searchForm.phoneNumber" :placeholder="$t('sweepstakes.inputUserAccount')"></Input>
                </i-col>
              </Row>
            </FormItem>
          </Row>
          <FormItem>
            <Button type="primary" @click="search">{{$t('common.search')}}</Button>
            <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>
            <Button style="margin-left: 30px" :disabled="totalNumber===0" @click="exportData">{{$t('common.export')}}</Button>
          </FormItem>
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
    </i-col>
  </Row>
</template>

<script>
  import { formatDate } from "@/assets/js/date";
  import { winningList,exportWinningList } from '@/api/product'
    export default {
      name: "winningList",
      data(){
        return{
          searchForm: {
            createTimeStart:null,
            createTimeEnd:null,
            prizeId:null,
            phoneNumber:null,
          },
          pageSize: 10,
          totalNumber: 0,
          currentPage: 1,
          tableLoading:false,
          tableData: [],
          columns: [
            {
              title: this.$t('sweepstakes.winningTime'), key: 'createTime',align: 'center',tooltip: true,
            },
            {
              title: this.$t('sweepstakes.userAccount'), key: 'phoneNumber',align: 'center',tooltip: true
            },
            {
              title: this.$t('sweepstakes.id'), key: 'prizeId',align: 'center',tooltip: true
            },
            {
              title: this.$t('sweepstakes.name'), key: 'prizeName',align: 'center',tooltip: true,
            },
            {
              title: this.$t('sweepstakes.prizeRemark'), key: 'prizeRemark',align: 'center',tooltip: true,
            },
            {
              title: this.$t('sweepstakes.winningPosition'), key: 'positionId',align: 'center',tooltip: true,
            },
            {
              title: this.$t('sweepstakes.mode'), key: 'consumeType',align: 'center',
              render:(h,params)=>{
                let data=this.$t('sweepstakes.consumeType');
                let type=data.filter(v => {
                  return v.value===params.row['consumeType'];
                });
                let state=(type.length>0 && type[0].desc) ? type[0].desc : "";
                return h('div',state);
              },
            }
          ]
        }
      },
      mounted: function () {
        this.getTable();
      },
      methods:{
        exportData(){
          let params = {
            createTimeStart:this.searchForm.createTimeStart,
            createTimeEnd:this.searchForm.createTimeEnd,
            prizeId: this.searchForm.prizeId,
            phoneNumber: this.searchForm.phoneNumber,
            isAll:true
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
          exportWinningList(params);
        },
        search(){
         this.currentPage=1;
          this.getTable();
        },
        cleanSearch(){
         this.currentPage=1;
          this.searchForm.createTimeStart=null;
          this.searchForm.createTimeEnd=null;
          this.searchForm.prizeId=null;
          this.searchForm.phoneNumber=null;
          this.getTable();
        },
        getTable(){
          let params = {
            createTimeStart:this.searchForm.createTimeStart,
            createTimeEnd:this.searchForm.createTimeEnd,
            prizeId: this.searchForm.prizeId,
            phoneNumber: this.searchForm.phoneNumber,

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
          this.tableLoading = true;
          winningList(params).then(res => {
            this.tableLoading = false;
            if(res.data.success){
              if( res.data.data && res.data.data.length !==0 ){
                this.tableData = res.data.data;
                this.currentPage = res.data.page.currentPage;
                this.pageSize = res.data.page.pageSize;
                this.totalNumber = res.data.page.totalNumber;
              }else{
                this.tableData = [];
                this.currentPage = 1;
                this.pageSize = 10;
                this.totalNumber = 0;
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
      }
    }
</script>

<style scoped>

</style>
