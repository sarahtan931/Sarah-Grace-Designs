import React, {useState} from 'react';
import '../Styles/Dropdown.scss';

export default function BrowseDropdown(props) {
    const [selectedValue, setSelectedValue] = useState("");
    const Options = () => {
       
        return (
            ["All", "New","Best Sellers", "Home", "Accessories", "Crochet", "Beads" ].map((data) => {
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
        <select onChange={(e) => handleChange(e)} value={selectedValue} className="browsedropdown">
            <option value="" disabled hidden></option>
            <Options></Options>
        </select>
    )
}
