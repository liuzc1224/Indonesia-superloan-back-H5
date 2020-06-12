<template>
  <Modal v-model="showModal" :title="formValidate.id? $t('bankManagement.editHelp') : $t('bankManagement.addHelp')"
             :mask-closable="false">
        <div slot="close">
          <Icon @click="cancelSubmit()" type="ios-close"/>
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
          <FormItem :label="$t('bankManagement.name')" prop="bankName">
            <Input v-model="formValidate.bankName" :placeholder="$t('bankManagement.inputName')"></Input>
          </FormItem>
          <FormItem :label="$t('bankManagement.logo')" prop="logoPath">
            <up-load
              ref="upload"
              :uploadType="`head`"
              :format="['jpg','jpeg','png']"
              :imgWidth="`50px`"
              :imgHeight="`50px`"
              :imgUrl="formValidate.logoPath"
              @getUrl="getImgUrl"
            >
            </up-load>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="text" size="large" @click="cancelSubmit()">{{$t('common.cancel')}}</Button>
          <Button type="primary" size="large" :loading="loading" @click="handleSubmit('formValidate')">{{$t('common.submit')}}</Button>
        </div>
      </Modal>
</template>

<script>
  import { updateBank,addBank } from "@/api/bank";
  import { imgUpload} from '@/api/banner'
  import UpLoad from './upLoad'
  export default {
    name: "bank-modal",
    components:{UpLoad},
    props: ['editModal', 'chooseItem'],
    data() {
      return {
        loading:false,
        formValidate: {
          id: "",
          bankName: "",
          logoPath: "",
          sortWeight: "",
        },
        ruleValidate: {
          bankName: [{
            required: true,
            message: this.$t('bankManagement.inputName'),
            trigger: 'blur',
            type: 'string'
          }],
          logoPath:[{
            required: true,
            message: this.$t('bankManagement.logo'),
            trigger: 'change',
          }],
        }
      }
    },
    methods: {
      handleSubmit() {
        let data=this.formValidate;
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            this.loading=true;
            if(data.id){
              updateBank(data).then(res => {
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
              addBank(data).then(res => {
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
        this.$refs['formValidate'].resetFields();
        this.loading=false;
        this.$refs.upload.init();
      },
      getImgUrl(file,avatar){
        let formData=new FormData();
        formData.append("multipartFile",file);
        imgUpload(formData).then(res => {
          if (res.data.success) {
            if(res.data.data){
              this.$Message.success(this.$t('common.imgSuccess'));
              this.formValidate.logoPath=res.data.data;
            }
          } else {
            this.$Message.error(res.data.message)
          }
        });
      },
    },
    mounted() {
      this.formValidate = this.chooseItem;
      this.imgUrl=this.chooseItem['logoPath'];
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
