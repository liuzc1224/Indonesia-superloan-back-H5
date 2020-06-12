<template>
  <Modal v-model="showModal" :title="formValidate.id? $t('dismissalNotice.edit') : $t('dismissalNotice.add')"
         :mask-closable="false">
    <div slot="close">
      <Icon @click="cancelSubmit()" type="ios-close"/>
    </div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem :label="$t('dismissalNotice.mailbox.name')" prop="receiver">
        <Input v-model="formValidate.receiver" :placeholder="$t('dismissalNotice.mailbox.prompt.name')"></Input>
      </FormItem>
      <FormItem :label="$t('dismissalNotice.mailbox.recipientEmail')" prop="email">
        <Input v-model="formValidate.email" :placeholder="$t('dismissalNotice.mailbox.prompt.recipientEmail')"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="cancelSubmit()">{{$t('common.cancel')}}</Button>
      <Button type="primary" size="large" :loading="loading" @click="handleSubmit()">{{$t('common.submit')}}</Button>
    </div>
  </Modal>
</template>

<script>
  import { productinvalidnotifyemailAdd,productinvalidnotifyemailPut } from "@/api/underManagement";
  export default {
    name: "dismissalNotice-modal",
    props: ['editModal', 'chooseItem'],
    data() {
      return {
        loading:false,
        formValidate: {
          id:null,
          receiver:null,
          email:null
        },
        ruleValidate: {
          receiver: [{
            required: true,
            message: this.$t('dismissalNotice.mailbox.prompt.name'),
            trigger: 'blur',
            type: 'string'
          }],
          email:[{
            required: true,
            message: this.$t('dismissalNotice.mailbox.prompt.recipientEmail'),
            trigger: 'blur',
            type: 'email'
          }]
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            this.loading=true;
            let data = this.formValidate;
            if(data['status']==null){
              data['status']=1;
            }
            if(data.id){
              productinvalidnotifyemailPut(data).then(res => {
                this.loading=false;
                if (res.data.success) {
                  this.$Message.success(this.$t('common.editSuccess'));
                  this.$emit('editSuccess');
                  this.cancelSubmit();
                } else {
                  this.$Message.error(res.data.message)
                }
              })
            }else{
              productinvalidnotifyemailAdd(data).then(res => {
                this.loading=false;
                if (res.data.success) {
                  this.$Message.success(this.$t('common.addSuccess'));
                  this.$emit('editSuccess');
                  this.cancelSubmit()
                } else {
                  this.$Message.error(res.data.message)
                }
              })
            }
          }
        })
      },
      cancelSubmit() {
        this.$emit('changeModal', false);
        this.loading=false;
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
