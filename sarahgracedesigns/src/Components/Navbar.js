import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import '../Styles/Navbar.scss';
import { useNavigate } from 'react-router-dom';
import ComingSoon from '../Components/ComingSoon';
import { useModal } from 'react-hooks-use-modal';

const Navbar = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [show, setShow] = useState(false);
    const [Modal, openModal, closeModal] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: true,
    });

    //on initial render get users name
    useEffect(() => {
        let localName = localStorage.getItem("name");
        let isAuth = localStorage.getItem("isAuth");
        if (isAuth){
            setName(localName);
        }
    }, []);

    // Logout 
    const logout = (event) => {
        event.preventDefault();
        localStorage.clear();
        setName("");
        setShow(false);
        navigate('/');
    };

    //helper function to navigate
    const navigateLogin = () => {
        navigate('/login')
    }

    const navigateHome = () => {
        navigate('/')
    }

    const navigateCart = () => {
        navigate('/cart');
    }

    //show user options
    const GetUserOptions = (bool) => {
        if (bool == false) {
            setShow(false)
        } else if (bool == true && name != "") {
            setShow(true)
        }
    }

    //helper function to open modal
    function ModalOpenHelper(e) {
        e.stopPropagation();
        openModal();
    }

    //helper function to close modal
    function ModalCloseHelper() {
        closeModal()
    }
    return (
        <div>
            <div className='navbar'>
                <div className="navbar__logo">
                    <img className='navbar__logoimg' src="https://sarahgracedesignsbucket.s3.amazonaws.com/SarahGraceLogo.png" alt="Sarah Grace Designs Logo" onClick={navigateHome} />
                </div>
                <div className="navbar__links">
                    <Link to='/' className='navbar__list'>Home</Link>
                    <Link to='/shop' className='navbar__list'>Shop</Link>
                </div>
                <div className="navbar__icons">
                    <div className="usernamebox" onMouseDown={() => GetUserOptions(true)} onMouseOver={() => GetUserOptions(true)} onMouseLeave={() => GetUserOptions(false)}>
                        <div className='username' >
                            {name}
                        </div>
                        {show &&
                            <div className="useroptions">
                                <p className="useroptions__option"  onClick={(e) => ModalOpenHelper(e)}>Account Information</p>
                                <p className="useroptions__option" onClick={(e) => ModalOpenHelper(e)}>My List</p>
                                <p className="useroptions__option" onClick={navigateCart}>My Cart</p>
                                <div className="logoutbutton" onClick={logout}>
                                    Sign Out
                                </div>
                            </div>
                        }
                    </div>
                    <FontAwesomeIcon icon={faUser} onClick={navigateLogin}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faCartShopping} className='navbar__icon' onClick={navigateCart}></FontAwesomeIcon>
                </div>
            </div>
            <Modal>
                <ComingSoon  closeModal={ModalCloseHelper}></ComingSoon>
            </Modal>
        </div>
    );
};

export default Navbar;
