import React, { useState, useEffect } from 'react'
import '../Styles/Shop.scss';
import axios from 'axios';
import ProductBox from '../Components/ProductBox';
import SortDropdown from '../Components/SortDropdown';
import Navbar from '../Components/Navbar';
import NavbarMobile from '../Components/NavbarMobile';
import configdata from '../config.json';
import BrowseDropdown from '../Components/BrowseDropdown';

export default function Shop(props) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const url = configdata.url;
  const dict = {
    "All": undefined,
    "New": "new",
    "Best Sellers": "bestsellers",
    "Home": "home", 
    "Accessories": "accessories",
    "Crochet": "crochet",
    "Beads": "beads"
  }
 
  //on initial render
  useEffect(() => {
    //if category is specified search for products by category
    if (props.category != null && props.category != "") {
      setCategory(props.title);
      axios.get(`${url}/api/products/category/${props.category}`).then((response) => {
        setProducts(response.data);
      }).catch((err) => {
        console.log(err)
      });
    }

    //if category is not specifed search for all products
    if (props.category == null) {
      axios.get(`${url}/api/products`).then((response) => {
        let products = response.data;
        products.forEach(product => {
          product['productid'] = product.id})
        setProducts(products);
      }).catch((err) => {
        console.log(err)
      });
    }
  }, []);

  //function to get products by category and set title
  const getProducts = (category, categorytitle) => () => {
    var getUrl = `${url}/api/products/category/${category}`;
    setCategory(categorytitle);

    if (category == '') {
      getUrl = `${url}/api/products`
    }

    axios.get(getUrl).then((response) => {
      setProducts(response.data);
    }).catch((err) => {
      console.log(err)
    });
  }

  //helper function to return a product box for each product
  const Products = () => {
    return (
      products.map((data) => {
        return (
          <div key={data.id}>
            <ProductBox title={data.title} url={data.productimgurl} price={data.price} id={data.productid} serialno={data.serialno} quantity={data.quantity} productimgurlhover={data.productimgurlhover} />
          </div>
        );
      })
    )
  }

  //function to sort products
  const updateSort = (sort) => {
    if (sort == "Low/High") {
      const lowtohigh = products.sort((a, b) => a.price - b.price);
      setProducts([...lowtohigh]);
    } else {
      const hightolow = products.sort((a, b) => b.price - a.price);
      setProducts([...hightolow]);
    }
  }

  const updateFilter = (filter) => {
    console.log('getting with', dict[filter], filter)
    const filterEndpoint = dict[filter];
    getProducts(filterEndpoint, filter);

    var getUrl = `${url}/api/products/category/${filterEndpoint}`;
    setCategory(filter);

    if (filterEndpoint == undefined) {
      getUrl = `${url}/api/products`
    }

    axios.get(getUrl).then((response) => {
      setProducts(response.data);
    }).catch((err) => {
      console.log(err)
    });
  }

  return (
    <div className='shop'>
      <Navbar></Navbar>
      <NavbarMobile></NavbarMobile>
      <div className="shop__logo"> Handmade Designs - Made With Love</div>
      <div className="shop__mobiletitle">{category}</div>
      <div className="shop__header">
        <div className='shop__headertitle'>Browse By
         <BrowseDropdown update={updateFilter}></BrowseDropdown>
        </div>
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
