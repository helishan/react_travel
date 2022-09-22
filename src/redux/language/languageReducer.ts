import i18n from "i18next";
import { CHANGE_LANGUAGE,ADD_LANGUAGE,LanguageActionType } from "./languageAction";
export interface LanguageState {
  language: 'en' | 'zh';
  languageList: {name: string; code: string}[];
}

const defaultState: LanguageState = {
  language: 'zh',
  languageList: [{name: '中文',code: 'zh'},{name: '英文',code: 'en'},
],
}
// 使用 store 中的旧数据 state; action 是指挥 reducer 做出数据变化的指令

const languageReducer =  (state=defaultState, action:LanguageActionType) => {
switch (action.type) {
  case CHANGE_LANGUAGE:
    i18n.changeLanguage(action.payload)
    return {...state, language: action.payload}
    case ADD_LANGUAGE:
      return {...state, languageList: [...state.languageList, action.payload]}
  default:
     return state
}
}
export default languageReducer