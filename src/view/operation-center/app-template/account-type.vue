<template>
  <Row :gutter="10" class="set-message-center-page">
    <i-col span="24">
      <Card class="search-card">
        <Form ref="searchForm" :model="searchForm" :label-width="100" inline>
          <FormItem :label="$t('accountType.name')">
            <Row>
              <Col span="24">
                <Input
                  v-model="searchForm.name"
                  :placeholder="$t('accountType.inputName')"
                >
                </Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem :label="$t('accountType.type')">
            <Row>
              <Col span="24">
                <Select
                  clearable
                  v-model="searchForm.type"
                  class="search-select-item"
                  :placeholder="$t('accountType.inputType')"
                >
                  <Option v-for="(item, i) in $t('accountType.types')" :value="item.value" :key="i">{{item.desc}}</Option>
                </Select>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="search">{{$t('common.search')}}</Button>
            <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>
          </FormItem>
        </Form>
      </Card>

      <Card>
        <Button class="add-message-btn" type="primary" @click="showModal">{{$t('common.add')}}</Button>
        <account-modal
          :editModal="editModal"
          :chooseItem="chooseItem"
          :isLoan="isLoan"
          v-on:changeModal="changeModal"
          v-on:editSuccess="editSuccess"
        ></account-modal>

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
      <Modal :title="$t('common.img')" v-model="isUrl" width="360">
        <div class="flex-center">
          <Spin fix v-if="imgLoading"></Spin>
          <img
            :src="url"
            alt
            class="img-show"
            ref="imageShow"
            style="width:100px;height:100px;display:block;margin:0 auto;"
          >
        </div>
        <div slot="footer">
          <Button type="primary" size="large" @click="iconClose">{{$t('cardManage.sure')}}</Button>
        </div>
      </Modal>
      <Modal v-model="deleteModal" :title="$t('setUpPage.deleteTitle')" :loading="deleteLoading" @on-ok="accountDelete" width="300">
        <p>{{$t('setUpPage.deleteTip')}}</p>
      </Modal>
    </i-col>
  </Row>
</template>

<script>
  import { getAccountOption,querySortNumberMax,updateSortWeight ,deleteAccountOption} from "@/api/account";
  import AccountModal from "../../../components/operation-modal/account-modal";
  export default {
    name: "account-type",
    components: {
      AccountModal
    },
    data(){
      return{
        isLoan:false,
        deleteModal:false,
        deleteLoading:false,
        url: "",
        isUrl: false,
        imgLoading: false,
        editModal: false,
        tableLoading: false,
        pageSize: 10,
        totalNumber: 0,
        currentPage: 1,
        searchForm: {
          name: null,
          type: null,
        },
        chooseItem: {
          id: "",
          name: "",
          type: "",
          logoPath: "",
          logoPath1: "",
          marks: "",
          sortWeight:"",
          special:null,
        },
        tableData: [],
        columns: [
          {
            title: this.$t("accountType.id"),
            key: "id",
            align: "center",
            minWidth:150
          },
          {
            title: this.$t("accountType.name"),
            key: "name",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("accountType.type"),
            key: "type",
            align: "center",
            minWidth:150,
            render: (h, params) => {
              let data = this.$t("accountType.types");
              let type = data.filter(v => {
                return v.value === params.row.type;
              });
              let state = type.length > 0 && type[0].desc ? type[0].desc : "";
              return h("div", state);
            }
          },
          {
            title: this.$t("accountType.remarks"),
            key: "marks",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("accountType.logo"),
            key: "logoPath",
            align: "center",
            render: (h, params) => {
              if (params.row['logoPath']) {
                return h(
                  "div",
                  {
                    props: {},
                    style: {
                      color: "#57a3f3",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.showIcon(params.row['logoPath']);
                      }
                    }
                  },
                  this.$t("cardManage.check")
                );
              }
            },
            minWidth:150
          },
          {
            title: this.$t("accountType.logo1"),
            key: "logoPath1",
            align: "center",
            render: (h, params) => {
              if (params.row['logoPath1']) {
                return h(
                  "div",
                  {
                    props: {},
                    style: {
                      color: "#57a3f3",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.showIcon(params.row['logoPath1']);
                      }
                    }
                  },
                  this.$t("cardManage.check")
                );
              }
            },
            minWidth:150
          },
          {
            title: this.$t("accountType.sort"),
            key: "sortWeight",
            align: "center",
            minWidth:150
          },
          {
            title: this.$t("common.operating"),
            key: "action",
            width: 400,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      // size: "large",
                      icon: "md-menu"
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
                  }, this.$t('common.operating')),
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      // size: "large",
                      icon: "md-arrow-up"
                    },
                    class: "edit-btn",
                    style: {
                      backgroundColor: 'transparent',
                      color: "#57a3f3",
                    },
                    on: {
                      click: () => {
                        this.moveUp(params);
                      }
                    }
                  }, this.$t('common.moveUp')),
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      // size: "large",
                      icon: "md-arrow-down"
                    },
                    class: "edit-btn",
                    style: {
                      backgroundColor: 'transparent',
                      color: "#57a3f3",
                    },
                    on: {
                      click: () => {
                        this.moveDown(params);
                      }
                    }
                  }, this.$t('common.moveDown')),
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      // size: "large",
                      icon: "md-close"
                    },
                    class: "edit-btn",
                    style: {
                      backgroundColor: 'transparent',
                      color: "#ed4014",
                    },
                    on: {
                      click: () => {
                        this.deleteModal=true;
                        let data={
                          id:params.row.id
                        };
                        sessionStorage.setItem("delete", JSON.stringify(data));
                      }
                    }
                  }, this.$t('common.delete')),
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
        this.searchForm.type = '';
        this.searchForm.name='';
        this.getTable();
      },
      showIcon(url){
        this.isUrl=true;
        this.imgLoading=true;
        // let newImg = new Image();
        // newImg.src =url;
        // newImg.onload=()=>{ // 图片加载成功后把地址给原来的img
        this.url = url;
        this.imgLoading=false;
        // }
      },
      iconClose(){
        this.url='';
        this.imgLoading=false;
        this.isUrl=false;
      },
      showModal () {
        querySortNumberMax().then(res => {
          if(res.data.success){
            if(res.data.data){
              let params={
                row: {
                  id: null,
                  name:null,
                  type:null,
                  sortWeight:res.data.data,
                  logoPath:null,
                  logoPath1:null,
                  marks:null,
                }
              };
              this.modelItem(params);
              this.editModal = true;
              this.isAble=true;
            }else{
              let params={
                row: {
                  id: null,
                  name:null,
                  type:null,
                  sortWeight:1,
                  logoPath:null,
                  logoPath1:null,
                  marks:null,
                }
              };
              this.modelItem(params);
              this.editModal = true;
              this.isAble=true;
            }
          }else{
            this.$Message.error(res.data.message)
          }
        })
      },
      changeModal(param) {
        this.editModal = param;
        this.modelItem({'row': {}});
      },
      editMessage(data){
        this.modelItem(data);
        if(data.row.special===1){
          this.isLoan=true;
        }else{
          this.isLoan=false;
        }
        this.editModal = true;
      },
      getTable(){
        let params = {
          name: this.searchForm.name,
          type: this.searchForm.type,
          pageSize: this.pageSize,
          currentPage: this.currentPage,
        };
        this.tableLoading = true;
        getAccountOption(params).then(res => {
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
        this.chooseItem.name = params.row.name;
        this.chooseItem.type = params.row.type;
        this.chooseItem.logoPath = params.row.logoPath;
        this.chooseItem.logoPath1 = params.row.logoPath1;
        this.chooseItem.marks = params.row.marks;
        this.chooseItem.sortWeight = params.row.sortWeight;
        this.chooseItem.special = params.row.special;
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
      moveUp(data){
        let sortWeight=data.row.sortWeight;
        if(sortWeight>1){
          this.tableLoading=true;
          let params={
            id:data.row.id,
            sortWeight:sortWeight-1
          };
          updateSortWeight(params).then(res => {
            this.tableLoading = false;
            if (res.data.success) {
              this.$Message.success(this.$t('common.moveUpSuccess'));
              this.getTable();
            } else {
              this.$Message.error(res.data.message);
            }
          })
        }else{
          this.$Message.error(this.$t('common.moveUpMessage'));
        }
      },
      moveDown(_data){
        let sortWeight=_data.row.sortWeight;
        querySortNumberMax().then(res => {
          if(res.data.success){
            if(res.data.data){
              let numberMax=res.data.data;
              if(sortWeight<numberMax){
                let params={
                  id:_data.row.id,
                  sortWeight:sortWeight+1
                };
                updateSortWeight(params).then(res => {
                  this.tableLoading = false;
                  if (res.data.success) {
                    this.$Message.success(this.$t('common.moveDownSuccess'));
                    this.getTable();
                  } else {
                    this.$Message.error(res.data.message);
                  }
                })
              }else{
                this.$Message.error(this.$t('common.moveDownMessage'));
              }
            }
          }else{
            this.$Message.error(res.data.message)
          }
        });
      },
      accountDelete(){
        this.deleteLoading=true;
        let data=sessionStorage.getItem("delete");
        let params = {
          id:JSON.parse(data).id
        };
        deleteAccountOption(params).then(res => {
          this.deleteLoading = false;
          if (res.data.success) {
            this.$Message.success(this.$t('common.deleteSuccess'));
            this.getTable();
          } else {
            this.$Message.error(res.data.message);
          }
        })
      },
      changeLoan(data){
        this.isLoan=data;
      }
    }
  }
</script>

<style scoped>

</style>

