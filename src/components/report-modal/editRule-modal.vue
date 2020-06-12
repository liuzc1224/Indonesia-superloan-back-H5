<template>
  <Modal v-model="showModal" :title="$t('activityData.inviteFriends.edit')" :mask-closable="false">
    <div slot="close">
      <Icon @click="cancelSubmit()" type="ios-close" />
    </div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
      <FormItem :label="$t('activityData.inviteFriends.amount')" prop="min">
        <InputNumber v-model="formValidate.min" :max="9999999999999999" :min="0" :placeholder="$t('activityData.inviteFriends.prompt.amount')" style="width: 100%"></InputNumber>
      </FormItem>
      <FormItem :label="$t('activityData.inviteFriends.second')" prop="middle">
        <InputNumber v-model="formValidate.middle" :max="9999999999999999" :min="0" :placeholder="$t('activityData.inviteFriends.prompt.second')" style="width: 100%"></InputNumber>
      </FormItem>
      <FormItem :label="$t('activityData.inviteFriends.third')" prop="max">
        <InputNumber v-model="formValidate.max" :max="9999999999999999" :min="0" :placeholder="$t('activityData.inviteFriends.prompt.third')" style="width: 100%"></InputNumber>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="cancelSubmit()">{{$t('setUpPage.cancel')}}</Button>
      <Button type="primary" size="large" :loading="loading" @click="handleSubmit('formValidate')">{{$t('setUpPage.submit')}}</Button>
    </div>
  </Modal>
</template>

<script>
  import { updateWithdraw } from '@/api/reportCenter'
    export default {
      name: "editRule-modal",
      props: ['editModal', 'chooseItem'],
      data () {
        return {
          loading:false,
          formValidate: {
            id:null,
            min: null,
            middle : null,
            max : null
          },
          ruleValidate: {
            min: [ { required: true, message: this.$t('activityData.inviteFriends.prompt.amount'), trigger: 'blur',type:'number' } ],
            middle: [ { required: true, message: this.$t('activityData.inviteFriends.prompt.second'), trigger: 'blur',type:'number' } ],
            max: [ { required: true, message: this.$t('activityData.inviteFriends.prompt.third'), trigger: 'blur',type:'number' } ]
          }
        }
      },
      methods: {
        handleSubmit () {
          this.$refs['formValidate'].validate((valid) => {
            if (valid) {
              let data=this.formValidate;
              this.loading=true;
              updateWithdraw(data).then(res => {
                this.loading=false;
                if (res.data.success) {
                  this.$Message.success(this.$t('common.editSuccess'));
                  this.$emit('editSuccess');
                  this.cancelSubmit();
                } else {
                  this.$Message.error(res.data.message)
                }
              })
            } else {
              this.$Message.error(this.$t('setUpPage.validateError'))
            }
          })
        },
        cancelSubmit () {
          this.$emit('changeModal', false);
          this.loading=false;
          this.$refs['formValidate'].resetFields();
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
