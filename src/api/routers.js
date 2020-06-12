import axios from '@/libs/api.request'

export const getRouterReq = (id) => {
  return axios.request({
    url: `/menu/tree/${id}`,
    method: 'get'
  })
}
