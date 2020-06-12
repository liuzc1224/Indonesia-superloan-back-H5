<template>
  <Row :gutter="10" class="product-config-page">
    <i-col span="24">
      <Card class="search-card">
        <Form ref="searchForm" :model="searchForm" :label-width="100" inline>
          <Row>
            <FormItem :label="$t('commentManagement.tableData.commentTime')">
              <Row>
                <Col span="11">
                  <DatePicker
                    type="date"
                    clearable
                    ref="createTimeStart"
                    :placeholder="$t('commentManagement.prompt.timeStart')"
                    v-model="searchForm.timeStart"
                    style="width:100%;"
                  ></DatePicker>
                </Col>
                <Col span="2" style="text-align: center">
                  ~
                </Col>
                <Col span="11">
                  <DatePicker
                    type="date"
                    clearable
                    ref="createTimeEnd"
                    :placeholder="$t('commentManagement.prompt.timeEnd')"
                    v-model="searchForm.timeEnd"
                  ></DatePicker>
                </Col>
              </Row>
            </FormItem>
            <FormItem :label="$t('commentManagement.tableData.commentState')">
              <Select clearable v-model="searchForm.status" class="search-select-item" :placeholder="$t('commentManagement.prompt.commentState')">
                <Option v-for="(item,index) in $t('commentManagement.status')" :key="`status_${index}`" :value="item['value']">{{item['desc']}}</Option>
              </Select>
            </FormItem>
            <FormItem :label="$t('commentManagement.tableData.creator')">
              <Select clearable v-model="searchForm.createType" class="search-select-item" :placeholder="$t('commentManagement.prompt.creator')">
                <Option v-for="(item,index) in $t('commentManagement.creator')" :key="`status_${index}`" :value="item['value']">{{item['desc']}}</Option>
              </Select>
            </FormItem>

            <FormItem :label="$t('commentManagement.tableData.account')">
              <Row>
                <Col span="24">
                  <Input
                    v-model="searchForm.userName"
                    maxlength="20"
                    :placeholder="$t('commentManagement.prompt.account')"
                  ></Input>
                </Col>
              </Row>
            </FormItem>
            <FormItem :label="$t('commentManagement.tableData.comments')">
              <Row>
                <Col span="24">
                  <Input v-model="searchForm.comment" maxlength="20" :placeholder="$t('commentManagement.prompt.comments')"></Input>
                </Col>
              </Row>
            </FormItem>
          </Row>
          <FormItem>
            <Button type="primary" @click="search">{{$t('common.search')}}</Button>
            <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>
          </FormItem>
        </Form>
      </Card>

      <Card>
        <Button class="add-message-btn" type="primary" @click="showModal">{{$t('commentManagement.add')}}</Button>
        <Button class="add-message-btn left" :disabled="tableData.length===0 || selectData.length===0" :loading="hideLoading" @click="productHide">{{$t('commentManagement.tableData.hide')}}</Button>
        <Button class="add-message-btn left" :disabled="tableData.length===0 || selectData.length===0" :loading="showLoading" @click="productShow">{{$t('commentManagement.tableData.show')}}</Button>
        <Button class="add-message-btn left" :disabled="tableData.length===0" :loading="hideAllLoading" @click="productHideAll">{{$t('commentManagement.tableData.hideAll')}}</Button>
        <Button class="add-message-btn left" :disabled="tableData.length===0" :loading="showAllLoading" @click="productShowAll">{{$t('commentManagement.tableData.showAll')}}</Button>
        <Table border class="person-table" @on-selection-change="setAll" ref="selection" :columns="columns" :data="tableData" :loading="tableLoading" style="margin-top: 10px"/>
        <comment-modal
          class="admin-modal"
          :editModal="editModal"
          :chooseItem="chooseItem"
          v-on:changeModal="changeModal"
          v-on:editSuccess="editSuccess"
        ></comment-modal>

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

    <Modal v-model="deleteModal" :title="$t('setUpPage.deleteTitle')" :loading="deleteLoading" @on-ok="productDelete" width="300">
      <p>{{$t('setUpPage.deleteTip')}}</p>
    </Modal>

  </Row>
</template>

<script>
  import { formatDate } from "@/assets/js/date";
  import commentModal from '_c/operation-modal/comment-modal.vue'
  import { queryAll ,stateProductComment ,deleteProductComment} from '@/api/product'
  import {sessionRead} from '@/libs/util'
    export default {
      name: "commentManagement",
      components: {
        commentModal
      },
      data(){
        return {
          deleteModal:false,
          hideLoading:false,
          showLoading:false,
          hideAllLoading:false,
          showAllLoading:false,
          deleteLoading:false,
          url:'',
          isUrl:false,
          imgLoading:false,
          editModal:false,
          tableLoading:false,
          pageSize: 10,
          totalNumber: 0,
          currentPage: 1,
          selectData:[],
          searchForm: {
            timeStart:null,
            timeEnd:null,
            userName:null,
            createType:null,
            status:null,
            comment: null,
          },
          numberMax:null,
          isAble:null,
          isNew:null,
          chooseItem: {
            productId:this.$route.params.id,
            id: null,
            userName:null,
            headUrl:null,
            comment:null,
            status:null
          },
          tableData: [],
          columns: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: this.$t('commentManagement.tableData.commentTime'), key: 'createTime',align: 'center',tooltip: true
            },
            {
              title: this.$t('commentManagement.tableData.account'), key: 'userName',align: 'center',tooltip: true
            },
            {
              title: this.$t('commentManagement.tableData.comments'), key: 'comment',align: 'center',tooltip: true
            },
            {
              title: this.$t('commentManagement.tableData.commentState'), key: 'status',align: 'center',tooltip: true,
              render:(h,params)=>{
                let data=this.$t('commentManagement.status');
                let type=data.filter(v => {
                  return v.value===params.row.status;
                });
                let state=(type && type[0].desc) ? type[0].desc : "";
                return h('div',state);
              }
            },

            {
              title: this.$t('commentManagement.tableData.creator'), key: 'creator',align: 'center',
            },
            {
              title: this.$t("common.operating"),
              key: "action",
              width: 300,
              align: "center",
              render: (h, params) => {
                let str=[];
                if(params.row.status===1){
                  if(params.row['createType']===1){
                    str= [
                      h(
                        "Button",
                        {
                          props: {
                            type: "text",
                            // size: "large",
                            icon: "md-eye-off"
                          },
                          class: "edit-btn",
                          style: {
                            backgroundColor: 'transparent',
                            color: "#2d8cf0",
                          },
                          on: {
                            click: () => {
                              let data = {
                                id:[params.row.id],
                                modifierId:sessionRead('loginInfo')['id'],
                                status:0
                              };
                              stateProductComment(data).then(res => {
                                this.deleteLoading = false;
                                if (res.data.success) {
                                  this.$Message.success(this.$t('common.editSuccess'));
                                  this.getTable();
                                } else {
                                  this.$Message.error(res.data.message);
                                }
                              })
                            }
                          }
                        }, this.$t('commentManagement.hide')),
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
                        }, this.$t('commentManagement.edit')),
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
                              // this.delete(params);
                            }
                          }
                        }, this.$t('common.delete')),
                    ]
                  }else{
                    str=[
                      h(
                        "Button",
                        {
                          props: {
                            type: "text",
                            // size: "large",
                            icon: "md-eye-off"
                          },
                          class: "edit-btn",
                          style: {
                            backgroundColor: 'transparent',
                            color: "#2d8cf0",
                          },
                          on: {
                            click: () => {
                              let data = {
                                id:[params.row.id],
                                modifierId:sessionRead('loginInfo')['id'],
                                status:0
                              };
                              stateProductComment(data).then(res => {
                                this.deleteLoading = false;
                                if (res.data.success) {
                                  this.$Message.success(this.$t('common.deleteSuccess'));
                                  this.getTable();
                                } else {
                                  this.$Message.error(res.data.message);
                                }
                              })
                            }
                          }
                        }, this.$t('commentManagement.hide')),
                    ]
                  }
                }
                if(params.row.status===0){
                  if(params.row['createType']===1){
                    str= [
                      h(
                        "Button",
                        {
                          props: {
                            type: "text",
                            // size: "large",
                            icon: "md-eye"
                          },
                          class: "edit-btn",
                          style: {
                            backgroundColor: 'transparent',
                            color: "#2d8cf0",
                          },
                          on: {
                            click: () => {
                              let data = {
                                id:[params.row.id],
                                modifierId:sessionRead('loginInfo')['id'],
                                status:1
                              };
                              stateProductComment(data).then(res => {
                                this.deleteLoading = false;
                                if (res.data.success) {
                                  this.$Message.success(this.$t('common.editSuccess'));
                                  this.getTable();
                                } else {
                                  this.$Message.error(res.data.message);
                                }
                              })
                            }
                          }
                        }, this.$t('commentManagement.show')),
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
                        }, this.$t('commentManagement.edit')),
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
                              // this.delete(params);
                            }
                          }
                        }, this.$t('common.delete'))
                    ]
                  }else{
                    str=[
                      h(
                        "Button",
                        {
                          props: {
                            type: "text",
                            // size: "large",
                            icon: "md-eye"
                          },
                          class: "edit-btn",
                          style: {
                            backgroundColor: 'transparent',
                            color: "#2d8cf0",
                          },
                          on: {
                            click: () => {
                              let data = {
                                id:[params.row.id],
                                modifierId:sessionRead('loginInfo')['id'],
                                status:1
                              };
                              stateProductComment(data).then(res => {
                                this.deleteLoading = false;
                                if (res.data.success) {
                                  this.$Message.success(this.$t('common.editSuccess'));
                                  this.getTable();
                                } else {
                                  this.$Message.error(res.data.message);
                                }
                              })
                            }
                          }
                        }, this.$t('commentManagement.show'))
                    ]
                  }
                }
                return h("div", str)
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
      methods:{
        search(){
          this.currentPage=1;
          this.getTable();
        },
        cleanSearch(){
         this.currentPage=1;
          this.searchForm.timeStart=null;
          this.searchForm.timeEnd=null;
          this.searchForm.createType=null;
          this.searchForm.status=null;
          this.searchForm.userName=null;
          this.searchForm.comment=null;
          this.getTable();
        },
        showModal () {
          this.editModal = true;
          let data={
            'row':{
              productId:this.$route.params.id,
              id: null,
              userName:null,
              headUrl:null,
              comment:null,
              status:null
            }
          };
          this.modelItem(data);
        },
        changeModal (param) {
          this.editModal = param;
          this.modelItem({'row': {}});
        },
        editMessage(params){
          this.modelItem(params);
          this.editModal = true;
        },
        modelItem(params){
          this.chooseItem.id = params.row.id;
          this.chooseItem.productId = params.row.productId;
          this.chooseItem.userName = params.row.userName;
          this.chooseItem.headUrl = params.row.headUrl;
          this.chooseItem.comment = params.row.comment;
          this.chooseItem.status = params.row.status;
        },
        editSuccess (param) {
          this.tableLoading = true;
          this.getTable()
        },
        changePage (params) {
          this.currentPage = params;
          this.getTable();
        },
        pageSizeChange (params) {
          this.pageSize = params;
          this.getTable()
        },
        setAll($event){
          this.selectData=$event;
        },
        getTable(){
          let id=this.$route.params.id;
          let params = {
            id:id,
            timeStart:this.searchForm.timeStart,
            timeEnd:this.searchForm.timeEnd,
            userName:this.searchForm.userName,

            createType:this.searchForm.createType,
            status:this.searchForm.status,
            comment: this.searchForm.comment,

            pageSize: this.pageSize,
            currentPage: this.currentPage,
          };
          if(params.timeEnd && params.timeStart){
            params.timeEnd=formatDate(new Date(params.timeEnd), "yyyy-MM-dd")+" 23:59:59";
            params.timeStart=formatDate(new Date(params.timeStart), "yyyy-MM-dd")+" 00:00:00";
          }

          let start=(new Date(params.timeStart)).getTime();
          let end=(new Date(params.timeEnd)).getTime();
          if( start - end >0 ){
            params.timeEnd=null;
            params.timeStart=null;
          }
          this.tableLoading = true;
          queryAll(params).then(res => {
            this.tableLoading = false;
            if(res.data.success){
              if( res.data.data && res.data.data.length !==0 ){
                this.tableData = res.data.data;this.currentPage = res.data.page.currentPage;
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
        productDelete(){
          this.deleteLoading=true;
          let data=sessionStorage.getItem("delete");
          let params = {
            id:JSON.parse(data).id
          };
          deleteProductComment(params).then(res => {
            this.deleteLoading = false;
            if (res.data.success) {
              this.$Message.success(this.$t('common.deleteSuccess'));
              this.getTable();
            } else {
              this.$Message.error(res.data.message);
            }
          })
        },
        productHide(){
          let arr=[];
          this.selectData.forEach(v=>{
            arr.push(v['id'])
          });
          this.hideLoading=true;
          let params = {
            id:arr,
            modifierId:sessionRead('loginInfo')['id'],
            status:0
          };
          stateProductComment(params).then(res => {
            this.hideLoading = false;
            if (res.data.success) {
              this.$Message.success(this.$t('common.editSuccess'));
              this.getTable();
            } else {
              this.$Message.error(res.data.message);
            }
          })
        },
        productShow(){
          let arr=[];
          this.selectData.forEach(v=>{
            arr.push(v['id'])
          });
          this.showLoading=true;
          let params = {
            id:arr,
            modifierId:sessionRead('loginInfo')['id'],
            status:1
          };
          stateProductComment(params).then(res => {
            this.showLoading = false;
            if (res.data.success) {
              this.$Message.success(this.$t('common.editSuccess'));
              this.getTable();
            } else {
              this.$Message.error(res.data.message);
            }
          })
        },
        productHideAll(){
          this.hideAllLoading=true;
          let params = {
            productId:this.$route.params.id,
            modifierId:sessionRead('loginInfo')['id'],
            status:0
          };
          stateProductComment(params).then(res => {
            this.hideAllLoading = false;
            if (res.data.success) {
              this.$Message.success(this.$t('common.editSuccess'));
              this.getTable();
            } else {
              this.$Message.error(res.data.message);
            }
          })
        },
        productShowAll(){
          this.showAllLoading=true;
          let params = {
            productId:this.$route.params.id,
            modifierId:sessionRead('loginInfo')['id'],
            status:1
          };
          stateProductComment(params).then(res => {
            this.showAllLoading = false;
            if (res.data.success) {
              this.$Message.success(this.$t('common.editSuccess'));
              this.getTable();
            } else {
              this.$Message.error(res.data.message);
            }
          })
        },
        // productHide(data){
        //   this.deleteLoading=true;
        //   let params = {
        //     id:data,
        //     modifierId:sessionRead('loginInfo')['id'],
        //     productId:this.$route.params.id,
        //     status:0
        //   };
        //   stateProductComment(params).then(res => {
        //     this.deleteLoading = false;
        //     if (res.data.success) {
        //       this.$Message.success(this.$t('common.deleteSuccess'));
        //       this.getTable();
        //     } else {
        //       this.$Message.error(res.data.message);
        //     }
        //   })
        // },
        // productShow(data){
        //   let params = {
        //     id:data,
        //     modifierId:sessionRead('loginInfo')['id'],
        //     productId:this.$route.params.id,
        //     status:1
        //   };
        //   stateProductComment(params).then(res => {
        //     this.deleteLoading = false;
        //     if (res.data.success) {
        //       this.$Message.success(this.$t('common.deleteSuccess'));
        //       this.getTable();
        //     } else {
        //       this.$Message.error(res.data.message);
        //     }
        //   })
        // }
      },
      watch:{
        "$route":"getTable"    //后面是methods中的一个方法
      }
    }
</script>

<style scoped lang="less">
  .product-config-page{
    .search-card{
      margin-bottom: 20px;
    }
  }
  .search-select-item{
    width: 162px;
  }
  .left{
    margin-left: 20px;
  }
</style>
