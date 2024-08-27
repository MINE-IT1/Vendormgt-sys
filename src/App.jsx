// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import AuthLayout from "./components/AuthLayout";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import { CartProvider } from "./components/CartContext";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import SelectAD from "./pages/SelectAD";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Ordertracking from "./pages/Ordertracking";
import SignIn from "./profile/SignIn";
import Register from "./profile/Register";
import { AuthProvider, useAuth } from "./components/AuthContext"; // Correct path to AuthContext
import Home from "./pages/Home";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <CartProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={
              <AuthLayout>
                <SignIn />
              </AuthLayout>
            } />
            <Route path="/register" element={
              <AuthLayout>
                <Register />
              </AuthLayout>
            } />
            <Route path="/*" element={
              <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <Routes>
                  <Route path="home" element={<Home />} />
                  <Route path="products" element={<Products />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="select-address" element={<SelectAD />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="payment" element={<Payment />} />
                  <Route path="orders" element={<Ordertracking />} />
                  <Route path="product/:product_id" element={<ProductDetail />} />
                </Routes>
              </MainLayout>
            } />
          </Routes>
        </AuthProvider>
      </Router>
    </CartProvider>
  );
};

export default App;
