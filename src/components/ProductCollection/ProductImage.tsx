import React from "react";
import { Image, Typography } from 'antd'
import { Link,withRouter } from 'react-router-dom'

// import { RouteComponentProps } from "react-router"
// interface PropsType extends RouteComponentProps {
//   id: string | number;
//   size: "large" | 'small';
//   imageSrc: string;
//   price: number | string;
//   title: string
// }
// const ProductImageComponent: React.FC<PropsType> = ({ id, size, imageSrc, price, title,
// history,location,match }) => {
//   return <div onClick={() => history.push(`detail/${id}`)}>
//     {
//       size === 'large' ?
//         (<Image src={imageSrc} height={230} width={370} />) :
//         (<Image src={imageSrc} height={100} width={180} />)
//     }
//     <div>
//       <Typography.Text type="secondary">{title.slice(0, 25)}</Typography.Text>
//       <Typography.Text type="danger" strong>￥{price}起</Typography.Text>
//     </div>
//   </div>
// }
// export const ProductImage = withRouter(ProductImageComponent)

import { RouteComponentProps } from "react-router"

interface PropsType extends RouteComponentProps {
  id: string | number;
  size: "large" | 'small';
  imageSrc: string;
  price: number | string;
  title: string
}
const ProductImageComponent: React.FC<PropsType> = ({ id, size, imageSrc, price, title,
history,location,match }) => {
  return <Link to={`detail/${id}`}>
    {
      size === 'large' ?
        (<Image src={imageSrc} height={230} width={370} />) :
        (<Image src={imageSrc} height={100} width={180} />)
    }
    <div>
      <Typography.Text type="secondary">{title.slice(0, 25)}</Typography.Text>
      <Typography.Text type="danger" strong>￥{price}起</Typography.Text>
    </div>
  </Link>
}
export const ProductImage = withRouter(ProductImageComponent)