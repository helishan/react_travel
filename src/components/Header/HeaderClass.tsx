import React from 'react';
import logo from '../../assets/logo.svg';
import styles from "./Header.module.css";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd"
import { GlobalOutlined } from '@ant-design/icons'
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import {RootState} from "../../redux/store";
// import { LanguageState } from '../../redux/language/languageReducer'
import {changeLanguageActionCreator,addLanguageActionCreator} from '../../redux/language/languageAction'
import { withTranslation,WithTranslation } from "react-i18next";
import { connect } from "react-redux";
import {Dispatch} from 'react'
 
// interface State extends LanguageState {
// }
type PropsType = RouteComponentProps & // react-router 路由 props 类型
 WithTranslation & // i18n props 类型
  ReturnType<typeof mapStateToProps> &// redux store 映射类型
  ReturnType<typeof mapDispatchToProps> // redux dispatch 映射类型

const mapStateToProps = (state: RootState) => {
  return {
    language: state.language.language,
    languageList: state.language.languageList
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    changeLanguage: (code: 'zh'|'en') => {
      const action = changeLanguageActionCreator(code)
      dispatch(action)
    },
    addLanguage: (name: string, code: string) => {
      const action = addLanguageActionCreator(name,code)
      dispatch(action)
    }
  }
}

class HeaderComponent extends React.Component<PropsType> {
  // 用了 react-redux 所以不用了
  // constructor(props) {
  //   super(props);
  //   const storeState = store.getState();
  //   this.state = {
  //     language: storeState.language,
  //     languageList: storeState.languageList
  //   }
  // }
  // componentDidMount() {
  //   store.subscribe(this.handleStoreChange)
  // }
  menuClickHandler = (e) => {
    // if (e.key === 'new_lang') {store.dispatch(addLanguageActionCreator('新语言',e.key))}
    // else store.dispatch(changeLanguageActionCreator(e.key))
    if(e.key === 'new_lang') {
      this.props.addLanguage('新语言',e.key)
    }else {
      this.props.changeLanguage(e.key)
    }
  }
  // handleStoreChange = () => {
  //   const storeState = store.getState()
  //   this.setState({
  //     language: storeState.language,
  //     languageList: storeState.languageList
  //   }) 
  // }
  render() {
    const { history,t,languageList,language } = this.props
    // const { languageList, language } = this.state
    return (
      <div className={styles['app-header']}>
        {/* top-header */}
        <div className={styles['top-header']}>
          <div className={styles.inner}>

            <Typography.Text>{t('header.slogan')}</Typography.Text>
            <Dropdown.Button
              style={{ marginLeft: 15 }}
              overlay={
                <Menu onClick={this.menuClickHandler}>
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
            <Button.Group className={styles['button-group']}>
              <Button onClick={() => history.push('/register')}>{t('header.register')}</Button>
              <Button onClick={() => history.push('/signIn')}>{t('header.signin')}</Button>
            </Button.Group>
          </div>
        </div>
        <Layout.Header className={styles['main-header']}>
          <span onClick={() => { history.push('/') }}>
            <img src={logo} alt="logo" className={styles["App-logo"]} />
            <Typography.Title level={3} className={styles['title']}>
            {t('header.title')}
            </Typography.Title>
          </span>
          <Input.Search placeholder='请输入旅游目的地、主题或者关键字' className={styles['search-input']}></Input.Search>
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
}

export const Header = connect(mapStateToProps,mapDispatchToProps)(withTranslation()(withRouter(HeaderComponent)));