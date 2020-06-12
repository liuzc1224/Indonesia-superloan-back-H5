<template>
  <Modal v-model="showModal" :title="$t('userInfo.password')"
             :mask-closable="false">
        <div slot="close">
          <Icon @click="cancelSubmit()" type="ios-close"/>
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
          <FormItem :label="$t('userInfo.old')" prop="oldPassword">
            <Input v-model="formValidate.oldPassword"  :placeholder="$t('userInfo.inputOld')"></Input>
          </FormItem>
          <FormItem :label="$t('userInfo.new')" prop="newPassword">
            <Input v-model="formValidate.newPassword" :placeholder="$t('userInfo.inputNew')" type="password"></Input>
          </FormItem>
          <FormItem :label="$t('userInfo.repeatNew')" prop="repeatNew">
            <Input v-model="formValidate.repeatNew"  :placeholder="$t('userInfo.inputRepeatNew')" type="password"></Input>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="text" size="large" @click="cancelSubmit()">{{$t('common.cancel')}}</Button>
          <Button type="primary" size="large" @click="handleSubmit('formValidate')">{{$t('common.submit')}}</Button>
        </div>
      </Modal>
</template>

<script>
  import { password} from '@/api/user'
  import {dateToString, getLoginInfo} from '@/libs/tools'
  import {sessionRead} from '@/libs/util'
  export default {
    name: "password",
    props: ['editModal'],
    data() {
      return {
        formValidate: {
          newPassword: "",
          old: "",
          repeatNew: ""
        },
        ruleValidate: {
          newPassword: [{
            required: true,
            message: this.$t('userInfo.inputNew'),
            trigger: 'blur',
            type: 'string'
          }],
          oldPassword:[{
            required: true,
            message: this.$t('userInfo.inputOld'),
            trigger: 'blur',
            type: 'string'
          }],
          repeatNew:[{
            required: true,
            message: this.$t('userInfo.inputRepeatNew'),
            trigger: 'blur',
            type: 'string'
          }],
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            let loginInfo = sessionRead('loginInfo');
            let data=this.formValidate;
            if(data.newPassword === data.repeatNew){
              let params={
                oldPassword:data.oldPassword,
                newPassword:data.newPassword
              };
              password(params).then(res => {
                if (res.data.success) {
                  this.$Message.success(this.$t('common.editSuccess'));
                  this.$emit('editSuccess');
                  this.cancelSubmit();
                } else {
                  this.$Message.error(res.data.message)
                }
              })
            }else {
              this.$Message.error(this.$t('userInfo.error'))
            }

          }
        })
      },
      cancelSubmit() {
        this.$emit('changeModal', false);
        this.$refs['formValidate'].resetFields();
      },
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
