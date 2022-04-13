import React, {useState} from 'react';
import '../Styles/Login.scss';
import { faBagShopping, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
;

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (event) => { // setting email input 
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       // const rePass = /^(?=.*[a-zA-Z\d]).{5,20}[^\<\\\.\&\%\/\>\*\(\)\+\=\{\}\[\]\:\;\'\"\,]$/;
          if (reEmail.test(email)) {
            onSubmit({email: email.toLowerCase(), password: password});
          } else {
            //handleerror
            console.log('input not valid')
          }
    };

    
  const onSubmit = (event) => {
    fetch(`http://localhost:8080/api/login`, {
      // Creates a post call with the state info
      method: 'POST',
      body: JSON.stringify({email: email.toLowerCase(), password: password}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (res.status === 200) {
            // If the response is successful
            res.json().then(
                function(data) {
                  // Set all local storage to returned values from DB. Allows them to be accessed from anywhere
                  localStorage.setItem('isAuth', true);
                  localStorage.setItem('token', data.token);
                  localStorage.setItem('email', data.email);
                  // Routes the logged in user to the proper dashboard based on their catagort in the DB
                  navigate('/shop')
                });
          } else {
            // If not sucessful
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch((err) => {
          // Improper email / password handler
          console.error(err);
        });
  };


    const navigateShopping = () => {
        navigate('/shop')
    }

    const navigateRegister = () => {
        navigate('/register')
    }

    return (
        <div className='login'>
            <div className="login__back" onClick={navigateShopping}>
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
                        Express Checkout
                    </p>
                    <p className="login__perks">
                        <FontAwesomeIcon icon={faTruckFast}></FontAwesomeIcon> &nbsp;
                        Express Shipping
                    </p>
                </div>
                <div className="login__inputbox">
                    <input className="login__input" placeholder='Email' value={email} name="email" onChange={handleEmailChange}>

                    </input>
                    <input className="login__input" type="password" placeholder='Password' value={password} name="password" onChange={handlePasswordChange}>

                    </input>
                    <div className="login__button" onClick={handleSubmit}>
                        <div>
                            Login
                        </div>
                    </div>
                    <p className='registerroute' onClick={navigateRegister}>
                        Dont have an account? Register
                    </p>
                </div>

            </div>
        </div>
    )
}
