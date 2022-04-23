import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import '../Styles/Checkout.scss';
import axios from 'axios';
import configdata from '../config.json';
import CheckoutSummary from '../Components/CheckoutSummary';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckoutSuccess from '../Components/CheckoutSuccess';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../Styles/Rotating.scss';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';

export default function Checkout() {
    const [products, setProducts] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);
    const shippingPrice = 12;
    const [totalPrice, setTotalPrice] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState(localStorage.getItem('email') ?? "");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [validationError, setValidationError] = useState("");
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);
    const [disableOrder, setDisableOrder] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
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
        const name = localStorage.getItem("name");
        if (name != null && name != undefined) {
            setName(name);
        }

        if (location.state.products != null && location.state.subtotal != null) {
            setProducts(location.state.products);
            setSubtotal(location.state.subtotal);
        } else {
            const isAuth = localStorage.getItem('isAuth');
            if (isAuth) {
                GetUserCart();
            } else {
                GetLocalCart();
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

    const NavigateCart = () => { navigate('/cart') }
    const NavigateShopping = () => { navigate('/shop') }

    const handleFormSubmit = () => {
        const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValid = email.length > 0 && name.length > 0 && address.length > 0 && city.length > 0 && country.length > 0 && state.length > 0 && postalCode.length > 0;
        if (!isValid) {
            setValidationError("Please Fill All Fields")
        } else if (!reEmail.test(email)) {
            setValidationError("Please Input A Valid Email")
        } else {
            setValidationError("");
            setDisableOrder(true);
            setLoading(true);
            handlePayment();
        }
    }

        const handlePayment = async () => {
            //getting card element
            const cardElement = elements.getElement(CardElement);
    
            const billingDetails = {
                name: name,
                email: email,
                address: {
                    city: city,
                    line1: address,
                    state: state,
                    postal_code: postalCode
                }
            };
    
            //making payment request
            const paymentMethodReq = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: billingDetails
            })
    
            setTax(Math.round(.13*subtotal));
            setTotalPrice(tax + subtotal + shippingPrice);
            const amount = Math.round(((subtotal * 1.13) + 12) * 100);
           
            //getting payment confirmation
            axios.post(`${url}/api/payment_intents`, { amount: amount }).then(async (response) => {
                const clientSecret = response.data;
                const confirmCardPayment = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: paymentMethodReq.paymentMethod.id
                })
    
                if (confirmCardPayment.paymentIntent) {
                    processOrder();
                    setCheckoutSuccess(true)
                } else if(confirmCardPayment.error){
                    setDisableOrder(false);
                    setLoading(false);
                    setValidationError(confirmCardPayment.error?.message)
                }
            }).catch((err) => {
                console.log(err)
                setDisableOrder(false);
                setLoading(false);
                setValidationError("Error Processing Request")
            });
    
        }

    const processOrder = () => {
        let body = {
            name: name,
            email: email,
            subtotal: subtotal,
            tax: tax,
            shipping: shippingPrice,
            city: city,
            address: address,
            state: state,
            postalCode: postalCode,
            products: products
        }
        try {
            //send order details to process order in the db
            axios.post(`${url}/api/processorder`, body).then((response) => {
                console.log('Order processed successfully', response)
            }).catch((err) => {
                console.log(err)
            });
        } catch (ex) {
            console.log(ex)
        }
    }

    const handleNameChange = (e) => { setName(e.target.value) }
    const handleEmailChange = (e) => { setEmail(e.target.value) }
    const handleAddressChange = (e) => { setAddress(e.target.value) }
    const handleCityChange = (e) => { setCity(e.target.value) }
    const handleCountryChange = (e) => { setCountry(e.target.value) }
    const handleStateChange = (e) => { setState(e.target.value) }
    const handlePostalCodeChange = (e) => { setPostalCode(e.target.value) }

    return (
        <div>
            {!checkoutSuccess && <div onClick={NavigateCart} className='checkoutback'>Back to Cart</div>}
            {checkoutSuccess && <div onClick={NavigateShopping} className='checkoutback'>Back to Shopping</div>}
            <div className="checkoutlogo">
                <img src="https://sarahgracedesignsbucket.s3.amazonaws.com/SarahGraceLogo.png" alt="Sarah Grace Designs Header Image" />
            </div>
            <div className='checkout'>
                <div className="checkout__info">
                    {!checkoutSuccess &&
                        <div className="checkout__infobox">
                            <div className="checkout__contactbox">
                                <p className="checkout__subtitle">Contact Information</p>
                                <input className="checkout__input" type="title" placeholder='Name' name="name" value={name} onChange={(e) => handleNameChange(e)}></input>
                                <input className="checkout__input" type="title" placeholder='Email' name="email" value={email} onChange={(e) => handleEmailChange(e)}></input>
                            </div>
                            <div className="checkout__shipping">
                                <p className="checkout__subtitle">Shipping Information</p>
                                <input className="checkout__input" type="title" placeholder='Address' name="address" value={address} onChange={(e) => handleAddressChange(e)}></input>
                                <input className="checkout__input" type="title" placeholder='City' name="city" value={city} onChange={(e) => handleCityChange(e)}></input>
                                <div className='checkout__flexinput'>
                                    <input className="checkout__input" type="title" placeholder='Country' name="country" value={country} onChange={(e) => handleCountryChange(e)}></input>
                                    <input className="checkout__input" type="title" placeholder='State' name="state" value={state} onChange={(e) => handleStateChange(e)}></input>
                                </div>
                                <input className="checkout__input" type="title" placeholder='Postal Code' name="postalcode" value={postalCode} onChange={(e) => handlePostalCodeChange(e)}></input>
                            </div>
                            <div className="checkout__payment">
                                <p className="checkout__subtitle">Payment Information</p>
                                <div className="checkout__cardbox">
                                    <CardElement options={cardElementOptions}></CardElement>
                                </div>
                            </div>
                        </div>}
                    {checkoutSuccess && <CheckoutSuccess></CheckoutSuccess>}
                </div>
                <div className="checkout__review">
                    <CheckoutSummary subtotal={subtotal} products={products}></CheckoutSummary>
                    <div className='checkoutbuttonbox'>
                        <div className='validationmsg'> {validationError}</div>
                        {!checkoutSuccess && <button onClick={handleFormSubmit} className="checkoutbutton" disabled={disableOrder}>
                            {loading && <FontAwesomeIcon icon={faRefresh} className="rotating"></FontAwesomeIcon>}
                            Order Now</button>}
                    </div>
                </div>
            </div>

        </div>
    )
}
