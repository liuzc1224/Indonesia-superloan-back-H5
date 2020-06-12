<template>
  <Modal v-model="showModal" :title="$t('userList.edit')" :mask-closable="false">
    <div slot="close">
      <Icon @click="cancelSubmit()" type="ios-close" />
    </div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" class="edit-modal">
      <FormItem :label="$t('userList.white.account')" prop="phoneNumber">
        <Input v-model="formValidate.phoneNumber" readonly="readonly"></Input>
      </FormItem>
      <FormItem :label="$t('userList.white.state')" prop="creditStatus">
        <Select clearable v-model="formValidate.creditStatus" class="search-select-item" :placeholder="$t('userList.white.prompt')">
          <Option v-for="(item,index) in $t('userList.white.status')" :key="index" :value="item.value">{{item.desc}}</Option>
        </Select>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="cancelSubmit()">{{$t('setUpPage.cancel')}}</Button>
      <Button type="primary" size="large" :loading="loading" @click="handleSubmit('formValidate')">{{$t('setUpPage.submit')}}</Button>
    </div>
  </Modal>
</template>

<script>
  import {blacklistUpdate} from "@/api/user";
  export default {
    name: 'edit-modal',
    props: ['editModal', 'chooseItem'],
    data () {
      return {
        loading:false,
        formValidate: {
          id: null,
          phoneNumber: null,
          creditStatus:null
        },
        ruleValidate: {
          creditStatus: [ { required: true, message: this.$t('userList.white.prompt'), trigger: 'change', type: 'number' } ],
        }
      }
    },
    methods: {
      handleSubmit () {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            const submitData = {
              id:this.formValidate.id,
              creditStatus:this.formValidate.creditStatus
            };
            this.loading=true;
            blacklistUpdate( submitData ).then(res => {
              this.loading=false;
              if(res.data.success){
                this.$Message.success(this.$t('setUpPage.editSuccess'));
                this.$emit('editSuccess');
                this.cancelSubmit()
              }else{
                this.$Message.error(res.data.message)
              }
            })
          } else {
            this.$Message.error(this.$t('setUpPage.validateError'))
          }
        })
      },
      cancelSubmit () {
        this.$emit('changeModal', false);
        this.loading=false;
      },
      // changeFlag (param) {
      //   if(param){
      //     let data={
      //       textFlag : param
      //     };
      //     getTextFlag( data ).then(res => {
      //       if(res.data.success){
      //         this.formValidate.textOrder = res.data.data;
      //         // this.numberMax=res.data.data;
      //         this.$emit('setNumberMax',res.data.data)
      //       }
      //     })
      //   }
      // }
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

</style>
