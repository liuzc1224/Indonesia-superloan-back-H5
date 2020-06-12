<template>
  <Modal v-model="showModal" :title="$t('feedback.edit')" :mask-closable="false">
    <div slot="close">
      <Icon @click="cancelSubmit()" type="ios-close" />
    </div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" class="feedback-modal">
      <FormItem :label="$t('feedback.submitDate')">
        <DatePicker type="datetime" v-model="formValidate.createTime" readonly="readonly" style="width: 100%"></DatePicker>
      </FormItem>
      <FormItem :label="$t('feedback.version')">
        <Input v-model="formValidate.opinionVersion" readonly="readonly"></Input>
      </FormItem>
      <FormItem :label="$t('feedback.topic')">
        <Input v-model="formValidate.opinionTheme" readonly="readonly"></Input>
      </FormItem>
      <FormItem :label="$t('feedback.content')">
        <Input v-model="formValidate.opinionContent" type="textarea" :autosize="{minRows: 4,maxRows: 4}" readonly="readonly"></Input>
      </FormItem>
      <FormItem :label="$t('feedback.img')" >
        <div v-if="formValidate['opinionImageUrlList']">
          <div v-for="img in formValidate['opinionImageUrlList']"  style="width: 110px;height:110px;padding: 5px;float: left">
            <img :src="img" @click="showIcon(img)" width="100%" height="100%" >
          </div>
        </div>
      </FormItem>
      <FormItem :label="$t('feedback.processResult')" prop="opinionStatus">
        <Select
          clearable
          v-model="formValidate.opinionStatus"
          :placeholder="$t('feedback.prompt.processResult')"
        >
          <Option v-for="(item, i) in $t('feedback.status')" :value="item.value" :key="i">{{item.desc}}</Option>
        </Select>
      </FormItem>
      <FormItem :label="$t('feedback.remarks')">
        <Input v-model="formValidate.opinionRemark" type="textarea" :autosize="{minRows: 4,maxRows: 4}"  :show-word-limit="true" :maxlength="500" :placeholder="$t('feedback.prompt.remarks')"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="cancelSubmit()">{{$t('setUpPage.cancel')}}</Button>
      <Button type="primary" size="large" @click="handleSubmit('formValidate')">{{$t('setUpPage.submit')}}</Button>
    </div>
    <Modal  v-model="isUrl" width="50%">
      <div class="flex-center">
        <Spin fix v-if="imgLoading"></Spin>
        <img
          :src="url"
          alt
          class="img-show"
          ref="imageShow"
          style="width:100%;display:block;margin:0 auto;"
        >
      </div>
      <div slot="footer">
        <Button type="primary" size="large" @click="iconClose">{{$t('cardManage.sure')}}</Button>
      </div>
    </Modal>
  </Modal>
</template>

<script>
  import { setOpinion } from '@/api/msgCenter'
  export default {
    name: 'feedback-model',
    props: ['editModal', 'chooseItem'],
    data () {
      return {
        url: "",
        isUrl: false,
        imgLoading: false,
        formValidate: {
          id: "",
          opinionVersion : "",
          createTime: "",
          opinionTheme: "",
          opinionContent: "",
          opinionRemark: "",
          opinionStatus: "",
          opinionImageUrlList:[]
        },
        ruleValidate: {
          opinionStatus: [ { required: true, message: this.$t('feedback.prompt.processResult'), trigger: 'change', type: 'number' } ],
        }
      }
    },
    methods: {
      handleSubmit () {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            const submitData = {
              id: this.formValidate.id,
              opinionRemark: this.formValidate.opinionRemark,
              opinionStatus: this.formValidate.opinionStatus,
            };
            setOpinion( submitData ).then(res => {
              if(res.data.success){
                this.$Message.success(this.$t('setUpPage.addSuccess'));
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
        this.$emit('changeModal', false)
        this.$refs['formValidate'].resetFields()
      },
      showIcon(url){
        this.isUrl=true;
        this.imgLoading=true;
        // let newImg = new Image();
        // newImg.src =url;
        // newImg.onload=()=>{ // 图片加载成功后把地址给原来的img
        this.url = url;
        this.imgLoading=false;
        // }
      },
      iconClose(){
        this.url='';
        this.imgLoading=false;
        this.isUrl=false;
      },
    },
    mounted () {
      this.formValidate = this.chooseItem;
      let newImg = new Image();
      newImg.src ='';
      newImg.onload=()=>{ // 图片加载成功后把地址给原来的img
        this.url = newImg.src;
        this.imgLoading=false;
      }
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

<style lang="less">
  .help-modal{
    .ivu-form-item{
      .ivu-input[disabled],.ivu-select-disabled .ivu-select-selection{
        background-color: #fff;
        color: #515a6e;
      }
    }
  }
</style>
