<template>
    <Row>
      <i-col :span="24">
        <Row style="margin-bottom: 10px">
          <i-col :span="5">
            <h1>{{$t('sweepstakes.sweepstakes')}}</h1>
          </i-col>
          <i-col :span="19" style="text-align: right">
            <Button size="large" @click="viewWinningList()">{{$t('sweepstakes.viewWinningList')}}</Button>
            <Button size="large" @click="editLottery()" style="margin-left: 30px">{{$t('sweepstakes.editLottery')}}</Button>
            <Button size="large" @click="managementLotteryPrizes()" style="margin-left: 30px">{{$t('sweepstakes.managementLotteryPrizes')}}</Button>
          </i-col>
        </Row>
        <hr/>
        <Row style="margin-top: 10px">
          <i-col :span="24" style="background-color: #cccccc;padding-left: 10px">
            <h1>{{$t('sweepstakes.eventDescription')}}</h1>
          </i-col>
          <i-col :span="10">
            <Row :gutter="20" style="text-align: center;margin-top: 10px;" class="imgRow">
              <i-col :span="7" :offset="1" style="background-color: #cccccc">
                <h1>1</h1>
              </i-col>
              <i-col :span="7" :offset="1" style="background-color: #cccccc">
                <h1>2</h1>
              </i-col>
              <i-col :span="7" :offset="1" style="background-color: #cccccc">
                <h1>3</h1>
              </i-col>
            </Row>
            <Row :gutter="20" style="text-align: center;margin-top: 10px" class="imgRow">
              <i-col :span="7" :offset="1" style="background-color: #cccccc">
                <h1>8</h1>
              </i-col>
              <i-col :span="7" :offset="1" style="background-color: #000000;color: #ffffff;font-size: 1.5em">
                <p>{{$t('sweepstakes.start')}}</p>
              </i-col>
              <i-col :span="7" :offset="1" style="background-color: #cccccc">
                <h1>4</h1>
              </i-col>
            </Row>
            <Row :gutter="20" style="text-align: center;margin-top: 10px" class="imgRow">
              <i-col :span="7" :offset="1" style="background-color: #cccccc">
                <h1>7</h1>
              </i-col>
              <i-col :span="7" :offset="1" style="background-color: #cccccc">
                <h1>6</h1>
              </i-col>
              <i-col :span="7" :offset="1" style="background-color: #cccccc">
                <h1>5</h1>
              </i-col>
            </Row>
          </i-col>
        </Row>
        <Row style="margin-top: 10px">
          <i-col :span="24" style="background-color: #cccccc;padding-left: 10px">
            <h1>{{$t('sweepstakes.prizes')}}</h1>
          </i-col>
          <i-col :span="24">
            <Card style="margin-top: 10px">
              <Table border class="person-table" :columns="columns" :data="tableData" :loading="tableLoading" style="margin-top: 10px"/>
            </Card>
          </i-col>
        </Row>
      </i-col>
      <Modal :title="$t('product.tabData.icon')" v-model="isUrl" width="360">
        <div class="flex-center">
          <Spin fix v-if="imgLoading"></Spin>
          <img :src="url" alt="" class="img-show " ref="imageShow" style="width:100px;height:100px;display:block;margin:0 auto;">
        </div>
        <div slot="footer">
          <Button type="primary" size="large" @click="iconClose">{{$t('cardManage.sure')}}</Button>
        </div>
      </Modal>
      <lottery-prizes-modal class="admin-modal" ref="lotteryPrizesModal" :editModal="lotteryPrizesModal" :chooseItem="chooseLotteryPrizesItem" v-on:changeModal="changeLotteryPrizesModal" v-on:editSuccess="editSuccess"></lottery-prizes-modal>
      <lottery-modal class="admin-modal" ref="lotteryModal" :editModal="lotteryModal" :chooseItem="chooseLotteryItem" v-on:changeModal="changeLotteryModal"></lottery-modal>
    </Row>
</template>

<script>
  import { listPrizePool,getLotteryType } from '@/api/product'
  import lotteryPrizesModal from '_c/operation-modal/lotteryPrizesModal.vue'
  import lotteryModal from '_c/operation-modal/lotteryModal.vue'
    export default {
      name: "sweepstakes",
      components: {
        lotteryPrizesModal,
        lotteryModal
      },
      data(){
        return{
          url: "",
          isUrl: false,
          imgLoading: false,
          lotteryPrizesModal:false,
          lotteryModal:false,
          chooseLotteryPrizesItem:{
            prizeId:null,
            positionId:null
          },
          chooseLotteryItem:{
            lotteryType:null,
            everyConsume:null,
            everydayLotteryMostNum:null,
            id:null,
            status:null
          },
          tableLoading:false,
          tableData: [],
          columns: [
            {
              title: this.$t('sweepstakes.position'), key: 'positionId',align: 'center',
              minWidth:100
            },
            {
              title: this.$t('sweepstakes.id'), key: 'prizeId',align: 'center',tooltip: true,
              minWidth:100
            },
            {
              title: this.$t('sweepstakes.name'), key: 'prizeName',align: 'center',tooltip: true,
              minWidth:150
            },
            {
              title: this.$t('sweepstakes.image'), key: 'prizeImg',align: 'center',
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
                  }, this.$t('sweepstakes.viewImage'))
                }
              },
              minWidth:150
            },
            {
              title: this.$t('sweepstakes.prizeDescription'), key: 'prizeDesc',align: 'center',tooltip: true,
              minWidth:150
            },
            {
              title: this.$t('sweepstakes.winningNotice'), key: 'notify',align: 'center',tooltip: true,
              minWidth:150
            },
            {
              title: this.$t('sweepstakes.probability'), key: 'probability',align: 'center',tooltip: true,
              minWidth:150
            },
            {
              title: this.$t('sweepstakes.totalAmount'), key: 'totalNum',align: 'center',tooltip: true,
              minWidth:150
            },
            {
              title: this.$t('sweepstakes.used'),
              key: 'usedNum',
              align: 'center',
              tooltip: true,
              minWidth:150
            },
            {
              title: this.$t('sweepstakes.margin'), key: 'surplusNum',align: 'center',tooltip: true,
              minWidth:150
            },
            {
              title: this.$t('sweepstakes.state'), key: 'prizeManageStatus',align: 'center',
              render:(h,params)=>{
                let data=this.$t('sweepstakes.status');
                let type=data.filter(v => {
                  return v.value===params.row['prizeManageStatus'];
                });
                let state=(type.length>0 && type[0].desc) ? type[0].desc : "";
                return h('div',state);
              },
              minWidth:150
            },
            {
              title: this.$t("common.operating"),
              key: "action",
              fixed: 'right',
              minWidth:120,
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
        viewWinningList(){
          this.$router.push({
            name:"winningList"
          })
        },
        editLottery(){
          getLotteryType().then(res => {
            this.tableLoading = false;
            if(res.data.success){
              this.chooseLotteryItem.id=res.data.data['id'];
              this.chooseLotteryItem.lotteryType=res.data.data['lotteryType'];
              this.chooseLotteryItem.everyConsume=res.data.data['everyConsume'];
              this.chooseLotteryItem.everydayLotteryMostNum=res.data.data['everydayLotteryMostNum'];
              this.chooseLotteryItem.status =res.data.data['status'];
              this.lotteryModal = true;
            }else{
              this.$Message.error(res.data.message)
            }
          })

        },
        managementLotteryPrizes(){
          this.$router.push({
            name:"lotteryPrizes"
          })
        },
        getTable(){
          this.tableLoading = true;
          listPrizePool().then(res => {
            this.tableLoading = false;
            if(res.data.success){
              this.tableData=res.data.data;
              this.tableData=this.tableData.sort(this.compare('positionId'))
            }else{
              this.$Message.error(res.data.message)
            }
          })
        },
        compare(property){
          return function(a,b){
            let value1 = a[property];
            let value2 = b[property];
            return value1 - value2;
          }
        },
        iconClose(){
          this.url='';
          this.imgLoading=false;
          this.isUrl=false;
        },
        editSuccess () {
          this.tableLoading = true;
          this.getTable()
        },
        modelItem(params){
          this.chooseLotteryPrizesItem.prizeId = params.row.prizeId;
          this.chooseLotteryPrizesItem.positionId = params.row.positionId;
        },
        changeLotteryPrizesModal (param) {
          this.lotteryPrizesModal = param;
          this.modelItem({'row': {}});
        },
        changeLotteryModal(param){
          this.lotteryModal = param;
        },
        editMessage(data){
          this.lotteryPrizesModal = true;
          this.modelItem(data);
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
        }
      }
    }
</script>

<style scoped>
  .imgRow div{
    height: 100px;
    line-height: 100px;
  }
</style>
