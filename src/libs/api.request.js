import HttpRequest from '@/libs/axios'
import config from '@/config'
let baseUrl="";
if (process.env.NODE_ENV === 'dev') {
  baseUrl = process.env.VUE_APP_BASEURL
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = process.env.VUE_APP_BASEURL
} else {
  baseUrl = config.baseUrl.dev
}

const axios = new HttpRequest(baseUrl);
export default axios
