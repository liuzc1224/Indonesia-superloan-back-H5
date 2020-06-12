<template>
  <Modal v-model="showModal" :title="$t('versionUpdate.add')" :mask-closable="false">
    <div slot="close">
      <Icon @click="cancelSubmit()" type="ios-close" />
    </div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
      <FormItem :label="$t('versionUpdate.updateType')" prop="updateType">
        <Select clearable v-model="formValidate.updateType" class="search-select-item" :placeholder="$t('versionUpdate.prompt.updateType')">
          <Option v-for="(item,index) in $t('versionUpdate.types')" :key="index" :value="item.value">{{item.desc}}</Option>
        </Select>
      </FormItem>
      <FormItem :label="$t('versionUpdate.version')" prop="updateVersion">
        <Input v-model="formValidate.updateVersion" type="text" :show-word-limit="true" :maxlength="100" :placeholder="$t('versionUpdate.prompt.version')"></Input>
      </FormItem>
      <FormItem :label="$t('versionUpdate.updateContent')" prop="updateContent">
        <Input v-model="formValidate.updateContent" type="textarea" :autosize="{minRows: 5,maxRows: 5}" :show-word-limit="true" :maxlength="500" :placeholder="$t('versionUpdate.prompt.updateContent')"></Input>
      </FormItem>
      <FormItem :label="$t('versionUpdate.server')" prop="serviceLink">
        <Input v-model="formValidate.serviceLink" type="text" :show-word-limit="true" :maxlength="500" :placeholder="$t('versionUpdate.prompt.server')"></Input>
      </FormItem>
      <FormItem :label="$t('versionUpdate.google')" prop="googleLink">
        <Input v-model="formValidate.googleLink" type="text" :show-word-limit="true" :maxlength="500" :placeholder="$t('versionUpdate.prompt.google')"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="cancelSubmit()">{{$t('setUpPage.cancel')}}</Button>
      <Button type="primary" size="large" :loading="loading" @click="handleSubmit('formValidate')">{{$t('setUpPage.submit')}}</Button>
    </div>
  </Modal>
</template>

<script>
  import { addApkVersion,updateApkVersion } from "@/api/operationCenter";
  export default {
    name: "versionUpdateModal",
    props: ['editModal', 'chooseItem'],
    data () {
      return {
        loading:false,
        formValidate: {
          id: null,
          updateType: null,
          updateVersion: null,
          updateContent: null,
          googleLink: null,
          serviceLink: null
        },
        ruleValidate: {
          updateType:[{
            required: true,
            message: this.$t('versionUpdate.prompt.updateType'),
            trigger: 'change',
            type:'number'
          }],
          updateVersion:[{
            required: true,
            message: this.$t('versionUpdate.prompt.version'),
            trigger: 'blur'
          }],
          updateContent:[{
            required: true,
            message: this.$t('versionUpdate.prompt.updateContent'),
            trigger: 'blur'
          }],
          serviceLink:[{
            required: true,
            message: this.$t('versionUpdate.prompt.server'),
            trigger: 'blur'
          }],
          googleLink:[{
            required: true,
            message: this.$t('versionUpdate.prompt.google'),
            trigger: 'blur'
          }]
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
              updateApkVersion( submitData ).then(res => {
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
              addApkVersion( submitData ).then(res => {
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
