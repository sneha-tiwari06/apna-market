import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';

function Cart() {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem('token');

  const fetchCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      const productIds = data.map(item => item.productId);
      const productResponse = await fetch(`https://dummyjson.com/products?ids=${productIds.join(',')}`);
      const productData = await productResponse.json();

      const enrichedCart = data.map(item => {
        const product = productData.products.find(p => p.id === item.productId);
        return {
          ...item,
          title: product?.title || 'Unknown Product',
          price: product?.price || 0,
          thumbnail: product?.thumbnail || '',
        };
      });

      setCart(enrichedCart);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (itemId) => {
    await fetch(`http://localhost:5000/api/cart/${itemId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCart();
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal;

  return (
    <div>
      <main>
        <Navbar />
        <div className="w-100 padding pt-3">
          <div className="container">
            <div className="form-row gap-form-row">
              <div className="col-lg-12">
                <h6 className="yourCartCount mb-0">
                  Your shopping cart has{' '}
                  <span className="text-primary">{cart.length}</span> items
                </h6>
              </div>

              <div className="col-lg-9 orderCard">
                {cart.map((item) => (
                  <div className="card mb-3" key={item._id}>
                    <div className="card-body">
                      <div className="row gap-row">
                        <div className="col-sm-8 orderedProduct d-flex">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }}
                          />
                          <div className="orderedProductDetail wishlistDetail">
                            <span className="badge bg-secondary-light text-secondary">Product</span>
                            <p className="mb-0"><strong>{item.title}</strong></p>
                            <div className="orderedBoxButton mt-3">
                              <button onClick={() => removeItem(item._id)} className="button stroke">
                                <i className="fa fa-trash"></i> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-4 cartBox-price text-sm-right">
                          <div className="proBox-price">
                            <div className="font-weight-bolder h3 mb-0 text-secondary">₹{item.price}</div>
                            <small className="text-muted d-block">Qty: {item.quantity}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-lg-3 col-md-5 cart-basket">
                <div className="card bg-secondary-light shadow-sm">
                  <div className="card-body cartprice">
                    <p>Sub-total <strong className="basket-value">₹{subtotal.toFixed(2)}</strong></p>
                    <p>Estimated Tax <strong className="basket-value">₹0.00</strong></p>
                    <p>Shipping Charge <strong className="basket-value">₹0.00</strong></p>
                    <h6 className="font-weight-bolder">
                      Total Cost <span className="basket-total-value">₹{total.toFixed(2)}</span>
                    </h6>
                    <div className="readmore">
                      <button className="button w-100">Confirm Order</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Cart;
