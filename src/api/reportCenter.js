import axios from '@/libs/api.request'
import {ObjToQuery} from "../assets/js/date";
import config from '@/config'
let baseUrl="";
if (process.env.NODE_ENV === 'dev') {
  baseUrl = process.env.VUE_APP_BASEURL
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = process.env.VUE_APP_BASEURL
} else {
  baseUrl = config.baseUrl.dev
}
//平台产品埋点数据
export const platform = (params) => {
  return axios.request({
    url: '/statements/platform',
    params:params,
    method: 'get'
  })
};
//平台产品埋点数据导出
export const exportPlatform = (params) => {
  let url="/statements/platform/export";
  if(params){
    let data=ObjToQuery(params);
    window.location.href = baseUrl+url+"?"+data.slice(0,-1);
  }else{
    window.location.href = baseUrl+url;
  }
};
//查询指定某项平台产品数据一定时间范围内的额数据
export const platformList = (params) => {
  return axios.request({
    url: '/statements/platform/list',
    params:params,
    method: 'get'
  })
};


//平台用户数据
//近*天APP启动数量
export const appstartup = (params) => {
  return axios.request({
    url: '/statements/user/appstartup/'+params['days'],
    method: 'get'
  })
};
//近*天新设备APP启动数量
export const newdevice = (params) => {
  return axios.request({
    url: '/statements/user/newdevice/appstartup/'+params['days'],
    method: 'get'
  })
};
//查询当前注册用户数量
export const registration = (params) => {
  return axios.request({
    url: '/statements/user/registration/count/'+params['type'],
    method: 'get'
  })
};
//查询一段时间内注册用户数量
export const countdaysin = (params) => {
  return axios.request({
    url: '/statements/user/registration/countdaysin/'+params['day'],
    method: 'get'
  })
};
//统计今日用户登录次数
export const todaylogin = () => {
  return axios.request({
    url: '/statements/user/todaylogin/count',
    method: 'get'
  })
};


//平台用户记账数据
//查询收入或者支出记账使用情况
export const payments = (params) => {
  return axios.request({
    url: '/statements/platform/payments',
    params:params,
    method: 'get'
  })
};
//用户虚拟账单使用情况
export const virtualbill = (params) => {
  return axios.request({
    url: '/statements/platform/virtualbill',
    params:params,
    method: 'get'
  })
};
//用户虚拟信用观察
export const virtualcredit = () => {
  return axios.request({
    url: '/statements/platform/virtualcredit',
    method: 'get'
  })
};



//AF渠道推广转化数据
export const promotionconversion = (params) => {
  return axios.request({
    url: '/statements/platform/promotionconversion',
    params:params,
    method: 'get'
  })
};
//导出
export const exportPromotionConversion = (params) => {
  let url="/statements/platform/promotionconversion/export";
  if(params){
    let data=ObjToQuery(params);
    window.location.href = baseUrl+url+"?"+data.slice(0,-1);
  }else{
    window.location.href = baseUrl+url;
  }
};
//AF渠道推广转化数据累计
export const promotionconversionSummary = (params) => {
  return axios.request({
    url: '/statements/platform/promotionconversion/summary',
    params:params,
    method: 'get'
  })
};
//导出
export const promotionconversionSummaryExport = (params) => {
  let url="/statements/platform/promotionconversion/summary/export";
  if(params){
    let data=ObjToQuery(params);
    window.location.href = baseUrl+url+"?"+data.slice(0,-1);
  }else{
    window.location.href = baseUrl+url;
  }
};



//贷款产品销售数据
export const product = () => {
  return axios.request({
    url: '/statements/product/v2',
    method: 'get'
  })
};
export const productDetail = (params) => {
  return axios.request({
    url: '/statements/product/v2/detail',
    params:params,
    method: 'get'
  })
};
//导出贷款产品销售明细
export const exportLoanProductSellDetail = (params) => {
  let url="/statements/product/v2/exportLoanProductSellDetail";
  if(params){
    let data=ObjToQuery(params);
    window.location.href = baseUrl+url+"?"+data.slice(0,-1);
  }else{
    window.location.href = baseUrl+url;
  }
};
//导出 贷款产品销售明细-纍計(下方产品列表)
export const exportSummaryList = (params) => {
  let url="/statements/product/v2/exportSummaryList";
  if(params){
    let data=ObjToQuery(params);
    window.location.href = baseUrl+url+"?"+data.slice(0,-1);
  }else{
    window.location.href = baseUrl+url;
  }
};
//贷款产品销售明细-纍計(BANNER以及贷款列表的总计)
export const exportSummaryTotal = (params) => {
  let url="/statements/product/v2/exportSummaryTotal";
  if(params){
    let data=ObjToQuery(params);
    window.location.href = baseUrl+url+"?"+data.slice(0,-1);
  }else{
    window.location.href = baseUrl+url;
  }
};
export const summary = (params) => {
  return axios.request({
    url: '/statements/product/v2/summary',
    params:params,
    method: 'get'
  })
};

//用户等级
export const levelData = (params) => {
  return axios.request({
    url: '/statements/user/level',
    params:params,
    method: 'get'
  })
};
//用户会员
export const vipData = (params) => {
  return axios.request({
    url: '/statements/user/vip',
    params:params,
    method: 'get'
  })
};

// 邀请好友-活动埋点数据报表
export const activity = (params) => {
  return axios.request({
    url: '/statements/activity',
    params:params,
    method: 'get'
  })
};
//邀请好友-拉新
export const inviteData = (params) => {
  return axios.request({
    url: '/statements/activity/invite',
    params:params,
    method: 'get'
  })
};
//邀请好友2-报表
export const inviteDataTwo = (params) => {
  return axios.request({
    url: '/statements/invite',
    params:params,
    method: 'get'
  })
};
//邀請好友2-导出

export const inviteExport = (params) => {
  if(params){
    let data=ObjToQuery(params);
    window.location.href = baseUrl+"/statements/invite/export?"+data.substring(0,data.length-1);
    return "";
  }else{
    window.location.href = baseUrl+"/statements/invite/export";
  }
};
//抽奖活动
//抽奖统计
export const lotteryData = (params) => {
  return axios.request({
    url: '/statements/lottery',
    params:params,
    method: 'get'
  })
};
//抽奖热度统计
export const lotteryHeat = (params) => {
  return axios.request({
    url: '/statements/lottery/heat',
    params:params,
    method: 'get'
  })
};
export const lotteryDayHeat = (params) => {
  return axios.request({
    url: '/statements/lottery/dayheat',
    params:params,
    method: 'get'
  })
};
//查询提现规则
export const withdraw = () => {
  return axios.request({
    url: '/withdraw',
    method: 'get'
  })
};
//更新提现规则
export const updateWithdraw= (params) => {
  return axios.request({
    url: '/withdraw',
    data: params,
    method: 'put'
  })
};
//小游戏统计
//游戏统计
export const gameStatistics = (data) => {
  return axios.request({
    url: '/game/statistics',
    params:data,
    method: 'get'
  })
};
//游戏热度图
export const gameHeatMap = (data) => {
  return axios.request({
    url: '/game/statistics/trend',
    params:data,
    method: 'get'
  })
};
//推广平台
export const platformName = () => {
  return axios.request({
    url: '/statements/platform/name',
    method: 'get'
  })
};
//包名
export const getPackageNameData = () => {
  return axios.request({
    url: '/statements/platform/packageName',
    method: 'get'
  })
};
//产品名称
export const getProductNameData = () => {
  return axios.request({
    url: '/statements/platform/productName',
    method: 'get'
  })
};
//渠道转换数据产品纬度
export const convertProduct = (data) => {
  return axios.request({
    url: '/channel/convert/product',
    params:data,
    method: 'get'
  })
};
//导出
export const convertProductExport = (params) => {
  let url="/channel/convert/product/export";
  if(params){
    let data=ObjToQuery(params);
    window.location.href = baseUrl+url+"?"+data.slice(0,-1);
  }else{
    window.location.href = baseUrl+url;
  }
};
//渠道转换数据产品纬度累计
export const convertProductSummary = (data) => {
  return axios.request({
    url: '/channel/convert/product/summary',
    params:data,
    method: 'get'
  })
};
//导出
export const convertProductSummaryExport = (params) => {
  let url="/channel/convert/product/summary/export";
  if(params){
    let data=ObjToQuery(params);
    window.location.href = baseUrl+url+"?"+data.slice(0,-1);
  }else{
    window.location.href = baseUrl+url;
  }
};
//产品售后跟踪数据
export const productSales = (data) => {
  return axios.request({
    url: '/product/sales',
    params:data,
    method: 'get'
  })
};
export const updateProductSales= (params) => {
  return axios.request({
    url: '/product/sales',
    data: params,
    method: 'put'
  })
};
export const productSalesExport = (params) => {
  let url="/product/sales/export";
  if(params){
    let data=ObjToQuery(params);
    window.location.href = baseUrl+url+"?"+data.slice(0,-1);
  }else{
    window.location.href = baseUrl+url;
  }
};
//查询产品售后转化数据
export const productSalesConvert = (data) => {
  return axios.request({
    url: '/product/sales/convert',
    params:data,
    method: 'get'
  })
};
export const productSalesConvertExport = (params) => {
  let url="/product/sales/convert/export";
  if(params){
    let data=ObjToQuery(params);
    window.location.href = baseUrl+url+"?"+data.slice(0,-1);
  }else{
    window.location.href = baseUrl+url;
  }
};
