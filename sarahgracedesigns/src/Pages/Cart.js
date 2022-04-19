import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import OrderSummary from '../Components/OrderSummary';
import '../Styles/Cart.scss';
import ProductCartBox from '../Components/ProductCartBox';
import { useModal } from 'react-hooks-use-modal';
import ComingSoon from '../Components/ComingSoon';


export default function Cart() {
    const [products, setProducts] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const email = localStorage.getItem('email');
    const [Modal, openModal, closeModal] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: true,
    });



    //when initiating cart, if user authenticated get values from db else get values from local storage
    useEffect(() => {
        const isAuth = localStorage.getItem('isAuth');
        if (isAuth) {
            GetUserCart();
        } else {
            GetLocalCart();
            Products();
        }
    }, []);


    //helper function to get products from local storage
    const GetLocalCart = () => {
        let cartItemString = localStorage.getItem('cartItemIds');
        let cartItemArr = JSON.parse(cartItemString);
        let price = 0;
        let productIdArr = [];
        if (cartItemArr != null && cartItemArr.length > 0) {
            cartItemArr.forEach(cartItem => {
                productIdArr.push(cartItem.productid)
            })

            let idArr = productIdArr.join(',');
            axios.get(`http://localhost:8080/api/products/ids/${idArr}`).then((response) => {
                let productTemp = response.data;
                productTemp.forEach((product, index) => {
                    let cartItem = cartItemArr.find(x => x.productid == product.productid);
                    price += (parseInt(product.price) * cartItem?.quantity);
                    productTemp[index].cartitemquantity = cartItem.quantity;
                });

                setProducts([...productTemp]);
                setSubtotal(price);
            });
        }else{
            setProducts([]);
        }
    }

    //helper function to get products from db
    const GetUserCart = () => {
        axios.get(`http://localhost:8080/api/cart/${email}`).then((response) => {
            const sorted = response.data?.sort((a, b) => a.id - b.id);
            setProducts([...sorted]);
            let price = 0;
            response.data?.forEach(item => {
                price += (item.cartitemquantity * item.price)
            });
            setSubtotal(price)

        }).catch((err) => {
            console.log(err)
        });
    }

    //helper function to update products in db
    const UpdateTotalBackend = () => {
        axios.get(`http://localhost:8080/api/cart/${email}`).then((response) => {
            const sorted = response.data?.sort((a, b) => a.id - b.id);
            setProducts([...sorted]);
            let price = 0;
            response.data?.forEach(item => {
                price += (item.cartitemquantity * item.price)
            });
            setSubtotal(price)
        }).catch((err) => {
            console.log(err)
        });
    }

    //if user is authenticated use backend else use local storage
    const UpdateTotal = () => {
        const isAuth = localStorage.getItem('isAuth');
        if (isAuth) {
            UpdateTotalBackend();
        } else {
            GetLocalCart();
        }

    }

    const Products = () => {
        return (
            products.map((data) => {
                return (
                    <div key={data.id}>
                        <ProductCartBox updateTotal={UpdateTotal} title={data.title} userid={data.userid} url={data.productimgurl} price={data.price} id={data.id} serialno={data.serialno} quantity={data.cartitemquantity} productid={data.productid} />
                    </div>
                );
            })
        )
    }

    function ModalOpenHelper(e) {
        e.stopPropagation();
        openModal();
    }

    function ModalCloseHelper() {
        closeModal()
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
                    {products.length == 0 &&
                        <div className="cart__empty">Empty</div>
                    }
                    <div className="cart__itembox">
                        {products.length > 0 && <Products></Products>}
                    </div>
                    <div className="cart__summarybox">
                        <OrderSummary subtotal={subtotal} checkout={ModalOpenHelper}></OrderSummary>
                    </div>
                </div>
            </div>

            <Modal>
                <ComingSoon closeModal={ModalCloseHelper}></ComingSoon>
            </Modal>
        </div>
    )
}
