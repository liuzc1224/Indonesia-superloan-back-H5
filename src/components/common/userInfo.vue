<template>
  <Modal v-model="showModal" :title="$t('userInfo.usrInfo')"
             :mask-closable="false">
        <div slot="close">
          <Icon @click="cancelSubmit()" type="ios-close"/>
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
          <FormItem :label="$t('userInfo.name')">
            <Input v-model="formValidate.name" :placeholder="$t('userInfo.inputName')" readonly="readonly"></Input>
          </FormItem>
          <FormItem :label="$t('userInfo.department')">
            <Input v-model="formValidate.department"  :placeholder="$t('userInfo.inputDepartment')" readonly></Input>
          </FormItem>
          <FormItem :label="$t('userInfo.permission')">
            <Input v-model="formValidate.permission"  :placeholder="$t('userInfo.inputPermission')" readonly></Input>
          </FormItem>
          <FormItem :label="$t('userInfo.phone')" prop="phoneNumber">
            <Input v-model="formValidate.phoneNumber" :placeholder="$t('userInfo.inputPhone')"></Input>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="text" size="large" @click="cancelSubmit()">{{$t('common.cancel')}}</Button>
          <Button type="primary" size="large" @click="handleSubmit('formValidate')">{{$t('common.submit')}}</Button>
        </div>
      </Modal>
</template>

<script>
  import { employee} from '@/api/user'
  import {sessionRead} from '@/libs/util'
  export default {
    name: "password",
    props: ['editModal', 'chooseItem'],
    data() {
      return {
        formValidate: {
          department: null,
          name: null,
          permission: null,
          phoneNumber: null,
        },
        ruleValidate: {
          phoneNumber:[{
            required: true,
            message: this.$t('userInfo.inputPhone'),
            trigger: 'blur'
          }],
        }
      }
    },
    methods: {
      handleSubmit() {
        let loginInfo = sessionRead('loginInfo');
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            let data={
              phonenum:this.formValidate['phoneNumber']
            };
            employee(data).then(res => {
              if (res.data.success) {
                this.$Message.success(this.$t('common.editSuccess'))
                this.$emit('editSuccess');
                this.cancelSubmit();
              } else {
                this.$Message.error(res.data.message)
              }
            })
          }
        })
      },
      cancelSubmit() {
        this.$emit('changeModal', false);
        this.$refs['formValidate'].resetFields();
      },
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
