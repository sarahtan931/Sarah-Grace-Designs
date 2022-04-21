import React, {useState} from 'react';
import '../Styles/BlackButton.scss';

export default function BlackButton(props) {
  
  return (
    <button className="blackbutton" disabled={props.disabled}>
        <div className="blackbutton__text">
            {props.text}
        </div>
    </button>
  )
}
