<template>
  <Row :gutter="10" class="set-permission-page">
    <i-col span="24">
      <Card>
        <Button class="add-admin-btn" type="primary" @click="showModal">{{$t('rolePage.addRole')}}</Button>
        <allow-modal class="admin-modal"
          :allowModal="allowModal"
          :chooseItem="chooseItem"
          :roles="roles"
          :thisTree="thisTree"
          v-on:changeAllowModal="changeAllowModal"
          v-on:editSuccess="editSuccess"
        ></allow-modal>
        <Table border class="person-table" :columns="columns" :data="tableData" :loading="tableLoading"/>
        <Modal v-model="deleteModal" :title="$t('setUpPage.deleteTitle')" @on-ok="deleteItem">
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
import PasteEditor from '_c/paste-editor'
import { forEach } from '@/libs/tools'
import AllowModal from '_c/setup-modal/allow-modal.vue'
import { getRoleInfo, deleteRole } from '@/api/data'
export default {
  name: 'role_page',
  components: {
    PasteEditor,
    AllowModal
  },
  data () {
    return {
      tableLoading: true,
      deleteModal: false,
      allowModal: false,
      currentPage: 1,
      pageSize: 10,
      totalNumber: 0,
      departments: [],
      thisTree: [],
      chooseItem: {
        description: '',
        name: '',
        id: ''
      },
      roles: [],
      columns: [
        {
          title: this.$t('rolePage.charactor'), key: 'name',
          minWidth:150
        },
        {
          title: this.$t('rolePage.description'), key: 'description',
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
                props: {type: 'text', size: 'large', icon: 'md-build'
                },
                class: 'allow-btn',
                on: {
                  click: () => {
                    this.editAllow(params)
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
  },
  methods: {
    getTable () {
      let params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
      }
      this.tableLoading = this.tableLoading === false ? true : this.tableLoading
      getRoleInfo(params).then(res => {
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
    // 添加
    showModal () {
      this.allowModal = true
    },
    // 删除
    removePerson (params) {
      this.choose(params)
      this.deleteModal = true
    },
    deleteItem () {
      let params = this.chooseItem
      deleteRole(params).then(res => {
        if(res.data.success){
          this.$Message.success(this.$t('setUpPage.deleteSuccess'))
          this.choose({'row': {}})
          this.getTable()
        }else{
          this.$Message.error(res.data.message)
        }
      })
    },

    choose (params) {
      this.chooseItem.description = params.row.description || ''
      this.chooseItem.name = params.row.name || ''
      this.chooseItem.id = params.row.id || ''
    },
    editSuccess (param) {
      this.tableLoading = true
      this.getTable()
    },
    changePage (param) {
      this.currentPage = param
      this.getTable()
    },
    pageSizeChange (params) {
      this.pageSize = params
      this.getTable()
    },

    // 权限
    editAllow (params) {
      this.choose(params)
      this.allowModal = true
    },
    changeAllowModal (param) {
      this.allowModal = param
      this.choose({'row': {}})
    },
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
