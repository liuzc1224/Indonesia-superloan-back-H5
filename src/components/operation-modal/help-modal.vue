<template>
  <Modal v-model="showModal" :title="formValidate.id? $t('helpCenter.editHelp') : $t('helpCenter.addHelp')" :mask-closable="false">
        <div slot="close">
          <Icon @click="cancelSubmit()" type="ios-close" />
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" class="help-modal">
          <FormItem :label="$t('helpCenter.type')" prop="type">
            <Select clearable v-model="formValidate.textFlag" :placeholder="$t('helpCenter.inputType')" @on-change="changeFlag">
              <Option v-for="(item,index) in $t('helpCenter.textFlag')" :key="index" :value="item.value">{{item.desc}}</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('helpCenter.sort')" prop="textOrder">
            <Select v-model="formValidate.textOrder" class="search-select-item" :placeholder="$t('helpCenter.sort')" :disabled="isAble">
              <Option v-for="item in numberMax" :key="item" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('helpCenter.problem')" prop="textQuestion">
            <Input v-model="formValidate.textQuestion" :placeholder="$t('helpCenter.inputProblem')"></Input>
          </FormItem>
          <FormItem :label="$t('helpCenter.answer')" prop="textAnswer">
            <Input v-model="formValidate.textAnswer" type="textarea" :autosize="{minRows: 5,maxRows: 5}"  :show-word-limit="true" :maxlength="500" :placeholder="$t('helpCenter.inputAnswer')"></Input>
          </FormItem>
          <FormItem :label="$t('helpCenter.status')" prop="isShow">
            <Select clearable v-model="formValidate.isShow" class="search-select-item" :placeholder="$t('smsTemplate.inputStatus')">
              <Option v-for="(item,index) in $t('helpCenter.isShow')" :key="index" :value="item.value">{{item.desc}}</Option>
            </Select>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="text" size="large" @click="cancelSubmit()">{{$t('setUpPage.cancel')}}</Button>
          <Button type="primary" size="large" :loading="loading" @click="handleSubmit('formValidate')">{{$t('setUpPage.submit')}}</Button>
        </div>
      </Modal>
</template>

<script>
import { getTextFlag, addHelp, updateHple } from '@/api/help'
export default {
  name: 'MessageModal',
  props: ['editModal', 'chooseItem','isAble','numberMax'],
  data () {
    return {
      loading:false,
      formValidate: {
        id: null,
        textFlag: null,
        textOrder: null,
        textQuestion: null,
        textAnswer: null,
        isShow: null
      },
      ruleValidate: {
        textFlag: [ { required: true, message: this.$t('helpCenter.inputType'), trigger: 'change', type: 'number' } ],
        isShow: [ { required: true, message: this.$t('helpCenter.inputStatus'), trigger: 'change', type: 'number' } ],
        textOrder: [ { required: true, message: this.$t('helpCenter.sort'), trigger: 'change', type: 'number' } ],
        textQuestion: [ { required: true, message: this.$t('helpCenter.inputProblem'), trigger: 'blur',type:'string' } ],
        textAnswer: [ { required: true, message: this.$t('helpCenter.inputAnswer'), trigger: 'blur' } ]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          const submitData = this.formValidate;
          this.loading=true;
          if(submitData.id){
            updateHple( submitData ).then(res => {
              this.loading=false;
              if(res.data.success){
                this.$Message.success(this.$t('setUpPage.editSuccess'));
                this.$emit('editSuccess')
                this.cancelSubmit()
              }else{
                this.$Message.error(res.data.message)
              }
            })
          }else{
            addHelp( submitData ).then(res => {
              this.loading=false;
              if(res.data.success){
                this.$Message.success(this.$t('setUpPage.addSuccess'));
                this.$emit('editSuccess')
                this.cancelSubmit()
              }else{
                this.$Message.error(res.data.message)
              }
            })
          }
        } else {
          this.$Message.error(this.$t('setUpPage.validateError'))
        }
      })
    },
    cancelSubmit () {
      this.$emit('changeModal', false);
      this.loading=false;
      this.$refs['formValidate'].resetFields()
    },
    changeFlag (param) {
      if(param){
        let data={
          textFlag : param
        };
        getTextFlag( data ).then(res => {
          if(res.data.success){
            this.formValidate.textOrder = res.data.data;
            // this.numberMax=res.data.data;
            this.$emit('setNumberMax',res.data.data)
          }
        })
      }
    }
  },
  mounted () {
    this.formValidate = this.chooseItem
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
