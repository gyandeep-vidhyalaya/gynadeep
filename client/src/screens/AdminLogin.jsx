import React from 'react'
import './styles/AdminLogin.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const ADMIN = import.meta.env.VITE_ADMIN;

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.id]: event.target.value })
  };
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const response = await fetch(`${BACKEND_URL}/api/adminlogin`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: credentials.username, password:credentials.password })
    });
    const json = await response.json();
    if(json['success']){
      navigate('/');
      localStorage.setItem(ADMIN, credentials.username);
    }else{
      alert(json['error']);
    }
  };
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="username" className="form-control" id="username" value={credentials.username} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input className="form-control" id="password" value={credentials.password} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  )
}

export default AdminLogin
