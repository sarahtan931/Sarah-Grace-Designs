import React from 'react';
import '../Styles/Checkout.scss';
import ProductSummaryBox from '../Components/ProductSummaryBox';

export default function CheckoutSummary(props) {
  
    //function to calculate total price
    const GetTotal = () => {
        let total = (props.subtotal * 1.13) + 12;
        let roundedTotal = Math.round(total * 100) / 100;
        return roundedTotal;
    }

    //function to calculate shipping price
    const GetShipping = () => {
        if (props.subtotal > 0) {
            return 12;
        } else {
            return 0;
        }
    }

    //function to calculate taz
    const GetTax = () => {
        let tax = props.subtotal * .13;
        let roundedTax = Math.round(tax * 100) / 100;
        return roundedTax;
    }

    //function that returns product cart items 
    const Products = () => {
        return (
            props.products.map((data) => {
                return (
                    <div key={data.id}>
                        <ProductSummaryBox product={data}></ProductSummaryBox>
                    </div>
                );
            })
        )
    }

    return (
        <div className="checkoutsummary">
            <p className='checkoutsummary__title'>Order Summary</p>
            <div className='checkoutsummary__productbox'>
            <Products></Products>
            </div>
            <div className='checkoutsummary__heading'>
                <p>Subtotal</p>
                <p>${props.subtotal}.00</p>
            </div>
            <div className='checkoutsummary__heading'>
                <p>Shipping Estimate</p>
                <p> $<GetShipping></GetShipping>.00 </p>
            </div>
            <div className='checkoutsummary__heading'>
                <p>Tax Estimate</p>
                <p>$<GetTax></GetTax></p>
            </div>
            <div className='checkoutsummary__box'>
                <div className='checkoutsummary__total checkoutsummary__heading'>
                    <p>Estimated Total</p>
                    <p>$<GetTotal></GetTotal></p>
                </div>
            </div>
        </div>
    )
}
