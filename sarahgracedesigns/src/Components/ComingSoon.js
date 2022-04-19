import React from 'react';
import '../Styles/ComingSoon.scss';;

export default function ComingSoon(props) {
    const Close = () => {
        props.closeModal();
    }
    return (
        <div className="comingsoon">
            <div><strong>Coming Soon!</strong></div>
            <div>We are working hard to develop this page</div>
            <div onClick={Close} className="comingsoon__button">Got it</div>
        </div>
    )
}
