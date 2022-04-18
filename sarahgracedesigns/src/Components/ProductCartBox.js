import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark} from '@fortawesome/free-solid-svg-icons';
import QuantityDropdown from './QuantityDropdown';
import axios from 'axios';

export default function ProductCartBox(props) {
    const [quantity, setQuantity] = useState(props.quantity);
    const title = props.title;
    const url = props.url;
    const price = props.price;
    const serialNo = props.serialno;
    const userid = props.userid;
    const productid = props.productid;

    
    const updateQuantity = (newQuantity) => {
        let body = {
            userid: userid,
            productid: productid,
            quantity: parseInt(newQuantity),
        }
        
        axios.post(`http://localhost:8080/api/cart/add`, body).then((response) => {
            setQuantity(newQuantity);
            props.updateTotal();
        }).catch((err) => {
            console.log(err)
        });
     }

    return (
        <div className='cartitem'>
            <div className="cartbox">
                <img src={url} alt="" className="cartbox__img" />
            </div>
            <div>
                <p className="cartitem__name">Sarah Grace Designs</p>
                <p className="cartitem__title">{title}</p>
                <p className="cartitem__price">${price}</p>
                <p className="cartitem__serial">{serialNo}</p>
            </div>
            <div>
                <div className="cartitem__quantity"> Quantity: <QuantityDropdown size="small" initial={quantity} update={updateQuantity}></QuantityDropdown>  </div>
                <p className="cartitem__quantity"> Size: One Size </p>
            </div>
            <div className="cartitem__remove">
                <FontAwesomeIcon icon={faXmark} className="cartitem__removeicon"></FontAwesomeIcon>
            </div>
        </div>
    )
}
