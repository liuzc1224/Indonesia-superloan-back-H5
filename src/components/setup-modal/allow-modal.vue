<template>
  <div>
    <Card>
      <Modal
        v-model="showModal"
        :title="formValidate.id? $t('rolePage.editRole') : $t('rolePage.addRole')"
        :mask-closable="false"
      >
        <div slot="close">
          <Icon @click="cancelSubmit()" type="ios-close"/>
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <FormItem :label="$t('setUpPage.charactor')" prop="name">
            <Input v-model="formValidate.name" :placeholder="$t('setUpPage.charactorTip')"></Input>
          </FormItem>
          <FormItem :label="$t('rolePage.description')" prop="description">
            <Input v-model="formValidate.description" :placeholder="$t('rolePage.descriptionTip')"></Input>
          </FormItem>
        </Form>
        <Tree :data="roleTree" @on-select-change="changeTree" ref="tree" multiple></Tree>
        <div slot="footer">
          <Button type="text" size="large" @click="cancelSubmit()">{{$t('setUpPage.cancel')}}</Button>
          <Button
            type="primary"
            size="large"
            @click="handleSubmit('formValidate')"
            :disabled="submitAble"
          >{{$t('setUpPage.submit')}}</Button>
        </div>
      </Modal>
    </Card>
  </div>
</template>

<script>
import {
  editRoleInfo,
  addRoleInfo,
  getRoleTreeInfo,
  getOneRole
} from "@/api/data";
import { forEach } from "@/libs/tools";
export default {
  name: "AllowModal",
  props: ["allowModal", "chooseItem"],
  data() {
    return {
      treeDTOS: [],
      roleTree: [],
      myRole: [],
      roleIds: [],
      submitAble: false,
      formValidate: {
        name: "",
        description: "",
        id: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: this.$t("setUpPage.charactorTip"),
            trigger: "blur"
          }
        ],
        description: [
          {
            required: false,
            message: this.$t("rolePage.descriptionTip"),
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.roleIds = [];
      forEach(this.$refs.tree.getSelectedNodes(), (item, index) => {
        this.roleIds.push(item.id);
      });
      this.$refs["formValidate"].validate(valid => {
        if (valid) {
          const submitData = {
            name: this.formValidate.name,
            description: this.formValidate.description,
            menuIds: this.roleIds,
            id: this.formValidate.id
          };
          if (submitData.id) {
            editRoleInfo(submitData).then(res => {
              if (res.data.success) {
                this.$Message.success(this.$t("setUpPage.editSuccess"));
                this.$emit("editSuccess");
                this.cancelSubmit();
              } else {
                this.$Message.error(res.data.message);
              }
            });
          } else {
            addRoleInfo(submitData).then(res => {
              if (res.data.success) {
                this.$Message.success(this.$t("setUpPage.addSuccess"));
                this.$emit("editSuccess");
                this.cancelSubmit();
              } else {
                this.$Message.error(res.data.message);
              }
            });
          }
        } else {
          this.$Message.error(this.$t("setUpPage.validateError"));
        }
      });
    },
    getMyTree() {
      this.myRole = [];
      let param = this.formValidate.id;
      if (param) {
        getOneRole(param).then(res => {
          if (res.data.success) {
            if (res.data.data.menuDTOS.length > 0) {
              forEach(res.data.data.menuDTOS, (item, index) => {
                this.myRole.push(item.id);
              });
            }
            this.getRoleTree();
          } else {
            this.$Message.error(res.data.message);
          }
        });
      } else {
        this.getRoleTree();
      }
    },
    getRoleTree() {
      getRoleTreeInfo().then(res => {
        if (res.data.success) {
          this.treeDTOS = res.data.data;
          if (res.data.data.length > 0) {
            this.roleTree = this.getAllTree(this.treeDTOS);
          }
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    getAllTree(tree) {
      let arr = [];
      if (!!tree && tree.length !== 0) {
        tree.forEach(item => {
          let obj = {};
          obj.title = item.menuDescriptions[0].description;
          obj.id = item.id;
          obj.attr = item.attr;
          obj.expand = true;
          if (this.myRole.length > 0 && this.myRole.indexOf(item.id) != -1) {
            obj.selected = true;
          } else {
            obj.selected = false;
          }
          obj.children = this.getAllTree(item.children);
          arr.push(obj);
        });
      }
      return arr;
    },
    changeTree(param) {
      if (this.$refs.tree.getSelectedNodes().length == 0) {
        this.submitAble = true;
      } else {
        this.submitAble = false;
      }
    },
    cancelSubmit() {
      this.$emit("changeAllowModal", false);
      this.$refs["formValidate"].resetFields();
    }
  },
  mounted() {
    this.formValidate = this.chooseItem;
  },
  computed: {
    showModal: {
      get: function() {
        if (this.allowModal) {
          this.getMyTree();
        }
        return this.allowModal;
      },
      set: function() {}
    }
  }
};
</script>

<style lang="less">
</style>
