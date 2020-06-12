<template>
  <Modal v-model="showModal" :title="$t('appLink.editLink')" :mask-closable="false">
    <div slot="close">
      <Icon @click="cancelSubmit()" type="ios-close" />
    </div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem :label="$t('appLink.link')" prop="linkUrl">
        <Input v-model="formValidate.linkUrl" type="text" :show-word-limit="true" :maxlength="500" :placeholder="$t('appLink.prompt.link')"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="cancelSubmit()">{{$t('setUpPage.cancel')}}</Button>
      <Button type="primary" size="large" :loading="loading" @click="handleSubmit('formValidate')">{{$t('setUpPage.submit')}}</Button>
    </div>
  </Modal>
</template>

<script>
  import { addAppShare } from "@/api/operationCenter";
  export default {
    name: "appLinkModel",
    props: ['editModal', 'chooseItem'],
    data () {
      return {
        loading:false,
        formValidate: {
          id: null,
          linkUrl: null
        },
        ruleValidate: {
          linkUrl:[{
            required: true,
            message: this.$t('appLink.prompt.link'),
            trigger: 'blur',
            type:'url'
          }]
        }
      }
    },
    methods: {
      handleSubmit () {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            const data = this.formValidate;
            this.loading=true;
            addAppShare( data ).then(res => {
              this.loading=false;
              if(res.data.success){
                this.$Message.success(this.$t('setUpPage.editSuccess'));
                this.$emit('editSuccess');
                this.cancelSubmit()
              }else{
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
