import React from 'react';
import '../Styles/Register.scss';
import { faBagShopping, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const navigateShopping = () => {
    navigate('/shop')
  }

  const navigateLogin = () => {
    navigate('/login')
  }

  return (
    <div className='register'>
      <div className="register__back" onClick={navigateShopping}>
        Back to Shopping
      </div>
      <div className="register__content">
        <div className="register__imagebox">
          <img src="https://sarahgracedesignsbucket.s3.amazonaws.com/SarahGraceLogo.png" alt="" className='register__img' />
        </div>
        <div className="login__text">
          <p className="login__instructions">
            Sign up or create an account to unlock
          </p>
          <p className="login__perks">
            <FontAwesomeIcon icon={faBagShopping}></FontAwesomeIcon> &nbsp;
            Express Checkout
          </p>
          <p className="login__perks">
            <FontAwesomeIcon icon={faTruckFast}></FontAwesomeIcon> &nbsp;
            Express Shipping
          </p>
        </div>
        <div className="register__inputbox">
          <div className="register__inputflex">
            <input type="text" className="register__input register__inputsmall " placeholder='First Name' />
            <input type="text" className=" register__input register__inputsmall" placeholder='Last Name' />
          </div>
          <input className="register__input register__inputbig" placeholder='Email'></input>
          <input className="register__input register__inputbig" placeholder='Password'></input>
          <input className="register__input register__inputbig" placeholder='Re-Enter Password'></input>
          <div className="register__button">
            <div>
              Register
            </div>
          </div>
          <p className='registerroute' onClick={navigateLogin}>
            Already Have An Account? Login
          </p>
        </div>

      </div>
    </div>
  )
}
