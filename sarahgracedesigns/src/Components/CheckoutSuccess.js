import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import '../Styles/Checkout.scss';
import {  useNavigate } from 'react-router-dom';


export default function CheckoutSuccess() {
  const navigate = useNavigate();

  const NavigateShop = () => {
    navigate('/shop');
  }
  return (
    <div className='checkoutsuccess'>
      <div className='checkoutsuccess__icon'>
      <FontAwesomeIcon icon={faCircleCheck}></FontAwesomeIcon>
      </div>
      <div className='checkoutsuccess__txt1'>Thank you for your purchase</div>
      <div className='checkoutsuccess__txt2'>Your order number is: #xxxxx</div>
      <div className='checkoutsuccess__txt3'>We are working hard preparing your order. We will email you shortly with confirmation details and tracking info.</div>
      <button className='checkoutsuccess__button' onClick={NavigateShop}> Back To Shopping </button>
    </div>
  )
}
