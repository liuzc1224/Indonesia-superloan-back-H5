<template>
  <Row :gutter="10" class="set-message-center-page">
    <i-col span="24">
<!--      <Card class="search-card">-->
<!--        <Form ref="searchForm" :model="searchForm" :label-width="100" inline>-->
<!--            <Row>-->
<!--              <FormItem :label="$t('pushTemplate.status')">-->
<!--                <Row>-->
<!--                  <Col span="24">-->
<!--                    <Select-->
<!--                      clearable-->
<!--                      v-model="searchForm.status"-->
<!--                      class="search-select-item"-->
<!--                      :placeholder="$t('pushTemplate.inputStatus')"-->
<!--                    >-->
<!--                      <Option v-for="(item, i) in $t('pushTemplate.state')" :value="item.value" :key="i">{{item.desc}}</Option>-->
<!--                    </Select>-->
<!--                  </Col>-->
<!--                </Row>-->
<!--              </FormItem>-->
<!--              <FormItem :label="$t('pushTemplate.type')">-->
<!--                <Row>-->
<!--                  <Col span="24">-->
<!--                    <Select-->
<!--                      clearable-->
<!--                      v-model="searchForm.type"-->
<!--                      class="search-select-item"-->
<!--                      :placeholder="$t('pushTemplate.inputType')"-->
<!--                    >-->
<!--                      <Option v-for="(item, i) in $t('pushTemplate.types')" :value="item.value" :key="i">{{item.desc}}</Option>-->
<!--                    </Select>-->
<!--                  </Col>-->
<!--                </Row>-->
<!--              </FormItem>-->
<!--              <FormItem :label="$t('pushTemplate.theme')">-->
<!--                <Row>-->
<!--                  <Col span="24">-->
<!--                    <Input-->
<!--                      v-model="searchForm.theme"-->
<!--                      :placeholder="$t('pushTemplate.inputTheme')"-->
<!--                    >-->
<!--                    </Input>-->
<!--                  </Col>-->
<!--                </Row>-->
<!--              </FormItem>-->
<!--            </Row>-->
<!--            <FormItem>-->
<!--              <Button type="primary" @click="search">{{$t('common.search')}}</Button>-->
<!--              <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>-->
<!--            </FormItem>-->
<!--        </Form>-->
<!--      </Card>-->

      <Card>
        <push-modal
          :editModal="editModal"
          :chooseItem="chooseItem"
          v-on:changeModal="changeModal"
          v-on:editSuccess="editSuccess"
        ></push-modal>

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
  import { getPushTemplateList } from "@/api/push";
  import PushModal from "../../../components/operation-modal/push-modal";
  export default {
    name: "push-template",
    components: {
      PushModal
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
          theme: null,
          type: null,
          status: null
        },
        chooseItem: {
          id: "",
          title: "",
          text: "",
          textStyle: "",
          status: "",
        },
        tableData: [],
        columns: [
          {
            title: this.$t("pushTemplate.id"),
            key: "id",
            align: "center",
            minWidth:150
          },
          {
            title: this.$t("pushTemplate.theme"),
            key: "title",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("pushTemplate.content"),
            key: "text",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("pushTemplate.content"),
            key: "textStyle",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("pushTemplate.status"),
            key: "status",
            align: "center",
            render: (h, params) => {
              let data = this.$t("pushTemplate.state");
              let type = data.filter(v => {
                return v.value === params.row.status+'';
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
                }, this.$t('common.edit'))
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
        this.searchForm.theme = '';
        this.searchForm.type='';
        this.searchForm.status = '';
        this.getTable();
      },
      showModal () {
        this.editModal = true;
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
          // theme: this.searchForm.theme,
          // type: this.searchForm.type,
          // status: this.searchForm.status,
          pageSize: this.pageSize,
          currentPage: this.currentPage,
        };
        this.tableLoading = true;
        getPushTemplateList(params).then(res => {
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
      modelItem(params){
        this.chooseItem.id = params.row.id;
        this.chooseItem.title = params.row.title;
        this.chooseItem.textStyle = params.row.textStyle;
        this.chooseItem.text = params.row.text;
        this.chooseItem.status = params.row.status+'';
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

