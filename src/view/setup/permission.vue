<template>
  <Row :gutter="10" class="set-permission-page">
    <i-col span="24">
      <Card>
        <Button class="add-admin-btn" type="primary" @click="showModal">{{$t('setUpPage.addAdmin')}}</Button>
        <admin-modal class="admin-modal"
          :editModal="editModal"
          :chooseItem="chooseItem"
          :roles="roles"
          :thisTree="thisTree"
          v-on:changeEditModal="changeEditModal"
          v-on:editSuccess="editSuccess"
        ></admin-modal>
        <Table border class="person-table" :columns="columns" :data="tableData" :loading="tableLoading"/>
        <Modal v-model="deleteModal" :title="$t('setUpPage.deleteTitle')" @on-ok="deleteItem" width="300">
          <p>{{$t('setUpPage.deleteTip')}}</p>
        </Modal>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;margin-bottom: 2px;">
            <Page
              :total="totalNumber"
              :current="currentPage"
              :page-size-opts="[10, 20, 30, 50]"
              @on-change="changePage"
              @on-page-size-change="pageSizeChange"
              show-elevator show-sizer show-total></Page>
          </div>
        </div>
      </Card>
    </i-col>
  </Row>
</template>

<script>
import { forEach } from '@/libs/tools'
import AdminModal from '_c/setup-modal/admin-modal.vue'
import { getAdminsInfo, getRoleInfo, deleteAdmin } from '@/api/data'
export default {
  name: 'setup_page',
  components: {
    AdminModal
  },
  data () {
    return {
      editModal: false,
      tableLoading: true,
      deleteModal: false,
      currentPage: 1,
      pageSize: 10,
      totalNumber: 0,
      departments: [],
      thisTree: [],
      chooseItem: {
        departmentDTOS: '',
        description: '',
        username: '',
        phoneNumber: '',
        role: '',
        password: '',
        id: ''
      },
      roles: [],
      columns: [
        {
          title: this.$t('setUpPage.departament'), key: 'departmentDTOS',
          render: (h, params) => {
            let role = ''
            if ( params.row.departmentDTOS.length > 0 ) {
              forEach(params.row.departmentDTOS, (item, index) => {
                role += item.name + ','
              })
              role = role.slice(0,role.length-1)
            }
            return h('div', role)
          },
          minWidth:150
        },
        {
          title: this.$t('setUpPage.name'), key: 'description',
          minWidth:150
        },
        {
          title: this.$t('setUpPage.username'), key: 'username',
          minWidth:150
        },
        {
          title: this.$t('setUpPage.phoneNumber'), key: 'phoneNumber',
          minWidth:150
        },
        {
          title: this.$t('setUpPage.charactor'), key: 'roleOutputVOS',
          render: (h, params) => {
            let role = ''
            if ( params.row.roleOutputVOS.length > 0 ) {
              forEach(params.row.roleOutputVOS, (item, index) => {
                role += item.name + ','
              })
              role = role.slice(0,role.length-1)
            }
            return h('div', role)
          },
          minWidth:150
        },
        {
          title: this.$t('setUpPage.operating'),
          key: 'action',
          minWidth: 350,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text', size: 'large', icon: 'md-menu'
                },
                class: 'edit-btn',
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.editPerson(params)
                  }
                }
              }, this.$t('setUpPage.edit')),
              h('Button', {
                props: {type: 'text', size: 'large', icon: 'md-trash'
                },
                class: 'delete-btn',
                on: {
                  click: () => {
                    this.removePerson(params)
                  }
                }
              }, this.$t('setUpPage.delete'))
            ])
          }
        }
      ],
      tableData: []
    }
  },
  mounted: function () {
    this.getTable()
    this.getRole()
  },
  methods: {
    getTable () {
      let params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        enabled:1
      }
      this.tableLoading = this.tableLoading === false ? true : this.tableLoading
      getAdminsInfo(params).then(res => {
        this.tableLoading = false
        if(res.data.success){
          this.tableData = res.data.data
          this.currentPage = res.data.page.currentPage
          this.pageSize = res.data.page.pageSize
          this.totalNumber = res.data.page.totalNumber
        }else{
          this.$Message.error(res.data.message)
        }
      })
    },
    getRole () {
      let params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
      }
      getRoleInfo(params).then(res => {
        if(res.data.success){
          this.roles = res.data.data
        }else{
          this.$Message.error(res.data.message)
        }
      })
    },

    // 添加
    showModal () {
      this.editModal = true
    },

    // 删除
    removePerson (params) {
      this.choose(params)
      this.deleteModal = true
    },
    deleteItem () {
      let params = this.chooseItem
      deleteAdmin(params).then(res => {
        if(res.data.success){
          this.$Message.success(this.$t('setUpPage.deleteSuccess'))
          this.choose({'row': {}})
          this.getTable()
        }else{
          this.$Message.error(res.data.message)
        }
      })
    },

    // 编辑
    editPerson (params) {
      this.choose(params)
      this.editModal = true
    },
    changeEditModal (param) {
      this.editModal = param
      this.choose({'row': {}})
    },
    editSuccess (param) {
      this.tableLoading = true
      this.getTable()
    },

    // 页码
    changePage (param) {
      this.currentPage = param
      this.getTable()
    },
    pageSizeChange (params) {
      this.pageSize = params
      this.getTable()
    },
    getThisTree(tree) {
      if (!!tree && tree.length !== 0) {
        tree.forEach(item => {
            this.thisTree.push( item.id )
            if ( item.children && item.children.length > 0 ) {
              this.getAllTree(item.children)
            }
        });
      }
    },
    choose (params) {
      this.thisTree = []
      if(params.row.departmentDTOS){
        this.getThisTree(params.row.departmentDTOS)
      }
      this.chooseItem.description = params.row.description || ''
      this.chooseItem.username = params.row.username || ''
      this.chooseItem.phoneNumber = params.row.phoneNumber || ''
      if(params.row.roleOutputVOS){
        let paramRole = []
        forEach(params.row.roleOutputVOS, (item, index) => {
          paramRole.push(item.id)
        })
        this.chooseItem.role = paramRole
      }else{
        this.chooseItem.role = []
      }
      this.chooseItem.password = params.row.password || ''
      this.chooseItem.id = params.row.id || ''
    }
  }
}
</script>

<style lang="less">
.set-permission-page{
  .add-admin-btn{
    margin-bottom: 15px;
  }
  .person-table{
    .ivu-btn-text,.ivu-btn-text:hover,.ivu-btn-text:focus{
      background-color: transparent;
      box-shadow: none;
      .ivu-icon + span{
        margin-left: 0;
      }
    }
    .ivu-btn-text.allow-btn{
      color: #ff9900;
    }
    .ivu-btn-text.edit-btn{
      color: #57a3f3;
    }
    .ivu-btn-text.delete-btn{
      color: #ed4014;
    }
  }
  .admin-modal,.allow-modal{
    .ivu-card-bordered{
      border: 0;
    }
    .ivu-card-body{
      padding: 0;
    }
  }
}
</style>
