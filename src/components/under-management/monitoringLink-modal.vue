<template>
  <Modal v-model="showModal" :title="$t('monitoringLink.add')"
         :mask-closable="false">
    <div slot="close">
      <Icon @click="cancelSubmit()" type="ios-close"/>
    </div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem :label="$t('monitoringLink.name')" prop="productName">
        <Input v-model="formValidate.productName" :placeholder="$t('monitoringLink.prompt.name')"></Input>
      </FormItem>
      <FormItem :label="$t('monitoringLink.packageName')" prop="packageName">
        <Input v-model="formValidate.packageName" :placeholder="$t('monitoringLink.prompt.packageName')"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="cancelSubmit()">{{$t('common.cancel')}}</Button>
      <Button type="primary" size="large" :loading="loading" @click="handleSubmit()">{{$t('common.submit')}}</Button>
    </div>
  </Modal>
</template>

<script>
  import { addGoogleUrl } from "@/api/underManagement";
    export default {
      name: "monitoringLink-modal",
      props: ['editModal', 'chooseItem'],
      data() {
        return {
          loading:false,
          formValidate: {
            productName:null,
            packageName:null
          },
          ruleValidate: {
            productName: [{
              required: true,
              message: this.$t('monitoringLink.prompt.name'),
              trigger: 'blur',
              type: 'string'
            }],
            packageName:[{
              required: true,
              message: this.$t('monitoringLink.prompt.packageName'),
              trigger: 'blur',
              type: 'string'
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
              data['status']=1;
              addGoogleUrl(data).then(res => {
                this.loading = false;
                if (res.data.success) {
                  this.$Message.success(this.$t('common.addSuccess'));
                  this.$emit('editSuccess');
                  this.cancelSubmit()
                } else {
                  this.$Message.error(res.data.message)
                }
              })
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
