<template>
  <div>
    <Card>
      <Modal v-model="showModal" :title="formValidate.id? '修改菜单' : '新增菜单'" :mask-closable="false">
        <div slot="close">
          <Icon @click="cancelSubmit()" type="ios-close" />
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" class="help-modal">
          <FormItem label="图标" prop="iconPath">
            <Input v-model="formValidate.iconPath" placeholder="请输入图标"></Input>
          </FormItem>
          <FormItem label="名称" prop="title">
            <Input v-model="formValidate.title" placeholder="请输入名称"></Input>
          </FormItem>
          <FormItem label="名称" prop="title2">
            <Input v-model="formValidate.title2" placeholder="请输入名称"></Input>
          </FormItem>
          <FormItem label="路径" prop="url">
            <Input v-model="formValidate.url" placeholder="请输入路径"></Input>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="text" size="large" @click="cancelSubmit()">取消</Button>
          <Button type="primary" size="large" @click="handleSubmit('formValidate')">确定</Button>
        </div>
      </Modal>
    </Card>
  </div>
</template>

<script>
import { editTreeInfo, addTreeInfo, getFlagInfo } from '@/api/data'
export default {
  name: 'MessageModal',
  props: ['editModal', 'chooseItem'],
  data () {
    return {
      formValidate: {
        iconPath: '',
        id: '',
        parentId: '',
        title: '',
        title2: '',
        url: ''
      },
      ruleValidate: {
        iconPath: [ { required: true, message: '请输入图标', trigger: 'blur' } ],
        title: [ { required: true, message: '请输入名称', trigger: 'blur' } ],
        title2: [ { required: true, message: '请输入名称', trigger: 'blur' } ],
        url: [ { required: true, message: '请输入路径', trigger: 'blur' } ]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          const submitData = {
            iconPath: this.formValidate.iconPath,
            id: this.formValidate.id,
            isButton: "0",
            parentId: this.formValidate.parentId,
            menuDescriptionVOS: [
              {description: this.formValidate.title, locale: "zh_CN"},
              {description: this.formValidate.title2, locale: "es_MX"}
            ],
            title: this.formValidate.title,
            title2: this.formValidate.title2,
            url: this.formValidate.url
          }
          if(submitData.id){
            editTreeInfo( submitData ).then(res => {
              if(res.data.success){
                this.$Message.success('编辑成功!')
                this.$emit('editSuccess')
                this.cancelSubmit()
              }else{
                this.$Message.error('修改失败')
              }
            })
          }else{
            addTreeInfo( submitData ).then(res => {
              if(res.data.success){
                this.$Message.success('添加成功!')
                this.$emit('editSuccess')
                this.cancelSubmit()
              }
            })
          }
        } else {
          this.$Message.error('校验失败!')
        }
      })
    },
    cancelSubmit () {
      this.$emit('changeModal', false)
      this.$refs['formValidate'].resetFields()
    },
    changeFlag (param) {
      if(param){
        getFlagInfo( param ).then(res => {
          if(res.data.success){
            this.formValidate.textOrder = res.data.data
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
