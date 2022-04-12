import React, { useEffect } from 'react'

export default function ColorPicker(props) {
    return (
        <div>
            <div className="custominfo__colorphoto" id="color" style={{  backgroundColor: props.color }}>
            </div>
        </div>
    )
}
