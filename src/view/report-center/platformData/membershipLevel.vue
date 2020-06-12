<template>
  <Row>
    <i-col span="24">
      <Card class="search-card">
        <Form ref="searchForm" :model="searchForm" :label-width="80" inline>
          <Row>
            <FormItem :label="$t('platformData.membershipLevel.date')">
              <DatePicker
                type="date"
                :clearable="false"
                ref="queryTime"
                :placeholder="$t('platformData.membershipLevel.date')"
                v-model="searchForm.queryTime"
                style="width:100%;"
              ></DatePicker>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="search">{{$t('common.search')}}</Button>
              <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>
            </FormItem>
          </Row>
        </Form>
      </Card>
      <Card style="margin-top: 10px">

        <Table border class="person-table" :columns="columns" :data="tableData" :loading="tableLoading" style="margin-top: 10px"/>
      </Card>
    </i-col>
  </Row>
</template>

<script>
  import { formatDate } from "@/assets/js/date";
  import { vipData } from '@/api/reportCenter'
  export default {
    name: "membershipLevel",
    data(){
      return {
        tableLoading:false,
        searchForm: {
          queryTime: null,
        },
        tableData: [],
        columns: [
          {
            title: this.$t('platformData.membershipLevel.level'), key: 'memberName',align: 'center',minWidth:150
          },
          {
            title: this.$t('platformData.membershipLevel.userNumber'), key: 'userCount',align: 'center',tooltip: true,minWidth:150
          },
          {
            title: this.$t('platformData.membershipLevel.yesterday'), key: 'yesterdayUserCount',align: 'center',minWidth:150
          },
          {
            title: this.$t('platformData.membershipLevel.lastSevenDays'), key: 'recentUserCount',align: 'center',tooltip: true,minWidth:150
          }
        ]
      }
    },
    mounted: function () {
      this.searchForm.queryTime=formatDate(new Date(), "yyyy-MM-dd");
      this.getTable();
    },
    methods:{
      search(){
       this.currentPage=1;
        this.getTable();
      },
      cleanSearch(){
       this.currentPage=1;
        this.searchForm.queryTime=formatDate(new Date(), "yyyy-MM-dd");
        this.getTable();
      },
      getTable(){
        let params = {
          queryTime:this.searchForm.queryTime ? this.searchForm.queryTime : null
        };
        if(params.queryTime){
          params.queryTime=formatDate(new Date(params.queryTime), "yyyy-MM-dd")+" 23:59:59";
        }
        this.tableLoading = true;
        vipData(params).then(res=>{
          this.tableLoading=false;
          if(res.data.success) {
            if( res.data.data && res.data.data.length !==0 ){
              this.tableData = res.data.data
            }else{
              this.tableData = []
            }
          }else{
            this.$Message.error(res.data.message)
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
