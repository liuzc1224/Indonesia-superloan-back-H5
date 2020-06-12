import axios from '@/libs/api.request'

//联系方式
export const contact = (params) => {
  return axios.request({
    url: '/contact',
    params:params,
    method: 'get'
  })
};
export const updateContactInfo= (params) => {
  return axios.request({
    url: '/contact/updateContactInfo',
    data: params,
    method: 'post'
  })
};
