import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetails from './pages/productDetails';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import Orders from './pages/orders';
import AdminDashboard from './pages/adminDashboard';
import { getTokenRole } from './utils/auth';

function App() {
  const { token, role } = getTokenRole();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={token ? <Home /> : <Navigate to="/" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={token ? <ProductDetails /> : <Navigate to="/" />} />
      <Route path="/cart" element={token ? <Cart /> : <Navigate to="/" />} />
      <Route path="/checkout" element={token ? <Checkout /> : <Navigate to="/" />} />
      <Route path="/orders" element={token ? <Orders /> : <Navigate to="/" />} />
      <Route path="/admin" element={token && role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
