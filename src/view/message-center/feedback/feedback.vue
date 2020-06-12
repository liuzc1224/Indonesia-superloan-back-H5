<template>
  <Row :gutter="10" class="set-message-center-page">
    <i-col span="24">
      <Card class="search-card">
        <Form ref="searchForm" :model="searchForm" :label-width="80" inline>
          <Row>
            <Row>
              <FormItem :label="$t('feedback.submitDate')">
                <Row>
                  <Col span="11">
                    <DatePicker
                      type="date"
                      ref="createTimeStart"
                      :placeholder="$t('feedback.timeStart')"
                      v-model="searchForm.startTime"
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
                      :placeholder="$t('feedback.timeEnd')"
                      v-model="searchForm.endTime"
                    ></DatePicker>
                  </Col>
                </Row>
              </FormItem>
              <FormItem :label="$t('feedback.state')">
                <Row>
                  <Col span="24">
                    <Select
                      clearable
                      v-model="searchForm.opinionStatus"
                      :placeholder="$t('feedback.prompt.state')"
                    >
                      <Option v-for="(item, i) in $t('feedback.status')" :value="item.value" :key="i">{{item.desc}}</Option>
                    </Select>
                  </Col>
                </Row>
              </FormItem>
              <FormItem :label="$t('feedback.userAccount')">
                <Row>
                  <Col span="24">
                    <Input
                      v-model="searchForm.telephone"
                      :placeholder="$t('feedback.prompt.userAccount')"
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

      <Card style="margin-top: 10px">
        <feedback-model
          class="admin-modal"
          :editModal="editModal"
          :chooseItem="chooseItem"
          v-on:changeModal="changeModal"
          v-on:editSuccess="editSuccess"
        ></feedback-model>

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
  import FeedbackModel from "_c/msg-model/feedback-model.vue";
  import { getOpinion, setOpinion } from "@/api/msgCenter";
  import { formatDate } from "@/assets/js/date";
  export default {
    name: "feedback",
    components: {
      FeedbackModel
    },
    data(){
      return{
        imgLoading: false,
        editModal: false,
        tableLoading: false,
        pageSize: 10,
        totalNumber: 0,
        currentPage: 1,
        searchForm: {
          telephone:null,
          startTime:null,
          endTime: null,
          opinionStatus: null,
        },
        chooseItem: {
          id: "",
          opinionVersion : "",
          createTime: "",
          opinionTheme: "",
          opinionContent: "",
          opinionRemark: "",
          opinionStatus: "",
          opinionImageUrlList:[]
        },
        tableData: [],
        columns: [
          {
            title: this.$t("feedback.submitDate"),
            key: "createTimes",
            align: "center",
            minWidth:150
          },
          {
            title: this.$t("feedback.userAccount"),
            key: "telephone",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("feedback.topic"),
            key: "opinionTheme",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("feedback.content"),
            key: "opinionContent",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("feedback.version"),
            key: "opinionVersion",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("feedback.state"),
            key: "opinionStatus",
            align: "center",
            render: (h, params) => {
              let data = this.$t("feedback.status");
              let type = data.filter(v => {
                return v.value === params.row.opinionStatus;
              });
              let state = type.length > 0 && type[0].desc ? type[0].desc : "";
              return h("div", state);
            },
            minWidth:150
          },
          {
            title: this.$t("common.operating"),
            key: "action",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h('span', {
                  props: {
                    type: 'text', size: 'large', icon: 'md-menu'
                  },
                  class: 'edit-btn',
                  style: {
                    color: "#57a3f3",
                    marginRight: '5px',
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.editMessage(params)
                    }
                  }
                }, this.$t('common.edit')),
              ])
            }
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
        this.searchForm.telephone = null;
        this.searchForm.startTime = null;
        this.searchForm.endTime = null;
        this.searchForm.opinionStatus = null;

        this.getTable();
      },
      changeModal(param) {
        this.editModal = param;
        this.modelItem({'row': {}});
      },
      editMessage(data){
        this.modelItem(data);
        this.editModal = true;
      },
      getTable(){
        let params = {
          telephone: this.searchForm.telephone,
          startTime: this.searchForm.startTime,
          endTime: this.searchForm.endTime,
          opinionStatus: this.searchForm.opinionStatus,

          pageSize: this.pageSize,
          currentPage: this.currentPage,
        };
        if(params.startTime && params.endTime){
          params.startTime=formatDate(new Date(params.startTime), "yyyy-MM-dd hh:mm:ss");
          params.endTime=formatDate(new Date(params.endTime), "yyyy-MM-dd")+" 23:59:59";;
        }

        this.tableLoading = true;
        getOpinion(params).then(res => {
          this.tableLoading = false;
          if(res.data.success){
            if( res.data.data && res.data.data.length !==0 ){
              this.tableData = res.data.data;
              this.currentPage = res.data.page.currentPage;
              this.pageSize = res.data.page.pageSize;
              this.totalNumber = res.data.page.totalNumber;
            }else{
              this.tableData = []
            }

          }else{
            this.$Message.error(res.data.message)
          }
        })
      },
      modelItem(params){
        this.chooseItem.id = params.row.id;
        this.chooseItem.opinionVersion = params.row.opinionVersion;
        this.chooseItem.createTime = params.row.createTime;
        this.chooseItem.opinionTheme = params.row.opinionTheme;
        this.chooseItem.opinionContent = params.row.opinionContent;
        this.chooseItem.opinionRemark = params.row.opinionRemark;
        this.chooseItem.opinionStatus = params.row.opinionStatus;
        this.chooseItem.opinionImageUrlList = params.row.opinionImageUrlList;
      },
      editSuccess (param) {
        this.tableLoading = true;
        this.getTable();
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
