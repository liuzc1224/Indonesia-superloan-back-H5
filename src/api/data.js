import axios from '@/libs/api.request'

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getAdminsInfo = (params) => {
  return axios.request({
    url: '/employee?pageSize='+params.pageSize+'&currentPage='+params.currentPage,
    params:params,
    method: 'get'
  })
}

export const deleteAdmin = (params) => {
  return axios.request({
    url: '/employee/'+params.id,
    method: 'DELETE'
  })
}

export const getAllTreeInfo = () => {
  return axios.request({
    url: '/menu/tree',
    method: 'get'
  })
}

export const deleteTreeItem = ( id ) => {
  return axios.request({
    url: '/menu/'+id,
    method: 'DELETE'
  })
}

export const getDataCenterInfo = () => {
  return axios.request({
    url: '/homePage',
    method: 'get'
  })
}

export const getRoleInfo = (params) => {
  return axios.request({
    url: '/role?pageSize='+params.pageSize+'&currentPage='+params.currentPage,
    method: 'get'
  })
}

export const deleteRole = (params) => {
  return axios.request({
    url: '/role/'+params.id,
    method: 'DELETE'
  })
}

export const getOneRole = ( params ) => {
  return axios.request({
    url: '/role/'+params,
    method: 'get'
  })
}

export const getDepartmentInfo = () => {
  return axios.request({
    url: '/department/tree',
    method: 'get'
  })
}

export const editDepartmentInfo = (params) => {
  return axios.request({
    url: '/department',
    data: params,
    method: 'put'
  })
}

export const addDepartmentInfo = (params) => {
  return axios.request({
    url: '/department',
    data: params,
    method: 'post'
  })
}

export const deleteDepartmentItem = ( id ) => {
  return axios.request({
    url: '/department/'+id,
    method: 'DELETE'
  })
}

export const getRoleTreeInfo = () => {
  return axios.request({
    url: '/menu/tree',
    method: 'get'
  })
}

export const getMsgList = (params) => {
  let timeParam = ''
  if(params.takeEffectTimeStart){
    timeParam += '&takeEffectTimeStart='+params.takeEffectTimeStart
  }
  if(params.takeEffectTimeEnd){
    timeParam += '&takeEffectTimeEnd='+params.takeEffectTimeEnd
  }
  return axios.request({
    url: '/push/list?sendChannel='+params.sendChannel+'&pageSize='+params.pageSize+'&currentPage='+params.currentPage+
      '&msgType='+params.msgType+'&sendTarget='+params.sendTarget+timeParam,
    method: 'get'
  })
}

export const getHelpList = (params) => {
  return axios.request({
    url: '/help/get?textFlag='+params.textFlag+'&pageSize='+params.pageSize+'&currentPage='+params.currentPage+'&isShow='+params.isShow,
    method: 'get'
  })
}

export const editHelpInfo = (params) => {
  return axios.request({
    url: '/help',
    data: params,
    method: 'put'
  })
}

export const addHelpInfo = (params) => {
  return axios.request({
    url: '/help',
    data: params,
    method: 'post'
  })
}

export const editTreeInfo = (params) => {
  return axios.request({
    url: '/menu',
    data: params,
    method: 'put'
  })
}

export const addTreeInfo = (params) => {
  return axios.request({
    url: '/menu',
    data: params,
    method: 'post'
  })
}

export const editFeedbackInfo = (params) => {
  return axios.request({
    url: '/opinion',
    data: params,
    method: 'put'
  })
}

export const editMsgListInfo = (params) => {
  return axios.request({
    url: '/push/update',
    data: params,
    method: 'post'
  })
}

export const deleteMessage = (params) => {
  return axios.request({
    url: '/push/update',
    data: params,
    method: 'post'
  })
}

export const addMsgListInfo = (params) => {
  return axios.request({
    url: '/push/add',
    data: params,
    method: 'post'
  })
}

export const getFlagInfo = (params) => {
  return axios.request({
    url: '/help/order/'+params,
    method: 'get'
  })
}

export const getFeedbackList = (params) => {
  let timeParam = ''
  if(params.startTime){
    timeParam += '&startTime='+params.startTime
  }
  if(params.endTime){
    timeParam += '&endTime='+params.endTime
  }
  return axios.request({
    url: '/opinion?email='+params.email+'&pageSize='+params.pageSize+'&currentPage='+params.currentPage+timeParam,
    method: 'get'
  })
}

export const editAdminsInfo = data => {
  return axios.request({
    url: '/employee',
    data: data,
    method: 'put'
  })
}

export const addAdminsInfo = data => {
  return axios.request({
    url: '/employee',
    data: data,
    method: 'post'
  })
}

export const editRoleInfo = data => {
  return axios.request({
    url: '/role',
    data: data,
    method: 'put'
  })
}

export const addRoleInfo = data => {
  return axios.request({
    url: '/role',
    data: data,
    method: 'post'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const imgUpload= (data) => {
  return axios.request({
    url: '/product/uploadImage',
    data: data,
    method: 'post'
  })
};


//数据报表
export const getData= () => {
  return axios.request({
    url: '/statistics/user',
    method: 'get'
  })
};
//谷歌推广连接管理
export const getGoogleSpreadLink = (params) => {
  return axios.request({
    url: '/googlespreadlink',
    params:params,
    method: 'get'
  })
};
export const addGoogleSpreadLink = (params) => {
  return axios.request({
    url: '/googlespreadlink',
    data:params,
    method: 'post'
  })
};
export const updateGoogleSpreadLink = (params) => {
  return axios.request({
    url: '/googlespreadlink',
    data:params,
    method: 'put'
  })
};
export const deleteGoogleSpreadLink = (params) => {
  return axios.request({
    url: '/googlespreadlink'+params['id'],
    method: 'delete'
  })
};
//查询包名
export const getPackageName = () => {
  return axios.request({
    url: '/googlespreadlink/packagename',
    method: 'get'
  })
};
