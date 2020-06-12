<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" :title="$t('common.loginPlease')" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit" ref="mychild"></login-form>
          <p class="login-tip">cashdog</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import LoginForm from '_c/login-form'
  import {getRouterReq} from '@/api/routers'
  import { mapMutations, mapActions } from 'vuex'

  export default {
    components: {
      LoginForm
    },
    methods: {
      ...mapActions([
        'handleLogin',
      ]),
      ...mapMutations([
        'setMnuList'
      ]),
      handleSubmit ({ username, password }) {
        this.handleLogin({ username, password }).then(res => {
          if(res.success){
            sessionStorage.setItem("loginInfo", JSON.stringify(res['data']));
            localStorage.tagNaveList=null;
            let id = res.data.id;
            getRouterReq( id ).then(res => {
              sessionStorage.setItem("tree", JSON.stringify(res.data.data));
              this.setMnuList(res.data.data);// VUEX设置tree
              this.$router.push({
                name: this.$config.homeName
              });
              // this.$refs.mychild.setLoading();
            })
          }else{
            this.$refs.mychild.setLoading();
            this.$Message.error(res.message)
          }
        })
      }
    }
  }
</script>

<style>

</style>
