import React, {useState} from 'react';
import '../Styles/Dropdown.scss';

export default function QuantityDropdown(props) {
    const [selectedValue, setSelectedValue] = useState(0);

    const Options = () => {
        let options = props.quantity + 1;
        if (props.quantity == undefined){
          options = 5

        }
        
        let array = Array.from(Array(options).keys());
        return (
          array.map((data) => {
            return (
              <option value={data} key={data}>{data}</option>
            );
          })
        )
      }

      function handleChange(e) {
        setSelectedValue(e.target.value)
        props.update(e.target.value);
      }

    return (
        <div>
            <select onChange={(e) => handleChange(e)} value={selectedValue} className="quantitydropdown">
                <Options></Options>
            </select>
        </div>
    )
}
