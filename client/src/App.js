import './App.css';
import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Signup from "./components/Signup";
import PrivateComponent from './components/PrivateComponent';
import Signin from './components/Signin';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import ProductDetails from "./components/ProductDetails"
import Cart from "./components/Cart";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route element={<PrivateComponent/>}>
        <Route path="/" element={<ProductList/>}/>
        <Route path="/add" element={<AddProduct/>}/>
        <Route exact path="/product/details/:id" element={<ProductDetails/>}/>
        <Route path="/update/:id" element={<h1>update Product</h1>}/>
        <Route path="/profile" element={<h1>Profile componnets </h1>}/>
        <Route path="/logout" element={<h1>logout componnets </h1>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/*" element={<h1>Page not found</h1>}/>



        </Route>
        
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>

      </Routes>
      <Footer/>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
