import axios from 'axios'
import store from '@/store'
import router from '../router'
import {
  setToken,
  localRead,
} from '@/libs/util'
const addErrorLog = errorInfo => {
  const {
    statusText,
    status,
    request: {
      responseURL
    }
  } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl;
    this.queue = {}
  }
  getInsideConfig() {
    const navLang = navigator.language;
    let str=localRead('local');
    const localLang = str ? str :( (navLang === 'zh-CN') ? navLang : "id-ID");
    const config = {
      baseURL: this.baseUrl,
      withCredentials: true,
      headers: {
        "Accept-Language": (localLang === 'zh-CN') ? navLang : "id-ID"
      }
    };
    console.log(config);
    return config
  }
  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      // this.destroy(url)
      const {
        data,
        status
      } = res
      return {
        data,
        status
      }
    }, error => {
      this.destroy(url)
      if (error.response.status == 401) {
        console.error('Error 401 : 登录过期')
        setToken('')
        router.replace({
          path: 'login'
        })
      }
      addErrorLog(error.response);
      return Promise.reject(error)
    })
  }
  request(options) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
