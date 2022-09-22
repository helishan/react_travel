import React, {useEffect, useState} from 'react'
import { RouteComponentProps,useParams } from 'react-router'
import styles from './DetailPage.module.css'
import axios from "axios";
import {  Spin,Row,Col,DatePicker,Divider, Typography, Menu, Anchor,Button } from "antd";
import { ProductIntro,ProductComments } from "../../components";
import { MainLayout } from "../../layouts/mainLayout";

import {commentMockData} from "./mockup";
// 使用 redux-toolkit
import { getProductDetail, productDetailSlice } from "../../redux/productDetail/slice";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
// 添加购物车在这里
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addShoppingCartItem } from "../../redux/shoppingCart/slice";

const { RangePicker } = DatePicker;
interface MatchParams {
  touristRouteId: string
}

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = (props) => {
 const {touristRouteId}  = useParams<MatchParams>()
 // 使用 rtk 改造后注释掉
//  const [loading,setLoading] = useState<boolean>(true)
//  const [product, setProduct] = useState<any>(null) // 网络获取的数据
//  const [error,setError] = useState<string | null >(null)

const loading = useSelector(state => state.productDetail.loading)
const error = useSelector(state => state.productDetail.error)
const product = useSelector(state => state.productDetail.data)

const dispatch = useDispatch();

const jwt = useSelector(state => state.user.token) as string
const ShoppingCartLoading = useSelector(state => state.shoppingCart.loading)

 useEffect(() => {
  // const fetchData = async() => {
  // try {
  //   // setLoading(true)
  //   // rtk
  //   dispatch(productDetailSlice.actions.fetchStart())
  //   const {data} = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`)
  //   // setProduct(data)
  //   // rtk
  //   dispatch(productDetailSlice.actions.fetchSuccess(data))
  //   // setLoading(false)

  // } catch (err) {
  //   if (err instanceof Error) {
  //     // setError(err.message)
  //   //rtk
  //   // dispatch(productDetailSlice.actions.fetchFail(err.message))
  //     const mockData = {
  //       title: '埃及阿斯旺+卢克索+红海Red Sea+开罗+亚历山大12日跟团游（5站）',
  //       shortDescription: '【官方旗舰明星纯玩团】 25人封顶含签证小费全程餐',
  //       price: 19999.99,
  //       coupons: '',
  //       points: '模拟',
  //       discount: 1999.99,
  //       rating: 3.5,
  //       touristRoutePictures: [{url: detail_1,key: 1},
  //       {url: detail_2,key: 2},
  //     {url: detail_3,key: 3},
  //     {url: detail_4,key: 4},
  //   ]
  //     }
  //     // setProduct(mockData)
  //     // rtk 
  //   dispatch(productDetailSlice.actions.fetchSuccess(mockData))

  //     // setLoading(false)

  //   }
  // }
  // }
  // fetchData()
  dispatch(getProductDetail(touristRouteId))
 }, [])
 if(loading) {
  return <Spin size="large" style={{marginTop: 200,marginBottom:  200,
  marginLeft: 'auto',marginRight: 'auto',width: '100%'}}></Spin>
}
// if(error) {
//   return <div>网站出错{error}</div>
// }
  return (
    <MainLayout>
        {/* 产品简介 与 日期选择 */}
        <div className={styles['product-intro-container']}>
          <Row>
            <Col span={13}>
            <ProductIntro title={product.title}
            shortDescription={product.shortDescription}
            price={product.price}
            coupons={product.coupons}
            points={product.points}
            discount={product.discount}
            rating={product.rating}
            pictures={product.touristRoutePictures.map((p) => p.url)}
            />
            </Col>
            <Col span={11}>
              <Button 
              type="primary"
              danger
              loading={ShoppingCartLoading}
              style={{marginTop: 50,marginBottom: 30,display: 'block'}}
              onClick={() => {
                dispatch(addShoppingCartItem({jwt,touristRouteId: product.id}))
              }}
              >
                <ShoppingCartOutlined />
                放入购物车
              </Button>
              <RangePicker open style={{marginTop: 20}}/></Col>
          </Row>
        </div>
        {/* 锚点菜单 */}
        <div className={styles['product-detail-anchor']}>
          
        <Anchor className={styles['product-detail-anchor']}>
            <Menu mode='horizontal'>
              <Menu.Item key={1}> 
              <Anchor.Link href='#feature' title="产品特色"></Anchor.Link>
              </Menu.Item>
              <Menu.Item key={2}> 
              <Anchor.Link href='#fees' title="费用"></Anchor.Link>
              </Menu.Item>
              <Menu.Item key={3}> 
              <Anchor.Link href='#notes' title="预定须知"></Anchor.Link>
              </Menu.Item>
              <Menu.Item key={4}> 
              <Anchor.Link href='#comments' title="用户评价"></Anchor.Link>
              </Menu.Item>
            </Menu>
        </Anchor>
        </div>
        {/* 产品特色 */}
        <div id='feature' className={styles['product-detail-container']}>
          <Divider orientation={'center'}>
            <Typography.Title level={3}>
              产品特色
            </Typography.Title>
          </Divider>
          {/* html 字符串处理显示，react 为了防止注入攻击，有特殊的 html 处理机制，所以不能直接渲染
          html 字符串，必须使用特殊加工过的 api   */}
          <div dangerouslySetInnerHTML={{__html: product.features}} style={{margin: 50}}></div>
        </div>
        {/* 费用 */}
        <div id='fees' className={styles['product-detail-container']}>
        <Divider orientation={'center'}>
            <Typography.Title level={3}>
              费用
            </Typography.Title>
          </Divider>
          {/* html 字符串处理显示，react 为了防止注入攻击，有特殊的 html 处理机制，所以不能直接渲染
          html 字符串，必须使用特殊加工过的 api   */}
          <div dangerouslySetInnerHTML={{__html: product.fees}} style={{margin: 50}}></div>
        </div>
        {/* 预定须知 */}
        <div id='notes' className={styles['product-detail-container']}>
        <Divider orientation={'center'}>
            <Typography.Title level={3}>
              预定须知
            </Typography.Title>
          </Divider>
          {/* html 字符串处理显示，react 为了防止注入攻击，有特殊的 html 处理机制，所以不能直接渲染
          html 字符串，必须使用特殊加工过的 api   */}
          <div dangerouslySetInnerHTML={{__html: product.notes}} style={{margin: 50}}></div>
        </div>
        {/* 产品评价 */}
        <div id='comments' className={styles['product-detail-container']}>
        <Divider orientation={'center'}>
            <Typography.Title level={3}>
              用户评价
            </Typography.Title>
          </Divider>
          <div style={{margin: 40}}>
            <ProductComments data={commentMockData}></ProductComments>
          </div>
        </div>


    </MainLayout>
  )
}
