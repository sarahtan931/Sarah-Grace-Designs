import React, { useState } from 'react';
import '../Styles/ProductBox.scss';
import BlackButton from './BlackButton';
import { useNavigate } from 'react-router-dom';
import { useModal } from 'react-hooks-use-modal';
import ProductModal from './ProductModal';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


export default function ProductBox(props) {
    const navigate = useNavigate();
    const [openAdd, setOpenAdd] = useState(false);
    const [openErr, setOpenErr] = useState(false);
    const [Modal, openModal, closeModal] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: true,
    });


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAdd(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="Medium" />
            </IconButton>
        </React.Fragment>
    );


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


    const AddToCart = () => {
        const email = localStorage.getItem('email');
        let body = {
            email: email,
            productid: props.id,
            quantity: 1,
        }

        axios.post(`http://localhost:8080/api/cart/add`, body).then((response) => {
            setOpenAdd(true)
        }).catch((err) => {
            setOpenErr(true);
        });
    }

    const AddToCartModal = (id, quantity) => {
        const email = localStorage.getItem('email');
        let body = {
            email: email,
            productid: id,
            quantity: quantity,
        }

        axios.post(`http://localhost:8080/api/cart/add`, body).then((response) => {
            setOpenAdd(true)
        }).catch((err) => {
            setOpenErr(true);
        });
    }

    
    const NavigateCart = () => {
        navigate('/cart')
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
                <div className="productbox__button"  onClick={AddToCart}>
                    <BlackButton text={'Add to Cart'}></BlackButton>

                </div>
            </div>


            <Modal>
                <div >
                    <ProductModal id={props.id} url={props.url} title={props.title} serialno={props.serialno} price={props.price} quantity={props.quantity} callbackModal={callbackModal} addToCart={AddToCartModal}>
                    </ProductModal>
                </div>
            </Modal>

            <Snackbar
                onClick={NavigateCart}
                open={openAdd}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Succesfully Added Item"
                action={action}
            />

            <Snackbar
                open={openErr}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Error Adding Item"
                action={action}
            />
        </div>
    )
}
