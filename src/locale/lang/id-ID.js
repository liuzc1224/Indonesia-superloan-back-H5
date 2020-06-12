import { commoonBR } from './module/common';
import { productCenterBR } from './module/productCenter';
import { operationBR } from './module/operation';
import { setSysBR } from './module/setSys';
import { userInfoBR } from './module/userInfo';
import { msgCenterBR } from './module/msgCenter'
import { dataBR } from './module/data'
import { underManagementBR } from './module/underManagement'



export default {
  home: 'Rumah',
  ...commoonBR,
  ...productCenterBR,
  ...operationBR,
  ...setSysBR,
  ...userInfoBR,
  ...msgCenterBR,
  ...dataBR,
  ...underManagementBR
}
