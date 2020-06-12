<template>
  <Row :gutter="10" class="set-department-page">
    <i-col span="24">
      <Card>
        <Row>
          <i-col :xs="12" :md="8" :lg="3">
            <Button class="add-admin-btn" type="primary" @click="showModal">{{$t('departmentPage.addTotalDepartment')}}</Button>
            <Divider type="vertical" />
          </i-col>
          <i-col v-if="chooseItem.id || chooseItem.parentId" :xs="12" :md="8" :lg="6">
            <Button class="add-child-btn" type="primary" @click="addChild">{{$t('departmentPage.addChildDepartment')}}</Button>
            <Button class="edit-item-btn" type="primary" @click="showModal">{{$t('departmentPage.editThisDepartment')}}</Button>
            <Button class="delete-item-btn" type="primary" @click="deleteItem">{{$t('departmentPage.deleteDepartment')}}</Button>
          </i-col>
        
        </Row>
        <Tree :data="allDepartment" @on-select-change="changeDepartment" ref="tree"></Tree>
      </Card>
      <Modal v-model="deleteModal" :title="$t('setUpPage.deleteTitle')" @on-ok="deleteThis" width="300">
        <p>{{$t('setUpPage.deleteTip')}}</p>
      </Modal>
      <department-modal class="tree-modal" :editModal="editModal" :chooseItem="chooseItem" v-on:changeModal="changeModal"  v-on:editSuccess="editSuccess"></department-modal>
      
    </i-col>
  </Row>
</template>

<script>
import DepartmentModal from '_c/setup-modal/department-modal.vue'
import { getDepartmentInfo, deleteDepartmentItem } from '@/api/data'
export default {
  name: 'department_page',
  components: {
    DepartmentModal
  },
  data () {
    return {
      editModal: false,
      deleteModal: false,
      allDepartment: [],
      chooseItem: {
        iconPath: '',
        id: '',
        parentId: '',
        title: '',
        title2: '',
        url: ''
      },
      roles: [],
    }
  },
  mounted: function () {
    this.getAllDepartment()
  },
  methods: {
    getAllDepartment () {
      getDepartmentInfo().then(res => {
        if(res.data.success){
          this.allDepartment = this.getDepartmentNode(res.data.data)
        }else{
          this.$Message.error(res.data.message)
        }
      })
    },
    // 添加
    showModal () {
      this.editModal = true
    },
    // 添加子菜单
    addChild () {
      let thisId = this.chooseItem.id
      this.choose([{
        'parentId': thisId
      }])
      this.editModal = true
    },
    // 编辑
    changeDepartment ( params ) {
      this.choose(params)
    },
    choose (params) {
      let param = {}
      if ( params[0] ) {
        param = params[0]
      }
      this.chooseItem.id = param.id || ''
      this.chooseItem.parentId = param.parentId || ''
      this.chooseItem.title = param.title || ''
      this.chooseItem.description = param.description || ''
    },

    // 根据对象渲染Department
    getDepartmentNode(tree) {
      let arr = [];
        if (!!tree && tree.length !== 0) {
          tree.forEach(item => {
              let obj = {};
              obj.title = item.name;
              obj.id = item.id;
              obj.parentId = item.parentId;
              obj.description = item.description;
              obj.expand = true;
              obj.checked = false;
              obj.children = this.getDepartmentNode(item.children);
              arr.push(obj);
          });
        }
        return arr;
    },
    changeModal (param) {
      this.editModal = param
      this.choose({'row': {}})
    },
    editSuccess (param) {
      this.tableLoading = true
      this.getAllDepartment()
    },
    deleteItem () {
      this.deleteModal = true
    },
    deleteThis () {
      let id = this.chooseItem.id
      deleteDepartmentItem( id ).then(res => {
        if(res.data.success){
          this.$Message.success(this.$t('setUpPage.deleteSuccess'))
          this.choose({'row': {}})
          this.getAllDepartment()
        }else{
          this.$Message.error(res.data.message)
        }
      })
    }
  }
}
</script>

<style lang="less">
.set-department-page{
  .add-child-btn{    
    background-color: #19be6b;
    border-color: #19be6b;
    
  }
  .edit-item-btn{
    background-color: #ff9900;
    border-color: #ff9900;
    margin-left: 15px;
  }
  .delete-item-btn{
    background-color: #ed3f14;
    border-color: #ed3f14;
    margin-left: 15px;
  }
  .department-modal{
    .ivu-card-body{
      padding: 0;
    }
  }
}
</style>
