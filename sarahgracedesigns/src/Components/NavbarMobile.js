import React, { PureComponent } from 'react';
import { Link, animateScroll as scroll } from "react-scroll";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import '../Styles/Navbar.scss';
import { useNavigate } from 'react-router-dom';


const NavbarMobile = () => {
    const navigate = useNavigate();

    //helper function to open navigation
    const openNav = () => {
        document.getElementById("myNav").style.width = "100%";
    }

    const navigateTo = link => () => {
        navigate(link)
    }

    //helper function to close navigation
    const closeNav = link => () => {
        document.getElementById("myNav").style.width = "0%";
        if (link != '') {
            navigate(link)
        }
    }

    return (
        <div className='navbar-mobile'>
            <img src="https://sarahgracedesignsbucket.s3.amazonaws.com/SarahGraceLogo.png" alt="" className='mobile-img' />
          
            <div className='nav-header'>
                <p className='nav-mobile-name'></p>
                <FontAwesomeIcon className='bars' icon={faUser} onClick={navigateTo('/login')}></FontAwesomeIcon>
                <FontAwesomeIcon className='bars' icon={faCartShopping} onClick={navigateTo('/cart')}></FontAwesomeIcon>
                <FontAwesomeIcon className='bars' icon={faBars} onClick={openNav}></FontAwesomeIcon>
            </div>
            <div id="myNav" className="overlay">
                <div href="" className="closebtn" onClick={closeNav('')}>&times;</div>
                <div className="overlay-content">
                    <p className="navbar__list" onClick={closeNav('/')}>Home</p>
                    <p className="navbar__list" onClick={closeNav('/shop')}>Shop</p>
                    <p className="navbar__list" onClick={closeNav('/cart')}>Cart</p>
                    <p className="navbar__list" onClick={closeNav('/login')}>Login</p>

                </div>
            </div>
        </div>
    )
}


export default NavbarMobile;