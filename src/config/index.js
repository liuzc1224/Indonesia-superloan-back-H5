export default {
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: true,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    //测试
    dev: 'http://47.99.154.65:9001',
    online: 'http://47.99.154.65:9001',
    pro: 'http://47.99.154.65:9001'

    //线上
    // dev:'http://back.luckkangaroo.com',
    // online: 'http://back.luckkangaroo.com',
    // pro: 'http://back.luckkangaroo.com'
    // dev:'http://back.guntur.top',
    // online: 'http://back.guntur.top',
    // pro: 'http://back.guntur.top'

    //剑康
    // dev: 'http://192.168.0.154:8094',//健康
    // online: 'http://192.168.0.154:8094',
    // pro: 'http://192.168.0.154:8094'

    // 希良
    // dev: 'http://192.168.0.190:8094',
    // online: 'http://192.168.0.190:8094',
    // pro: 'http://192.168.0.190:8094'


  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: "home",
  /**
   * @description 需要加载的插件
   */
  plugin: {
    "error-store": {
      showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  }
};
