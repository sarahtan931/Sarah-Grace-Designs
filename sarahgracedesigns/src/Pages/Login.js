import React from 'react';
import '../Styles/Login.scss';
import { faBagShopping, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '../Components/Footer';

export default function Login() {
    return (
        <div className='login'>
            <div className="login__back">
                Back to Shopping
            </div>
            <div className="login__content">
                <div className="login__imagebox">
                    <img src="https://sarahgracedesignsbucket.s3.amazonaws.com/SarahGraceLogo.png" alt="" className='login__img' />
                </div>
                <div className="login__text">
                    <p className="login__instructions">
                        Sign up or create an account to unlock
                    </p>
                    <p className="login__perks">
                        <FontAwesomeIcon icon={faBagShopping}></FontAwesomeIcon> &nbsp;
                        Expess Checkout
                    </p>
                    <p className="login__perks">
                        <FontAwesomeIcon icon={faTruckFast}></FontAwesomeIcon> &nbsp;
                        Express Shipping
                    </p>
                </div>
                <div className="login__inputbox">
                    <input className="login__input" placeholder='Email'>

                    </input>
                    <input className="login__input" placeholder='Password'>

                    </input>
                    <div className="login__button">
                        <div>
                            Login
                        </div>
                    </div>
                    <p className='registerroute'>
                        Dont have an account? Register
                    </p>
                </div>

            </div>
        </div>
    )
}
