import React from "react";
import styles from "./ShoppingCart.module.css";
import { MainLayout } from "../../layouts/mainLayout";
import { Row,Col,Affix } from "antd";
import { ProductList,PaymentCard } from "../../components";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { clearShoppingCartItem,checkOut } from "../../redux/shoppingCart/slice";
import { useHistory } from "react-router-dom";

export const ShoppingCart: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const loading = useSelector(state => state.shoppingCart.loading)
  const shoppingCartItems = useSelector(state => state.shoppingCart.items)
  const jwt = useSelector(state => state.user.token) as string
  console.log('shoppingCartItems',shoppingCartItems)
  return <MainLayout>
    <Row>
      {/* 购物车清单 */}
      <Col span={16}>
        <div className={styles['product-list-container']}>
          <ProductList 
          data={shoppingCartItems.map(s => s.touristRoute)}
          ></ProductList>
        </div>
        
      </Col>
      {/* 支付卡组件 */}
      <Col span={8}>
      <Affix>
        
      <div className={styles['payment-card-container']}>
          <PaymentCard loading={loading}
          originalPrice={shoppingCartItems.map(s => s.touristRoute.originalPrice).reduce((a,b) => a + b , 0)}
          price={shoppingCartItems.map(s => s.touristRoute.originalPrice * (s.touristRoute.discountPresent ? s.touristRoute.discountPresent : 1)).reduce((a,b) => a + b , 0)}
          onCheckout={() => {
            //只有购物车有商品时，才会触发下单功能
            if(shoppingCartItems.length <= 0) return

            dispatch(checkOut(jwt))
            history.push('/placeOrder')
          }}
          onShoppingCartClear={() => {
            dispatch(clearShoppingCartItem({jwt,itemIds: shoppingCartItems.map(s => s.id)}))
          }}
          ></PaymentCard>
        </div>
      </Affix>
        
      </Col>
    </Row>
  </MainLayout>
}