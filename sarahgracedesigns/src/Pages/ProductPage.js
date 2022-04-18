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

export default function ProductPage(props) {
    const { id } = useParams()
    const [product, setProduct] = useState([]);
    const [mainImageUrl, setMainImageUrl] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [openAdd, setOpenAdd] = useState(false);
    const [openErr, setOpenErr] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/products/id/${id}`).then((response) => {
            const res = response.data[0]
            setProduct(res);
            setMainImageUrl(res.productimgurl)
        }).catch((err) => {
            console.log(err)
        });
    }, []);


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


    const AddToCart = () => {
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

    const onImageHover = url => () => {
        if (url != undefined && url != null) {
            setMainImageUrl(url)

        }
    }

    const Image1 = () => {
        if (product.url1 != null && product.url1 != '') {
            return (
                <img className="product__imagesmall" src={product.url1} onMouseDown={onImageHover(product.url1)} alt=""></img>
            )
        }
    }

    const Image2 = () => {
        if (product.url2 != null && product.url2 != '') {
            return (
                <img className="product__imagesmall" src={product.url2} alt="" onMouseDown={onImageHover(product.url2)}></img>
            )
        }
    }

    const Image3 = () => {
        if (product.url3 != null && product.url3 != '') {
            return (
                <img className="product__imagesmall" src={product.url3} alt="" onMouseDown={onImageHover(product.url3)}></img>
            )
        }
    }

    const Image4 = () => {
        if (product.url4 != null && product.url4 != '') {
            return (
                <img className="product__imagesmall" src={product.url4} alt="" onMouseDown={onImageHover(product.url4)}></img>
            )
        }
    }

    const Image5 = () => {
        if (product.url5 != null && product.url5 != '') {
            return (
                <img className="product__imagesmall" src={product.url5} alt="" onMouseDown={onImageHover(product.url5)}></img>
            )
        }
    }

    const updateQuantity = (quantity) => {
        setQuantity(quantity)
    }

    const routeToShop = () => {
        navigate('/shop');
    }

    const NavigateCart = () => {
        navigate('/cart')
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
                    <img id="mainimage" src={mainImageUrl} className="product__mainimage" alt="" />
                    <div className="product__imagegrid">
                        <img className="product__imagesmall" src={product?.productimgurl} alt="" onMouseDown={onImageHover(product?.productimgurl)} ></img>
                        <Image1></Image1>
                        <Image2></Image2>
                        <Image3></Image3>
                        <Image4></Image4>
                        <Image5></Image5>
                    </div>
                    <div className="product__description">
                        {product?.productdesc}
                    </div>
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
                                <QuantityDropdown quantity={product.quantity} update={updateQuantity} ></QuantityDropdown>
                            </div>
                        </div>
                    </div>
                    <div className="product__buttons">
                        <div className="product__buttonsstyle product__addtocart" onClick={AddToCart}>
                            Add to Cart
                        </div>
                        <div className="product__buttonsstyle product__buynow">
                            Buy Now
                        </div>
                    </div>
                    <ProductMoreInfo></ProductMoreInfo>
                </div>
            </div>

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
