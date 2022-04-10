import React, { useState, useEffect } from 'react'
import '../Styles/Home.scss';
import axios from 'axios';
import ProductBox from '../Components/ProductBox';

export const Home = () => {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/products/bestsellers`).then((response) => {
      setBestSellers(response.data);
    }).catch((err) => { 
      console.log(error)
    });
  }, []);

  const BestSellers = () => {
    return (
      bestSellers.map((data) => {
        return (
          <div key={data.id}>
            <ProductBox title={data.title} url={data.productimgurl} price={data.price}/>
          </div>
        );
      })
    )
  }

  return (
    <div>
      {/*Header image for newest collection */}
      <div className="shopnew">
        <div className="shopnew__parallax">
          <div className='shopnew__overlay'>
            <p className="shopnew__newcollection">
              Spring Collection
            </p>
            <button className="shopnew__shopnow">
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
        <div className="shopfromhome__fashion">
          <img src="https://sarahgracedesignsbucket.s3.amazonaws.com/PinkBucketHatHome.jpg" alt="" className="shopfromhome__img" />
          <div className="shopfromhome__text">
            Fashion
          </div>
        </div>
        <div className="shopfromhome__home">
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