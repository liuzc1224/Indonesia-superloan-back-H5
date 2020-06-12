import axios from '@/libs/api.request'

//banner配置
export const getBanner = (params) => {
  // console.log(params)
  return axios.request({
    url: '/banner',
    params:params,
    method: 'get'
  })
};
export const getDraft = (params) => {
  // console.log(params)
  return axios.request({
    url: '/banner/draft',
    params:params,
    method: 'get'
  })
};
export const getBannerNumberMax = () => {
  return axios.request({
    url: '/banner/querySortNumberMax',
    method: 'get'
  })
};
export const updateBanner= (params) => {
  return axios.request({
    url: '/banner/update',
    data: params,
    method: 'put'
  })
};
export const deleteBanner= (params) => {
  return axios.request({
    url: '/banner/deleteDraft/'+params['id'],
    data: params,
    method: 'delete'
  })
};

export const updateSortWeight= (params) => {
  return axios.request({
    url: '/banner/updateSortWeight',
    data: params,
    method: 'put'
  })
};
export const addBanner= (params) => {
  return axios.request({
    url: '/banner/create',
    data: params,
    method: 'post'
  })
};
export const addDraft= (params) => {
  return axios.request({
    url: '/banner/createDraft',
    data: params,
    method: 'post'
  })
};
export const imgUpload= (data) => {
  return axios.request({
    url: '/product/uploadImage',
    data: data,
    method: 'post'
  })
};

