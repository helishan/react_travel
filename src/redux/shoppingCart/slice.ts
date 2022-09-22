import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import detail_1 from "../../assets/images/detail_1.jpg";
import detail_2 from "../../assets/images/detail_2.webp";
import detail_3 from "../../assets/images/detail_3.jpeg";
import detail_4 from "../../assets/images/detail_4.jpeg";

interface ShoppingCartState {
  loading: boolean,
  error: string | null,
  items: any[]
}
const initialState: ShoppingCartState = {
  loading: true,
  error: null,
  items: []
}
export const getShoppingCart = createAsyncThunk('shoppingCart/getShoppingCart',

  async (jwt: string, thunkAPI) => {

/* 真实开发使用接口 start */
    // const { data } = await axios.get('http://123.56.149.216:8080/api/shoppingCart', {
    //   headers: {
    //     Authorization: `bearer ${jwt}`
    //   }
    // })
    // return data.shoppingCartItems
/* 真实开发使用接口 end */

/* 模拟购物车数据 start */

            type resolveType = any []
    const shoppingCartItems: resolveType =
       [
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
        }
      ]
    return new Promise<resolveType>(resolve => {
      resolve(shoppingCartItems)
    })
/* 模拟购物车数据 end */

  })
// 添加购物车
export const addShoppingCartItem = createAsyncThunk('shoppingCart/addShoppingCartItem',
  async (parameters: { jwt: string, touristRouteId: string }, thunkAPI) => {

    /* 真实开发使用接口 start */
    // const { data } = await axios.post('http://123.56.149.216:8080/api/shoppingCart/items', {
    //   touristRouteId: parameters.touristRouteId
    // }, {
    //   headers: {
    //     Authorization: `bearer ${parameters.jwt}`
    //   }
    // })
    // return data.shoppingCartItems
    /* 真实开发使用接口 end */

/* 模拟购物车数据 start */

type resolveType = any []
const shoppingCartItems: resolveType =
   [
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
return new Promise<resolveType>(resolve => {
  resolve(shoppingCartItems)
})
/* 模拟购物车数据 end */

  })
// 清空购物车
  export const clearShoppingCartItem = createAsyncThunk('shoppingCart/clearShoppingCartItem',
  async (parameters: { jwt: string, itemIds: number[] }, thunkAPI) => {
    /* 开发环境使用接口 start */
    // return await axios.delete(`http://123.56.149.216:8080/api/shoppingCart/items/(${parameters.itemIds.join(',')})`, {
    //   headers: {
    //     Authorization: `bearer ${parameters.jwt}`
    //   }
    // })
    /* 开发环境使用接口 end */
/* 模拟购物车数据 start */

type resolveType = any []
const shoppingCartItems: resolveType =
   []
return new Promise<resolveType>(resolve => {
  resolve(shoppingCartItems)
})
/* 模拟购物车数据 end */

  })
// 结算购物车
export const checkOut = createAsyncThunk('shoppingCart/checkOut',
  async (jwt: string, thunkAPI) => {

    /* 真实开发使用接口 start */
    // const { data } = await axios.post('http://123.56.149.216:8080/api/shoppingCart/checkout', 
    //   null, {
    //   headers: {
    //     Authorization: `bearer ${jwt}`
    //   }
    // })
    // return data
    /* 真实开发使用接口 end */

/* 模拟购物车数据 start */

type resolveType = any
const mockData: resolveType = {
  id: '123',
  userId: '123',
  state: 'Pending',
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
/* 模拟购物车数据 end */

  })
export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getShoppingCart.pending.type]: (state) => {
      // return {...state, loading: true}
      state.loading = true
    },
    [getShoppingCart.fulfilled.type]: (state, action) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    [getShoppingCart.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
    [addShoppingCartItem.pending.type]: (state) => {
      // return {...state, loading: true}
      state.loading = true
    },
    [addShoppingCartItem.fulfilled.type]: (state, action) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    [addShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
    [clearShoppingCartItem.pending.type]: (state) => {
      // return {...state, loading: true}
      state.loading = true
    },
    [clearShoppingCartItem.fulfilled.type]: (state) => {
      state.items = []
      state.loading = false
      state.error = null
    },
    [clearShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
    [checkOut.pending.type]: (state) => {
      state.loading = true
    },
    [checkOut.fulfilled.type]: (state, action) => {
      // 结算成功后，清空购物车
      state.items = []
      state.loading = false
      state.error = null
    },
    [checkOut.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
  }
}) 