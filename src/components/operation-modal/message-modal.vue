<template>
  <Modal v-model="showModal" :title="formValidate.id? $t('messagePush.editMessage') : $t('messagePush.addMessage')" :mask-closable="false">
        <div slot="close">
          <Icon @click="cancelSubmit()" type="ios-close" />
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <FormItem :label="$t('messagePush.takeEffectTime')" prop="takeEffectTime">
            <DatePicker type="date" :placeholder="$t('messagePush.selectTime')" v-model="formValidate.takeEffectTime"></DatePicker>
          </FormItem>
          <FormItem :label="$t('messagePush.sendChannel')" prop="sendChannel">
            <Select clearable v-model="formValidate.sendChannel" :placeholder="$t('messagePush.selectChannel')">
                <Option :value="0">{{$t('messagePush.messageCenter')}}</Option>
                <Option :value="1">{{$t('messagePush.push')}}</Option>
                <Option :value="2">{{$t('messagePush.messageAndPush')}}</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('messagePush.messageType')" prop="msgType">
            <Select clearable v-model="formValidate.msgType" :placeholder="$t('messagePush.selectType')">
                <Option :value="0">{{$t('messagePush.announcement')}}</Option>
                <Option :value="1">{{$t('messagePush.notice')}}</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('messagePush.messageTitle')" prop="title">
            <Input v-model="formValidate.title" :placeholder="$t('messagePush.inputTitle')"></Input>
          </FormItem>
          <FormItem :label="$t('messagePush.sendTarget')" prop="sendTarget">
            <Select clearable v-model="formValidate.sendTarget" :placeholder="$t('messagePush.selectTarget')">
              <Option :value="0">{{$t('messagePush.allPeople')}}</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('messagePush.messageText')" prop="text">
            <Input v-model="formValidate.text" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :show-word-limit="true" :maxlength="500" :placeholder="$t('messagePush.inputText')"></Input>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="text" size="large" @click="cancelSubmit()">{{$t('setUpPage.cancel')}}</Button>
          <Button type="primary" size="large" :loading="loading" @click="handleSubmit('formValidate')">{{$t('setUpPage.submit')}}</Button>
        </div>
      </Modal>
</template>

<script>
import { editMsgListInfo, addMsgListInfo } from '@/api/data'
import { dateToString, getLoginInfo } from '@/libs/tools'
import { sessionRead } from '@/libs/util'
export default {
  name: 'MessageModal',
  props: ['editModal', 'chooseItem'],
  data () {
    return {
      loading:false,
      formValidate: {
        id: '',
        takeEffectTime: '',
        sendChannel: '',
        sendTarget: '',
        msgType: '',
        title: '',
        text: '',
      },
      ruleValidate: {
        takeEffectTime: [ { required: true, type: 'date', message: this.$t('messagePush.selectTime'), trigger: 'change' } ],
        msgType: [ { required: true, message: this.$t('messagePush.selectType'), trigger: 'change', type: 'number' } ],
        sendChannel: [ { required: true, message: this.$t('messagePush.selectChannel'), trigger: 'change', type: 'number' } ],
        title: [ { required: true, message: this.$t('messagePush.inputTitle'), trigger: 'blur' } ],
        sendTarget: [ { required: true, message: this.$t('messagePush.selectTarget'), trigger: 'change', type: 'number' } ],
        text: [ { required: true, message: this.$t('messagePush.inputText'), trigger: 'blur' } ]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          let loginInfo = sessionRead('loginInfo')
          
          const submitData = {
            takeEffectTime: dateToString(this.formValidate.takeEffectTime, '-'),
            operatorName: loginInfo.username,
            operatorId: loginInfo.id,
            status: 0, // 表示此条消息有效
            msgType: this.formValidate.msgType,
            sendChannel: this.formValidate.sendChannel,
            title: this.formValidate.title,
            sendTarget: this.formValidate.sendTarget,
            text: this.formValidate.text,
            id: this.formValidate.id
          };
          this.loading=true;
          if(submitData.id){
            editMsgListInfo( submitData ).then(res => {
              this.loading=false;
              if(res.data.success){
                this.$Message.success(this.$t('setUpPage.editSuccess'))
                this.$emit('editSuccess')
                this.cancelSubmit()
              }else{
                this.$Message.error(res.data.message)
              }
            })
          }else{
            addMsgListInfo( submitData ).then(res => {
              this.loading=false;
              if(res.data.success){
                this.$Message.success(this.$t('setUpPage.addSuccess'))
                this.$emit('editSuccess');
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

<style lang="less">

</style>
