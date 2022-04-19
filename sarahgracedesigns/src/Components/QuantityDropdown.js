import React, { useState, useEffect } from 'react';
import '../Styles/Dropdown.scss';

export default function QuantityDropdown(props) {
  const [selectedValue, setSelectedValue] = useState(1);
  const [size, setSize] = useState('quantitydropdown');

  useEffect(() => {
    if (props.size == "small") {
      setSize('quantitydropdownsmall')
    }

    if (props.initial) {
      setSelectedValue(props.initial)
    }
  }, []);



  const Options = () => {
    let options = props.quantity + 2;
    if (props.quantity == undefined) {
      options = 10;
    }

    let array = Array.from(Array(options).keys());
    return (
      array.map((data) => {
        if (data!= 0){
          return (
            <option value={data} key={data}>{data}</option>
          );
        }
      })
    )
  }

  function handleChange(e) {
    setSelectedValue(e.target.value)
    props.update(e.target.value);
  }

  return (
    <div className={size}>
      <select onChange={(e) => handleChange(e)} value={selectedValue} className={size}>
        <Options></Options>
      </select>
    </div>
  )
}
