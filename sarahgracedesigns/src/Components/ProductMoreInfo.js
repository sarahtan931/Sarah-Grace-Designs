import React, { useState } from 'react';
import '../Styles/ProductPage.scss';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ProductMoreInfo(props) {
    const closed = "moreinfo__closed";
    const open = "moreinfo__open";
    const [stateShipping, setStateShipping] = useState(open);
    const [stateProduct, setStateProduct] = useState(closed);
    const [stateReturn, setStateReturn] = useState(closed)

    //function to set only one info open at a time
    const handleOpen = (ship, product, exchanged) => () => {
        if (stateShipping == open) {
            ship = closed;
        }
        if (stateProduct == open) {
            product = closed;
        }
        if (stateReturn == open) {
            exchanged = closed;
        }
        setStateShipping(ship);
        setStateProduct(product);
        setStateReturn(exchanged)
    }

    return (
        <div className='moreinfo'>
            <div className='moreinfo__accordian' onClick={handleOpen(open, closed, closed)}>Shipping Information
                <div className="moreinfo__icon">
                    {stateShipping == open ? <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon> : <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>}
                </div>
            </div>
            <div className={stateShipping}>
                All products are handmade just for you, so please allow 2-4 weeks for your order to be processed and shipped.
                Once your order has been shipped you will receive an email with tracking information
                and expected delivery date.
                <br></br> <br></br>
                <em>  If you need any assistance dont hesitate to reach out to us at 
                sarah.tan931@gmail.com</em>
            </div>

            <div className='moreinfo__accordian' onClick={handleOpen(closed, open, closed)}>Product Information
                <div className="moreinfo__icon">
                    {stateProduct == open ? <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon> : <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>}
                </div>
            </div>
            <div className={stateProduct}>
                <ul>
                    <li> Content: {props.product.infocontent}</li>
                    <li> Wash: {props.product.infowash}</li>
                    <li> Size: {props.product.infosize}</li>
                </ul>
            </div>

            <div className='moreinfo__accordian' onClick={handleOpen(closed, closed, open)}>Returns and Exchanges
                <div className="moreinfo__icon">
                    {stateReturn == open ? <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon> : <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>}
                </div>
            </div>
            <div className={stateReturn}>
                Unfortunately at this time we do not accept returns or exchanges. 
                <br></br> <br></br>
                <em>  In the case of a 
                damaged product please email us at sarah.tan931@gmail.com</em>
            </div>
        </div>
    )
}
