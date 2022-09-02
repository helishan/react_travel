import React from 'react'
import { RouteComponentProps } from 'react-router'
import styles from './DetailPage.module.css'

interface MatchParams {
  touristRouteId: string
}

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = (props) => {
  console.log('此props为空，无法接收到 history,match,location',props)
  return (
    <h1>详情页,ID:{props.match.params.touristRouteId}</h1>
  )
}
