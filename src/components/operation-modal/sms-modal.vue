<template>
  <Modal v-model="showModal" :title="$t('smsTemplate.edit')"
             :mask-closable="false">
        <div slot="close">
          <Icon @click="cancelSubmit()" type="ios-close"/>
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
          <FormItem :label="$t('smsTemplate.theme')">
            <Input v-model="formValidate.theme" :placeholder="$t('smsTemplate.inputTheme')" readonly="readonly"></Input>
          </FormItem>
          <FormItem :label="$t('smsTemplate.content')" prop="content">
            <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 5,maxRows: 5}" :show-word-limit="true" :maxlength="500" :placeholder="$t('smsTemplate.inputContent')"></Input>
          </FormItem>
          <FormItem :label="$t('smsTemplate.status')" prop="status">
            <Select clearable v-model="formValidate.status" class="search-select-item" :placeholder="$t('smsTemplate.inputStatus')">
              <Option v-for="(item,index) in $t('smsTemplate.state')" :key="index" :value="item.value">{{item.desc}}</Option>
            </Select>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="text" size="large" @click="cancelSubmit()">{{$t('common.cancel')}}</Button>
          <Button type="primary" size="large" :loading="loading" @click="handleSubmit('formValidate')">{{$t('common.submit')}}</Button>
        </div>
      </Modal>
</template>

<script>
  import { updateMessageTemplate} from '@/api/sms'
  import {dateToString, getLoginInfo} from '@/libs/tools'
  import {sessionRead} from '@/libs/util'
  export default {
    name: "sms-modal",
    props: ['editModal', 'chooseItem'],
    data() {
      return {
        loading:false,
        formValidate: {
          id: "",
          theme:"",
          content: "",
          status: "",
        },
        ruleValidate: {
          content: [{
            required: true,
            message: this.$t('smsTemplate.inputContent'),
            trigger: 'blur',
            type: 'string'
          }],
          status:[{
            required: true,
            message: this.$t('smsTemplate.inputStatus'),
            trigger: 'change',
            type: 'number'
          }],
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            let data=this.formValidate;
            this.loading=true;
            updateMessageTemplate(data).then(res => {
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
