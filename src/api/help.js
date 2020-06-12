import axios from '@/libs/api.request'

//帮助中心
export const getHelp = (params) => {
  return axios.request({
    url: '/help/get',
    params:params,
    method: 'get'
  })
};
export const addHelp= (params) => {
  return axios.request({
    url: '/help',
    data: params,
    method: 'post'
  })
};
export const updateHple= (params) => {
  return axios.request({
    url: '/help',
    data: params,
    method: 'put'
  })
};
export const getTextFlag= (params) => {
  return axios.request({
    url: '/help/order/'+params['textFlag'],
    data: params,
    method: 'get'
  })
};
export const deleteHple= (params) => {
  return axios.request({
    url: '/help/'+params['id'],
    data: params,
    method: 'delete'
  })
};
