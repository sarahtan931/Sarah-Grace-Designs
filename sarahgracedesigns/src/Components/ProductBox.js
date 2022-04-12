import React from 'react';
import '../Styles/ProductBox.scss';
import BlackButton from './BlackButton';
import { useNavigate } from 'react-router-dom';
import { useModal } from 'react-hooks-use-modal';
import ProductModal from './ProductModal';


export default function ProductBox(props) {
    const navigate = useNavigate();
    const [Modal, openModal, closeModal] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: true,
    });

    const ImageHover = () => {
        document.getElementById(props.id).src = props.productimgurlhover;
    }

    const NoImageHover = () => {
        document.getElementById(props.id).src = props.url;
    }

    const ProductPage = () => {
        navigate(`/product/${props.id}`)
    }

    function ModalOpenHelper(e) {
        e.stopPropagation();
        openModal();
    }

    const callbackModal = () => {
        closeModal();
    }

    return (
        <div className='productbox' >
            <div className="productbox__img" onMouseOver={ImageHover} onMouseLeave={NoImageHover} onClick={ProductPage}>
                <div className='productbox__imgbox'>
                    <img src={props.url} alt="" id={props.id} className="productbox__mainimg" />
                </div>
                <div className="productbox__view" onClick={(e) => ModalOpenHelper(e)}>
                    <div className="productbox__viewtext">
                        Quick View
                    </div>
                </div>
            </div>
            <div className='productbox__info'>
                <p className='productbox__title'>
                    {props.title}
                </p>
                <div className="productbox__price">
                    ${props.price}
                </div>
                <div className="productbox__button">
                    <BlackButton text={'Add to Cart'}></BlackButton>

                </div>
            </div>


            <Modal>
                <div >
                    <ProductModal url={props.url} title={props.title} serialno={props.serialno} price={props.price} quantity={props.quantity} callbackModal={callbackModal}>
                    </ProductModal>
                </div>
            </Modal>
        </div>
    )
}
