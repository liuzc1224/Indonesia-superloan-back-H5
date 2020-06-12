<template>
  <Modal v-model="showModal" :title="$t('pushTemplate.edit')"
             :mask-closable="false">
        <div slot="close">
          <Icon @click="cancelSubmit()" type="ios-close"/>
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
          <FormItem :label="$t('pushTemplate.theme')">
            <Input v-model="formValidate.title" :placeholder="$t('pushTemplate.inputTheme')" readonly="readonly"></Input>
          </FormItem>
          <FormItem :label="$t('pushTemplate.content')" prop="text">
            <Input v-model="formValidate.text" type="textarea" :autosize="{minRows: 5,maxRows: 5}" :show-word-limit="true" :maxlength="500" :placeholder="$t('pushTemplate.inputContent')"></Input>
          </FormItem>
          <FormItem :label="$t('pushTemplate.content')" prop="textStyle">
            <Input v-model="formValidate.textStyle" type="textarea" :autosize="{minRows: 5,maxRows: 5}" :show-word-limit="true" :maxlength="500" :placeholder="$t('pushTemplate.inputContent')"></Input>
          </FormItem>
          <FormItem :label="$t('pushTemplate.status')" prop="status">
            <Select clearable v-model="formValidate.status" class="search-select-item" :placeholder="$t('smsTemplate.inputStatus')">
              <Option v-for="(item,index) in $t('pushTemplate.state')" :key="index" :value="item.value">{{item.desc}}</Option>
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
  import { updatePushTemplate} from '@/api/push'
  import {sessionRead} from '@/libs/util'
  export default {
    name: "push-modal",
    props: ['editModal', 'chooseItem'],
    data() {
      return {
        loading:false,
        formValidate: {
          id : "",
          title : "",
          textStyle : "",
          text : "",
          status : "",
        },
        ruleValidate: {
          text: [{
            required: true,
            message: this.$t('pushTemplate.inputContent'),
            trigger: 'blur',
            type: 'string'
          }],
          textStyle: [{
            required: true,
            message: this.$t('pushTemplate.inputContent'),
            trigger: 'blur',
            type: 'string'
          }],
          status:[{
            required: true,
            message: this.$t('pushTemplate.inputStatus'),
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
            let data={
              textStyle : this.formValidate.textStyle,
              text : this.formValidate.text,
              status : this.formValidate.status,
            }
            if(data.status==='true'){
              data.status=true;
            }else if(data.status==='false'){
              data.status=false;
            };

            this.loading=true;
            updatePushTemplate(data).then(res => {
              this.loading=false;
              if (res.data.success) {
                this.$Message.success(this.$t('common.editSuccess'));
                this.$emit('editSuccess');
                this.cancelSubmit();
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
