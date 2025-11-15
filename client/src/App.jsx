import { useState } from 'react'
import './App.css'
import Layout from './components/Layout/Layout'
import HomePage from "./pages/HomePage.jsx"
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Auth/Register.jsx'
import Login from './pages/Auth/Login.jsx'
import ScrollToTop from './components/ScrollBehaviour/ScrollToTop.jsx'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ShopPage from './pages/Shop.jsx'
import CartPage from './pages/Cart.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import OrderSuccessPage from './pages/OrderSuccess.jsx'
import OrderDetailsPage from './pages/Order.jsx'
import OrdersListPage from './pages/OrderList.jsx'
import AccountDashboard from './pages/AccountDashboard.jsx'
import AddressPage from './pages/AddressPage.jsx'
import EditAddressPage from './pages/EditAddress.jsx'
import AboutPage from './pages/About.jsx'
import Bouquet from './pages/category/Bouquet.jsx'
import SingleStem from './pages/category/SingleStem.jsx'
import GiftSet from './pages/category/GiftSet.jsx'
import AddAddressPage from './pages/AddShippingDetails.jsx'
import ForgotPassword from './pages/Auth/ForgotPassword.jsx'
import ResetPassword from './pages/Auth/ResetPassword.jsx'
import  { Toaster } from 'react-hot-toast';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }, [pathname]);

  return (
      <>
      <Layout>
          <Toaster />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/forgot-password' element ={<ForgotPassword/>} />
          <Route path='reset-password' element ={<ResetPassword/>} />
          <Route path='/shop' element={<ShopPage/>} />
          <Route path='/cart' element={<CartPage/>} />
          <Route path='/about' element={<AboutPage/>} />
          <Route path='/bouquets' element={<Bouquet/>} />
          <Route path='/stems' element={<SingleStem/>} />
          <Route path='/gifts' element={<GiftSet/>} />
          <Route path ="/register" element={<Register/>} />
          <Route path ="/login" element={<Login/>} />
          <Route path ='/checkout' element ={<CheckoutPage/>} />
          <Route path = '/product/:id' element ={<ProductPage/>} />
          <Route path="/order-success/:id" element={<OrderSuccessPage />} />
          <Route path='/order/:id' element ={<OrderDetailsPage/>} />
          <Route path='/orders' element ={<OrdersListPage/>} />
          <Route path='/account' element ={<AccountDashboard/>} />
          <Route path='/address' element ={<AddressPage/>} />
          <Route path="/address/edit" element ={<EditAddressPage/>} />
          <Route path="/address/add" element ={<AddAddressPage/>} />
        </Routes>
      </Layout>
      </>
  )
}

export default App
