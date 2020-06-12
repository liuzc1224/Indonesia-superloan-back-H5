<template>
  <div>
    <Card>
      <Modal v-model="showModal" :title="formValidate.id? $t('departmentPage.editDepartment') : $t('departmentPage.addDepartment')" :mask-closable="false">
        <div slot="close">
          <Icon @click="cancelSubmit()" type="ios-close" />
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" class="help-modal">
          <FormItem label="名称" prop="title">
            <Input v-model="formValidate.title" placeholder="请输入名称"></Input>
          </FormItem>
          <FormItem label="备注" prop="description">
            <Input v-model="formValidate.description" placeholder="请输入备注"></Input>
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
import { editDepartmentInfo, addDepartmentInfo, getFlagInfo } from '@/api/data'
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
        title: [ { required: true, message: '请输入名称', trigger: 'blur' } ],
        description: [ { required: true, message: '请输入备注', trigger: 'blur' } ]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          const submitData = {
            id: this.formValidate.id,
            parentId: this.formValidate.parentId,
            name: this.formValidate.title,
            description: this.formValidate.description
          }
          if(submitData.id){
            editDepartmentInfo( submitData ).then(res => {
              if(res.data.success){
                this.$Message.success('编辑成功!')
                this.$emit('editSuccess')
                this.cancelSubmit()
              }else{
                this.$Message.error('修改失败')
              }
            })
          }else{
            addDepartmentInfo( submitData ).then(res => {
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
