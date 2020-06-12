<template>
  <Row :gutter="10" class="set-message-center-page">
    <i-col span="24">
      <Card class="search-card">
        <Form ref="searchForm" :model="searchForm" :label-width="80" inline>
          <Row>
            <FormItem :label="$t('channel.tabData.createTime')">
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
            <FormItem :label="$t('channel.tabData.packageName')">
              <Select clearable v-model="searchForm.packageName" class="search-select-item" :placeholder="$t('channel.prompt.packageName')">
                <Option v-for="(item,index) in packageNameList" :key="index" :value="item">{{item}}</Option>
              </Select>
            </FormItem>
            <FormItem :label="$t('channel.tabData.channelName')">
              <Input
                v-model="searchForm.channelName"
                :placeholder="$t('channel.prompt.channelName')"
              ></Input>
            </FormItem>
            <FormItem :label="$t('channel.tabData.firmName')">
              <Input
                v-model="searchForm.company"
                :placeholder="$t('channel.prompt.firmName')"
              ></Input>
            </FormItem>
          </Row>
          <FormItem>
            <Button type="primary" @click="search">{{$t('common.search')}}</Button>
            <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>
          </FormItem>
        </Form>
      </Card>

      <Card style="margin-top: 10px">
        <Button class="add-message-btn" type="primary" @click="showModal">{{$t('channel.modal.add')}}</Button>
        <!--v-on:changeModal="changeModal"  v-on:editSuccess="editSuccess"-->
        <channel-modal
          class="admin-modal"
          :editModal="editModal"
          :chooseItem="chooseItem"
          :packageNameList="packageNameList"
          v-on:changeModal="changeModal"
          v-on:editSuccess="editSuccess"
        ></channel-modal>

        <Table
          border
          class="person-table"
          :columns="columns"
          :data="tableData"
          :loading="tableLoading"
          style="margin-top: 10px"
        />

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
    <!--<Modal :title="$t('banner.tabData.banner')" v-model="isUrl" width="360">-->
    <!--<div class="flex-center">-->
    <!--<Spin fix v-if="imgLoading"></Spin>-->
    <!--<img-->
    <!--:src="url"-->
    <!--alt-->
    <!--class="img-show"-->
    <!--ref="imageShow"-->
    <!--style="width:100px;height:100px;display:block;margin:0 auto;"-->
    <!--&gt;-->
    <!--</div>-->
    <!--<div slot="footer">-->
    <!--<Button type="primary" size="large" @click="iconClose">{{$t('cardManage.sure')}}</Button>-->
    <!--</div>-->
    <!--</Modal>-->
  </Row>
</template>

<script>
  import { formatDate } from "@/assets/js/date";
  import ChannelModal from "_c/operation-modal/channel.vue";
  import { getGoogleSpreadLink,getPackageName } from "@/api/data";
  export default {
    name: "channel",
    components: {
      ChannelModal
    },
    data(){
      return{
        imgLoading: false,
        editModal: false,
        tableLoading: false,
        pageSize: 10,
        totalNumber: 0,
        currentPage: 1,
        packageNameList:[],
        searchForm: {
          createTimeStart:null,
          createTimeEnd:null,
          packageName: null,
          channelName: null,
          company: null
        },
        chooseItem: {
          id: null,
          company:null,
          channelName:null,
          packageName:null,
          // shortLink:null
        },
        tableData: [],
        columns: [
          {
            title: this.$t("channel.tabData.channelId"),
            key: "id",
            align: "center",
            minWidth:150
          },
          {
            title: this.$t("channel.tabData.channelName"),
            key: "channelName",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("channel.tabData.packageName"),
            key: "packageName",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("channel.tabData.firmName"),
            key: "company",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("channel.tabData.long"),
            key: "link",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("channel.tabData.short"),
            key: "shortLink",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("channel.tabData.createTime"),
            key: "createTime",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("common.operating"),
            key: "action",
            width: 200,
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
                      this.copy(params.row.link);
                      this.$Message.success(this.$t('common.copySuccess'));
                    }
                  }
                }, this.$t('channel.copyLong')),
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
                      this.copy(params.row.shortLink);
                      this.$Message.success(this.$t('common.copySuccess'));
                    }
                  }
                }, this.$t('channel.copyShort'))
              ])
            }
          }
        ]
      }
    },
    mounted: function () {
      this.getPackageName();
      this.getTable();
    },
    methods: {
      getPackageName(){
        getPackageName().then(res => {
          if(res.data.success){
            this.packageNameList=res.data.data;
          }else{
            this.$Message.error(res.data.message)
          }
        })
      },
      search() {
        this.currentPage=1;
        this.getTable();
      },
      cleanSearch() {
        this.currentPage=1;
        this.searchForm.createTimeStart = null;
        this.searchForm.createTimeEnd=null;
        this.searchForm.packageName = null;
        this.searchForm.channelName = null;
        this.searchForm.company = null;
        this.getTable();
      },
      showModal () {
        this.editModal = true;
        this.modelItem({'row': {}});
      },
      changeModal(param) {
        this.editModal = param;
        this.modelItem({'row': {}});
      },
      getTable(){
        let params = {
          createTimeStart: this.searchForm.createTimeStart,
          createTimeEnd: this.searchForm.createTimeEnd,
          channelName: this.searchForm.channelName,
          packageName: this.searchForm.packageName,
          company: this.searchForm.company,
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
        getGoogleSpreadLink(params).then(res => {
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
        this.chooseItem.company = params.row.company;
        this.chooseItem.channelName = params.row.channelName;
        this.chooseItem.packageName = params.row.packageName;
        // this.chooseItem.shortLink = params.row.shortLink;
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
      copy(str){
        let save = function (e){
          e.clipboardData.setData('text/plain',str);//下面会说到clipboardData对象
          e.preventDefault();//阻止默认行为
        };
        document.addEventListener('copy',save);
        document.execCommand("copy");//使文档处于可编辑状态，否则无效
      }
    }
  }
</script>

<style scoped>

</style>
