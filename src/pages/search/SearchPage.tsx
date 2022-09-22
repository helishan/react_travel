import styles from "./SearchPage.module.css";
import React,{useEffect} from "react";
import { FilterArea,ProductList } from "../../components";
import { MainLayout } from "../../layouts/mainLayout";
import { useLocation} from "react-router-dom";
import { useParams } from "react-router";
import { Spin } from "antd";
// 引入 action
import { searchProduct } from "../../redux/productSearch/slice";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";

interface MatchParams {
  keywords: string
}

export const SearchPage: React.FC= () => {
  const {keywords} = useParams<MatchParams>()
  const loading = useSelector(state => state.productSearch.loading)
  const error = useSelector(state => state.productSearch.error)
  const pagination = useSelector(state => state.productSearch.pagination)
  const productList = useSelector(state => state.productSearch.data)

  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(searchProduct({nextPage: 1,pageSize:10,keywords: keywords}))
  },[location])

  // 用户切换分页
  const onPageChange = (nextPage,pageSize) => {
    dispatch(searchProduct({nextPage,pageSize,keywords}))
  }

  if(loading) {
    return <Spin size="large" style={{marginTop: 200,marginBottom:  200,
    marginLeft: 'auto',marginRight: 'auto',width: '100%'}}></Spin>
  }
  // if(error) {
  //   return <div>网站出错{error}</div>
  // }
  return <MainLayout>
  {/* 分类过滤器 */}
  <div className={styles['product-list-container']}>
  <FilterArea />
  </div>
  {/* 产品列表 */}
  <div className={styles['product-list-container']}>
  <ProductList data={productList} paging={pagination} onPageChange={onPageChange}/>
  </div>

  </MainLayout>
}