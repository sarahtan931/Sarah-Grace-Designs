import React, { useState, useEffect } from 'react'
import '../Styles/Home.scss';
import axios from 'axios';
import ProductBox from '../Components/ProductBox';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import NavbarMobile from '../Components/NavbarMobile';
import Footer from '../Components/Footer';

export const Home = (props) => {
  const [bestSellers, setBestSellers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/products/category/bestsellers`).then((response) => {
      setBestSellers(response.data);
      console.log(response.data)
    }).catch((err) => {
      console.log(error)
    });
  }, []);

  const BestSellers = () => {
    return (
      bestSellers.map((data) => {
        return (
          <div key={data.productid}>
            <ProductBox title={data.title} url={data.productimgurl} price={data.price} id={data.productid} serialNo={data.serialno} quantity={data.quantity} productimgurlhover={data.productimgurlhover} />
          </div>
        );
      })
    )
  }

  const navigateShop = () => {
    navigate('/shop')
  }

  const navigateFashion = () => {
    navigate('/shop/fashion');
  }

  const navigateHome = () => {
    navigate('/shop/home');
  }


  return (
    <div>
      <Navbar></Navbar>
      <NavbarMobile></NavbarMobile>
      {/*Header image for newest collection */}
      <div className="shopnew">
        <div className="shopnew__parallax">
          <div className='shopnew__overlay'>
            <p className="shopnew__newcollection">
              Spring Collection
            </p>
            <button className="shopnew__shopnow" onClick={navigateShop}>
              <span className="shopnew_buttontext">
                Shop Now
              </span>
            </button>
          </div>
        </div>
        <div className="shopnew__slogan"> Handmade Designs - Made With Love</div>
      </div>

      {/*Images to go to the shop page */}
      <div className="shopfromhome">
        <div className="shopfromhome__fashion" onClick={navigateFashion}>
          <img src="https://sarahgracedesignsbucket.s3.amazonaws.com/PinkBucketHatHome.jpg" alt="" className="shopfromhome__img" />
          <div className="shopfromhome__text">
            Fashion
          </div>
        </div>
        <div className="shopfromhome__home" onClick={navigateHome}>
          <img src="https://sarahgracedesignsbucket.s3.amazonaws.com/CoastersHome.jpg" alt="" className="shopfromhome__img" />
          <div className="shopfromhome__text">
            Home
          </div>
        </div>
      </div>

      {/*Best Sellers */}
      <div className="bestsellers">
        <p className="bestsellers__title">
          Best Sellers
        </p>
        <div className="bestsellers__productsbox">
          <BestSellers></BestSellers>
        </div>
      </div>
    </div>
  )
}

export default Home;