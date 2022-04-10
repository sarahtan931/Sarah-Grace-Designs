import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import '../Styles/Navbar.scss';

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="navbar__logo">
                <img className='navbar__logoimg' src="https://sarahgracedesignsbucket.s3.amazonaws.com/SarahGraceLogo.png" alt="" />
            </div>
            <div className="navbar__links">
                <Link to='/' className="navbar__list" >Home</Link>
                <Link to='/shop' className="navbar__list">New</Link>
                <Link to='/shop' className="navbar__list">Shop</Link>
            </div>
            <div className="navbar__icons">
                <FontAwesomeIcon icon={faUser} className='navbar__icon'></FontAwesomeIcon>
                <FontAwesomeIcon icon={faCartShopping} className='navbar__icon'></FontAwesomeIcon>
            </div>
        </div>


    );
};

export default Navbar;
