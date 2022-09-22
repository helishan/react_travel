import React from "react";
import styles from './HomePage.module.css'
import {Header, Footer,SideMenu,Carousel,ProductCollection,BusinessPartners} from '../../components'
import {Row,Col, Typography,Spin} from 'antd'
// import {productList1,productList2,productList3} from './mockups'
import sideImage from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png'
import { withTranslation,WithTranslation } from "react-i18next";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { giveMeDataActionCreator } from "../../redux/recommendProducts/recomendProductsActions";

// interface State{
//   productList: any[],
//   error: string | null,  
//   loading: boolean
// }

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.recommendProducts.loading,
    error: state.recommendProducts.error,
    productList: state.recommendProducts.productList

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    giveMeData: () => {
      dispatch(giveMeDataActionCreator())
    }
  }
}

type PropsType = 
  WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

class HomePageComponent extends React.Component <PropsType> {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     productList: [],
  //     error: null,
  //     loading: true
  //   }
  // }
 async componentDidMount() {
  
  // this.props.fetchStart()

    // axios.get('http://123.56.149.216:8080/api/productCollections',{
    //   headers: {
    //     'x-icode':'FB8055BA73FA658E'
    //   }
    // }).then(({data}) => {
    //   this.setState({
    //     productList: data
    //   })
    // })

    // try {
    // const {data} = await axios
    // .get('http://123.56.149.216:8080/api/productCollections',{
    //         headers: {
    //     'x-icode':'FB8055BA73FA658E'
    //   }
    // })
    // this.props.fetchSuccess(data)
    // } catch (err) {
    //   if (err instanceof Error) {
    // this.props.fetchFail(err.message)
    // }
    // }

    this.props.giveMeData()
  }
  render() {
    const { t } = this.props
    // const {productList,loading,error} = this.state
    const {productList,loading,error} = this.props
    if(loading) {
      return <Spin size="large" style={{marginTop: 200,marginBottom:  200,
      marginLeft: 'auto',marginRight: 'auto',width: '100%'}}></Spin>
    }
    if(error) {
      return <div>网站出错{error}</div>
    }
    return(
    <div>
      <Header/>
      {/* 页面内容 content */}
      <div className={styles['page-content']}>
        <Row style={{marginTop: '20px'}}>
          <Col span={6}>
            <SideMenu />
          </Col>
          <Col span={18}>
          <Carousel />
          </Col>
        </Row>
        <ProductCollection title={<Typography.Title level={3} type="warning">{t('home_page.hot_recommended')}</Typography.Title>}
        sideImage={sideImage}
        products={productList[0]}
        >
        </ProductCollection>

        <ProductCollection title={<Typography.Title level={3} type="danger">{t('home_page.new_arrival')}</Typography.Title>}
        sideImage={sideImage2}
        products={productList[1]}
        >
        </ProductCollection>
        <ProductCollection title={<Typography.Title level={3} type="success">{t('home_page.domestic_travel')}</Typography.Title>}
        sideImage={sideImage3}
        products={productList[2]}
        >

        </ProductCollection>
      </div>
      <BusinessPartners/>
      <Footer />
    </div>)
  }
}
export const HomePage = connect(mapStateToProps,mapDispatchToProps)(withTranslation()(HomePageComponent))