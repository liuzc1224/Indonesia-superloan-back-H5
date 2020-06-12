import axios from '@/libs/api.request'
//产品反馈
export const getOpinion = (params) => {
  return axios.request({
    url: '/opinion',
    params:params,
    method: 'get'
  })
}

export const setOpinion = (params) => {
  return axios.request({
    url: '/opinion',
    data:params,
    method: 'put'
  })
}

//消息推送
export const getMsgPush = (params) => {
  return axios.request({
    url: '/msgPush/BusinessParamConfigQuery',
    params:params,
    method: 'get'
  })
}
export const addMsgPush = (params) => {
  return axios.request({
    url: '/msgPush/add',
    data:params,
    method: 'post'
  })
}
export const updateMsgPush = (params) => {
  return axios.request({
    url: '/msgPush/update',
    data:params,
    method: 'post'
  })
}
export const deleteMsgPush = (params) => {
  return axios.request({
    url: '/msgPush/delete/'+params['id'],
    params:params,
    method: 'get'
  })
}
