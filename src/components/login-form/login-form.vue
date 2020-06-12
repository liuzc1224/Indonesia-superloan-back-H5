<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="username">
      <Input v-model="form.username" :placeholder="$t('common.username')">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" :placeholder="$t('common.password')">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" :loading="loading" long>{{$t('common.login')}}</Button>
    </FormItem>
  </Form>
</template>
<script>
  export default {
    name: 'LoginForm',
    data () {
      return {
        loading:false,
        form: {
          username: '',
          password: ''
          // username: 'admin',
          // password: '123456'
        },
        rules: {
          username: [{
            required: true,
            message: this.$t("common.usernameTip"),
            trigger: 'blur',
          }],
          password: [{
            required: true,
            message: this.$t("common.passwordTip"),
            trigger: 'blur',
          }],
        }
      }
    },
    methods: {
      handleSubmit () {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.loading=true;
            this.$emit('on-success-valid', {
              username: this.form.username,
              password: this.form.password
            })
          }
        })
      },
      setLoading(){
        this.loading=false;
      }
    }
  }
</script>
