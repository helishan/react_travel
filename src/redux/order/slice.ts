import { createSlice,PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { checkOut } from "../shoppingCart/slice";
import detail_1 from "../../assets/images/detail_1.jpg";
import detail_2 from "../../assets/images/detail_2.webp";
import detail_3 from "../../assets/images/detail_3.jpeg";
import detail_4 from "../../assets/images/detail_4.jpeg";

interface OrderState {
  loading: boolean,
  error: string | null,
  currentOrder: any
}
const initialState: OrderState = {
  loading: false,
  error: null,
  currentOrder: null
}
export const placeOrder = createAsyncThunk('order/placeOrder',
async (parameters: {jwt: string, orderId:string}, thunkAPI) => {

/* 真实开发 start */
// const {data} = await axios.post(`http://123.56.149.216:8080/api/orders/${parameters.orderId}/placeOrder`,
// null, {
//   headers: {
//     Authorization: `bearer ${parameters.jwt}`
//   }
// })
// return data
/* 真实开发 end */

/* 模拟接口 start */

type resolveType = any
const mockData: resolveType = {
  id: '123',
  userId: '123',
  state:'Completed',
  orderItems:    [
    {
      id: '123456',
      touristRouteId: '123456',
      touristRoute: {
        id: '123456',
        title: '杭州五日游',
        description: '描述语言',
        price: 79.998,
        originalPrice: 799.99,
        discountPresent: 0.1,
        rating: 5,
        travelDays: '',
        tripType: '',
        departureCity: '',
        touristRoutePictures: [
          {url: detail_2,key: 2}
      ]
      }
    },
    {
      id: '1234567',
      touristRouteId: '1234567',
      touristRoute: {
        id: '1234567',
        title: '舟山五日游',
        description: '描述语言',
        price: 88.998,
        originalPrice: 888.99,
        discountPresent: 0.1,
        rating: 4,
        travelDays: '',
        tripType: '',
        departureCity: '',
        touristRoutePictures: [
           {url: detail_3,key: 3}
      ]
      }
    }
  ]
}
return new Promise<resolveType>(resolve => {
  resolve(mockData)
})
/* 模拟接口 end */

})
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
  },
  extraReducers: {
    [placeOrder.pending.type]: (state) => {
      state.loading = true
    },
    [placeOrder.fulfilled.type]: (state, action) => {
      state.currentOrder = action.payload
      state.loading = false
      state.error = null
    },
    [placeOrder.rejected.type]: (state, action: PayloadAction<string| null>) => {
        state.loading = false
        state.error = action.payload
    },
    [checkOut.pending.type]: (state) => {
      state.loading = true
    },
    [checkOut.fulfilled.type]: (state, action) => {
      state.currentOrder = action.payload
      state.loading = false
      state.error = null
    },
    [checkOut.rejected.type]: (state, action: PayloadAction<string| null>) => {
        state.loading = false
        state.error = action.payload
    },
  }
}) 