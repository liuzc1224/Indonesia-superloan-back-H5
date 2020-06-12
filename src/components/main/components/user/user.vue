<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <Avatar style="background-color: #87d068" icon="ios-person"/>
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <!--        <DropdownItem name="message">-->
        <!--          {{$t("msg-center")}}<Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>-->
        <!--        </DropdownItem>-->
        <DropdownItem name="password">
          {{$t('userInfo.password')}}
        </DropdownItem>
        <DropdownItem name="userInfo">
          {{$t('userInfo.usrInfo')}}
        </DropdownItem>
        <DropdownItem name="logout">{{$t("common.signOut")}}</DropdownItem>
      </DropdownMenu>
    </Dropdown>


    <password
      :editModal="passwordModal"
      v-on:changeModal="changeModal"
    ></password>
    <user-info
      :editModal="userInfoModal"
      :chooseItem="userInfoItem"
      v-on:changeModal="changeUserInfo"
    >
    </user-info>
  </div>
</template>

<script>
  import './user.less'
  import { getUserInfo } from '@/api/user'
  import { mapActions } from 'vuex'
  import Password from "../../../common/password";
  import UserInfo from "../../../common/userInfo";
  import {sessionRead} from '@/libs/util'
  export default {
    name: 'User',
    components: {UserInfo, Password},
    data(){
      return {
        passwordModal: false,
        userInfoModal: false,
        userInfoItem:{
          department: null,
          name: null,
          permission: null,
          phoneNumber: null,
        }
      }
    },
    props: {
      userAvator: {
        type: String,
        default: ''
      },
      messageUnreadCount: {
        type: Number,
        default: 0
      }
    },
    methods: {

      ...mapActions([
        'handleLogOut'
      ]),
      changeModal(param) {
        this.passwordModal = param;
      },
      changeUserInfo(param){
        this.userInfoModal = param;
        this.userInfoItem({'row': {}});
      },
      setUserInfoItem(params){
        this.userInfoItem.name = params.name;
        this.userInfoItem.department = params.department;
        this.userInfoItem.permission = params.permission;
        this.userInfoItem.phoneNumber = params.phoneNumber;
      },
      logout () {
        this.handleLogOut().then(() => {
          this.$router.push({
            name: 'login'
          })
        })
      },
      message () {
        this.$router.push({
          name: 'message_page'
        })
      },
      password(){
        this.passwordModal= true;
      },
      userInfo(){
        let loginInfo = sessionRead('loginInfo');
        let params={
          id:loginInfo['id']
        };
        getUserInfo(params).then(res => {
          if (res.data.success) {
            let param=res.data.data;
            let data={
              name:param['description'],
              department:param['departmentDTOS'][0]['description'],
              permission:param['roleOutputVOS'][0]['description'],
              phoneNumber:param['phoneNumber'],
            };
            this.setUserInfoItem(data);
            this.userInfoModal= true;
          } else {
            this.$Message.error(res.data.message)
          }
        });

      },
      handleClick (name) {
        switch (name) {
          case 'logout': this.logout();localStorage.removeItem('tagNaveList');
            break;
          case 'message': this.message();
            break;
          case 'password': this.password();
            break;
          case 'userInfo': this.userInfo();
            break;
        }
      }
    }
  }
</script>
