import React, { useState, useEffect } from 'react'
import '../Styles/Shop.scss';
import axios from 'axios';
import ProductBox from '../Components/ProductBox';

export default function Shop(props) {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    if (true) {
      axios.get(`http://localhost:8080/api/products`).then((response) => {
        setProducts(response.data);
      }).catch((err) => {
        console.log(err)
      });
    }
  }, []);

  const getProducts = category => () => {
    axios.get(`http://localhost:8080/api/products/${category}`).then((response) => {
      setProducts(response.data);
    }).catch((err) => { 
      console.log(err)
    });
  }

  const Products = () => {
    return (
      products.map((data) => {
        return (
          <div key={data.id}>
            <ProductBox title={data.title} url={data.productimgurl} price={data.price} id={data.id} />
          </div>
        );
      })
    )
  }


  return (
    <div className='shop'>
      <div className="shop__logo"> Handmade Designs - Made With Love</div>
      <div className="shop__header">
        <div className='shop__headertitle'>Browse By</div>
        <div className='shop__headertitle shop__headertitlemiddle'>All</div>
        <div className='shop__headertitle shop__headertitleright'>Sort</div>
      </div>
      <div className='shop__body'>
        <div className="shop__categorys">
          <ul>
            <li onClick={getProducts('')}>All</li>
            <li onClick={getProducts('bestsellers')}>Best Sellers</li>
            <li>New Collection</li>
            <li>Home</li>
            <li>Accessories</li>
            <li>Crochet</li>
            <li>Beads</li>
          </ul>
        </div>
        <div className="shop__products">
          <Products></Products>
        </div>
      </div>
    </div>
  )
}
