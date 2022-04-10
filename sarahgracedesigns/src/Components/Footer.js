import React from 'react';
import '../Styles/Footer.scss';

export const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__boxes">
                <div className="footer__box">
                    <p className='footer__boxtitle'>Shop</p>
                    <ul>
                        <li>Crochet</li>
                        <li>Beads</li>
                    </ul>
                </div>
                <div className="footer__box footer__verticalline">
                    <p className='footer__boxtitle'>Store Policy</p>
                    <ul>
                        <li>FAQ</li>
                        <li>Privacy Policy</li>
                        <li>Payment</li>
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
        </div>
    )
}

export default Footer;