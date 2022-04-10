import React from 'react';
import '../Styles/BlackButton.scss';

export default function BlackButton(props) {
  return (
    <div className="blackbutton">
        <div className="blackbutton__text">
            {props.text}
        </div>
    </div>
  )
}
