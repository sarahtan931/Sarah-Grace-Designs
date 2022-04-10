import React, { PureComponent } from 'react';
import { Link, animateScroll as scroll } from "react-scroll";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../Styles/Navbar.scss';
import {useNavigate} from 'react-router-dom';


const NavbarMobile = () => {
    const navigate = useNavigate();

    const openNav = () => {
        document.getElementById("myNav").style.width = "100%";
    }

    const closeNav = link => () => {
        document.getElementById("myNav").style.width = "0%";
        if(link != ''){
            navigate(link)
        }
    }

    return (
        <div>
            <div onClick={openNav} className='nav-header'><p className='nav-mobile-name'>
            </p><FontAwesomeIcon className='bars' icon={faBars}></FontAwesomeIcon></div>
            <div id="myNav" className="overlay">
                <div href="" className="closebtn" onClick={closeNav('')}>&times;</div>
                <div className="overlay-content">
                    <p className="navbar__list"  onClick={closeNav('/')}>Home</p>
                    <p className="navbar__list" onClick={closeNav('/shop')}>New</p>
                    <p className="navbar__list" onClick={closeNav('/shop')}>Shop</p>
                </div>
            </div>
        </div>
    )
}


export default NavbarMobile;