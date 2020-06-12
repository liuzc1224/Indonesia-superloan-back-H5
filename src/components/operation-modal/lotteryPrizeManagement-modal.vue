<template>
  <Modal v-model="showModal" :title="formValidate.id ? $t('lotteryPrizes.edit') : $t('lotteryPrizes.add')" :mask-closable="false" :width="800">
        <div slot="close">
          <Icon @click="cancelSubmit()" type="ios-close"/>
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">

          <FormItem :label="$t('lotteryPrizes.name')" prop="prizeName">
            <Input v-model="formValidate.prizeName" :placeholder="$t('lotteryPrizes.prompt.name')"></Input>
          </FormItem>
          <FormItem :label="$t('lotteryPrizes.remark')" prop="remark">
            <Input v-model="formValidate.remark" :placeholder="$t('lotteryPrizes.prompt.remark')"></Input>
          </FormItem>
          <FormItem :label="$t('lotteryPrizes.image')" prop="prizeImg">
            <up-load
              ref="upload"
              :uploadType="`head`"
              :format="['jpg','jpeg','png']"
              :imgWidth="`50px`"
              :imgHeight="`50px`"
              :imgUrl="formValidate.prizeImg"
              @getUrl="getImgUrl"
            >
            </up-load>
          </FormItem>
          <FormItem :label="$t('lotteryPrizes.prizeDescription')" prop="prizeDesc">
            <Input v-model="formValidate.prizeDesc" :placeholder="$t('lotteryPrizes.prompt.prizeDescription')"></Input>
          </FormItem>
          <FormItem :label="$t('lotteryPrizes.winningNotice')" prop="notify">
            <Input v-model="formValidate.notify" :placeholder="$t('lotteryPrizes.prompt.winningNotice')"></Input>
          </FormItem>
          <FormItem :label="$t('lotteryPrizes.probability')" prop="probability">
            <Row>
              <i-col :span="23">
                <InputNumber :max="100.00" :min="0.00" :step="0.01" v-model="formValidate.probability" :placeholder="$t('lotteryPrizes.prompt.probability')" style="width: 100%"></InputNumber>
              </i-col>
              <i-col :span="1" style="text-align: center">%</i-col>
            </Row>
          </FormItem>
          <FormItem :label="$t('lotteryPrizes.type')" prop="prizeType">
            <Select clearable v-model="formValidate.prizeType" class="search-select-item" :placeholder="$t('lotteryPrizes.prompt.type')">
              <Option v-for="(item, i) in $t('lotteryPrizes.types')" :value="item.value" :key="`prod1-${i}`">{{item.desc}}</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('lotteryPrizes.again')" prop="prizeValue" v-if="formValidate.prizeType===1">
            <Row>
              <Row>
                <i-col :span="23">
                  <InputNumber :max="100" :min="1" :step="1" v-model="formValidate.prizeValue" :placeholder="$t('lotteryPrizes.prompt.frequency')" style="width: 100%"></InputNumber>
                </i-col>
                <i-col :span="1" style="text-align: center">
                  {{$t('lotteryPrizes.frequency')}}
                </i-col>
              </Row>
            </Row>
          </FormItem>
          <FormItem :label="$t('lotteryPrizes.redEnvelope')" prop="redPacket" v-if="formValidate.prizeType===2">
            <Row>
              <Row>
                <i-col :span="18">
                  <InputNumber :max="999999999999.99" :min="0" :step="0.01" v-model="formValidate.redPacket" :placeholder="$t('lotteryPrizes.prompt.redEnvelope')" style="width: 100%"></InputNumber>
                </i-col>
                <i-col :span="5" :offset="1" f style="text-align: center">
                  <Select clearable v-model="formValidate.currencyUnit" class="search-select-item" :placeholder="$t('lotteryPrizes.prompt.unit')">
                    <Option v-for="(item, i) in $t('lotteryPrizes.currencyUnit')" :value="item.value" :key="`prod1-${i}`">{{item.desc}}</Option>
                  </Select>
                </i-col>
              </Row>
            </Row>
          </FormItem>
          <FormItem :label="$t('lotteryPrizes.gameCurrency')" prop="prizeValue" v-if="formValidate.prizeType===3">
            <Row>
              <Row>
                <i-col :span="23">
                  <InputNumber :max="999999999999" :min="0" :step="1" v-model="formValidate.prizeValue" :placeholder="$t('lotteryPrizes.prompt.gameCurrency')" style="width: 100%"></InputNumber>
                </i-col>
                <i-col :span="1" style="text-align: center">
                  {{$t('lotteryPrizes.number')}}
                </i-col>
              </Row>
            </Row>
          </FormItem>
          <FormItem :label="$t('lotteryPrizes.integral')" prop="prizeValue" v-if="formValidate.prizeType===4">
            <Row>
              <Row>
                <i-col :span="23">
                  <InputNumber :max="999999999999" :min="0" :step="1" v-model="formValidate.prizeValue" :placeholder="$t('lotteryPrizes.prompt.integral')" style="width: 100%"></InputNumber>
                </i-col>
                <i-col :span="1" style="text-align: center">
                  {{$t('lotteryPrizes.number')}}
                </i-col>
              </Row>
            </Row>
          </FormItem>

          <FormItem :label="$t('lotteryPrizes.prizesNumber')" prop="totalNum">
            <InputNumber :max="999999999999" :min="1" :step="1" v-model="formValidate.totalNum" :placeholder="$t('lotteryPrizes.prompt.prizesNumber')" style="width: 100%"></InputNumber>
          </FormItem>
          <FormItem>
            <p>{{$t('lotteryPrizes.Used')}}{{formValidate['usedNum'] ? formValidate['usedNum'] : 0}}{{$t('lotteryPrizes.number')}}</p>
          </FormItem>

<!--          <FormItem :label="$t('lotteryPrizes.state')" prop="status">-->
<!--            <Select clearable v-model="formValidate.status" class="search-select-item" :placeholder="$t('lotteryPrizes.prompt.state')">-->
<!--              <Option v-for="(item, i) in $t('lotteryPrizes.status')" :value="item.value" :key="`prod1-${i}`">{{item.desc}}</Option>-->
<!--            </Select>-->
<!--          </FormItem>-->
        </Form>
        <div slot="footer">
          <Button size="large" @click="cancelSubmit()">{{$t('setUpPage.cancel')}}</Button>
          <Button type="primary" size="large" :loading="loading" @click="handleSubmit()">{{$t('setUpPage.submit')}}</Button>
        </div>
      </Modal>
</template>

<script>
  import { addPrize,modifyPrize,imgUpload } from '@/api/product'
  import UpLoad from './upLoad'
    export default {
      name: "lotteryPrizeManagement-modal",
      components:{UpLoad},
      props: ['editModal', 'chooseItem','isAble','numberMax',"isNew"],
      data() {
        return {
          loading:false,
          formValidate: {
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
          ruleValidate: {
            prizeName: [{
              required: true,
              message: this.$t('lotteryPrizes.prompt.name'),
              trigger: 'blur',
            }],
            remark: [{
              required: true,
              message: this.$t('lotteryPrizes.prompt.remark'),
              trigger: 'blur',
            }],
            prizeImg:[{
              required: true,
              message: this.$t('lotteryPrizes.prompt.image'),
              trigger: 'change',
              type:'url'
            }],
            prizeDesc:[{
              required: true,
              message: this.$t('lotteryPrizes.prompt.prizeDescription'),
              trigger: 'blur',
            }],
            notify: [{
              required: true,
              message: this.$t('lotteryPrizes.prompt.winningNotice'),
              trigger: 'blur',
            }],
            probability: [{
              required: true,
              message: this.$t('lotteryPrizes.prompt.probability'),
              trigger: 'blur',
              type:'number'
            }],
            prizeType: [{
              required: true,
              message: this.$t('lotteryPrizes.prompt.type'),
              trigger: 'change',
              type:'number'
            }],
            prizeValue: [{
              required: true,
              message: this.$t('lotteryPrizes.prompt.input'),
              trigger: 'blur',
              type:'number'
            }],
            redPacket: [{
              required: true,
              message: this.$t('lotteryPrizes.prompt.redEnvelope'),
              trigger: 'blur',
              type:'number'
            }],
            currencyUnit: [{
              required: true,
              message: this.$t('lotteryPrizes.prompt.unit'),
              trigger: 'change',
              type:'number'
            }],
            totalNum: [{
              required: true,
              message: this.$t('lotteryPrizes.prompt.prizesNumber'),
              trigger: 'blur',
              type:'number'
            }],
            status:[{
              required: true,
              message: this.$t('lotteryPrizes.prompt.unit'),
              trigger: 'change',
              type:'number'
            }]
          }
        }
      },
      methods: {
        handleSubmit() {
          this.$refs['formValidate'].validate((valid) => {
            if (valid) {
              if(this.formValidate.usedNum){
                if(this.formValidate.totalNum<this.formValidate.usedNum){
                  this.$Message.error(this.$t('lotteryPrizes.prompt.tip'));
                  return;
                }
              }
              let data={
                id:this.formValidate.id,
                prizeName:this.formValidate.prizeName,
                remark :this.formValidate.remark,
                prizeImg:this.formValidate.prizeImg,
                prizeDesc:this.formValidate.prizeDesc,
                notify:this.formValidate.notify,
                probability:this.formValidate.probability,
                prizeType:this.formValidate.prizeType,
                prizeValue:this.formValidate.prizeValue,
                redPacket:this.formValidate.redPacket,
                currencyUnit:this.formValidate.currencyUnit,
                totalNum:this.formValidate.totalNum,
                usedNum:this.formValidate.usedNum,
                status:this.formValidate.status
              };
              if(data.prizeType!==2){
                data.redPacket=null;
                data.currencyUnit=null
              }
              if(data.prizeType!==1 && data.prizeType!==3 && data.prizeType!==4){
                data.prizeValue=null;
              }
              data.probability=(data.probability/100).toFixed(4);
              this.loading=true;
              if(data.id){
                modifyPrize(data).then(res => {
                  this.loading=false;
                  if (res.data.success) {
                    this.$Message.success(this.$t('common.editSuccess'));
                    this.$emit('editSuccess');
                    this.cancelSubmit();
                  } else {
                    this.$Message.error(res.data.message);
                  }
                })
              }else{
                addPrize(data).then(res => {
                  this.loading=false;
                  if (res.data.success) {
                    this.$Message.success(this.$t('common.addSuccess'));
                    this.$emit('editSuccess');
                    this.cancelSubmit();
                  } else {
                    this.$Message.error(res.data.message);
                  }
                })
              }
            }else{
              this.$Message.error(this.$t('common.message'));
            }
          })
        },
        cancelSubmit() {
          this.$emit('changeModal', false);
          this.loading=false;
          this.$refs['formValidate'].resetFields();
          this.$refs.upload.init();
        },
        getImgUrl(file,avatar){
          let formData=new FormData();
          formData.append("multipartFile",file);
          imgUpload(formData).then(res => {
            if (res.data.success) {
              if(res.data.data){
                this.$Message.success(this.$t('common.imgSuccess'));
                this.formValidate.prizeImg=res.data.data;
              }
            } else {
              this.$Message.error(res.data.message)
            }
          });
          this.formValidate.icon=avatar;
          this.formValidate.file=file;
        },
        uploadImg(){
          let formData=new FormData();
          // formData.append("file",file);
        },
        setItem(){
          this.formValidate = this.chooseItem;
        }
      },
      mounted() {
        this.formValidate = this.chooseItem;
      },
      computed: {
        showModal: {
          get: function () {
            return this.editModal
          },
          set: function () {
          }
        }
      }
    }
</script>

<style scoped>

</style>
