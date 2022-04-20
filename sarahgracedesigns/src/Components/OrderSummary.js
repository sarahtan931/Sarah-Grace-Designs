import React from 'react';
import '../Styles/Cart.scss';

export default function OrderSummary(props) {
    
    //function to calculate total price
    const GetTotal = () => {
        let total = (props.subtotal * 1.13) + 12;
        let roundedTotal = Math.round(total * 100)/ 100;
        return roundedTotal;
    }

    //function to calculate shipping price
    const GetShipping = () => {
        if (props.subtotal > 0){
            return 12;
        }else{
            return 0;
        }
    }

    //function to calculate taz
    const GetTax = () => {
        let tax = props.subtotal * .13;
        let roundedTax = Math.round(tax * 100)/ 100;
        return roundedTax;
    }

    //function to handle checkout
    function Checkout(e){
        props.checkout(e);
    }

    return (
        <div className="cart__summary">
            <p className='summary__title'>Order Summary</p>
            <div className='summary__heading'>
                <p>Subtotal</p>
                <p>${props.subtotal}.00</p>
            </div>
            <div className='summary__heading'>
                <p>Shipping Estimate</p>
             <p> $<GetShipping></GetShipping>.00 </p>
            </div>
            <div className='summary__heading'>
                <p>Tax Estimate</p>
                <p>$<GetTax></GetTax></p>
            </div>
            <div className='summary__box'>
                <div className='summary__total summary__heading'>
                    <p>Estimated Total</p>
                    <p>$<GetTotal></GetTotal></p>
                </div>
                <div className="summary__button" onClick={(e) => Checkout(e)}>
                    Checkout
                </div>
            </div>
        </div>

    )
}
