import React from 'react';
import '../Styles/ProductPage.scss';

export default function ProductMoreInfo() {
    return (
        <div className='moreinfo'>
            <div className='moreinfo__accordian'>Shipping Information</div>
            <div className='moreinfo__open'>
                This is some shipping information
            </div>

            <div className='moreinfo__accordian'>Product Information</div>
            <div>

            </div>

            <div className='moreinfo__accordian'>Returns and Exchanges</div>
            <div>

            </div>
        </div>
    )
}
