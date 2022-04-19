import React from 'react';
import '../Styles/ComingSoon.scss';;

export default function ComingSoon(props) {
    const Close = () => {
        props.closeModal();
    }
    return (
        <div className="comingsoon">
            <div><strong>Online Orders are Coming Soon!</strong></div>
            <div>Please Contact Us to place your order</div>
            <div onClick={Close} className="comingsoon__button">Got it</div>
        </div>
    )
}
