import React from 'react';
import { useParams } from "react-router-dom";

export default function ProductPage(props) {
    const { id } = useParams()
    console.log('productid is', id)
  return (
    <div>ProductPage, {props.productid}</div>
  )
}
