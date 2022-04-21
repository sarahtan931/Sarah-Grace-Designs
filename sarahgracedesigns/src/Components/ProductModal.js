import React, { useState } from 'react';
import '../Styles/ProductModal.scss';
import QuantityDropdown from './QuantityDropdown';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

export default function ProductModal(props) {
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const [outOfStock, setOutOfStock] = useState(false);

    //update quantity from quantity dropdown
    const updateQuantity = (quantity) => {
        setQuantity(quantity)
    }

    //function to navigate to view product
    const NavigateProduct = () => {
        navigate(`/product/${props.id}`)
    }

    //function to close modal
    function close() {
        props.callbackModal();
    }

    //add to cart
    function add() {
        props.addToCart(props.id, quantity);
    }

    function GetQuantity() {
        if (props.quantity > 0) {
            return (<QuantityDropdown quantity={props.quantity} update={updateQuantity}></QuantityDropdown>
            )
        }else{
            setOutOfStock(true)
            return( <p className='outofstock'>  This item is currently out of stock.</p>)
        }
    }

    return (
        <div className='modal'>
            <img src={props.url} alt="Product Image" className='modal__img' />
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
                        <GetQuantity></GetQuantity>
                    </div>
                </div>
                <div className="modal__element">
                    <button className="modal__button" onClick={add} disabled={outOfStock}>
                        Add to Cart
                    </button>
                    <p className="modal__viewmore" onClick={NavigateProduct}>
                        View More
                    </p>

                </div>
            </div>
        </div>
    )
}


