import axios from '@/libs/api.request'
//自定义谷歌检测
export const getGoogleUrl = (params) => {
  return axios.request({
    url: '/googleurl',
    params:params,
    method: 'get'
  })
};
//新增
export const addGoogleUrl = (params) => {
  return axios.request({
    url: '/googleurl',
    data:params,
    method: 'post'
  })
};
//删除
export const deleteGoogleUrl = (params) => {
  return axios.request({
    url: '/googleurl/'+params['id'],
    method: 'delete'
  })
};


//贷款产品下架提醒
export const productinvalidnotify = (params) => {
  return axios.request({
    url: '/productinvalidnotify',
    params:params,
    method: 'get'
  })
};

//贷款产品下架提醒邮箱
export const productinvalidnotifyemailGet = (params) => {
  return axios.request({
    url: '/productinvalidnotifyemail',
    params:params,
    method: 'get'
  })
};
//新增
export const productinvalidnotifyemailAdd = (params) => {
  return axios.request({
    url: '/productinvalidnotifyemail',
    data:params,
    method: 'post'
  })
};
//修改
export const productinvalidnotifyemailPut = (params) => {
  return axios.request({
    url: '/productinvalidnotifyemail',
    data:params,
    method: 'put'
  })
};
//删除
export const productinvalidnotifyemailDelete = (params) => {
  return axios.request({
    url: '/productinvalidnotifyemail/'+params['id'],
    method: 'delete'
  })
};
