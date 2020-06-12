import axios from '@/libs/api.request'

//短信模板
export const getMessageTemplateList = (params) => {
  return axios.request({
    url: '/template/getMessageTemplateList',
    params:params,
    method: 'get'
  })
};
export const updateMessageTemplate= (params) => {
  return axios.request({
    url: '/template/updateMessageTemplate',
    data: params,
    method: 'put'
  })
};
