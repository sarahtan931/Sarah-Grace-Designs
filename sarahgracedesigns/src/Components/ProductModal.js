import React from 'react';
import '../Styles/ProductModal.scss';
import QuantityDropdown from './QuantityDropdown';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ProductModal(props) {
    function close(){
        props.callbackModal();
    }
    return (
        <div className='modal'>
            <img src={props.url} alt="" className='modal__img' />
            <div className="modal__information">
                <div className="modal__element">
                    <div className="modal__exit" onClick={close}>
                        <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                    </div>
                    <div className="modal__title">
                        {props.title}
                    </div>
                    <div className="modal__serialno">
                        {props.serialno}
                    </div>
                    <div className="modal__price">
                        ${props.price}
                    </div>
                </div>
                <div className="modal__quantity modal__element">
                    <div className="">
                        Quantity
                        <QuantityDropdown quantity={props.quantity}></QuantityDropdown>
                    </div>
                </div>
                <div className="modal__element">
                    <div className="modal__button">
                        Add to Cart
                    </div>
                    <p className="modal__viewmore">
                        View More
                    </p>

                </div>
            </div>
        </div>
    )
}

