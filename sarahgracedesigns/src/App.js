// App.js
import React from 'react';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from './Components/Navbar';
import NavbarMobile from './Components/NavbarMobile';
import Shop from './Pages/Shop';
import Home from './Pages/Home';
import ProductPage from './Pages/ProductPage';
import Footer from './Components/Footer';

const App = () => (
  <Router>
      <Navbar></Navbar>
      <NavbarMobile></NavbarMobile>
    <Routes>
      <Route exact path="/" element={<Home></Home>} />
      <Route path="/shop" element={<Shop></Shop>} />
      <Route path="/shop/fashion" element={<Shop category={"fashion"}></Shop>} />
      <Route path="/shop/home" element={<Shop category={"home"}></Shop>} />
      <Route path="/product/:id" element={<ProductPage></ProductPage>}></Route>
    </Routes>
    <Footer></Footer>
  </Router>
)

export default App;