import React from 'react'

export default function QuantityDropdown(props) {

    const Options = () => {
        let options = props.quantity + 1;
        options = 5;
        let array = Array.from(Array(options).keys());
        console.log('test',array, props.quantity)
        return (
          array.map((data) => {
            return (
              <option value={data} key={data}>{data}</option>
            );
          })
        )
      }

    return (
        <div>
            <select>
                <Options></Options>
            </select>
        </div>
    )
}
