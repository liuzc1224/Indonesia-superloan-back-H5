<template>
  <Modal v-model="showModal" :title="$t('userList.importTitle')" :mask-closable="false" width="500px">
    <div slot="close">
      <Icon @click="cancelSubmit()" type="ios-close" />
    </div>
    <Row class="avatar">
      <Row v-if="file && file.name" class="fileName">
        <Col span="20">
          <p>{{file.name}}</p>
        </Col>
        <Col span="3">
          <Icon class="icon" type="md-close" @click="file=null"/>
        </Col>
      </Row>
      <Row>
        <Button>{{$t('userList.import')}}</Button>
        <input
          type="file"
          class="input-file"
          name="avatarContent"
          ref="avatarContent"
          @change="changeData($event)"
          accept=".xls,.xlsx"
        >
      </Row>

    </Row>
    <div slot="footer">
      <Button type="text" size="large" @click="cancelSubmit()">{{$t('setUpPage.cancel')}}</Button>
      <Button type="primary" size="large" :loading="loading" @click="handleSubmit()">{{$t('setUpPage.submit')}}</Button>
    </div>
  </Modal>
</template>

<script>
  import {blacklistImport} from "@/api/user";
  export default {
    name: "import-modal",
    props: ['editModal'],
    data(){
      return{
        file:null,
        loading:false,
      }
    },
    methods:{
      cancelSubmit(){
        this.file = [];
        this.$emit('changeModal', false);
      },
      handleSubmit(){
        if(this.file){
          this.loading=true;
          let submitData=new FormData();
          submitData.append("file",this.file);
          blacklistImport( submitData ).then(res => {
            this.loading=false;
            if(res.data.success){
              this.$Message.success(this.$t('setUpPage.importSuccess'));
              this.$emit('editSuccess');
              this.cancelSubmit()
            }else{
              this.$Message.error(res.data.message)
            }
          })
        }
        this.$emit('changeModal', false);
      },
      changeData(e) {
        let file = e.target.files[0];
        this.file=file;
        // let a=this.file.filter(v=>{
        //   return v['name']===file['name']
        // });
        // if(a.length===0){
        //   this.file.push(file);
        // }
        this.$refs["avatarContent"].value = "";
      },
      removeData(i){
        this.file.splice(i,1);
      }
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

<style scoped lang="less">
  .avatar {
    cursor: pointer;
    position: relative;
    .input-file {
      width: 40%;
      height: 32px;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      cursor: pointer;
    }

    .bg {
      width: 100%;
      height: 100%;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.3);
      text-align: center;
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
    }

    .text {
      padding-top: 10px;
      color: lightblue;
    }
  }
  .fileName{
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .fileName:hover{
    background-color: #f2f2f2;
  }
</style>
