import axios from '@/libs/api.request'
//获取用户列表
export const getUserList = (query) => {
    return axios.request({
      url: '/userInfo/getList',
      params:query,
      method: 'get'
    })
  };
  //获取用户详情
  export const getUserDetail = (query) => {
    return axios.request({
      url: '/userInfo/getDetail',
      params:query,
      method: 'get'
    })
  };
  //修改用户状态
  export const editUserStatus = (params) => {
    return axios.request({
      url: '/userInfo/update',
      data: params,
      method: 'post'
    })
  };

  //获取用户邀请记录
  export const getUserInviteList = (query) => {
    return axios.request({
      url: '/getUserInviteList',
      params:query,
      method: 'get'
    })
  };
  // 账目类型管理
  export const getAccountOption = (query) => {
    return axios.request({
      url: '/accountOption',
      params:query,
      method: 'get'
    })
  };
  export const querySortNumberMax = (query) => {
    return axios.request({
      url: '/accountOption/querySortNumberMax',
      params:query,
      method: 'get'
    })
  };
  export const addAccountOption = (params) => {
    return axios.request({
      url: '/accountOption/create',
      data: params,
      method: 'post'
    })
  };
  export const updateAccountOption = (params) => {
    return axios.request({
      url: '/accountOption/update',
      data: params,
      method: 'put'
    })
  };
  export const updateSortWeight = (params) => {
    return axios.request({
      url: '/accountOption/updateSortWeight',
      data: params,
      method: 'put'
    })
  };
  export const deleteAccountOption= (params) => {
    return axios.request({
      url: '/accountOption/delete/'+params['id'],
      data: params,
      method: 'delete'
    })
  };
