<template>
  <Modal v-model="showModal" :title="formValidate.id ? $t('commentManagement.edit') :  $t('commentManagement.add')"
         :mask-closable="false">
    <div slot="close">
      <Icon @click="cancelSubmit()" type="ios-close"/>
    </div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
      <FormItem :label="$t('commentManagement.tableData.virtualAccount')" prop="userName">
        <Input v-model="formValidate.userName" @on-keyup="formValidate.userName=formValidate.userName.replace(/[^\d]/g,'')" type="text" :placeholder="$t('commentManagement.prompt.virtualAccount')" :show-word-limit="true" :maxlength="20" />
      </FormItem>
      <FormItem :label="$t('commentManagement.tableData.virtualAvatar')" prop="headUrl">
        <Upload
          ref="upload"
          :uploadType="`head`"
          :format="['jpg','jpeg','png']"
          :imgWidth="`50px`"
          :imgHeight="`50px`"
          :imgUrl="formValidate.headUrl"
          @getUrl="getImgUrl"
        >
        </Upload>
      </FormItem>
      <FormItem :label="$t('commentManagement.tableData.virtualComments')" prop="comment">
        <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 5,maxRows: 5}" :show-word-limit="true" :maxlength="500" :placeholder="$t('commentManagement.prompt.virtualComments')"></Input>
      </FormItem>
      <FormItem :label="$t('commentManagement.tableData.commentState')" prop="status">
        <Select clearable v-model="formValidate.status" class="search-select-item" :placeholder="$t('commentManagement.prompt.commentState')">
          <Option v-for="(item,index) in $t('commentManagement.status')" :key="index" :value="item.value">{{item.desc}}</Option>
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
  import { imgUpload} from '@/api/banner'
  import { addProductComment ,updateProductComment} from '@/api/product'
  import Upload from './upLoad'
  import {sessionRead} from '@/libs/util'
  export default {
    name: "comment-modal",
    components: {Upload},
    props: ['editModal', 'chooseItem'],
    data() {
      return {
        loading:false,
        formValidate: {
          productId:null,
          id: null,
          userName:null,
          headUrl:null,
          comment:null,
          status:null
        },
        ruleValidate: {
          userName: [{
            required: true,
            message: this.$t('commentManagement.prompt.virtualAccount'),
            trigger: 'blur',
            type: 'string'
          }],
          headUrl:[{
            required: true,
            message: this.$t('commentManagement.prompt.virtualAvatar'),
            trigger: 'change',
            type: 'string'
          }],
          comment: [{
            required: true,
            message: this.$t('commentManagement.prompt.virtualComments'),
            trigger: 'blur',
            type: 'string'
          }],
          status:[{
            required: true,
            message: this.$t('commentManagement.prompt.commentState'),
            trigger: 'change',
            type: 'number'
          }],
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            let data=this.formValidate;
            if(data['userName'].length<4){
              this.$Message.error(this.$t('commentManagement.prompt.tip'));
              return;
            }
            this.loading=true;
            if(data.id){
              data['modifierId']=sessionRead('loginInfo')['id'];
              updateProductComment(data).then(res => {
                this.loading=false;
                if (res.data.success) {
                  this.$Message.success(this.$t('common.editSuccess'));
                  this.$emit('editSuccess');
                  this.cancelSubmit()
                } else {
                  this.$Message.error(res.data.message)
                }
              })
            }else{
              data['creatorId']=sessionRead('loginInfo')['id'];
              addProductComment(data).then(res => {
                this.loading=false;
                if (res.data.success) {
                  this.$Message.success(this.$t('common.addSuccess'));
                  this.$emit('editSuccess');
                  this.cancelSubmit()
                } else {
                  this.$Message.error(res.data.message)
                }
              })
            }

          }
        })
      },
      cancelSubmit() {
        this.$emit('changeModal', false);
        this.loading=false;
        this.$refs['formValidate'].resetFields();
        this.$refs.upload.init();
      },
      getImgUrl(file,avatar){
        let formData=new FormData();
        formData.append("multipartFile",file);
        imgUpload(formData).then(res => {
          if (res.data.success) {
            if(res.data.data){
              this.$Message.success(this.$t('common.imgSuccess'));
              this.formValidate.headUrl=res.data.data;
            }
          } else {
            this.$Message.error(res.data.message)
          }
        });
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
