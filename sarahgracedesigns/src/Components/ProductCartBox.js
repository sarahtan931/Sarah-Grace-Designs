import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import QuantityDropdown from './QuantityDropdown';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import configdata from '../config.json';

export default function ProductCartBox(props) {
    const [quantity, setQuantity] = useState(props.quantity);
    const title = props.title;
    const imageurl = props.url;
    const price = props.price;
    const serialNo = props.serialno;
    const userid = props.userid;
    const productid = props.productid;
    const email = localStorage.getItem('email');
    const url = configdata.url;
    const navigate = useNavigate();

    //if user is authenticated update quantity in db, if not update local storage quantity
    const updateQuantity = (newQuantity) => {
        let body = {
            userid: userid,
            productid: productid,
            quantity: parseInt(newQuantity),
        }

        const isAuth = localStorage.getItem('isAuth');
        if (isAuth) {
            UpdateQuantityBackend(body);
        } else {
            UpdateQuantityFrontend(body)

        }
    }

    //if user is authenticated removed item in db, if not update local storage
    const RemoveItem = () => {
        const isAuth = localStorage.getItem('isAuth');
        if (isAuth) {
            RemoveItemBackend();
        } else {
            RemoveItemFrontend();
        }
    }

    //helper function to find and update quantity of product in local storage
    const UpdateQuantityFrontend = (body) => {
        let cartItemIdsString = localStorage.getItem('cartItemIds');
        let cartItemIdsArr = []
        if (cartItemIdsString != null) {
            cartItemIdsArr = JSON.parse(cartItemIdsString);
        }

        let found = cartItemIdsArr.find(x => x.productid == body.productid);
        if (found) {
            let index = cartItemIdsArr.indexOf(found);
            cartItemIdsArr[index].quantity = parseInt(body.quantity);
        }
        let newCartItemIdsString = JSON.stringify(cartItemIdsArr);
        localStorage.setItem('cartItemIds', newCartItemIdsString);
        props.updateTotal();
    }

    //helper function to update quantity in db
    const UpdateQuantityBackend = (body) => {
        axios.post(`${url}/api/cart/add`, body).then((response) => {
            setQuantity(quantity);
            props.updateTotal();
        }).catch((err) => {
            console.log(err)
        });
    }

    //helper function to remove item in local storage
    const RemoveItemFrontend = () => {
        let cartItemIdsString = localStorage.getItem('cartItemIds');
        let cartItemIdsArr = []
        if (cartItemIdsString != null) {
            cartItemIdsArr = JSON.parse(cartItemIdsString);
        }

        let found = cartItemIdsArr.find(x => x.productid == productid);
        if (found) {
            let index = cartItemIdsArr.indexOf(found);
            if (index > -1) {
                cartItemIdsArr.splice(index, 1)
            }
        }
        let newCartItemIdsString = JSON.stringify(cartItemIdsArr);
        localStorage.setItem('cartItemIds', newCartItemIdsString);
        props.updateTotal();
    }

    //helper function to remove item in db
    const RemoveItemBackend = () => {
        axios.delete(`${url}/api/cart/remove/${productid}/${email}`).then((response) => {
            props.updateTotal();
        }).catch((err) => {
            console.log(err)
        });
    }

    //helper function to navigate
    const NavigateProduct = () => {
        navigate(`/product/${productid}`)
    }

    return (
        <div className='cartitem'>
            <div className="cartbox">
                <img src={imageurl} alt="Product Image" className="cartbox__img" onClick={NavigateProduct} />
            </div>
            <div className='cartbox2'>
                <p className="cartitem__name">Sarah Grace Designs</p>
                <p className="cartitem__title">{title}</p>
                <p className="cartitem__price">${price}</p>

                <div className="mobilecartitem">
                    <div className="cartitem__quantity"> Quantity: <QuantityDropdown size="small" initial={quantity} update={updateQuantity}></QuantityDropdown>  </div>
                    <p className="cartitem__quantity"> Size: One Size </p>

                </div>

                <p className="cartitem__serial">{serialNo}</p>

            </div>
            <div className='cartbox3'>
                <div className="cartitem__quantity"> Quantity: <QuantityDropdown size="small" initial={quantity} update={updateQuantity}></QuantityDropdown>  </div>
                <p className="cartitem__quantity"> Size: One Size </p>
            </div>
            <div className="cartitem__remove">
                <FontAwesomeIcon icon={faXmark} className="cartitem__removeicon" onClick={RemoveItem}></FontAwesomeIcon>
            </div>
        </div>
    )
}
