import React from 'react';
import '../Styles/ProductBox.scss';
import BlackButton from './BlackButton';

export default function ProductBox(props) {
    return (
        <div className='productbox'>
            <div className="productbox__img">
                <div className="productbox__imgnohover">
                    <img src={props.url} alt="" />
                </div>
                <div className="productbox__view">
                        <div className="productbox__viewtext">
                            View More
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
