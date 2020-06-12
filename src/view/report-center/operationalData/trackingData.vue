<template>
  <Row>
    <Card>
      <Form ref="searchForm" :model="searchForm" :label-width="100" inline>
        <Row>
          <FormItem :label="$t('operationalData.trackingData.data')">
            <Row>
              <i-col span="11">
                <DatePicker
                  type="date"
                  :clearable="false"
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
                  :clearable="false"
                  ref="createTimeEnd"
                  :placeholder="$t('common.timeEnd')"
                  v-model="searchForm.createTimeEnd"
                ></DatePicker>
              </i-col>
            </Row>
          </FormItem>
          <FormItem :label="$t('operationalData.trackingData.promotingMethod')">
            <Row>
              <i-col span="24">
                <Select
                  clearable
                  v-model="searchForm.displayType"
                  class="search-select-item"
                  :placeholder="$t('operationalData.trackingData.select')"
                  style="width:200px"
                >
                  <Option v-for="(item, i) in $t('operationalData.trackingData.methods')" :value="item['value']" :key="i">{{item['desc']}}</Option>
                </Select>
              </i-col>
            </Row>
          </FormItem>
          <FormItem :label="$t('operationalData.trackingData.productId')">
            <Input v-model="searchForm.productId" :placeholder="$t('operationalData.trackingData.inputProductId')"></Input>
          </FormItem>
          <FormItem :label="$t('operationalData.trackingData.productName')">
            <Input v-model="searchForm.productName" :placeholder="$t('operationalData.trackingData.inputProductName')"></Input>
          </FormItem>
          <Row>
            <FormItem>
              <Button type="primary" @click="search">{{$t('common.search')}}</Button>
              <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>
              <Button style="margin-left: 30px" :disabled="totalNumber===0" @click="exportData()">{{$t('common.export')}}</Button>
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
    <tracking-modal :editModal="editModal" :chooseItem="chooseItem" v-on:changeModal="changeModal" v-on:editSuccess="editSuccess"></tracking-modal>
  </Row>
</template>

<script>
  import { formatDate } from "@/assets/js/date";
  import { productSales,productSalesExport } from '@/api/reportCenter'
  import trackingModal from '_c/report-modal/tracking-modal.vue'
    export default {
      name: "trackingData",
      components:{
        trackingModal
      },
      data(){
        return {
          editModal: false,
          tableLoading: false,
          pageSize: 10,
          totalNumber: 0,
          currentPage: 1,
          searchForm: {
            createTimeStart: null,
            createTimeEnd: null,
            displayType: null,
            productId: null,
            productName: null
          },
          chooseItem:{
            id: null,
            productId: null,
            productName: null,
            downloadCount: null
          },
          tableData: [],
          columns: [
            {
              title: this.$t('operationalData.trackingData.data'), key: 'dateStr', align: 'center', tooltip: true, minWidth:150
            },
            {
              title: this.$t('operationalData.trackingData.productId'), key: 'productId', align: 'center', minWidth:150
            },

            {
              title: this.$t('operationalData.trackingData.productName'),
              key: 'productName',
              align: 'center',
              tooltip: true,
              minWidth:150
            },
            {
              title: this.$t('operationalData.trackingData.promotingMethod'),
              key: 'displayType',
              align: 'center',
              tooltip: true,
              // fixed: 'left',
              minWidth:150,
              render:(h,params)=>{
                let data=this.$t('operationalData.trackingData.methods');
                let type=data.filter(v => {
                  return v.value===params.row.displayType;
                });
                let state=(type.length>0 && type[0].desc) ? type[0].desc : "";
                return h('div',state);
              }
            },
            {
              title: this.$t('operationalData.trackingData.downNumber'),
              key: 'downloadCount',
              align: 'center',
              tooltip: true,
              minWidth:150
            },
            {
              title: this.$t('operationalData.trackingData.updater'),
              key: 'modifyOperatorName',
              align: 'center',
              tooltip: true,
              minWidth:150
            },
            {
              title: this.$t('operationalData.trackingData.updateTime'),
              key: 'modifyTime',
              align: 'center',
              tooltip: true,
              minWidth:150
            },
            {
              title: this.$t("common.operating"),
              key: "action",
              width: 150,
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
                ])
              }
            }
          ]
        }
      },
      mounted() {
        this.searchForm.createTimeStart=formatDate(new Date(), "yyyy-MM-dd");
        this.searchForm.createTimeEnd=formatDate(new Date(), "yyyy-MM-dd");
        this.search();
      },
      methods:{
        search() {
          this.currentPage=1;
          this.getTable();
        },
        cleanSearch(){
          this.searchForm.createTimeStart=formatDate(new Date(), "yyyy-MM-dd");
          this.searchForm.createTimeEnd=formatDate(new Date(), "yyyy-MM-dd");
          this.searchForm.displayType = null;
          this.searchForm.productId = null;
          this.searchForm.productName = null;
          this.search();
        },
        getTable(){
          let params = this.searchData();
          this.tableLoading = true;
          productSales(params).then(res => {
            this.tableLoading = false;
            if(res.data.success){
              if( res.data.data && res.data.data.length !==0 ){
                this.tableData = res.data.data;
                this.currentPage = res.data.page.currentPage;
                this.pageSize = res.data.page.pageSize;
                this.totalNumber = res.data.page.totalNumber;
              }else{
                this.tableData = [];
                this.totalNumber = 0;
              }
            }else{
              this.$Message.error(res.data.message)
            }
          }).catch(err => {
            console.log(err);
            this.tableLoading = false;
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
        searchData(){
          let params = {
            createTimeStart:this.searchForm.createTimeStart,
            createTimeEnd:this.searchForm.createTimeEnd,
            displayType:this.searchForm.displayType,
            productId:this.searchForm.productId,
            productName: this.searchForm.productName,

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
          return params;
        },
        exportData(){
          let params = this.searchData();
          productSalesExport(params);
        },
        changeModal(param) {
          this.editModal = param;
          this.modelItem({'row': {}});
        },
        editSuccess (param) {
          this.tableLoading = true;
          this.getTable()
        },
        editMessage(data){
          this.modelItem(data);
          this.editModal = true;
        },
        modelItem(params) {
          this.chooseItem.id = params.row.id;
          this.chooseItem.productId = params.row.productId;
          this.chooseItem.productName = params.row.productName;
          this.chooseItem.downloadCount = params.row.downloadCount;
        }
      },
    }
</script>

<style scoped>

</style>
