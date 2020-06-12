import { commoonCN } from './module/common';
import { productCenterCN } from './module/productCenter';
import { operationCN } from './module/operation';
import { setSysCN } from './module/setSys';
import { userInfoCN } from './module/userInfo';
import { msgCenterCN } from './module/msgCenter'
import { dataCN } from './module/data'
import { underManagementCN } from './module/underManagement'



export default {
  home: '首页',
  ...commoonCN,
  ...productCenterCN,
  ...operationCN,
  ...setSysCN,
  ...userInfoCN,
  ...msgCenterCN,
  ...dataCN,
  ...underManagementCN
}
