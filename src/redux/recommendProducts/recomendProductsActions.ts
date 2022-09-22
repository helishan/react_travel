import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"
import axios from "axios";

export const FETCH_RECOMMEND_PRODUCTS_START = 'FETCH_RECOMMEND_PRODUCTS_START' // 正在调用推荐信息 api

export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = 'FETCH_RECOMMEND_PRODUCTS_SUCCESS'//推荐信息 api 调用成功

export const FETCH_RECOMMEND_PRODUCTS_FAIL = 'FETCH_RECOMMEND_PRODUCTS_FAIL' // 腿甲按信息 api 调用失败

interface FetchRecommendProductStartAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_START
}

interface FetchRecommendProductSuccessAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS,
  payload: any
}

interface FetchRecommendProductFailAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL,
  payload: any
}

export type RecommendProductAction = FetchRecommendProductStartAction | FetchRecommendProductSuccessAction | FetchRecommendProductFailAction

export const fetchRecommendProductStartActionCreator = (): FetchRecommendProductStartAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_START
  }
}

export const fetchRecommendProductSuccessActionCreator = (data): FetchRecommendProductSuccessAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: data
  }
}

export const fetchRecommendProductFailActionCreator = (err): FetchRecommendProductFailAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: err
  }
}
// thunk 可以返回一个函数，不一定是 js 对象
// 在一个 thunk action 中可以完成一些连续的 aciotn 操作
// 业务逻辑移到这里代码会更清晰
export const giveMeDataActionCreator = (): ThunkAction<void, RootState, unknown, RecommendProductAction> => async (dispatch, getState) => {
  dispatch(fetchRecommendProductStartActionCreator())
  try {
    const { data } = await axios
      .get('http://123.56.149.216:8080/api/productCollections')
    dispatch(fetchRecommendProductSuccessActionCreator(data))
  } catch (err) {
    if (err instanceof Error) {
      dispatch(fetchRecommendProductFailActionCreator(err.message))
    }
  }
}