import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
    if (res.ok) navigate("/");
    else alert("Registration failed");
  };
  return (
    <div className="w-100 padding bg-secondary-light">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="row gap-row flex-row-reverse">
            <div className="col-md-5 formSideImg">
              <img src="./images/login-img.avif" alt="" />
            </div>
            <div className="col-md-7 formContainer">
              <div className="heading">
                <h2 className="h1">Register</h2>
                <p className="mb-0">
                  Unlock endless possibilities: Register here today!
                </p>
              </div>
              <div className="inner">
                <div className="form-row">
                  <div className="col-sm-6 form-group">
                    <label for="UserName">
                      Name<span className="text-danger">*</span>
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      required
                      className="form-control shadow-sm"
                    />
                  </div>
                  <div className="col-sm-6 form-group">
                    <label for="password">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                      className="form-control shadow-sm"
                    />
                  </div>
                  <div className="col-sm-6 form-group">
                    <label for="password">
                      Password <span className="text-danger">*</span>
                    </label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Password"
                      required
                      className="form-control shadow-sm"
                    />
                  </div>
                  <div className="col-sm-6 form-group">
                    <label for="role">
                      Role <span className="text-danger">*</span>
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                      className="form-control form-select shadow-sm"
                    >
                      <option value="">Select Role</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>

                <div className="readmore">
                  <button className="button">Login</button>
                </div>
                <p className="mb-0 mt-3 font-weight-bold">
                  Already have an account{" "}
                  <Link to="/" className="text-secondary">
                    Login.
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
