import React from 'react';
import '../Styles/Register.scss';
import { faBagShopping, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Register() {
    return (
        <div className='register'>
            <div className="register__back">
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
                        Expess Checkout
                    </p>
                    <p className="login__perks">
                        <FontAwesomeIcon icon={faTruckFast}></FontAwesomeIcon> &nbsp;
                        Express Shipping
                    </p>
                </div>
                <div className="register__inputbox">
                <input className="register__input" placeholder='Email'></input>
                    <input className="register__input" placeholder='Email'></input>
                    <input className="register__input" placeholder='Password'></input>
                    <input className="register__input" placeholder='Password'></input>
                    <div className="register__button">
                        <div>
                            Register
                        </div>
                    </div>
                    <p className='registerroute'>
                        Already Have An Account? Login
                    </p>
                </div>

            </div>
        </div>
    )
}
