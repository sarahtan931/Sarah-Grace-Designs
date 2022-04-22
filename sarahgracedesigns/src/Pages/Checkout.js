import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import '../Styles/Checkout.scss';
import axios from 'axios';
import configdata from '../config.json';


export default function Checkout() {
    const stripe = useStripe();
    const elements = useElements();
    const url = configdata.url;
    const cardElementOptions = {
        style: {
            base: {
                fontSize: '24px',
                color: 'black',
                iconColor: 'white',
                "::placeholder": {
                    color: 'white'
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

    const handleFormSubmit = async() => {
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
        axios.post(`${url}/api/payment_intents`, { amount: 123 }).then(async(response) => {
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
            <div className='checkout'>
                <div className="checkout__info">

                    <div className="checkout__cardbox">
                        <CardElement options={cardElementOptions}></CardElement>
                    </div>
                    <button onClick={handleFormSubmit}>submit</button>

                </div>
                <div className="checkout__review">
                    review
                </div>
            </div>

        </div>
    )
}
