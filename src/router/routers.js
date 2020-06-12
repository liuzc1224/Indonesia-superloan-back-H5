import homeRouter from './homeRouter';
import operationRouter from './operationRouter';
import setSysRouter from './setSysRouter';
import userInfoRouter from './userInfoRouter';
import messageRouter from './messageRouter'
import reportCenter from './reportCenter'
import underManagementRouter from './underManagementRouter'

export default [
  ...homeRouter,
  ...operationRouter,
  ...userInfoRouter,
  ...setSysRouter,
  ...messageRouter,
  ...reportCenter,
  ...underManagementRouter
]
