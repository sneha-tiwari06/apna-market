import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./navbar";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); 

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    await fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId: product.id, quantity }),
    });
    alert("Item added to cart");
  };

  if (!product) return <div className="container">Loading...</div>;
  return (
    <div>
      <div
        className="modal fade"
        id="loginform"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close d-flex align-items-center justify-content-center"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" className="ion-ios-close">
                  ×
                </span>
              </button>
            </div>
            <div className="modal-body">
              <div className="heading">
                <h2 className="h3 mb-0">Login</h2>
              </div>
              <div className="form-row">
                <div className="col-sm-12 form-group">
                  <label for="loginemail">
                    User Id<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="loginemail"
                    name="loginemail"
                    placeholder="Enter Email"
                    className="form-control border-bottom"
                  />
                </div>
                <div className="col-sm-12 form-group">
                  <label for="loginpass">
                    Password<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="loginpass"
                    name="loginpass"
                    placeholder="Enter Password"
                    className="form-control border-bottom"
                  />
                </div>
                <div className="col-sm-12 readmore">
                  <button className="button" type="submit" id="loginbtn">
                    {" "}
                    Login{" "}
                  </button>
                </div>
                <div className="col-sm-12 productBox-text mt-3">
                  <p className="mb-0 font-weight-bold">
                    Don't have an account?{" "}
                    <a href="signup.html" className="text-secondary">
                      Create one.
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main>
       <Navbar />
        <div className="w-100 py-4 pageHead">
          <div className="container">
            <div className="pageTitle">
              <h2 className="h1 mb-0">Product Details</h2>
            </div>
          </div>
        </div>

        <div className="w-100 padding pt-3">
          <div className="container">
            <div className="row gap-row">
              <div className="col-md-5 sideImg">
                <div className="product-imgBox position-relative">
                  <a
                    href={product.images}
                    data-magnify="magnify"
                    data-group="primg"
                    data-caption="Dog Collar Belt"
                  >
                    <img src={product.images} id="product-img" alt="" />
                  </a>
                </div>
                <div className="product-imgBox-thumb-slider">
                  <div className="thumb-slide">
                    <img
                      src={product.images}
                      className="product-imgBox-thumb"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-7 productDetails">
                <div className="inner pl-0 pl-md-5">
                  <div className="headingContainer d-flex justify-content-between">
                    <div className="heading mb-0">
                      <h6 className="mb-0">{product.id}</h6>
                      <h1 className="h1 mb-0">{product.title}</h1>
                    </div>
                    <div className="readmore mt-0 w-auto">
                      <a
                        href="#"
                        className="button mw-auto sm stroke"
                        title="Add to Wishlist"
                        data-toggle="tooltip"
                        data-placement="bottom"
                      >
                        <i className="fa fa-heart"></i>
                      </a>
                    </div>
                  </div>
                  <div className="price-strip">
                    <div className="d-flex">
                      <div className="h3 font-weight-bolder mb-0 text-secondary">
                        {product.discountPercentage}
                      </div>
                      <small className="text-muted">
                        (<del>{product.price}</del>)
                      </small>
                    </div>
                  </div>

                  <div className="productDetails-Policy bg-secondary-light">
                    <div className="row gap-row">
                      <div className="col-sm-4 iconBox sm">
                        <div className="inner">
                          <div className="img-fluid bg-white">
                            <i>
                              <svg
                                height="512pt"
                                viewBox="0 -72 512 512"
                                width="512pt"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="m504 272c-4.425781 0-8-3.574219-8-8v-56c0-4.421875 3.574219-8 8-8s8 3.578125 8 8v56c0 4.425781-3.574219 8-8 8zm0 0"></path>
                                <path d="m504.007812 216c-2.6875 0-5.3125-1.351562-6.824218-3.804688l-64-104c-2.3125-3.769531-1.144532-8.699218 2.617187-11.007812 3.765625-2.320312 8.695313-1.144531 11.007813 2.613281l64 104c2.3125 3.769531 1.144531 8.695313-2.617188 11.007813-1.3125.808594-2.75 1.191406-4.183594 1.191406zm0 0"></path>
                                <path d="m464.007812 200c-2.6875 0-5.3125-1.351562-6.824218-3.804688l-39.390625-64.015624c-2.320313-3.769532-1.144531-8.699219 2.613281-11.011719 3.777344-2.316407 8.699219-1.140625 11.007812 2.617187l39.394532 64.015625c2.320312 3.769531 1.144531 8.695313-2.617188 11.007813-1.3125.808594-2.75 1.191406-4.183594 1.191406zm0 0"></path>
                                <path d="m440 112h-120.425781c-4.421875 0-8-3.574219-8-8 0-4.421875 3.578125-8 8-8h120.425781c4.425781 0 8 3.578125 8 8 0 4.425781-3.574219 8-8 8zm0 0"></path>
                                <path d="m329.679688 240.019531-247.992188-.019531c-4.421875 0-8-3.582031-8-8 0-4.421875 3.585938-8 8-8l247.992188.019531c4.425781 0 8 3.582031 8 8 0 4.421875-3.582032 8-8 8zm0 0"></path>
                                <path d="m87.992188 320c-4.136719 0-7.632813-3.175781-7.96875-7.367188l-24-304c-.34375-4.40625 2.945312-8.253906 7.34375-8.6054682 4.519531-.3554688 8.257812 2.9414062 8.609374 7.3437502l24 304c.34375 4.40625-2.945312 8.253906-7.34375 8.605468-.21875.015626-.433593.023438-.640624.023438zm0 0"></path>
                                <path d="m329.671875 240.019531c-4.136719 0-7.632813-3.179687-7.96875-7.371093l-17.679687-224.015626c-.34375-4.40625 2.945312-8.253906 7.34375-8.6054682 4.511718-.3554688 8.257812 2.9414062 8.609374 7.3437502l17.679688 224.015625c.34375 4.40625-2.945312 8.253906-7.34375 8.605469-.214844.019531-.433594.027343-.640625.027343zm0 0"></path>
                                <path d="m310.265625 16h-246.265625c-4.425781 0-8-3.574219-8-8 0-4.421875 3.574219-8 8-8h246.265625c4.421875 0 8 3.578125 8 8 0 4.425781-3.578125 8-8 8zm0 0"></path>
                                <path d="m360 320h-128c-4.425781 0-8-3.574219-8-8 0-4.421875 3.574219-8 8-8h128c4.425781 0 8 3.578125 8 8 0 4.425781-3.574219 8-8 8zm0 0"></path>
                                <path d="m504 320c-4.425781 0-8-3.574219-8-8v-48c0-4.421875 3.574219-8 8-8s8 3.578125 8 8v48c0 4.425781-3.574219 8-8 8zm0 0"></path>
                                <path d="m416 336c-13.230469 0-24-10.765625-24-24 0-13.230469 10.769531-24 24-24s24 10.769531 24 24c0 13.234375-10.769531 24-24 24zm0-32c-4.414062 0-8 3.585938-8 8 0 4.417969 3.585938 8 8 8s8-3.582031 8-8c0-4.414062-3.585938-8-8-8zm0 0"></path>
                                <path d="m416 368c-30.871094 0-56-25.125-56-56 0-30.871094 25.128906-56 56-56s56 25.128906 56 56c0 30.875-25.128906 56-56 56zm0-96c-22.054688 0-40 17.945312-40 40 0 22.058594 17.945312 40 40 40s40-17.941406 40-40c0-22.054688-17.945312-40-40-40zm0 0"></path>
                                <path d="m176 336c-13.230469 0-24-10.765625-24-24 0-13.230469 10.769531-24 24-24s24 10.769531 24 24c0 13.234375-10.769531 24-24 24zm0-32c-4.414062 0-8 3.585938-8 8 0 4.417969 3.585938 8 8 8s8-3.582031 8-8c0-4.414062-3.585938-8-8-8zm0 0"></path>
                                <path d="m176 368c-30.871094 0-56-25.125-56-56 0-30.871094 25.128906-56 56-56s56 25.128906 56 56c0 30.875-25.128906 56-56 56zm0-96c-22.054688 0-40 17.945312-40 40 0 22.058594 17.945312 40 40 40s40-17.941406 40-40c0-22.054688-17.945312-40-40-40zm0 0"></path>
                                <path d="m120 320h-32c-4.425781 0-8-3.574219-8-8 0-4.421875 3.574219-8 8-8h32c4.425781 0 8 3.578125 8 8 0 4.425781-3.574219 8-8 8zm0 0"></path>
                                <path d="m504 320h-32c-4.425781 0-8-3.574219-8-8 0-4.421875 3.574219-8 8-8h32c4.425781 0 8 3.578125 8 8 0 4.425781-3.574219 8-8 8zm0 0"></path>
                                <path d="m359.992188 200c-3.976563 0-7.425782-2.957031-7.929688-7.007812l-8-64c-.542969-4.382813 2.5625-8.382813 6.945312-8.925782 4.425782-.511718 8.382813 2.558594 8.929688 6.945313l8 64c.542969 4.382812-2.5625 8.382812-6.945312 8.925781-.335938.039062-.671876.0625-1 .0625zm0 0"></path>
                                <path d="m464 200h-104c-4.425781 0-8-3.574219-8-8 0-4.421875 3.574219-8 8-8h104c4.425781 0 8 3.578125 8 8 0 4.425781-3.574219 8-8 8zm0 0"></path>
                                <path d="m424.609375 136h-72.609375c-4.425781 0-8-3.574219-8-8 0-4.421875 3.574219-8 8-8h72.609375c4.421875 0 8 3.578125 8 8 0 4.425781-3.578125 8-8 8zm0 0"></path>
                                <path d="m391.992188 200c-3.976563 0-7.425782-2.957031-7.929688-7.007812l-8-64.015626c-.542969-4.382812 2.5625-8.382812 6.945312-8.925781 4.398438-.503906 8.382813 2.558594 8.929688 6.941407l8 64.019531c.542969 4.382812-2.5625 8.382812-6.945312 8.925781-.335938.039062-.671876.0625-1 .0625zm0 0"></path>
                                <path d="m368 232h-8c-4.425781 0-8-3.574219-8-8 0-4.421875 3.574219-8 8-8h8c4.425781 0 8 3.578125 8 8 0 4.425781-3.574219 8-8 8zm0 0"></path>
                                <path d="m128 104h-120c-4.425781 0-8-3.574219-8-8 0-4.421875 3.574219-8 8-8h120c4.425781 0 8 3.578125 8 8 0 4.425781-3.574219 8-8 8zm0 0"></path>
                                <path d="m78.519531 200h-38.519531c-4.425781 0-8-3.574219-8-8 0-4.421875 3.574219-8 8-8h38.519531c4.425781 0 8 3.578125 8 8 0 4.425781-3.574219 8-8 8zm0 0"></path>
                                <path d="m176 104h-16c-4.425781 0-8-3.574219-8-8 0-4.421875 3.574219-8 8-8h16c4.425781 0 8 3.578125 8 8 0 4.425781-3.574219 8-8 8zm0 0"></path>
                                <path d="m32 152h-16c-4.425781 0-8-3.574219-8-8 0-4.421875 3.574219-8 8-8h16c4.425781 0 8 3.578125 8 8 0 4.425781-3.574219 8-8 8zm0 0"></path>
                                <path d="m144 152h-88c-4.425781 0-8-3.574219-8-8 0-4.421875 3.574219-8 8-8h88c4.425781 0 8 3.578125 8 8 0 4.425781-3.574219 8-8 8zm0 0"></path>
                                <path d="m112 56h-72c-4.425781 0-8-3.574219-8-8 0-4.421875 3.574219-8 8-8h72c4.425781 0 8 3.578125 8 8 0 4.425781-3.574219 8-8 8zm0 0"></path>
                              </svg>
                            </i>
                          </div>
                          <span>{product.shippingInformation}</span>
                        </div>
                      </div>
                      <div className="col-sm-4 iconBox sm">
                        <div className="inner">
                          <div className="img-fluid bg-white">
                            <i>
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 24 24"
                                height="30"
                                width="30"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9 10h6c1.654 0 3 1.346 3 3s-1.346 3-3 3h-3v2h3c2.757 0 5-2.243 5-5s-2.243-5-5-5H9V5L4 9l5 4v-3z"></path>
                              </svg>
                            </i>
                          </div>
                          <span>{product.returnPolicy}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row gap-row">
                    <div className="col-sm-6 product-colorBox">
                      <h6 className="font-weight-bold">
                        Brand:{" "}
                        <span className="text-secondary">{product.brand}</span>
                      </h6>
                    </div>{" "}
                    <div className="col-sm-6 product-colorBox">
                      <h6 className="font-weight-bold">
                        Dimensions:{" "}
                        <span className="text-secondary">
                          {product.dimensions.width} x{" "}
                          {product.dimensions.height} x{" "}
                          {product.dimensions.depth} cm
                        </span>
                      </h6>
                    </div>
                  </div>

                  <div className="readmore productBox-buttons d-flex">
                    <div className="product-quantity">
                      <button type="button" className="qty_update quant-minus" onClick={decreaseQuantity}>
                        -
                      </button>
                      <input
                        type="text"
                        value={quantity}
                        readonly=""
                        size="3"
                        className="quant-input"
                      />
                      <button type="button" className="qty_update quant-plus" onClick={increaseQuantity}>
                        +
                      </button>
                    </div>
                    <button
                      onClick={addToCart}
                      className="button py-0 align-items-center"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-100 padding bg-light">
          <div className="container">
            <div className="productDetails-gridWrapper">
              <div className="grid-item1 bg-white shadow-sm rounded">
                <div className="inner p-3">
                  <div className="heading">
                    <h4 className="mb-0">Description</h4>
                  </div>
                  <p>{product.description}</p>
                </div>
              </div>
              <div className="grid-item2 bg-white shadow-sm rounded">
                <div className="inner p-3">
                  <div className="heading">
                    <h4 className="mb-0">Details</h4>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <strong>Brand: </strong>
                      <span>{product.brand}</span>
                    </li>
                    <li className="list-group-item">
                      <strong>SKU: </strong>
                      <span>{product.sku}</span>
                    </li>
                    <li className="list-group-item">
                      <strong>Weight: </strong>
                      <span>{product.weight}kg</span>
                    </li>
                    <li className="list-group-item">
                      <strong>Dimensions: </strong>
                      <span>
                        {product.dimensions.width} x {product.dimensions.height}{" "}
                        x {product.dimensions.depth} cm
                      </span>
                    </li>
                    <li className="list-group-item">
                      <strong>Warranty: </strong>
                      <span>{product.warrantyInformation}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-item3 bg-white shadow-sm rounded">
                <div className="inner p-3">
                  <div className="heading">
                    <h4 className="mb-0">Return & Warranty</h4>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <strong>Return Policy: </strong>
                      <span>{product.returnPolicy}</span>
                    </li>
                    <li className="list-group-item">
                      <strong>Shipping: </strong>
                      <span>{product.shippingInformation}</span>
                    </li>
                    <li className="list-group-item">
                      <strong>Stock Status: </strong>
                      <span>{product.availabilityStatus}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetails;
