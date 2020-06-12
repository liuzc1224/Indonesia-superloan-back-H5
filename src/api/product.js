import axios from '@/libs/api.request'
import {ObjToQuery} from '../assets/js/date'
import config from '@/config'

//产品配置
export const getProduct = (params) => {
  return axios.request({
    url: '/product',
    params:params,
    method: 'get'
  })
};
export const getProductDraft = (params) => {
  return axios.request({
    url: '/product/draft',
    params:params,
    method: 'get'
  })
};
export const getProductNumberMax = () => {
  return axios.request({
    url: '/product/querySortNumberMax',
    method: 'get'
  })
};
export const updateProduct= (params) => {
  return axios.request({
    url: '/product/update',
    data: params,
    method: 'put'
  })
};
export const updateDraft= (params) => {
  return axios.request({
    url: '/product/updateDraft',
    data: params,
    method: 'put'
  })
};
export const updateComment= (params) => {
  return axios.request({
    url: '/product/comment/update',
    data: params,
    method: 'put'
  })
};
export const deleteProduct= (params) => {
  return axios.request({
    url: '/product/deleteProduct/'+params['id'],
    data: params,
    method: 'delete'
  })
};
export const deleteProductDraft= (params) => {
  return axios.request({
    url: '/product/deleteProductDraft/'+params['id'],
    data: params,
    method: 'delete'
  })
};
export const updateSortWeight= (params) => {
  return axios.request({
    url: '/product/updateSortWeight',
    data: params,
    method: 'put'
  })
};
export const addProduct= (params) => {
  return axios.request({
    url: '/product/create',
    data: params,
    method: 'post'
  })
};
export const addDraft= (params) => {
  return axios.request({
    url: '/product/createDraft',
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
//活动管理
//新增奖品
export const addPrize= (data) => {
  return axios.request({
    url: '/activity/addPrize',
    data: data,
    method: 'post'
  })
};
//修改奖品
export const modifyPrize= (data) => {
  return axios.request({
    url: '/activity/modifyPrize',
    data: data,
    method: 'post'
  })
};
//抽奖奖品管理列表
export const activityList= (params) => {
  return axios.request({
    url: '/activity/list',
    params: params,
    method: 'get'
  })
};
//奖池列表
export const listPrizePool= (params) => {
  return axios.request({
    url: '/activity/listPrizePool',
    params: params,
    method: 'get'
  })
};
//抽奖活动配置 - 奖池列表编辑
export const modifyPrizePool= (data) => {
  return axios.request({
    url: '/activity/modifyPrizePool/'+data['positionId']+'/'+data['prizeId'],
    data: data,
    method: 'put'
  })
};
//中奖名单
export const winningList= (params) => {
  return axios.request({
    url: '/activity/winningList',
    params: params,
    method: 'get'
  })
};
//导出中奖名单
export const exportWinningList= (params) => {
  let baseUrl="";
  if (process.env.NODE_ENV === 'dev') {
    baseUrl = process.env.VUE_APP_BASEURL
  } else if (process.env.NODE_ENV === 'production') {
    baseUrl = process.env.VUE_APP_BASEURL
  } else {
    baseUrl = config.baseUrl.dev
  }
  if(params){
    let data=ObjToQuery(params);
    window.location.href = baseUrl+"/activity/exportWinningList?"+data.substring(0,data.length-1);

  }else{
    window.location.href = baseUrl+"/activity/exportWinningList";
  }
  return;
  // return axios.request({
  //   url: '/activity/exportWinningList/'+data,
  // })
};
//查询抽奖方式
export const getLotteryType= (params) => {
  return axios.request({
    url: '/activity/getLotteryType',
    params: params,
    method: 'get'
  })
};
//编辑抽奖方式
export const editLotteryType= (data) => {
  return axios.request({
    url: '/activity/editLotteryType',
    data: data,
    method: 'put'
  })
};
//新增抽奖方式
export const addLotteryType= (data) => {
  return axios.request({
    url: '/activity/addLotteryType',
    data: data,
    method: 'put'
  })
};
//删除产品评论
export const deleteProductComment= (params) => {
  return axios.request({
    url: '/product/comment/delete/'+params['id'],
    data: params,
    method: 'delete'
  })
};
//新增产品评论
export const addProductComment= (data) => {
  return axios.request({
    url: '/product/comment/insert',
    data: data,
    method: 'post'
  })
};
//搜索产品评论
export const queryAll= (params) => {
  return axios.request({
    url: '/product/comment/queryAll',
    params: params,
    method: 'get'
  })
};
//编辑产品评论
export const updateProductComment= (data) => {
  return axios.request({
    url: '/product/comment/updateComment',
    data: data,
    method: 'put'
  })
};
//关闭/打开反馈模块
export const openProductComment= (data) => {
  return axios.request({
    url: '/product/comment/update',
    data: data,
    method: 'put'
  })
};
//隐藏/显示产品评论
export const stateProductComment= (data) => {
  return axios.request({
    url: '/product/comment/updateStatus',
    data: data,
    method: 'put'
  })
};
