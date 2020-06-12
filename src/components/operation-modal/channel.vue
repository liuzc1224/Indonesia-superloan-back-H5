<template>
  <Modal v-model="showModal" :title="formValidate.id? $t('channel.modal.edit') : $t('channel.modal.add')"
             :mask-closable="false">
        <div slot="close">
          <Icon @click="cancelSubmit()" type="ios-close"/>
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
          <FormItem :label="$t('channel.tabData.firmName')" prop="company">
            <Input v-model="formValidate.company" :placeholder="$t('channel.prompt.firmName')"></Input>
          </FormItem>
          <FormItem :label="$t('channel.tabData.channelName')" prop="channelName">
            <Input v-model="formValidate.channelName" :placeholder="$t('channel.prompt.channelName')"></Input>
          </FormItem>

          <FormItem :label="$t('channel.tabData.packageName')" prop="packageName">
            <Select clearable v-model="formValidate.packageName" class="search-select-item" :placeholder="$t('channel.prompt.packageName')">
              <Option v-for="(item,index) in packageNameList" :key="index" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
<!--          <FormItem :label="$t('channel.tabData.long')" prop="link">-->
<!--            <Input v-model="formValidate.link" :placeholder="$t('channel.prompt.long')"></Input>-->
<!--          </FormItem>-->
<!--          <FormItem :label="$t('channel.tabData.short')" prop="shortLink">-->
<!--            <Input v-model="formValidate.shortLink" :placeholder="$t('channel.prompt.short')"></Input>-->
<!--          </FormItem>-->
        </Form>
        <div slot="footer">
          <Button type="text" size="large" @click="cancelSubmit()">{{$t('common.cancel')}}</Button>
          <Button type="primary" size="large" :loading="loading" @click="handleSubmit('formValidate')">{{$t('common.submit')}}</Button>
        </div>
      </Modal>
</template>

<script>
  import { addGoogleSpreadLink ,updateGoogleSpreadLink} from '@/api/data'
  export default {
    name: "channel",
    props: ['editModal', 'chooseItem','packageNameList'],
    data() {
      return {
        loading:false,
        formValidate: {
          company:null,
          channelName:null,
          packageName:null,
          // shortLink:null,
          // link:null
        },
        ruleValidate: {
          company: [{
            required: true,
            message: this.$t('channel.prompt.firmName'),
            trigger: 'blur',
          }],
          channelName:[{
            required: true,
            message: this.$t('channel.prompt.channelName'),
            trigger: 'blur',
          }],
          packageName: [{
            required: true,
            message: this.$t('channel.prompt.packageName'),
            trigger: 'change',
            type:'string'
          }],
          shortLink:[{
            required: true,
            message: this.$t('channel.prompt.short'),
            trigger: 'blur',
          }]
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            let data=this.formValidate;
            addGoogleSpreadLink(data).then(res => {
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
        })
      },
      cancelSubmit() {
        this.$emit('changeModal', false);
        this.loading=false;
        this.$refs['formValidate'].resetFields();
        this.$refs.upload.init();
      },
    },
    mounted() {
      this.formValidate = this.chooseItem;
      this.imgUrl=this.chooseItem['bannerUrl'];
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
