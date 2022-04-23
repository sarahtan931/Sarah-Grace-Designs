import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import '../Styles/Checkout.scss';
import axios from 'axios';
import configdata from '../config.json';
import CheckoutSummary from '../Components/CheckoutSummary';
import { useLocation } from 'react-router-dom';

export default function Checkout() {
    const [products, setProducts] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const email = localStorage.getItem('email');
    const stripe = useStripe();
    const elements = useElements();
    const url = configdata.url;
    const location = useLocation();
    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: 'black',
                iconColor: 'grey',
                "::placeholder": {
                    color: 'grey'
                }
            },
            invalid: {
                color: 'red'
            },
            complete: {

            }
        },
        hidePostalCode: true
    }


    //when initiating cart, if user authenticated get values from db else get values from local storage
    useEffect(() => {
        if (location.state.products != null && location.state.subtotal != null) {
            setProducts(location.state.products);
            setSubtotal(location.state.subtotal);
        } else {
            const isAuth = localStorage.getItem('isAuth');
            if (isAuth) {
                GetUserCart();
            } else {
                GetLocalCart();
                Products();
            }
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
            axios.get(`${url}/api/products/ids/${idArr}`).then((response) => {
                let productTemp = response.data;
                productTemp.forEach((product, index) => {
                    let cartItem = cartItemArr.find(x => x.productid == product.productid);
                    price += (parseInt(product.price) * cartItem?.quantity);
                    productTemp[index].cartitemquantity = cartItem.quantity;
                });

                setProducts([...productTemp]);
                setSubtotal(price);
            });
        } else {
            setProducts([]);
        }
    }

    //helper function to get products from db
    const GetUserCart = () => {
        axios.get(`${url}/api/cart/${email}`).then((response) => {
            const sorted = response.data?.sort((a, b) => a.id - b.id);
            setProducts([...sorted]);
            let price = 0;
            response.data?.forEach(item => {
                price += (item.cartitemquantity * item.price)
            });
            setSubtotal(price);

        }).catch((err) => {
            console.log(err)
        });
    }


    const handleFormSubmit = async () => {
        //getting card element
        const cardElement = elements.getElement(CardElement);

        //unhardcode this
        const billingDetails = {
            name: 'sarah',
            email: 'test@test.com',
            address: {
                city: 'kinsgtons',
                line1: '101 address',
                state: 'on',
                postal_code: 'ktm 24s'
            }
        };

        //making payment request
        const paymentMethodReq = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: billingDetails
        })

        //getting payment confirmation
        axios.post(`${url}/api/payment_intents`, { amount: 123 }).then(async (response) => {
            const clientSecret = response.data;
            const confirmCardPayment = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethodReq.paymentMethod.id
            })

            //make success page
            console.log(confirmCardPayment);

        }).catch((err) => {
            console.log(err)
        });

    }



    return (
        <div>
            <div className='checkoutback'>Back to Cart</div>
            <div className="checkoutlogo">
                <img src="https://sarahgracedesignsbucket.s3.amazonaws.com/SarahGraceLogo.png" alt="Sarah Grace Designs Header Image" />
            </div>
            <div className='checkout'>
                <div className="checkout__info">
                    <div className="checkout__infobox">
                        <div className="checkout__contactbox">
                            <p className="checkout__subtitle">Contact Information</p>
                            <input className="checkout__input" type="title" placeholder='Name' name="name" ></input>
                            <input className="checkout__input" type="title" placeholder='Email' name="email" ></input>
                        </div>
                        <div className="checkout__shipping">
                            <p className="checkout__subtitle">Shipping Information</p>
                            <input className="checkout__input" type="title" placeholder='Address' name="address" ></input>
                            <input className="checkout__input" type="title" placeholder='City' name="city" ></input>
                            <div className='checkout__flexinput'>
                                <input className="checkout__input" type="title" placeholder='Country' name="country" ></input>
                                <input className="checkout__input" type="title" placeholder='State' name="state" ></input>
                            </div>
                            <input className="checkout__input" type="title" placeholder='Postal Code' name="postalcode" ></input>
                        </div>
                        <div className="checkout__payment">
                            <p className="checkout__subtitle">Payment Information</p>
                            <div className="checkout__cardbox">
                                <CardElement options={cardElementOptions}></CardElement>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="checkout__review">
                    <CheckoutSummary subtotal={subtotal} products={products}></CheckoutSummary>
                        <button onClick={handleFormSubmit} className="checkoutbutton">Order Now</button>
                </div>
            </div>

        </div>
    )
}
