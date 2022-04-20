import React, {useState} from 'react';
import {  Link } from 'react-router-dom';
import '../Styles/Footer.scss';
import ComingSoon from '../Components/ComingSoon';
import { useModal } from 'react-hooks-use-modal';

export const Footer = () => {
    const [Modal, openModal, closeModal] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: true,
    });

    //helper functions to open coming soon modal
    function ModalOpenHelper(e) {
        e.stopPropagation();
        openModal();
    }

    //helper functions to close coming soon modal
    function ModalCloseHelper() {
        closeModal()
    }

    return (
        <div className="footer">
            <div className="footer__boxes">
                <div className="footer__box">
                    <p className='footer__boxtitle'>Account</p>
                    <ul>
                       <Link to={'/cart'} className='footer__link'>View Cart</Link>
                       <li className='footer__link' onClick={(e) => ModalOpenHelper(e)}>View List</li>
                       <li className='footer__link' onClick={(e) => ModalOpenHelper(e)}>Account Information</li>
                    </ul>
                </div>
                <div className="footer__box footer__verticalline">
                    <p className='footer__boxtitle'>Store Policy</p>
                    <ul>
                        <li className='footer__link' onClick={(e) => ModalOpenHelper(e)}>FAQ</li>
                        <li className='footer__link' onClick={(e) => ModalOpenHelper(e)}>Privacy Policy</li>
                        <li className='footer__link' onClick={(e) => ModalOpenHelper(e)}>Payment</li>
                    </ul>
                </div>
                <div className="footer__box footer__verticalline">
                    <p className='footer__boxtitle'>Contact Us</p>
                    <ul>
                        <li>613-888-3099</li>
                        <li>stan229@uwo.ca</li>
                    </ul>
                </div>
            </div>
            <p className="footer__text">
                @ Sarah grace designs 2021. Proudly created by Sarah Tan
            </p>

            <Modal>
                <ComingSoon  closeModal={ModalCloseHelper}></ComingSoon>
            </Modal>
        </div>
    )
}

export default Footer;