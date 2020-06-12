import axios from '@/libs/api.request'

//银行管理
export const getBank = (params) => {
  return axios.request({
    url: '/bankInfo',
    params:params,
    method: 'get'
  })
};
export const addBank= (params) => {
  return axios.request({
    url: '/bankInfo/create',
    data: params,
    method: 'post'
  })
};
export const updateBank= (params) => {
  return axios.request({
    url: '/bankInfo/update',
    data: params,
    method: 'put'
  })
};
export const updateSortWeight= (params) => {
  return axios.request({
    url: '/bankInfo/updateSortWeight',
    data: params,
    method: 'put'
  })
};
export const querySortNumberMax= (params) => {
  return axios.request({
    url: '/bankInfo/querySortNumberMax',
    data: params,
    method: 'get'
  })
};
export const deleteBank= (params) => {
  return axios.request({
    url: '/bankInfo/delete/'+params['id'],
    data: params,
    method: 'delete'
  })
};
