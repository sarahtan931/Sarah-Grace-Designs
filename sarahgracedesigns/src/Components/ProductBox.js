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
import configdata from '../config.json';

export default function ProductBox(props) {
    const navigate = useNavigate();
    const [openAdd, setOpenAdd] = useState(false);
    const [openErr, setOpenErr] = useState(false);
    const [Modal, openModal, closeModal] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: true,
    });
    const url = configdata.url;

    //helper function to close snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAdd(false);
    };

    //snackbar action
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

    //if user is hovering over image set background to secondary image
    const ImageHover = () => {
        document.getElementById(props.id).src = props.productimgurlhover;
    }

    //if user is not hovering, set image to initial
    const NoImageHover = () => {
        document.getElementById(props.id).src = props.url;
    }

    //helper function to navigate
    const ProductPage = () => {
        navigate(`/product/${props.id}`)
    }

    //helper function to open modal
    function ModalOpenHelper(e) {
        e.stopPropagation();
        openModal();
    }

    //helper function to close modal
    const callbackModal = () => {
        closeModal();
    }


    //backend functionality to add product to cart
    const AddToCartBackend = (body) => {
        axios.post(`${url}/api/cart/add`, body).then((response) => {
            setOpenAdd(true)
        }).catch((err) => {
            setOpenErr(true);
        });
    }

    //frontend functionality to add product to cart
    const AddToCartFrontend = (body) => {
        let cartItemIdsString = localStorage.getItem('cartItemIds');
        let cartItemIdsArr = []
        if (cartItemIdsString != null) {
            cartItemIdsArr = JSON.parse(cartItemIdsString);
        }

        let found = cartItemIdsArr.find(x => x.productid == body.productid);
        if (found) {
            let index = cartItemIdsArr.indexOf(found);
            cartItemIdsArr[index].quantity = parseInt(body.quantity);
        } else {
            cartItemIdsArr.push({ productid: parseInt(body.productid), quantity: parseInt(body.quantity) });
        }
        let newCartItemIdsString = JSON.stringify(cartItemIdsArr)
        localStorage.setItem('cartItemIds', newCartItemIdsString);
        setOpenAdd(true);
    }

    //if user is authenticated use backend function
    //if user is not authenticated store in local storage
    const AddToCart = () => {
        if (props.quantity == 0){
            return;
        }
        const isAuth = localStorage.getItem('isAuth');
        const email = localStorage.getItem('email')
        let body = {
            email: email,
            productid: props.id,
            quantity: 1,
        }

        if (isAuth){
            AddToCartBackend(body);
        }else{
            AddToCartFrontend(body);
        }
    }

    //frontend add to cart for modal
    const AddToCartModal = (id, quantity) => {
        const isAuth = localStorage.getItem('isAuth');
        const email = localStorage.getItem('email')
        let body = {
            email: email,
            productid: id,
            quantity: quantity,
        }

        if (isAuth){
            AddToCartBackend(body);
        }else{
            AddToCartFrontend(body);
        }
    }

    //navigate to cart
    const NavigateCart = () => {
        navigate('/cart')
    }

    return (
        <div className='productbox' >
            <div className="productbox__img" onMouseOver={ImageHover} onMouseLeave={NoImageHover} onClick={ProductPage}>
                <div className='productbox__imgbox'>
                    <img src={props.url} alt="Main image of product" id={props.id} className="productbox__mainimg" />
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
                    {props.quantity == 0 &&  <BlackButton text={'Add to Cart'} disabled={true}></BlackButton>}
                    {props.quantity > 0 && <BlackButton text={'Add to Cart'} disabled={false}></BlackButton>}
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
