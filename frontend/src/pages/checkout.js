import React from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const placeOrder = async () => {
    const res = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      alert('Order placed');
      navigate('/orders');
    } else {
      alert('Order failed');
    }
  };

  return (
    <div className="container">
      <h2>Checkout</h2>
      <button onClick={placeOrder}>Confirm Order</button>
    </div>
  );
}

export default Checkout;