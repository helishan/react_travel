// import { createStore,applyMiddleware} from "redux";
// import thunk from "redux-thunk";
import languageReducer from './language/languageReducer'
import recommendProductsReducer  from "./recommendProducts/recommendProductsReducers";
// store 是带有推送功能的数据仓库；reducer 就是 store 中处理数据的方法
// reducer 详细记录了各种数据处理的过程

// redux-toolkit
import { productDetailSlice } from "./productDetail/slice";
import { productSearchSlice } from "./productSearch/slice";
import { shoppingCartSlice } from "./shoppingCart/slice";
import { userSlice } from "./user/slice";
import { orderSlice } from "./order/slice";
// redux-toolkit 删掉从 redux 中引入的 combineReducers，改为从 toolkit 中引入
import {combineReducers,configureStore } from "@reduxjs/toolkit";
// redux-toolkit 中使用异步： 1. configureStore 替换 createStore；2. 
const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
  // 使用 redux-toolkit 这样子引入
  productDetail: productDetailSlice.reducer,
  productSearch: productSearchSlice.reducer,
  user: userSlice.reducer,
  shoppingCart: shoppingCartSlice.reducer,
  order: orderSlice.reducer
})

// const store = createStore(rootReducer,applyMiddleware(thunk))
// rtk
const store = configureStore({
  reducer:rootReducer,
  // middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(),actionLong],
  devTools: true,
  
})

// store 类型
export type RootState = ReturnType<typeof store.getState>

export default store