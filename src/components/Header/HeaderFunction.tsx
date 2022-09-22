import React,{useState,useEffect} from 'react';
import logo from '../../assets/logo.svg';
import styles from "./Header.module.css";
import { Layout,Typography,Input,Menu,Button,Dropdown } from "antd"
import { GlobalOutlined } from '@ant-design/icons'
import { useHistory,useLocation,useParams,useRouteMatch } from "react-router-dom";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import { changeLanguageActionCreator,addLanguageActionCreator } from "../../redux/language/languageAction";
import jwt_decode, {JwtPayload as DefaultJwtPayload} from "jwt-decode";
import { userSlice } from '../../redux/user/slice';
// 类型定义 JwtPayload

// 定义自己的 jwt 接口
interface JwtPayload extends DefaultJwtPayload {
  username: string
}

// 做 dispatch 的类型定义
// import { Dispatch } from "redux";
// import { LanguageActionType } from "../../redux/language/languageAction";


export const Header: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const params = useParams()
  const match = useRouteMatch()

  const language = useSelector((state) => state.language.language)
  const languageList = useSelector((state) => state.language.languageList)
  const dispatch = useDispatch()

  const {t} = useTranslation()

  const jwt = useSelector(state => state.user.token)
  // npm install jwt-decode 安装 jwt 解码插件
  const [username,setUsername] = useState('')

  const shoppingCartItems = useSelector(state => state.shoppingCart.items)
  const ShoppingCartLoading = useSelector(state => state.shoppingCart.loading)

  useEffect(() => {
    if(jwt) {
      const token = jwt_decode<JwtPayload>(jwt)
      console.log('购物车信息',shoppingCartItems)
      setUsername(token.username)
    }
  },[jwt])
  // 做 dispatch 类型定义
  // const dispatch = useDispatch<Dispatch<LanguageActionType>>()

  const menuClickHandler = (e) => {
    // if (e.key === 'new_lang') {store.dispatch(addLanguageActionCreator('新语言',e.key))}
    // else store.dispatch(changeLanguageActionCreator(e.key))
    if(e.key === 'new_lang') {
      dispatch(addLanguageActionCreator('新语言',e.key))
    }else {
      dispatch(changeLanguageActionCreator(e.key))

    }
  }

  const onLogOut = () => {
    dispatch(userSlice.actions.logOut())
    history.push('/')
    window.location.reload(false) // 可加可不加
  }

  return(
    <div className={styles['app-header']}>
    {/* top-header */}
    <div className={styles['top-header']}>
      <div className={styles.inner}>

      <Typography.Text>{t('header.slogan')}</Typography.Text>
    <Dropdown.Button
              style={{ marginLeft: 15 }}
              overlay={
                <Menu onClick={menuClickHandler}>
                  {
                    languageList.map(l => {
                      return <Menu.Item key={l.code}>{l.name}</Menu.Item>
                    })
                  }
                  <Menu.Item key={'new_lang'}>{t('header.add_new_language')}</Menu.Item>
                </Menu>}
              icon={<GlobalOutlined />}
            >
              {language === 'zh' ? '中文' : 'English'}
  </Dropdown.Button>
  {jwt ? 
  (<Button.Group className={styles['button-group']}>
    <span>
      {t("header.welcome")}
      <Typography.Text strong>{username}</Typography.Text>
    </span>
    <Button 
    onClick={() => {history.push('/shoppingCart')}}
    loading={ShoppingCartLoading}
    >{t("header.shoppingCart")}({shoppingCartItems.length})</Button>
    <Button onClick={onLogOut}>{t("header.signOut")}</Button>
    </Button.Group>)
    :
    (<Button.Group className={styles['button-group']}>
    <Button onClick={() => history.push('/register')}>{t('header.register')}</Button>
    <Button onClick={() => history.push('/signIn')}>{t('header.signin')}</Button>
    </Button.Group>)
    }
      </div>
    </div>
<Layout.Header className={styles['main-header']}>
  <span onClick={() => {history.push('/')}}>
  <img src={logo} alt="logo" className={styles["App-logo"]} />
  <Typography.Title level={3} className={styles['title']}>
  {t('header.title')}
  </Typography.Title>
  </span>
  <Input.Search placeholder='请输入旅游目的地、主题或者关键字' className={styles['search-input']} onSearch={(keywords) => {history.push('/search/'+keywords)}}></Input.Search>
</Layout.Header>
<Menu mode={'horizontal'} className={styles['main-menu']}>
  <Menu.Item key={1}>{t('header.home_page')}</Menu.Item>
  <Menu.Item key={2}>{t('header.weekend')}</Menu.Item>
  <Menu.Item key={3}>{t('header.group')}</Menu.Item>
  <Menu.Item key={4}>{t('header.backpack')}</Menu.Item>
  <Menu.Item key={5}>{t('header.private')}</Menu.Item>
  <Menu.Item key={6}>{t('header.cruise')}</Menu.Item>
  <Menu.Item key={7}>{t('header.hotel')}</Menu.Item>
  <Menu.Item key={8}>{t('header.local')}</Menu.Item>
  <Menu.Item key={9}>{t('header.theme')}</Menu.Item>
  <Menu.Item key={10}>{t('header.custom')}</Menu.Item>
  <Menu.Item key={11}>{t('header.study')}</Menu.Item>
  <Menu.Item key={12}>{t('header.visa')}</Menu.Item>
  <Menu.Item key={13}>{t('header.enterprise')}</Menu.Item>
  <Menu.Item key={14}>{t('header.high_end')}</Menu.Item>
  <Menu.Item key={15}>{t('header.outdoor')}</Menu.Item>
  <Menu.Item key={16}>{t('header.insurance')}</Menu.Item>
</Menu>
  </div>
  )
}