import React from 'react';
import '../Styles/ProductBox.scss';
import BlackButton from './BlackButton';
import {useNavigate} from 'react-router-dom';

export default function ProductBox(props) {
    const navigate = useNavigate();

    const ImageHover = () => {
        document.getElementById(props.id).src = "https://sarahgracedesignsbucket.s3.amazonaws.com/Products/GreenBucketHat/GreenBucketHat.jpg";
      }

      const NoImageHover = () => {
        document.getElementById(props.id).src = props.url;
      }

      const QuickView = () => {
          console.log('going to quick view')
      }

      const ProductPage = () => {
        console.log('sending', props.id)
        navigate(`/product/${props.id}`)
      }

    return (
        <div className='productbox' >
            <div className="productbox__img" onMouseOver={ImageHover} onMouseLeave={NoImageHover} onClick={ProductPage}>
                <img src={props.url} alt="" id={props.id} />
                <div className="productbox__view" onClick={QuickView}>
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

        </div>
    )
}
