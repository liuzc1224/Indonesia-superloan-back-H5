<template>
  <Modal v-model="showModal" :title="$t('operationalData.trackingData.edit')" :mask-closable="false">
    <div slot="close">
      <Icon @click="cancelSubmit()" type="ios-close" />
    </div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
      <FormItem :label="$t('operationalData.trackingData.productId')" prop="min">
        <Input v-model="formValidate.productId" readonly="readonly" :placeholder="$t('operationalData.trackingData.inputProductId')" style="width: 100%"></Input>
      </FormItem>
      <FormItem :label="$t('operationalData.trackingData.productName')" prop="middle">
        <Input v-model="formValidate.productName"  readonly="readonly" :placeholder="$t('operationalData.trackingData.inputProductName')" style="width: 100%"></Input>
      </FormItem>
      <FormItem :label="$t('operationalData.trackingData.downNumber')" prop="max">
        <InputNumber v-model="formValidate.downloadCount" :max="999999999999" :min="0" :placeholder="$t('operationalData.trackingData.tip')" style="width: 100%"></InputNumber>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="cancelSubmit()">{{$t('setUpPage.cancel')}}</Button>
      <Button type="primary" size="large" :loading="loading" @click="handleSubmit('formValidate')">{{$t('setUpPage.submit')}}</Button>
    </div>
  </Modal>
</template>

<script>
  import { updateProductSales } from '@/api/reportCenter'
  export default {
    name: "tracking-modal",
    props: ['editModal', 'chooseItem'],
    data () {
      return {
        loading:false,
        formValidate: {
          id: null,
          productId: null,
          productName: null,
          downloadCount: null
        },
        ruleValidate: {
          productId: [ { required: true, message: this.$t('operationalData.trackingData.inputProductId'), trigger: 'blur' } ],
          productName: [ { required: true, message: this.$t('operationalData.trackingData.inputProductName'), trigger: 'blur' } ],
          downloadCount: [ { required: true, message: this.$t('operationalData.trackingData.tip'), trigger: 'blur',type:'number' } ]
        }
      }
    },
    methods: {
      handleSubmit () {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            let data=this.formValidate;
            this.loading=true;
            updateProductSales(data).then(res => {
              this.loading=false;
              if (res.data.success) {
                this.$Message.success(this.$t('common.editSuccess'));
                this.$emit('editSuccess');
                this.cancelSubmit();
              } else {
                this.$Message.error(res.data.message)
              }
            }).catch(err => {
              this.loading=false;
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
