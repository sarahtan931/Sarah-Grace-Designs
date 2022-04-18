import React from 'react';
import '../Styles/Cart.scss';

export default function OrderSummary() {
    return (

        <div className="cart__summary">
            <p className='summary__title'>Order Summary</p>
            <div className='summary__heading'>
                <p>Shipping Estimate</p>
                <p>0</p>
            </div>
            <div className='summary__heading'>
                <p>Tax Estimate</p>
                <p>0</p>
            </div>
            <div className='summary__box'>
                <div className='summary__total summary__heading'>
                    <p>Estimated Total</p>
                    <p>0</p>
                </div>
                <div className="summary__button">
                    Checkout
                </div>
            </div>
        </div>

    )
}
