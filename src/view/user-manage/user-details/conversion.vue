<template>
  <Row :gutter="10" class="set-message-center-page">
    <i-col span="24">
      <Row>
        <Form ref="searchForm" :model="searchForm" :label-width="100" inline>
          <Row>
            <FormItem :label="$t('userDetail.conversions.time')">
              <Row>
                <Col span="11">
                  <DatePicker
                    type="date"
                    ref="createTimeStart"
                    :placeholder="$t('userDetail.timeStart')"
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
                    ref="createTimeEnd"
                    :placeholder="$t('userDetail.timeEnd')"
                    v-model="searchForm.createTimeEnd"
                  ></DatePicker>
                </Col>
              </Row>
            </FormItem>

            <FormItem :label="$t('userDetail.conversions.schedule')">
              <Row>
                <Col span="24">
                  <Select
                    clearable
                    v-model="searchForm.status"
                    class="search-select-item"
                    :placeholder="$t('userDetail.conversions.prompt.schedule')"
                  >
                    <Option v-for="(item, i) in $t('userDetail.conversions.schedules')" :value="item.value" :key="i">{{item.desc}}</Option>
                  </Select>
                </Col>
              </Row>
            </FormItem>

          </Row>
          <FormItem>
            <Button type="primary" @click="search">{{$t('common.search')}}</Button>
            <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>
          </FormItem>
        </Form>
      </Row>

      <Row>
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
      </Row>
    </i-col>
  </Row>
</template>

<script>
  import { bill } from "@/api/user";
  import { formatDate } from "@/assets/js/date";
  export default {
    name: "conversion",
    data(){
      return{
        imgLoading: false,
        tableLoading: false,
        pageSize: 10,
        totalNumber: 0,
        currentPage: 1,
        searchForm: {
          createTimeStart:null,
          createTimeEnd:null,
          channelId: null,
          channelName: null,
          status: null
        },
        tableData: [],
        columns: [
          {
            title: this.$t("userDetail.conversions.name"),
            key: "channelId",
            align: "center",
            minWidth:150
          },
          {
            title: this.$t("userDetail.conversions.time"),
            key: "channelName",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("userDetail.conversions.registrationTime"),
            key: "registerIp",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("userDetail.conversions.applicationTime"),
            key: "registerIp",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("userDetail.conversions.LoanTime"),
            key: "applyIp",
            align: "center",
            minWidth:150
            // render: (h, params) => {
            //   let data = this.$t("channel.status");
            //   let type = data.filter(v => {
            //     return v.value === params.row.status;
            //   });
            //   let state = type.length > 0 && type[0].desc ? type[0].desc : "";
            //   return h("div", state);
            // }
          },
          {
            title: this.$t("userDetail.conversions.schedule"),
            key: "registerIp",
            align: "center",
            tooltip: true,
            minWidth:150
          }
        ]
      }
    },
    mounted: function () {
      this.getTable();
    },
    methods: {
      search() {
        this.currentPage=1;
        this.getTable();
      },
      cleanSearch() {
        this.currentPage=1;
        this.searchForm.channelId = '';
        this.searchForm.channelName='';
        this.searchForm.status = '';
        this.getTable();
      },
      getTable(){
        // let queryData=JSON.parse(sessionStorage.getItem("user-details"));
        // let params = {
        //   userId:queryData['id'],
        //   channelId: this.searchForm.channelId,
        //   channelName: this.searchForm.channelName,
        //   status: this.searchForm.status,
        //   pageSize: this.pageSize,
        //   currentPage: this.currentPage,
        // };
        // this.tableLoading = true;
        // bill(params).then(res => {
        //   this.tableLoading = false;
        //   if(res.data.success){
        //     console.log(res.data.data);
        //     if( res.data.data && res.data.data.length !==0 ){
        //       this.tableData = res.data.data
        //     }else{
        //       this.tableData = []
        //     }
        //     this.currentPage = res.data.page.currentPage;
        //     this.pageSize = res.data.page.pageSize;
        //     this.totalNumber = res.data.page.totalNumber;
        //   }else{
        //     this.$Message.error(res.data.message)
        //   }
        // })
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

