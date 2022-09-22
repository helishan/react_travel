import { createSlice,PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import detail_1 from "../../assets/images/detail_1.jpg";
import detail_2 from "../../assets/images/detail_2.webp";
import detail_3 from "../../assets/images/detail_3.jpeg";
import detail_4 from "../../assets/images/detail_4.jpeg";

interface ProductDetailState {
  loading: boolean,
  error: string | null,
  data: any
}
const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null
}
export const getProductDetail = createAsyncThunk('productDetail/getProductDetail',
async (touristRouteId: string, thunkAPI) => {

    // try {
      // setLoading(true)
      // rtk
      // thunkAPI.dispatch(productDetailSlice.actions.fetchStart())

      // 真实开发解掉注释
      // const {data} = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`)
      
      
      // setProduct(data)
      // rtk
      // thunkAPI.dispatch(productDetailSlice.actions.fetchSuccess(data))
      // setLoading(false)
  
    // } catch (err) {
      // if (err instanceof Error) {
        // setError(err.message)
      //rtk
      // dispatch(productDetailSlice.actions.fetchFail(err.message))
        const mockData = {
          title: '埃及阿斯旺+卢克索+红海Red Sea+开罗+亚历山大12日跟团游（5站）',
          shortDescription: '【官方旗舰明星纯玩团】 25人封顶含签证小费全程餐',
          price: 19999.99,
          coupons: '',
          points: '模拟',
          discount: 1999.99,
          rating: 3.5,
          touristRoutePictures: [{url: detail_1,key: 1},
          {url: detail_2,key: 2},
           {url: detail_3,key: 3},
          {url: detail_4,key: 4},
      ]
        }
        type resolveType = { 
          title: string,
        shortDescription: string,
        price: string | number,
        coupons: string,
        points: string,
        discount:  string | number,
        rating:  string | number,
        touristRoutePictures: any[]}
 
return new Promise<resolveType>(resolve => {
  resolve(mockData)
})
      // 真实开发解掉注释
        // return data 
        // return mockData
        // setProduct(mockData)
        // rtk 
        // thunkAPI.dispatch(productDetailSlice.actions.fetchSuccess(mockData))
  
        // setLoading(false)
  
      // }
    // }
})
export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    fetchStart: (state) => {
      // return {...state, loading: true}
      state.loading = true
    },
    fetchSuccess: (state, action) => {
      state.data = action.payload
      state.loading = false
      state.error = null
    },
    fetchFail: (state, action: PayloadAction<string| null>) => {
        state.loading = false
        state.error = action.payload
    }
  },
  extraReducers: {
    [getProductDetail.pending.type]: (state) => {
      // return {...state, loading: true}
      state.loading = true
    },
    [getProductDetail.fulfilled.type]: (state, action) => {
      console.log('请求成功')
      state.data = action.payload
      state.loading = false
      state.error = null
    },
    [getProductDetail.rejected.type]: (state, action: PayloadAction<string| null>) => {
        state.loading = false
        state.error = action.payload
    }
  }
}) 