import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translation_en from "./en.json";
import translation_zh from "./zh.json";

const resources = {
  en: {
    translation:translation_en
  },
  zh: {
    translation: translation_zh
  }
}

i18n.use(initReactI18next) // i18n 框架会根据 initReactI18next 插件进行初始化
.init({
  resources, // 两个 json 文件
  lng: 'zh', // 初始化语言
  // keySeparator: false, // 注释后可以使用链式字符串
  interpolation: {
    escapeValue: false // 不会为了防止 xss 攻击强行把 html字符转化成字符串，因为react 可以防止 xss 攻击
  }
})
export default i18n