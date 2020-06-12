<template>
  <Row>
    <i-col :span="24">
      <Card class="search-card">
        <Form ref="searchForm" :model="searchForm" :label-width="100" inline>
          <Row>
            <FormItem :label="$t('lotteryPrizes.id')">
              <Row>
                <i-col span="24">
                  <Input
                    v-model="searchForm.id"
                    :placeholder="$t('lotteryPrizes.prompt.id')"
                  ></Input>
                </i-col>
              </Row>
            </FormItem>
            <FormItem :label="$t('lotteryPrizes.name')">
              <Row>
                <i-col span="24">
                  <Input v-model="searchForm.prizeName" :placeholder="$t('lotteryPrizes.prompt.name')"></Input>
                </i-col>
              </Row>
            </FormItem>
            <FormItem :label="$t('lotteryPrizes.remark')">
              <Row>
                <i-col span="24">
                  <Input v-model="searchForm.remark" :placeholder="$t('lotteryPrizes.prompt.remark')"></Input>
                </i-col>
              </Row>
            </FormItem>
            <FormItem :label="$t('lotteryPrizes.state')">
              <Row>
                <i-col span="24">
                  <Select
                    clearable
                    v-model="searchForm.status"
                    class="search-select-item"
                    :placeholder="$t('lotteryPrizes.prompt.state')"
                    style="width:200px"
                  >
                    <Option v-for="(item, i) in $t('lotteryPrizes.status')" :value="item.value" :key="i">{{item.desc}}</Option>
                  </Select>
                </i-col>
              </Row>
            </FormItem>
          </Row>
          <FormItem>
            <Button type="primary" @click="search">{{$t('common.search')}}</Button>
            <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>
          </FormItem>
        </Form>
      </Card>
      <Card style="margin-top: 10px">
        <Button class="add-message-btn" type="primary" @click="showModal">{{$t('lotteryPrizes.add')}}</Button>
        <Table border class="person-table" :columns="columns" :data="tableData" :loading="tableLoading" style="margin-top: 10px"/>
        <lottery-prize-management-modal :editModal="editModal" :chooseItem="chooseItem" v-on:changeModal="changeModal" v-on:editSuccess="editSuccess"></lottery-prize-management-modal>
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
    </i-col>
  </Row>
</template>

<script>
  import { activityList } from '@/api/product'
import lotteryPrizeManagementModal from '_c/operation-modal/lotteryPrizeManagement-modal.vue'
    export default {
      name: "lotteryPrizes",
      components:{
        lotteryPrizeManagementModal
      },
      data(){
        return{
          url: "",
          isUrl: false,
          imgLoading: false,
          searchForm: {
            id:null,
            prizeName:null,
            remark :null,
            status :null,
          },
          editModal:false,
          tableLoading:false,
          chooseItem:{
            id:null,
            prizeName:null,
            remark :null,
            prizeImg:null,
            prizeDesc:null,
            notify:null,
            probability:null,
            prizeType:null,
            prizeValue:null,
            redPacket:null,
            currencyUnit:null,
            totalNum:null,
            usedNum:null,
            status:null
          },
          tableData: [],
          columns: [
            {
              title: this.$t('lotteryPrizes.id'), key: 'id',align: 'center'
            },
            {
              title: this.$t('lotteryPrizes.name'), key: 'prizeName',align: 'center',tooltip: true
            },
            {
              title: this.$t('lotteryPrizes.remark'), key: 'remark',align: 'center',tooltip: true
            },
            {
              title: this.$t('lotteryPrizes.image'), key: 'prizeImg',align: 'center',tooltip: true,
              render:(h,params)=>{
                if(params.row['prizeImg']) {
                  return h('div', {
                    props: {},
                    style: {
                      color: '#57a3f3',
                      cursor: "pointer",
                    },
                    on: {
                      click: () => {
                        this.showIcon(params.row['prizeImg']);
                      }
                    }
                  }, this.$t('lotteryPrizes.viewImage'))
                }
              },
            },
            {
              title: this.$t('lotteryPrizes.prizeDescription'), key: 'prizeDesc',align: 'center',tooltip: true
            },
            {
              title: this.$t('lotteryPrizes.winningNotice'), key: 'notify',align: 'center',tooltip: true
            },
            {
              title: this.$t('lotteryPrizes.probability'), key: 'probability',align: 'center',
              render:(h,params)=>{
                if(params.row['probability']){
                  let aa=(params.row['probability']*100).toFixed(2)+"%";
                  return h('div',aa);
                }
              },
            },
            {
              title: this.$t('lotteryPrizes.totalAmount'), key: 'totalNum',align: 'center',tooltip: true
            },
            {
              title: this.$t('lotteryPrizes.used'), key: 'usedNum',align: 'center',tooltip: true
            },
            {
              title: this.$t('lotteryPrizes.margin'), key: 'surplusNum',align: 'center',tooltip: true
            },
            {
              title: this.$t('lotteryPrizes.state'), key: 'status',align: 'center',
              render:(h,params)=>{
                let data=this.$t('lotteryPrizes.status');
                let type=data.filter(v => {
                  return v.value===params.row.status;
                });
                let state=(type.length>0 && type[0].desc) ? type[0].desc : "";
                return h('div',state);
              },
            },
            {
              title: this.$t('lotteryPrizes.operator'), key: 'operatorName',align: 'center',tooltip: true
            },
            {
              title: this.$t('lotteryPrizes.UpdateTime'), key: 'modifyTime',align: 'center',tooltip: true
            },
            {
              title: this.$t("common.operating"),
              key: "action",
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
      mounted(){
        let newImg = new Image();
        newImg.src ='';
        newImg.onload=()=>{ // 图片加载成功后把地址给原来的img
          this.url = newImg.src;
          this.imgLoading=false;
        };
        this.getTable();
      },
      methods:{
        search(){
          this.currentPage=1;
          this.getTable();
        },
        cleanSearch(){
          this.currentPage=1;
          this.searchForm.prizeName=null;
          this.searchForm.remark=null;
          this.searchForm.id=null;
          this.searchForm.status=null;
          this.getTable();
        },
        getTable(){
          this.tableLoading = true;
          let params=this.searchForm;
          activityList(params).then(res => {
            this.tableLoading = false;
            if(res.data.success){
              this.tableData=res.data.data;
            }else{
              this.$Message.error(res.data.message)
            }
          })
        },
        editMessage(params){
          this.modelItem(params);
          this.editModal = true;
        },
        modelItem(params){
          this.chooseItem.id = params.row.id;
          this.chooseItem.prizeName = params.row.prizeName;
          this.chooseItem.remark = params.row.remark;
          this.chooseItem.prizeImg = params.row.prizeImg;
          this.chooseItem.prizeDesc = params.row.prizeDesc;
          this.chooseItem.notify = params.row.notify;
          this.chooseItem.probability = params.row.probability;
          this.chooseItem.prizeType = params.row.prizeType;
          this.chooseItem.prizeValue = params.row.prizeValue;
          this.chooseItem.redPacket =  params.row.redPacket;
          this.chooseItem.currencyUnit = params.row.currencyUnit;
          this.chooseItem.totalNum = params.row.totalNum;
          this.chooseItem.usedNum = params.row.usedNum;
          this.chooseItem.status = params.row.status;
          if(this.chooseItem.probability){
            this.chooseItem.probability=parseFloat((this.chooseItem.probability*100).toFixed(2));
          }
        },
        showModal(){
          let params={'row': {}};
          this.modelItem(params);
          this.editModal=true;
        },
        editSuccess () {
          this.tableLoading = true;
          this.getTable()
        },
        changeModal (param) {
          this.editModal = param;
          this.modelItem({'row': {}});
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
      }
    }
</script>

<style scoped>

</style>
