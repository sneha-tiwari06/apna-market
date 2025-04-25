import React, { useEffect, useState } from 'react';

function Orders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:5000/api/orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div className="container">
      <h2>My Orders</h2>
      {orders.map(order => (
        <div key={order._id} className="card">
          <p>Total: ${order.total}</p>
          <p>Status: {order.status}</p>
          <p>Items:</p>
          <ul>
            {order.items.map((item, i) => (
              <li key={i}>{item.productId?.title} x {item.quantity}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Orders;