import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { localRead } from '@/libs/util'
import customZhCn from './lang/zh-CN'
import customptBr from './lang/id-ID'
// import customEnUs from './lang/en-US'
import zhCnLocale from 'view-design/src/locale/lang/zh-CN'
// import enUsLocale from 'iview/src/locale/lang/en-US'
import ptBrLocale from 'view-design/src/locale/lang/id-ID'

Vue.use(VueI18n);

// 自动根据浏览器系统语言设置语言
const navLang = navigator.language;
let str=localRead('local');
const localLang = str ? (str === 'zh-CN') ? str : "id-ID" : ( (navLang === 'zh-CN') ? navLang : "id-ID");
let lang = localLang;

Vue.config.lang = lang;

// vue-i18n 6.x+写法
Vue.locale = () => {};
const messages = {
  'zh-CN': Object.assign(zhCnLocale, customZhCn),
  'id-ID': Object.assign(ptBrLocale, customptBr),
  // 'en-US': Object.assign(enUsLocale, customEnUs)
};
const i18n = new VueI18n({
  locale: lang,
  messages
});

export default i18n

// vue-i18n 5.x写法
// Vue.locale('zh-CN', Object.assign(zhCnLocale, customZhCn))
// Vue.locale('pt-BR', Object.assign(ptBrLocale, customptBr))
// Vue.locale('en-US', Object.assign(enUsLocale, customEnUs))
