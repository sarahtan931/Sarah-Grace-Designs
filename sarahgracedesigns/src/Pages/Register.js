import React, { useState } from 'react';
import '../Styles/Register.scss';
import { faBagShopping, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errText, setErrText] = useState(" ");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  }

  const handlePasswordChange2 = (event) => {
    setPassword2(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const navigateShopping = () => {
    navigate('/shop')
  }

  const navigateLogin = () => {
    navigate('/login')
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrText('');
    const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (reEmail.test(email) && password == password2) {
      onSubmit({ email: email.toLowerCase(), password: password });
    } else {
      if (password != password2) {
        setErrText('Passwords do not match')
      } else if (firstname == "" || lastname == "" || email == "" || password == "" || password2 == ""){
        setErrText('Please fill out all fields')
      }
      else {
        setErrText('Please input a valid email')
      }
    }
  };



  const onSubmit = (event) => {
    fetch(`http://localhost:8080/api/register`, {
      // Creates a post call with the state info
      method: 'POST',
      body: JSON.stringify({ email: email.toLowerCase(), password: password, firstname: firstname, lastname: lastname }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          // If the response is successful
          res.json().then(
            function (data) {
              // Set all local storage to returned values from DB. Allows them to be accessed from anywhere
              localStorage.setItem('isAuth', true);
              localStorage.setItem('token', data.token);
              localStorage.setItem('email', data.email);
              // Routes the logged in user to the proper dashboard based on their catagort in the DB
              navigate('/');
            });
        } else {
          res.json().then(
            function (data) {
              setErrText(data.info)
            });
        }
      })
  };

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
            <input type="text" className="register__input register__inputsmall " placeholder='First Name' value={firstname} name="firstname" onChange={handleFirstNameChange} />
            <input type="text" className=" register__input register__inputsmall" placeholder='Last Name' value={lastname} name="lastname" onChange={handleLastNameChange} />
          </div>
          <input className="register__input register__inputbig" placeholder='Email' value={email} name="email" onChange={handleEmailChange}></input>
          <input type="password" className="register__input register__inputbig" placeholder='Password' value={password} name="password" onChange={handlePasswordChange}></input>
          <input type="password" className="register__input register__inputbig" placeholder='Re-Enter Password' value={password2} name="password2" onChange={handlePasswordChange2}></input>
          <div className="register__button" onClick={handleSubmit}>
            <div >
              Register
            </div>
          </div>
          <p className='register__err'>
            {errText}
          </p>
          <p className='loginroute' onClick={navigateLogin}>
            Already Have An Account? Login
          </p>
        </div>

      </div>
    </div>
  )
}
