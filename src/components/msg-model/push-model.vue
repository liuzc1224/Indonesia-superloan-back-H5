<template>
  <Modal v-model="showModal" :title="$t('push.edit')" :mask-closable="false">
        <div slot="close">
          <Icon @click="cancelSubmit()" type="ios-close" />
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" class="push-modal">
          <FormItem :label="$t('push.theme')" prop="subject">
            <Input v-model="formValidate.subject" :placeholder="$t('push.prompt.theme')"></Input>
          </FormItem>
          <FormItem :label="$t('push.releaseDate')" prop="pushTime">
            <DatePicker type="datetime" v-model="formValidate.pushTime" :placeholder="$t('push.prompt.releaseDate')" style="width: 100%"></DatePicker>
          </FormItem>
          <FormItem :label="$t('push.type')" prop="pushType">
            <Select
              clearable
              v-model="formValidate.pushType"
              :placeholder="$t('push.prompt.type')"
            >
              <Option v-for="(item, i) in $t('push.types')" :value="item.value" :key="i">{{item.desc}}</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('push.content')" v-if="formValidate.pushType===2" prop="pushContent">
            <Input v-model="formValidate.pushContent" type="textarea" :placeholder="$t('push.prompt.content')"  :autosize="{minRows: 4,maxRows: 4}"></Input>
          </FormItem>
          <FormItem :label="$t('push.pushObject')" v-if="formValidate.pushType===2" prop="pushObj">
            <Select
              clearable
              v-model="formValidate.pushObj"
              :placeholder="$t('push.prompt.pushObject')"
            >
              <Option v-for="(item, i) in $t('push.pushObjects')" :value="item.value" :key="i">{{item.desc}}</Option>
            </Select>
          </FormItem>
          <FormItem v-if="formValidate.pushType===2 && formValidate.pushObj===1">
            <Row class="avatar">
              <Button type="primary">{{$t('push.inPushObject')}}</Button>
              <input
                type="file"
                class="input-file"
                name="avatar"
                ref="avatarInput"
                @change="change($event)"
                accept=".xls,.xlsx"
              >
            </Row>
            <Row v-if="file && file.name" class="fileName">
              <Col span="20">
                <p>{{file.name}}</p>
              </Col>
              <Col span="3">
                <Icon class="icon" type="md-close" @click="file=null"/>
              </Col>
            </Row>
            <Row>
              {{$t('push.prompt.inPushObject')}}<br />
              <table class="table">
                <tr>
                  <td>{{$t('push.prompt.tabId')}}</td>
                  <td>{{$t('push.prompt.tabContent')}}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
              </table>
            </Row>
          </FormItem>


          <FormItem v-if="formValidate.pushType===1">
            <Row class="avatar">
              <Button type="primary">{{$t('push.inObContent')}}</Button>
              <input
                type="file"
                class="input-file"
                name="avatarContent"
                ref="avatarContent"
                @change="changeContent($event)"
                accept=".xls,.xlsx"
              >
            </Row>
            <Row v-if="fileContent && fileContent.name" class="fileName">
              <Col span="20">
                <p>{{fileContent.name}}</p>
              </Col>
              <Col span="3">
                <Icon class="icon" type="md-close" @click="fileContent=null"/>
              </Col>
            </Row>
            <Row>
              {{$t('push.prompt.inPushObject')}}<br />
              <table class="table">
                <tr>
                  <td>{{$t('push.prompt.tabId')}}</td>
                  <td>{{$t('push.prompt.tabContent')}}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
              </table>
            </Row>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="text" size="large" @click="cancelSubmit()">{{$t('setUpPage.cancel')}}</Button>
          <Button type="primary" size="large" @click="handleSubmit('formValidate')">{{$t('setUpPage.submit')}}</Button>
        </div>
      </Modal>
</template>

<script>
  import { addMsgPush, updateMsgPush } from '@/api/msgCenter'
  import { formatDate } from "@/assets/js/date";
  import {sessionRead} from '@/libs/util'
  export default {
    name: 'push-model',
    props: ['editModal', 'chooseItem'],
    data () {
      return {
        file:null,
        fileContent:null,
        formValidate: {
          id: null,
          subject: null,
          pushTime: null,
          pushType: null,
          pushContent: null,
          pushObj: null,
          pushExcel:null
        },
        ruleValidate: {
          subject: [ { required: true, message: this.$t('push.prompt.theme'), trigger: 'blur'} ],
          pushContent: [ { required: true, message: this.$t('push.prompt.tabContent'), trigger: 'blur'} ],
          pushTime: [ { required: true, message: this.$t('push.prompt.releaseDate'), trigger: 'change', type: 'date' }],
          pushType: [ { required: true, message: this.$t('push.prompt.type'), trigger: 'change', type: 'number' } ],
          pushObj: [ { required: true, message: this.$t('push.prompt.pushObject'), trigger: 'change', type: 'number' } ],
        }
      }
    },
    methods: {
      handleSubmit () {

        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            let loginInfo = sessionRead('loginInfo');
            let submitData=this.formValidate;
            let formData=new FormData();
            if(submitData.id){
              formData.append("id",submitData.id);
            }
            formData.append("subject",submitData.subject);
            formData.append("pushTime",formatDate(new Date(submitData.pushTime), "yyyy-MM-dd hh:mm:ss"));
            formData.append("pushType",submitData.pushType);
            if(submitData.pushContent){
              formData.append("pushContent",submitData.pushContent);
            }
            if(submitData.pushObj){
              formData.append("pushObj",submitData.pushObj);
            }
            formData.append("operatorId",loginInfo['id']);
            if(submitData.pushType===1){
              if(this.fileContent){
                formData.append("pushExcel",this.fileContent);
              }else{
                this.$Message.error(this.$t('push.prompt.inObContent'));
                return;
              }
            }else{
              if(submitData.pushObj===1){
                if(this.file){
                  formData.append("pushExcel",this.file);
                }else{
                  this.$Message.error(this.$t('push.prompt.inputInPushObject'));
                  return;
                }
              }
            }
            if(submitData.id){
              updateMsgPush(formData).then(res => {
                if(res.data.success){
                  this.$Message.success(this.$t('setUpPage.editSuccess'));
                  this.$emit('editSuccess');
                  this.cancelSubmit()
                }else{
                  this.$Message.error(res.data.message)
                }
              })
            }else{
              addMsgPush( formData ).then(res => {
                if(res.data.success){
                  this.$Message.success(this.$t('setUpPage.addSuccess'));
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
        this.file = "";
        this.fileContent = "";
        this.$emit('changeModal', false);
        this.$refs['formValidate'].resetFields();

      },
      changeFlag (param) {
        if(param){
          getFlagInfo( param ).then(res => {
            if(res.data.success){
              this.formValidate.textOrder = res.data.data
            }
          })
        }
      },
      change: function(e) {
        let file = e.target.files[0];
        this.file = file;
        this.$refs["avatarInput"].value = "";
      },
      changeContent: function(e) {
        let file = e.target.files[0];
        this.fileContent = file;
        this.$refs["avatarContent"].value = "";
      },
      handleUpload (file) {
        this.file = file;
        return false;
      },
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
  .avatar {
    cursor: pointer;
    position: relative;

    .input-file {
      width: 40%;
      height: 32px;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      cursor: pointer;
    }

    .bg {
      width: 100%;
      height: 100%;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.3);
      text-align: center;
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
    }

    .text {
      padding-top: 10px;
      color: lightblue;
    }
  }
  .fileName{
    margin-top: 10px;
  }
  .fileName:hover{
    background-color: #f2f2f2;
  }
  .table{
    border-collapse: collapse;
    tr{
      td{
        height: 40px;
        width: 100px;
        text-align: center;
        border: 1px solid black;
      }
    }
  }
</style>
