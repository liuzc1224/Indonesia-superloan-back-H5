<template>
  <Row>
    <i-col span="24">
      <Card class="search-card">
        <Form ref="searchForm" :model="searchForm" :label-width="80" inline>
          <Row>
            <FormItem :label="$t('platformData.userLevel.date')">
              <DatePicker
                type="date"
                :clearable="false"
                ref="queryTime"
                :placeholder="$t('platformData.userLevel.date')"
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
  import { levelData } from '@/api/reportCenter'
    export default {
      name: "userLevel",
      data(){
        return {
          tableLoading:false,
          searchForm: {
            queryTime: null,
          },
          tableData: [],
          columns: [
            {
              title: this.$t('platformData.userLevel.level'), key: 'levelName',align: 'center'
            },
            {
              title: this.$t('platformData.userLevel.reachPoints'), key: 'integration',align: 'center',tooltip: true
            },
            {
              title: this.$t('platformData.userLevel.userNumber'), key: 'userCount',align: 'center',tooltip: true
            },
            {
              title: this.$t('platformData.userLevel.yesterday'), key: 'yesterdayUserCount',align: 'center'
            },
            {
              title: this.$t('platformData.userLevel.lastSevenDays'), key: 'recentUserCount',align: 'center',tooltip: true
            }
          ]
        }
      },
      mounted () {
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
          levelData(params).then(res=>{
            if(res.data.success) {
              this.tableLoading=false;
              if( res.data.data && res.data.data.length !==0 ){
                this.tableData = res.data.data;
              }else{
                this.tableData = [];
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
