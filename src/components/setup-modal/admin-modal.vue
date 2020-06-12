<template>
  <div>
    <Card>
      <Modal v-model="showModal" :title="formValidate.id? $t('setUpPage.editAdmin') : $t('setUpPage.addAdmin')" :mask-closable="false">
        <div slot="close">
          <Icon @click="cancelSubmit()" type="ios-close" />
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <FormItem :label="$t('setUpPage.name')" prop="description">
            <Input v-model="formValidate.description" :placeholder="$t('setUpPage.nameTip')"></Input>
          </FormItem>
          <FormItem :label="$t('setUpPage.phoneNumber')" prop="phoneNumber">
            <Input v-model="formValidate.phoneNumber" :placeholder="$t('setUpPage.phoneNumberTip')"></Input>
          </FormItem>
          <FormItem :label="$t('setUpPage.username')" prop="username">
            <Input v-model="formValidate.username" :placeholder="$t('setUpPage.usernameTip')"></Input>
          </FormItem>
<!--          <FormItem :label="$t('setUpPage.password')" prop="password">-->
          <FormItem :label="$t('setUpPage.password')">
            <Input v-model="formValidate.password" :placeholder="$t('setUpPage.password')"></Input>
          </FormItem>
          <FormItem :label="$t('setUpPage.charactor')" prop="role">
            <Select clearable v-model="formValidate.role" multiple :placeholder="$t('setUpPage.nameTip')" >
              <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Form>
        <Tree :data="departmentTree" @on-check-change="changeTree" ref="tree" show-checkbox></Tree>
        <div slot="footer">
          <Button type="text" size="large" @click="cancelSubmit()">{{$t('setUpPage.cancel')}}</Button>
          <Button type="primary" size="large" @click="handleSubmit('formValidate')" :disabled="submitAble">{{$t('setUpPage.submit')}}</Button>
        </div>
      </Modal>
    </Card>
  </div>
</template>

<script>
import { editAdminsInfo, addAdminsInfo, getDepartmentInfo } from '@/api/data'
import { forEach } from '@/libs/tools'
export default {
  name: 'AdminModal',
  props: ['editModal', 'chooseItem', 'roles', 'thisTree'],
  data () {
    return {
      departmentDTOS: [],
      departmentTree: [],
      departmentIds: [],
      submitAble: false,
      formValidate: {
        description: '',
        username: '',
        phoneNumber: '',
        role: '',
        password: '',
        id: ''
      },
      ruleValidate: {
        description: [ { required: true, message: this.$t('setUpPage.nameTip'), trigger: 'change' } ],
        phoneNumber: [ { required: true, message: this.$t('setUpPage.phoneNumberTip'), trigger: 'blur' } ],
        username: [ { required: true, message: this.$t('setUpPage.usernameTip'), trigger: 'blur' } ],
        // password: [ { required: true, message: this.$t('setUpPage.passwordTip'), trigger: 'blur' } ],
        role: [ { required: true, message: this.$t('setUpPage.charactorTip'), trigger: 'change', type: 'array' } ]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.departmentIds = []
      forEach (this.$refs.tree.getCheckedNodes(), (item, index) => {
        this.departmentIds.push(item.id)
      })
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          const submitData = {
            description: this.formValidate.description,
            departmentIds: this.departmentIds,
            phoneNumber: this.formValidate.phoneNumber,
            username: this.formValidate.username,
            password: this.formValidate.password ? this.formValidate.password : "",
            roleIds: this.formValidate.role,
            id: this.formValidate.id
          }
          if(submitData.id){
            editAdminsInfo( submitData ).then(res => {
              if(res.data.success){
                this.$Message.success(this.$t('setUpPage.editSuccess'))
                this.$emit('editSuccess')
                this.cancelSubmit()
              }else{
                this.$Message.error(res.data.message)
              }
            })
          }else{
            addAdminsInfo( submitData ).then(res => {
              if(res.data.success){
                this.$Message.success(this.$t('setUpPage.addSuccess'))
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
    getDepartmentTree () {
      getDepartmentInfo().then(res => {
        if (res.data.success) {
          this.departmentDTOS = res.data.data
          if ( res.data.data.length > 0 ) {
            this.departmentTree = this.getAllTree(this.departmentDTOS)
          }
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    getAllTree(tree) {
        let arr = [];
        if (!!tree && tree.length !== 0) {
          tree.forEach(item => {
              let obj = {};
              obj.title = item.name;
              obj.id = item.id;
              obj.attr = item.attr;
              obj.expand = true;
              if (this.thisTree.length>0 && this.thisTree.indexOf(item.id) != -1 ) {
                obj.checked = true;
              } else {
                obj.checked = false;
              }
              obj.children = this.getAllTree(item.children);
              arr.push(obj);
          });
        }
        return arr;
    },
    changeTree ( param ) {
      if ( this.$refs.tree.getCheckedNodes().length == 0 ) {
        this.submitAble = true
      } else {
        this.submitAble = false
      }
    },
    cancelSubmit () {
      this.$emit('changeEditModal', false)
      this.$refs['formValidate'].resetFields()
    }
  },
  mounted () {
    this.getDepartmentTree()
    this.formValidate = this.chooseItem
  },
  computed: {
    showModal: {
      get: function () {
        return this.editModal
      },
      set: function () {
      }
    },
    roleList: {
      get: function () {
        return this.roles
      },
      set: function () {
      }
    },
    departments: {
      get: function () {
        return this.roles
      },
      set: function () {
      }
    }
  },
  watch: {
    thisTree: function (newTree, oldTree) {
      this.departmentTree = this.getAllTree(this.departmentDTOS)
    }
  } 
}
</script>

<style lang="less">

</style>
