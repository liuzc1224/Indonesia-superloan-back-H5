<template>
  <Modal v-model="showModal" :title="formValidate.id? $t('accountType.editHelp') : $t('accountType.addHelp')"
             :mask-closable="false">
        <div slot="close">
          <Icon @click="cancelSubmit()" type="ios-close"/>
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
          <FormItem :label="$t('accountType.name')" prop="name">
            <Input v-model="formValidate.name" :placeholder="$t('accountType.inputName')"></Input>
          </FormItem>
          <FormItem>
            <Checkbox v-model="isLoan" @click="changeLoan()">{{$t('accountType.loan')}}</Checkbox>
          </FormItem>
          <FormItem :label="$t('accountType.type')" prop="type">
            <Select
              clearable
              v-model="formValidate.type"
              class="search-select-item"
              :placeholder="$t('accountType.inputType')"
            >
              <Option v-for="(item, i) in $t('accountType.types')" :value="item.value" :key="i">{{item.desc}}</Option>
            </Select>
          </FormItem>

          <FormItem :label="$t('accountType.remarks')" prop="marks">
            <Input v-model="formValidate.marks" type="textarea" :autosize="{minRows: 5,maxRows: 5}" :show-word-limit="true" :maxlength="500" :placeholder="$t('accountType.inputRemarks')"></Input>
          </FormItem>
          <FormItem :label="$t('accountType.logo')" prop="logoPath">
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
          <FormItem :label="$t('accountType.logo1')" prop="logoPath1">
            <up-load
              ref="upload1"
              :uploadType="`head`"
              :format="['jpg','jpeg','png']"
              :imgWidth="`50px`"
              :imgHeight="`50px`"
              :imgUrl="formValidate.logoPath1"
              @getUrl="getImgUrl1"
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
  import { addAccountOption ,updateAccountOption} from '@/api/account'
  import { imgUpload} from '@/api/banner'
  import {sessionRead} from '@/libs/util'
  import UpLoad from './upLoad'
  export default {
    name: "account-modal",
    components:{UpLoad},
    props: ['editModal', 'chooseItem','isLoan'],
    data() {
      return {
        loading:false,
        formValidate: {
          id: "",
          name: "",
          type: "",
          logoPath: "",
          logoPath1: "",
          marks: "",
          special:"",
        },
        ruleValidate: {
          name: [{
            required: true,
            message: this.$t('accountType.inputName'),
            trigger: 'blur',
            type: 'string'
          }],
          type: [{
            required: true,
            message: this.$t('accountType.inputType'),
            trigger: 'change',
            type: 'number'
          }],
          marks: [{
            required: true,
            message: this.$t('accountType.inputRemarks'),
            trigger: 'blur',
            type: 'string'
          }],
          logoPath:[{
            required: true,
            message: this.$t('accountType.logo'),
            trigger: 'change',
            type: 'string'
          }],
          logoPath1:[{
            required: true,
            message: this.$t('accountType.logo'),
            trigger: 'change',
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
            if(this.isLoan){
              data.special=1;
            }else{
              data.special=0;
            }
            this.loading=true;
            if(data.id){
              updateAccountOption(data).then(res => {
                this.loading=false;
                if (res.data.success) {
                  this.$Message.success(this.$t('common.editSuccess'))
                  this.$emit('editSuccess');
                  this.cancelSubmit();
                } else {
                  this.$Message.error(res.data.message)
                }
              })
            }else{
              addAccountOption(data).then(res => {
                this.loading=false;
                if (res.data.success) {
                  this.$Message.success(this.$t('common.addSuccess'))
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
        this.$refs.upload1.init();
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
      getImgUrl1(file,avatar){
        let formData=new FormData();
        formData.append("multipartFile",file);
        imgUpload(formData).then(res => {
          if (res.data.success) {
            if(res.data.data){
              this.$Message.success(this.$t('common.imgSuccess'));
              this.formValidate.logoPath1=res.data.data;
            }
          } else {
            this.$Message.error(res.data.message)
          }
        });
      },
      changeLoan(){
        console.log(this.isLoan);
      }
    },
    mounted() {
      this.formValidate = this.chooseItem;
      this.formValidate.logoPath=this.chooseItem['logoPath'];
      this.formValidate.logoPath1=this.chooseItem['logoPath1'];
    },
    computed: {
      showModal: {
        get: function () {
          return this.editModal
        },
        set: function () {
        }
      },
    }
  }
</script>

<style scoped>

</style>
