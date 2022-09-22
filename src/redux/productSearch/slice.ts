import { createSlice,PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import detail_1 from "../../assets/images/detail_1.jpg";
import detail_2 from "../../assets/images/detail_2.webp";
import detail_3 from "../../assets/images/detail_3.jpeg";
import detail_4 from "../../assets/images/detail_4.jpeg";

interface ProductSearchState {
  loading: boolean;
  error: string | null;
  data: any;
  pagination: any;
}
const initialState: ProductSearchState = {
  loading: true,
  error: null,
  data: null,
  pagination: null
}
// 第一个是命名空间，第二个表示 action productSearch/searchProduct
export const searchProduct = createAsyncThunk('productSearch/searchProduct',
async (paramaters: {
  keywords: string,
  nextPage: number | string,
  pageSize: number | string,
}, thunkAPI) => {

/* 真实开发 start */
  // let url = `http://123.56.149.216:8080/api/touristRoutes?pageNumber=${paramaters.nextPage}&pageSize=${paramaters.pageSize}`
  // if(paramaters.keywords) {
  //   url += `&keyword=${paramaters.keywords}`
  // }
  // const response = await axios.get(url)
  //   // 这个时候不光要取到它的 data，还要取得它的 header,因为header里面存有分页数据，所以取全部
  //   return {
  //     data: response.data,
  //     pagination: JSON.parse(response.headers['x-pagination'])
  //   }
/* 真实开发 end */

/* 模拟数据 start*/
      type resolveType = {
        data: any[],
        pagination: any
      }
     const  mockData = {
        data: [{
          departureCity: '深圳',
          description: '描述',
          discountPresent: 0.1,
          id: '1111111',
          originalPrice: 99999,
          price: 99,
          rating: 5.0,
          title: '标题',
          touristRoutePictures: [
            {url: detail_1},
            {url: detail_2},
            {url: detail_3},
            {url: detail_4},
          ],
          travelDays: '旅游天数',
          tripType: 'BackPackTour'}],
          pagination: {
            currentPage: 1,
            pageSize: 10,
            totalCount: 50
          }
      }
return new Promise<resolveType>(resolve => {
  resolve(mockData)
})
/* 模拟数据 end */

})
export const productSearchSlice = createSlice({
  name: 'productSearch',
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
    [searchProduct.pending.type]: (state) => {
      // return {...state, loading: true}
      state.loading = true
    },
    [searchProduct.fulfilled.type]: (state, action) => {
      console.log('请求成功')
      state.data = action.payload.data
      state.pagination = action.payload.pagination
      state.loading = false
      state.error = null
    },
    [searchProduct.rejected.type]: (state, action: PayloadAction<string| null>) => {
        state.loading = false
        state.error = action.payload
    }
  }
}) 