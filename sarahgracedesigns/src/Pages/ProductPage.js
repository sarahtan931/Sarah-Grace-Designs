import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import '../Styles/ProductPage.scss';
import Select from "react-dropdown-select";
import QuantityDropdown from '../Components/QuantityDropdown';
import ProductMoreInfo from '../Components/ProductMoreInfo';

export default function ProductPage(props) {
    const { id } = useParams()
    const [product, setProduct] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/products/id/${id}`).then((response) => {
            const res = response.data[0]
            setProduct(res);
        }).catch((err) => {
            console.log(err)
        });
    }, []);

    const Image1 = () => {
        if (product.url1 != null && product.url1 != '') {
            return (
                <img className="product__imagesmall" src={product.url1} alt=""></img>
            )
        }
    }

    const Image2 = () => {
        if (product.url2 != null && product.url2 != '') {
            return (
                <img className="product__imagesmall" src={product.url2} alt=""></img>
            )
        }
    }

    return (
        <div className="product">
            <div className="product__header">
                <strong className='product__headerbold'>Shop</strong> / {product?.title}
            </div>
            <div className="product__body">
                <div className="product__imagegallery">
                    <img src={product?.productimgurl} className="product__mainimage" alt="" />
                    <div className="product__imagegrid">
                        <img className="product__imagesmall" src={product?.productimgurl} alt=""></img>
                        <Image1></Image1>
                        <Image2></Image2>
                    </div>
                    <div className="product__description">
                        {product.productdesc}
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
                            <div>
                                <div className="custominfo__colorphoto">
                                </div>
                                <div className="custominfo__colorphoto">
                                </div>
                            </div>
                        </div>
                        <div className="custominfo__quantity">
                            Quantity
                            <div>
                                <QuantityDropdown quantity={product.quantity}></QuantityDropdown>
                            </div>
                        </div>
                    </div>
                    <div className="product__buttons">
                        <div className="product__buttonsstyle product__addtocart">
                            Add to Cart
                        </div>
                        <div className="product__buttonsstyle product__buynow">
                            Buy Now
                        </div>
                    </div>
                    <ProductMoreInfo></ProductMoreInfo>
                </div>
            </div>
        </div>
    )
}
