<template>
  <Row :gutter="10" class="set-tree-page">
    <i-col span="24">
      <Card>
        <Row>
          <i-col :xs="12" :md="8" :lg="3">
            <Button class="add-admin-btn" type="primary" @click="showModal">{{$t('treePage.addTotal')}}</Button>
            <Divider type="vertical" />
          </i-col>
          <i-col v-if="chooseItem.id || chooseItem.parentId" :xs="12" :md="16" :lg="21">
            <Button class="add-child-btn" type="primary" @click="addChild">{{$t('treePage.addChild')}}</Button>
            <Button class="edit-item-btn" type="primary" @click="showModal">{{$t('treePage.edit')}}</Button>
            <Button class="delete-item-btn" type="primary" @click="deleteItem">{{$t('treePage.delete')}}</Button>
          </i-col>
        
        </Row>
        <div style="overflow-y: auto;height: calc(100vh - 230px)">
          <Tree :data="allTree" @on-select-change="changeTree" ref="tree"></Tree>
        </div>

      </Card>
      <Modal v-model="deleteModal" :title="$t('setUpPage.deleteTitle')" @on-ok="deleteThis" width="300">
        <p>{{$t('setUpPage.deleteTip')}}</p>
      </Modal>
      <tree-modal class="tree-modal" :editModal="editModal" :chooseItem="chooseItem" v-on:changeModal="changeModal"  v-on:editSuccess="editSuccess"></tree-modal>
      
    </i-col>
  </Row>
</template>

<script>
import TreeModal from '_c/setup-modal/tree-modal.vue'
import { getAllTreeInfo, deleteTreeItem } from '@/api/data'
export default {
  name: 'tree_page',
  components: {
    TreeModal
  },
  data () {
    return {
      editModal: false,
      deleteModal: false,
      allTree: [],
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
    this.getAllTree()
  },
  methods: {
    getAllTree () {
      getAllTreeInfo().then(res => {
        if(res.data.success){
          this.allTree = this.getTreeNode(res.data.data)
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
    changeTree ( params ) {
      this.choose(params)
    },
    choose (params) {
      let param = {}
      if ( params[0] ) {
        param = params[0]
      }
      this.chooseItem.iconPath = param.iconPath || '' // anticon anticon-bars
      this.chooseItem.id = param.id || ''
      this.chooseItem.parentId = param.parentId || ''
      this.chooseItem.title = param.title || ''
      this.chooseItem.title2 = param.title2 || ''
      this.chooseItem.url = param.url || ''
    },

    // 根据对象渲染Tree
    getTreeNode(tree) {
      let arr = [];
      if (!!tree && tree.length !== 0) {
        tree.forEach(item => {
          let obj = {};
          obj.title = item.menuDescriptions[0].description;
          if ( item.menuDescriptions[1] ) {
            obj.title2 = item.menuDescriptions[1].description;
          }
          obj.id = item.id;
          obj.parentId = item.parentId;
          obj.url = item.url;
          obj.iconPath = item.iconPath;
          obj.expand = true;
          obj.checked = false;
          obj.children = this.getTreeNode(item.children);
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
      this.getAllTree()
    },
    deleteItem () {
      this.deleteModal = true
    },
    deleteThis () {
      let id = this.chooseItem.id
      deleteTreeItem( id ).then(res => {
        if(res.data.success){
          this.$Message.success(this.$t('setUpPage.deleteSuccess'))
          this.choose({'row': {}})
          this.getAllTree()
        }else{
          this.$Message.error(res.data.message)
        }
      })
    }
  }
}
</script>

<style lang="less">
.set-tree-page{
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
  .tree-modal{
    .ivu-card-body{
      padding: 0;
    }
  }
}
</style>
