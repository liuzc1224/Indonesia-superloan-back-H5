import axios from '@/libs/api.request'

//推送模板
export const getPushTemplateList = (params) => {
  return axios.request({
    url: '/template/getPushTemplateList',
    params:params,
    method: 'get'
  })
};
export const updatePushTemplate= (params) => {
  return axios.request({
    url: '/template/updatePushTemplate',
    data: params,
    method: 'post'
  })
};
