import React, { useState } from 'react';
import '../Styles/Dropdown.scss';

export default function SortDropdown(props) {
    const [selectedValue, setSelectedValue] = useState("");

    const Options = () => {
        return (
            ["Low/High", "High/Low"].map((data) => {
                return (
                    <option value={data} key={data}>{data}</option>
                );
            })
        )
    }

    //when user chooses sort value, propagate change
    function handleChange(e) {
        setSelectedValue(e.target.value)
        props.update(e.target.value);
    }

    return (
        <select onChange={(e) => handleChange(e)} value={selectedValue} className="sortdropdown">
            /<option value="" disabled hidden></option>
            <Options></Options>
        </select>
    )
}
