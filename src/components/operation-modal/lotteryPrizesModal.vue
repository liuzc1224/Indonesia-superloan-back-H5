<template>
  <Modal v-model="showModal" :title="$t('sweepstakes.editLotteryPrizes')" :mask-closable="false">
    <div slot="close">
      <Icon @click="cancelSubmit()" type="ios-close" />
    </div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
      <FormItem :label="formValidate.positionId+$t('sweepstakes.prize')" prop="prizeId">
        <Input v-model="formValidate.prizeId" :placeholder="$t('sweepstakes.inputId')"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="cancelSubmit()">{{$t('setUpPage.cancel')}}</Button>
      <Button type="primary" size="large" :loading="loading" @click="handleSubmit('formValidate')">{{$t('setUpPage.submit')}}</Button>
    </div>
  </Modal>
</template>

<script>
  import {modifyPrizePool} from '@/api/product';
    export default {
      name: "lotteryPrizesModal",
      props: ['editModal', 'chooseItem'],
      data () {
        return {
          loading:false,
          formValidate: {
            positionId:null,
            prizeId: null,
          },
          ruleValidate: {
            prizeId: [ { required: true, message: this.$t('sweepstakes.inputId'), trigger: 'blur' } ]
          }
        }
      },
      methods: {
        handleSubmit () {
          this.loading=true;
          this.$refs['formValidate'].validate((valid) => {
            if (valid) {
              let data={
                positionId : this.formValidate.positionId,
                prizeId : this.formValidate.prizeId-0
              };
              modifyPrizePool(data).then(res=>{
                this.loading=false;
                if (res.data.success) {
                  this.$Message.success(this.$t('common.editSuccess'));
                  this.$emit('editSuccess');
                  this.cancelSubmit();
                } else {
                  this.$Message.error(res.data.message);
                }
              })
            } else {
              this.loading=false;
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
