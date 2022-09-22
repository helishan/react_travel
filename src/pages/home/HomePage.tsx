import React from "react";
import styles from './HomePage.module.css'
import {Header, Footer,SideMenu,Carousel,ProductCollection,BusinessPartners} from '../../components'
import { MainLayout } from "../../layouts/mainLayout";
import {Row,Col, Typography,Spin, AutoComplete} from 'antd'
import {productList1,productList2,productList3} from './mockups'
import sideImage from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png'
import { withTranslation,WithTranslation } from "react-i18next";
import axios from "axios";
// interface State{
//   productList: any[],
//   error: string | null,  
//   loading: boolean
// }

class HomePageComponent extends React.Component <WithTranslation> {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     productList: [],
  //     error: null,
  //     loading: true
  //   }
  // }
//  async componentDidMount() {
//     // axios.get('http://123.56.149.216:8080/api/productCollections',{
//     //   headers: {
//     //     'x-icode':'FB8055BA73FA658E'
//     //   }
//     // }).then(({data}) => {
//     //   this.setState({
//     //     productList: data
//     //   })
//     // })
//     try {
      
//     const {data} = await axios
//     .get('http://123.56.149.216:8080/api/productCollections',{
//             headers: {
//         'x-icode':'FB8055BA73FA658E'
//       }
//     })
//   this.setState({productList: data,
//   error: null,
//   loading: false})
//     } catch (err) {
//       if (err instanceof Error) {
//       this.setState({
//         error: err.message,
//         loading: false
//       })
//     }
//     }
//   }
  render() {
    const { t } = this.props
    // const {productList} = this.state
    // if(loading) {
    //   return <Spin size="large" style={{marginTop: 200,marginBottom:  200,
    //   marginLeft: 'auto',marginRight: 'auto',width: '100%'}}></Spin>
    // }
    // if(error) {
    //   return <div>网站出错{error}</div>
    // }
    return(
    <MainLayout>
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
        products={productList1}
        >
        </ProductCollection>

        <ProductCollection title={<Typography.Title level={3} type="danger">{t('home_page.new_arrival')}</Typography.Title>}
        sideImage={sideImage2}
        products={productList2}
        >
        </ProductCollection>
        <ProductCollection title={<Typography.Title level={3} type="success">{t('home_page.domestic_travel')}</Typography.Title>}
        sideImage={sideImage3}
        products={productList3}
        >

        </ProductCollection>

      <BusinessPartners/>
    </MainLayout>)
  }
}
export const HomePage = withTranslation()(HomePageComponent)