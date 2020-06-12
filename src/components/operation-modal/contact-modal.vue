<template>
  <Modal v-model="showModal" :title="$t('contactInfo.edit')"
             :mask-closable="false">
        <div slot="close">
          <Icon @click="cancelSubmit()" type="ios-close"/>
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
          <FormItem :label="$t('contactInfo.contact')" prop="content">
            <Input v-model="formValidate.content" :placeholder="$t('contactInfo.inputContact')"></Input>
          </FormItem>
          <FormItem :label="$t('contactInfo.url')" prop="downloadUrl">
            <Input v-model="formValidate.downloadUrl" :placeholder="$t('contactInfo.inputUrl')"></Input>
          </FormItem>
          <FormItem :label="$t('contactInfo.email')" prop="email">
            <Input v-model="formValidate.email" :placeholder="$t('contactInfo.inputEmail')"></Input>
          </FormItem>
<!--          <FormItem :label="$t('contactInfo.content')" prop="content">-->
<!--            <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 5,maxRows: 5}" :maxlength="500" :placeholder="$t('contactInfo.inputContent')"></Input>-->
<!--          </FormItem>-->
<!--          <FormItem :label="$t('contactInfo.status')" prop="status">-->
<!--            <Select clearable v-model="formValidate.status" class="search-select-item" :placeholder="$t('contactInfo.inputStatus')">-->
<!--              <Option v-for="(item,index) in $t('contactInfo.state')" :key="index" :value="item.value">{{item.desc}}</Option>-->
<!--            </Select>-->
<!--          </FormItem>-->
        </Form>
        <div slot="footer">
          <Button type="text" size="large" @click="cancelSubmit()">{{$t('common.cancel')}}</Button>
          <Button type="primary" size="large" :loading="loading" @click="handleSubmit()">{{$t('common.submit')}}</Button>
        </div>
      </Modal>
</template>

<script>
  import { updateContactInfo } from '@/api/contact'
  import {dateToString, getLoginInfo} from '@/libs/tools'
  import {sessionRead} from '@/libs/util'
  export default {
    name: "contact-modal",
    props: ['editModal', 'chooseItem'],
    data() {
      return {
        loading:false,
        formValidate: {
          id: "",
          downloadUrl: "",
          content: "",
          email: "",
        },
        ruleValidate: {
          content:[{
            required: true,
            message: this.$t('contactInfo.inputContent'),
            trigger: 'blur',
            type: 'string'
          }],
          downloadUrl:[{
            required: true,
            message: this.$t('contactInfo.inputUrl'),
            trigger: 'blur',
            type: 'string'
          }],
          email:[{
            required: true,
            message: this.$t('contactInfo.inputEmail'),
            trigger: 'blur',
            type: 'string'
          }],
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            let data=this.formValidate;
            this.loading=true;
            updateContactInfo(data).then(res => {
              this.loading=false;
              if (res.data.success) {
                this.$Message.success(this.$t('common.editSuccess'));
                this.$emit('editSuccess');
                this.cancelSubmit();
              } else {
                this.$Message.error(res.data.message)
              }
            })
          }
        })
      },
      cancelSubmit() {
        this.$emit('changeModal', false);
        this.loading=false;
        this.$refs['formValidate'].resetFields();
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
