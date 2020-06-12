import axios from '@/libs/api.request'
//app链接管理
export const getAppShare = (params) => {
  return axios.request({
    url: '/appshare',
    params:params,
    method: 'get'
  })
};
//新增
export const addAppShare = (params) => {
  return axios.request({
    url: '/appshare',
    data:params,
    method: 'put'
  })
};

//版本更新
export const addApkVersion = (params) => {
  return axios.request({
    url: '/apkVersion/add',
    data:params,
    method: 'post'
  })
};
export const getApkVersion = (params) => {
  return axios.request({
    url: '/apkVersion/list',
    params:params,
    method: 'get'
  })
};
export const updateApkVersion = (params) => {
  return axios.request({
    url: '/apkVersion/update',
    data:params,
    method: 'put'
  })
};
export const deleteApkVersion = (params) => {
  return axios.request({
    url: '/apkVersion/delete/'+params['id'],
    method: 'delete'
  })
};
