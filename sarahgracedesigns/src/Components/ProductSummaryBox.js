import React from 'react';
import '../Styles/Checkout.scss';

export default function ProductSummaryBox(props) {
  const product = props.product;
 
  return (
    <div className='productsummary'>
      <div className='productsummary__left'>
        <div className='productsummary__imagebox'>
          <div className='productsummary__quantity'> <div>

          {product.cartitemquantity}
          </div>
            </div>
          <img src={product.productimgurl} alt="" className='productsummary__img'></img>
        </div>
        <div className='productsummary__title'>{product.title}</div>
      </div>
      <div className='productsummary__price'>${product.price}.00</div>
    </div>
  )
}
