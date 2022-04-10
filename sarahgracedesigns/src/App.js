// App.js
import React from 'react';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from './Components/Navbar';
import NavbarMobile from './Components/NavbarMobile';
import Shop from './Pages/Shop';
import Home from './Pages/Home';
import Footer from './Components/Footer';

const App = () => (
  <Router>
      <Navbar></Navbar>
      <NavbarMobile></NavbarMobile>
    <Routes>
      <Route exact path="/" element={<Home></Home>} />
      <Route path="/shop" element={<Shop></Shop>} />
    </Routes>
    <Footer></Footer>
  </Router>
)

export default App;