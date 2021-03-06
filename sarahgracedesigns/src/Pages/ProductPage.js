import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import '../Styles/ProductPage.scss';
import QuantityDropdown from '../Components/QuantityDropdown';
import ProductMoreInfo from '../Components/ProductMoreInfo';
import ColorPicker from '../Components/ColorPicker';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import NavbarMobile from '../Components/NavbarMobile';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ComingSoon from '../Components/ComingSoon';
import { useModal } from 'react-hooks-use-modal';
import configdata from '../config.json';
import { useMediaQuery } from 'react-responsive';

export default function ProductPage(props) {
    const { id } = useParams()
    const [product, setProduct] = useState([]);
    const [outOfStock, setOutOfStock] = useState(false);
    const [mainImageUrl, setMainImageUrl] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [openAdd, setOpenAdd] = useState(false);
    const [openErr, setOpenErr] = useState(false);
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ query: `(max-width: 650px)` });
    const [Modal, openModal, closeModal] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: true,
    });
    const url = configdata.url;

    //on initial render get product images from id
    useEffect(() => {
        axios.get(`${url}/api/products/id/${id}`).then((response) => {
            const res = response.data[0]
            setProduct(res);
            setMainImageUrl(res.productimgurl);
            if (res.quantity == 0){
                setOutOfStock(true);
            }
        }).catch((err) => {
            console.log(err)
        });
    }, []);


    //function to close snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAdd(false);
        setOpenErr(false);
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

    //add item to db cart
    const AddToCartBackend = (body) => {
        axios.post(`${url}/api/cart/add`, body).then((response) => {
            setOpenAdd(true)
        }).catch((err) => {
            setOpenErr(true);
        });
    }

    //add item to local storage cart
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

    //if user is authenticated add item to db cart else add it to local storage
    const AddToCart = () => {
        const isAuth = localStorage.getItem('isAuth');
        const email = localStorage.getItem('email')

        let body = {
            email: email,
            productid: id,
            quantity: quantity,
        }

        if (isAuth) {
            AddToCartBackend(body);
        } else {
            AddToCartFrontend(body);
        }
    }

    //helper function to set main image on hover
    const onImageHover = url => () => {
        if (url != undefined && url != null) {
            setMainImageUrl(url)

        }
    }

    //if images exist in db and are sent in render a component for them
    const Image1 = () => {
        if (product.url1 != null && product.url1 != '') {
            return (
                <img className="product__imagesmall" src={product.url1} onMouseDown={onImageHover(product.url1)} alt="additional product image1"></img>
            )
        }
    }

    const Image2 = () => {
        if (product.url2 != null && product.url2 != '') {
            return (
                <img className="product__imagesmall" src={product.url2} alt="additional product image2" onMouseDown={onImageHover(product.url2)}></img>
            )
        }
    }

    const Image3 = () => {
        if (product.url3 != null && product.url3 != '') {
            return (
                <img className="product__imagesmall" src={product.url3} alt="additional product image3" onMouseDown={onImageHover(product.url3)}></img>
            )
        }
    }

    const Image4 = () => {
        if (product.url4 != null && product.url4 != '') {
            return (
                <img className="product__imagesmall" src={product.url4} alt="additional product image4" onMouseDown={onImageHover(product.url4)}></img>
            )
        }
    }

    const Image5 = () => {
        if (product.url5 != null && product.url5 != '') {
            return (
                <img className="product__imagesmall" src={product.url5} alt="additional product image5" onMouseDown={onImageHover(product.url5)}></img>
            )
        }
    }

    //function to update quantity from dropdown
    const updateQuantity = (quantity) => {
        setQuantity(quantity);
    }

    //helper function to route
    const routeToShop = () => {
        navigate('/shop');
    }

    const NavigateCart = () => {
        navigate('/cart')
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
        <div className="product">
            <Navbar></Navbar>
            <NavbarMobile></NavbarMobile>
            <div className="product__header">
                <strong onClick={routeToShop} className='product__headerbold'>Shop</strong> / {product?.title}
            </div>
            <div className="product__body">
                <div className="product__imagegallery">
                    <img id="mainimage" src={mainImageUrl} className="product__mainimage" alt="main image of product" />
                    <div className="product__imagegrid">
                        <img className="product__imagesmall" src={product?.productimgurl} alt="" onMouseDown={onImageHover(product?.productimgurl)} ></img>
                        <Image1></Image1>
                        <Image2></Image2>
                        <Image3></Image3>
                        <Image4></Image4>
                        <Image5></Image5>
                    </div>
                   {!isMobile && <div className="product__description">
                        {product?.productdesc}
                    </div>}
                </div>
                <div className="product__information">
                    <div className="product__titleinfo">
                        <div className="product__title">
                            {product.title}
                        </div>
                        <div className="product__serialno">
                            {product.serialno}
                        </div>
                        <div className="product__price">
                            ${product.price}
                        </div>
                    </div>
                    <div className="custominfo">
                        <div className="custominfo__color">
                            Color
                            <ColorPicker color={product.color}></ColorPicker>
                        </div>
                        <div className="custominfo__quantity">
                            Quantity
                            <div>
                                {!outOfStock && <QuantityDropdown quantity={product.quantity} update={updateQuantity} ></QuantityDropdown>}
                                {outOfStock && <p className='outofstock'>  This item is currently out of stock.</p>}
                            </div>
                        </div>
                    </div>
                    <div className="product__buttons">
                        <button disabled={outOfStock} className="product__buttonsstyle product__addtocart" onClick={AddToCart}>
                            Add to Cart
                        </button>
                        <button className="product__buttonsstyle product__buynow" onClick={(e) => ModalOpenHelper(e)}>
                            Buy Now
                        </button>
                        {isMobile && <div className="product__description">
                        {product?.productdesc}
                    </div>}
                    </div>
                    <ProductMoreInfo product={product}></ProductMoreInfo>
                </div>
            </div>

            <Modal>
                <ComingSoon closeModal={ModalCloseHelper}></ComingSoon>
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
