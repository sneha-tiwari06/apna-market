import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error('Products data is not an array:', data);
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  if (!products.length) {
    return <div className="text-center my-5">Loading products...</div>;
  }

  return (
    <>
      {/* Login Modal */}
      <div className="modal fade" id="loginform" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" className="ion-ios-close">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="heading">
                <h2 className="h3 mb-0">Login</h2>
              </div>
              <div className="form-row">
                <div className="col-sm-12 form-group">
                  <label htmlFor="loginemail">User Id<span className="text-danger">*</span></label>
                  <input type="text" id="loginemail" name="loginemail" placeholder="Enter Email" className="form-control border-bottom" />
                </div>
                <div className="col-sm-12 form-group">
                  <label htmlFor="loginpass">Password<span className="text-danger">*</span></label>
                  <input type="password" id="loginpass" name="loginpass" placeholder="Enter Password" className="form-control border-bottom" />
                </div>
                <div className="col-sm-12 readmore">
                  <button className="button" type="submit" id="loginbtn">Login</button>
                </div>
                <div className="col-sm-12 productBox-text mt-3">
                  <p className="mb-0 font-weight-bold">Don't have an account? <a href="signup.html" className="text-secondary">Create one.</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>
       
<Navbar />
        <div className="banner">
          <picture>
            <img src="./images/banner.jpg" alt="Banner" />
          </picture>
        </div>

        <div className="w-100 padding bg-secondary-light">
          <div className="container">
            <div className="heading mx-auto">
              <h2 className="h1 mb-0">Products</h2>
            </div>
            <div className="row gap-row">
              {products.map((p) => (
                <div key={p.id} className="col-lg-3 col-sm-6 productBox mb-4">
                  <div className="inner rounded" style={{ "--clr": "#012f70" }}>
                    <div className="product-img">
                      <img
                        src={p.thumbnail}
                        className="h-100 rounded object-contain"
                        alt={p.title}
                      />
                    </div>
                    <div className="product-details">
                      <div className="productBox-text">
                        <p className="mb-0 font-weight-bold">
                        <Link
                          to={`/product/${p.id}`}
                          className="button p-0 bg-white shadow-sm"
                          title="View Details"
                        >{p.title}</Link>
                        </p>
                        <div className="proBox-price d-flex align-items-center">
                          <div className="font-weight-bolder mb-0 text-secondary">${p.price}</div>
                          {p.discountPercentage && (
                            <small className="text-muted ms-2"><del>${(p.price / (1 - p.discountPercentage / 100)).toFixed(2)}</del></small>
                          )}
                        </div>
                      </div>
                      <div className="readmore my-3 productBox-buttons d-flex gap-2">
                        
                        <Link
                          to={`/product/${p.id}`}
                          className="button p-0 bg-white shadow-sm"
                          title="View Details"
                        >
                          <i className="fa fa-eye"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
