import React, { useEffect, useState } from 'react';

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/admin/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    const updated = orders.map(o => o._id === id ? { ...o, status } : o);
    setOrders(updated);
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      {orders.map(order => (
        <div key={order._id} className="card">
          <p>User: {order.userId?.email}</p>
          <p>Total: ${order.total}</p>
          <p>Status: {order.status}</p>
          <select value={order.status} onChange={e => updateStatus(order._id, e.target.value)}>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;