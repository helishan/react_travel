import React from 'react';
import styles from "./App.module.css";
import { HomePage,SignInPage,RegisterPage,DetailPage } from './pages'
import { BrowserRouter, Route, Switch } from "react-router-dom";


function App(){
    
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={props => <HomePage {...props}/>}></Route>
          <Route path="/signIn" component={props => <SignInPage {...props}/>}></Route>
          <Route path="/register" component={props => <RegisterPage {...props}/>}></Route>
          <Route path="/detail/:touristRouteId" component={props => <DetailPage {...props}/>}></Route>
          <Route render={() => <h1>404 not found 页面找不到</h1>}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
