<template>
  <Modal v-model="showModal" :title="$t('sweepstakes.editLottery')" :mask-closable="false">
        <div slot="close">
          <Icon @click="cancelSubmit()" type="ios-close" />
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
          <FormItem :label="$t('sweepstakes.attachLottery')" prop="lotteryType">
            <Select clearable v-model="formValidate.lotteryType" class="search-select-item" :placeholder="$t('sweepstakes.selectAttachLottery')">
              <Option v-for="(item,index) in $t('sweepstakes.attachLotterys')" :key="index" :value="item.value">{{item.desc}}</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('sweepstakes.consumption')" prop="everyConsume">
            <InputNumber v-model="formValidate.everyConsume" :min="0" :placeholder="$t('sweepstakes.tipConsumption')" style="width: 100%"></InputNumber>
          </FormItem>
          <FormItem :label="$t('sweepstakes.maximum')" prop="everydayLotteryMostNum">
            <Select v-model="formValidate.everydayLotteryMostNum" class="search-select-item" :placeholder="$t('sweepstakes.inputMaximum')">
              <Option v-for="(item,index) in 10" :key="index" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="text" size="large" @click="cancelSubmit()">{{$t('setUpPage.cancel')}}</Button>
          <Button type="primary" size="large" :loading="loading" @click="handleSubmit('formValidate')">{{$t('setUpPage.submit')}}</Button>
        </div>
      </Modal>
</template>

<script>
  import { editLotteryType,addLotteryType } from '@/api/product'
    export default {
      name: "lottery",
      props: ['editModal', 'chooseItem'],
      data () {
        return {
          loading:false,
          formValidate: {
            lotteryType:null,
            everyConsume:null,
            everydayLotteryMostNum:null,
            id:null,
            status:null
          },
          ruleValidate: {
            lotteryType: [ { required: true, message: this.$t('sweepstakes.selectAttachLottery'), trigger: 'change', type: 'number' } ],
            everyConsume: [ { required: true, message: this.$t('sweepstakes.inputConsumption'), trigger: 'blur', type: 'number' } ],
            everydayLotteryMostNum: [ { required: true, message: this.$t('sweepstakes.inputMaximum'), trigger: 'change', type: 'number' } ],
          }
        }
      },
      methods: {
        handleSubmit () {
          this.$refs['formValidate'].validate((valid) => {
            if (valid) {
              let data=this.formValidate;
                this.loading=true;
                if(data['id']){
                  editLotteryType(data).then(res => {
                    this.loading=false;
                    if (res.data.success) {
                      this.$Message.success(this.$t('common.editSuccess'));
                      // this.$emit('editSuccess');
                      this.cancelSubmit();
                    } else {
                      this.$Message.error(res.data.message)
                    }
                  })
                }else{
                  addLotteryType(data).then(res => {
                    this.loading=false;
                    if (res.data.success) {
                      this.$Message.success(this.$t('common.editSuccess'));
                      // this.$emit('editSuccess');
                      this.cancelSubmit();
                    } else {
                      this.$Message.error(res.data.message)
                    }
                  })
                }

            } else {
              this.$Message.error(this.$t('setUpPage.validateError'))
            }
          })
        },
        cancelSubmit () {
          this.$emit('changeModal', false);
          this.loading=false;
          this.$refs['formValidate'].resetFields()
        }
      },
      mounted () {
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
