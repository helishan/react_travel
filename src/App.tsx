import React,{ useEffect } from 'react';
import styles from "./App.module.css";
import { HomePage,SignInPage,RegisterPage,DetailPage,SearchPage,ShoppingCart,PlaceOrderPage } from './pages'
import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";
// 取得 jwt 数据
import { useSelector } from "./redux/hooks";
import { useDispatch } from "react-redux";
import { getShoppingCart } from "./redux/shoppingCart/slice";

// 私有路由 参数：路由所指的页面 component; 判定是否登录 isAuthenticated; 其他的 props 属性 rest
const PrivateRoute = ({component,isAuthenticated, ...rest}) => {
  // 既然是私有路径，应该做判断，如果用户没有登录，不仅不能打开这个页面，而且还要重定向到登录页面
  const routeComponent = (props) => {
    return isAuthenticated ? 
    (React.createElement(component, props)) : 
    (<Redirect to={{pathname: '/signIn'}}></Redirect>)
  }
  return <Route render={routeComponent} {...rest}/>
}

function App(){
    // 取得 jwt
    const jwt = useSelector(state => state.user.token)
    const dispatch = useDispatch()

    useEffect(() => {
      if(jwt) {
        dispatch(getShoppingCart(jwt))
      }
    },[jwt])

    
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={props => <HomePage {...props}/>}></Route>
          <Route path="/signIn" component={props => <SignInPage {...props}/>}></Route>
          <Route path="/register" component={props => <RegisterPage {...props}/>}></Route>
          <Route path="/detail/:touristRouteId" component={props => <DetailPage {...props}/>}></Route>
          <Route path="/search/:keywords?" component={props => <SearchPage {...props}/>}></Route>
          {/* 私有路由 */}
          <PrivateRoute
          isAuthenticated={jwt !== null}
           path="/shoppingCart" component={props => <ShoppingCart {...props}/>}></PrivateRoute>
          <PrivateRoute
          isAuthenticated={jwt !== null}
           path="/placeOrder" component={props => <PlaceOrderPage {...props}/>}></PrivateRoute>
          <Route render={() => <h1>404 not found 页面找不到</h1>}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
