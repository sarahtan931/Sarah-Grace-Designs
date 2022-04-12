import React, { useState } from 'react';
import '../Styles/ProductPage.scss';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ProductMoreInfo() {
    const closed = "moreinfo__closed";
    const open = "moreinfo__open";
    const [stateShipping, setStateShipping] = useState(open);
    const [stateProduct, setStateProduct] = useState(closed);
    const [stateReturn, setStateReturn] = useState(closed)

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
                This is some shipping information
            </div>

            <div className='moreinfo__accordian' onClick={handleOpen(closed, open, closed)}>Product Information
                <div className="moreinfo__icon">
                    {stateProduct == open ? <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon> : <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>}
                </div>
            </div>
            <div className={stateProduct}>
                This is some product information
            </div>

            <div className='moreinfo__accordian' onClick={handleOpen(closed, closed, open)}>Returns and Exchanges
                <div className="moreinfo__icon">
                    {stateReturn == open ? <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon> : <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>}
                </div>
            </div>
            <div className={stateReturn}>
                This is some returns and exchanges information
            </div>
        </div>
    )
}
