import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      navigate('/home');
    } else {
      alert('Login failed');
    }
  };
  return (
 <div className="w-100 padding bg-secondary-light">
     <form onSubmit={handleSubmit}>
            <div className="container">
                <div className="row gap-row flex-row-reverse">
                    <div className="col-md-5 formSideImg"><img src="./images/login-img.avif" alt="" /></div>
                    <div className="col-md-7 formContainer">
                        <div className="heading">
                            <h2 className="h1">Login</h2>
                            <p className="mb-0">Unlock endless possibilities: Join here today!</p>
                        </div>
                        <div className="inner">
                            <div className="form-row">
                                <div className="col-sm-6 form-group">
                                    <label for="UserName">Email Address<span className="text-danger">*</span></label>
                                    <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="form-control shadow-sm" />
                                </div>
                                <div className="col-sm-6 form-group">
                                    <label for="password">Password <span className="text-danger">*</span></label>
                                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required  className="form-control shadow-sm" />
                                </div>
                               
                            </div>
                            
                            <div className="readmore">
                                <button className="button">Login</button>
                            </div>
                            <p className="mb-0 mt-3 font-weight-bold">Don't have an account? <Link to='/register'className="text-secondary">Register.</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        </div>
        );
}

export default Login;