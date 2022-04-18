import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import OrderSummary from '../Components/OrderSummary';
import '../Styles/Cart.scss';
import ProductCartBox from '../Components/ProductCartBox';


export default function Cart() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const email = localStorage.getItem('email');
        axios.get(`http://localhost:8080/api/cart/${email}`).then((response) => {
            setProducts(response.data);
         
        }).catch((err) => {
            console.log(err)
        });
    }, []);

    const Products = () => {
        return (
          products.map((data) => {
            return (
              <div key={data.id}>
                <ProductCartBox title={data.title} url={data.productimgurl} price={data.price} id={data.id} serialno={data.serialno} quantity={data.quantity}/>
              </div>
            );
          })
        )
      }

    return (
        <div>
            <Navbar></Navbar>
            <div className="cart">
                <div className="cart__header">
                    <p className='cart__slogan'>
                        Handmade Designs - Made With Love
                    </p>
                    <p className='cart__title'>
                        Shopping Cart
                    </p>
                </div>
                <div className="cart__content">
                    <div className="cart__itembox">
                        <Products></Products>
                    </div>
                    <div className="cart__summarybox">
                        <OrderSummary></OrderSummary>
                    </div>
                </div>
            </div>
        </div>
    )
}
