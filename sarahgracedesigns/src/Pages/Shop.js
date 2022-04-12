import React, { useState, useEffect } from 'react'
import '../Styles/Shop.scss';
import axios from 'axios';
import ProductBox from '../Components/ProductBox';
import SortDropdown from '../Components/SortDropdown';


export default function Shop(props) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (props.category != null && props.category == "fashion") {
      setCategory("Fashion");
      axios.get(`http://localhost:8080/api/products/category/accessories`).then((response) => {
        setProducts(response.data);
      }).catch((err) => {
        console.log(err)
      });
    }

    if (props.category != null && props.category == "home") {
      setCategory("Home Decor");
      axios.get(`http://localhost:8080/api/products/category/home`).then((response) => {
        setProducts(response.data);
      }).catch((err) => {
        console.log(err)
      });
    }

    if (props.category == null) {
      axios.get(`http://localhost:8080/api/products`).then((response) => {
        setProducts(response.data);
      }).catch((err) => {
        console.log(err)
      });
    }
  }, []);

  const getProducts = (category, categorytitle) => () => {
    var url = `http://localhost:8080/api/products/category/${category}`;
    setCategory(categorytitle);

    if (category == '') {
      url = `http://localhost:8080/api/products`
    }

    axios.get(url).then((response) => {
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
            <ProductBox title={data.title} url={data.productimgurl} price={data.price} id={data.id} serialno={data.serialno} quantity={data.quantity} productimgurlhover={data.productimgurlhover} />
          </div>
        );
      })
    )
  }

  const updateSort = (sort) => {
    if (sort == "Low/High") {
      const lowtohigh = products.sort((a, b) => a.price - b.price);
      setProducts([...lowtohigh]);
    } else {
      const hightolow = products.sort((a, b) => b.price - a.price);
      setProducts([...hightolow]);
    }
  }


  return (
    <div className='shop'>
      <div className="shop__logo"> Handmade Designs - Made With Love</div>
      <div className="shop__header">
        <div className='shop__headertitle'>Browse By</div>
        <div className='shop__headertitle shop__headertitlemiddle'>{category}</div>
        <div className='shop__headertitle shop__headertitleright'>Sort
          <SortDropdown update={updateSort}></SortDropdown>
        </div>
      </div>
      <div className='shop__body'>
        <div className="shop__categorys">
          <ul>
            <li onClick={getProducts('', "All")}>All</li>
            <li onClick={getProducts('new', "New")} >New</li>
            <li onClick={getProducts('bestsellers', "Best Sellers")}>Best Sellers</li>
            <li onClick={getProducts('home', "Home")}>Home</li>
            <li onClick={getProducts('accessories', "Accessories")}>Accessories</li>
            <li onClick={getProducts('crochet', "Crochet")}>Crochet</li>
            <li onClick={getProducts('beads', "Beads")}>Beads</li>
          </ul>
        </div>
        <div className="shop__products">
          <Products></Products>
        </div>
      </div>
    </div>
  )
}
