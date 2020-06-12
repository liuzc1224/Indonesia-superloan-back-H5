<template>
  <Row :gutter="10" class="set-message-center-page">
    <i-col span="24">
      <Card class="search-card">
        <Form ref="searchForm" :model="searchForm" :label-width="100" inline>
          <FormItem :label="$t('bankManagement.name')">
            <Row>
              <Col span="24">
                <Input
                  v-model="searchForm.bankName"
                  :placeholder="$t('bankManagement.inputName')"
                >
                </Input>
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
        <bank-modal
          :editModal="editModal"
          :chooseItem="chooseItem"
          v-on:changeModal="changeModal"
          v-on:editSuccess="editSuccess"
        ></bank-modal>

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
      <Modal v-model="deleteModal" :title="$t('setUpPage.deleteTitle')" :loading="deleteLoading" @on-ok="bankDelete" width="300">
        <p>{{$t('setUpPage.deleteTip')}}</p>
      </Modal>
    </i-col>
  </Row>
</template>

<script>
  import { getBank,deleteBank,querySortNumberMax,updateSortWeight } from "@/api/bank";
  import BankModal from "../../../components/operation-modal/bank-modal";
  export default {
    name: "bank-management",
    components: {
      BankModal
    },
    data(){
      return{
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
          bankName: null,
        },
        chooseItem: {
          id: "",
          bankName: "",
          logoPath: "",
          sortWeight: "",
        },
        tableData: [],
        columns: [
          {
            title: this.$t("bankManagement.id"),
            key: "id",
            align: "center",
            minWidth:150
          },
          {
            title: this.$t("bankManagement.name"),
            key: "bankName",
            align: "center",
            tooltip: true,
            minWidth:150
          },
          {
            title: this.$t("bankManagement.logo"),
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
            title: this.$t("bankManagement.sort"),
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
      let newImg = new Image();
      newImg.src ='';
      newImg.onload=()=>{ // 图片加载成功后把地址给原来的img
        this.url = newImg.src;
        this.imgLoading=false;
      }
    },
    methods: {
      search() {
       this.currentPage=1;
        this.getTable();
      },
      cleanSearch() {
       this.currentPage=1;
        this.searchForm.bankName = null;
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
                  sortWeight:res.data.data,
                  logoPath:null,
                  bankName:null,
                }
              };
              this.modelItem(params);
              this.editModal = true;
              this.isAble=true;
            }else{
              let params={
                row: {
                  id: null,
                  sortWeight:1,
                  logoPath:null,
                  bankName:null,
                }
              };
              this.modelItem(params);
              this.editModal = true;
              this.isAble=true;
            }
          }else{
            this.$Message.error(res.data.message)
          }
        });
        this.modelItem({'row': {}});
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
          bankName: this.searchForm.bankName,

          pageSize: this.pageSize,
          currentPage: this.currentPage,
        };
        this.tableLoading = true;
        getBank(params).then(res => {
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
        this.chooseItem.bankName = params.row.bankName;
        this.chooseItem.logoPath = params.row.logoPath;
        this.chooseItem.sortWeight = params.row.sortWeight;
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
      bankDelete(){
        this.deleteLoading=true;
        let data=sessionStorage.getItem("delete");
        let params = {
          id:JSON.parse(data).id
        };
        deleteBank(params).then(res => {
          this.deleteLoading = false;
          if (res.data.success) {
            this.$Message.success(this.$t('common.deleteSuccess'));
            this.getTable();
          } else {
            this.$Message.error(res.data.message);
          }
        })
      },
      getImgUrl(file,avatar){
        let formData=new FormData();
        formData.append("multipartFile",file);
        imgUpload(formData).then(res => {
          if (res.data.success) {
            if(res.data.data){
              this.$Message.success(this.$t('common.imgSuccess'));
              this.formValidate.bannerUrl=res.data.data;
            }
          } else {
            this.$Message.error(res.data.message)
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>

