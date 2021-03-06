// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Shop from './Pages/Shop';
import Home from './Pages/Home';
import ProductPage from './Pages/ProductPage';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import {loadStripe} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

const App = () => (
  <div className='content'>
  <Router>
    <Routes>
      <Route exact path="/" element={<Home></Home>} />

      <Route path="/shop" element={<Shop></Shop>} />
      <Route path="/shop/fashion" element={<Shop category={"accessories"} title={"Fashion"}></Shop>} />
      <Route path="/shop/home" element={<Shop category={"home"} title={"Home"}></Shop>} />
      <Route path="/shop/crochet" element={<Shop category={"crochet"} title={"Crochet"}></Shop>} />
      <Route path="/shop/beads" element={<Shop category={"beads"} title={"Beads"}></Shop>} />
      
      <Route path="/product/:id" element={<ProductPage></ProductPage>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/cart" element={<Cart></Cart>}></Route>
       <Route path="/checkout" element={<Elements stripe={stripePromise}><Checkout></Checkout></Elements>}></Route>
    </Routes>
    <Footer></Footer>
  </Router>
  </div>
)

export default App;