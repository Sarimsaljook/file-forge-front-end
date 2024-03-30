// Login.jsx
import React, { useState } from 'react';
import './../styles/LoginPage.css'; // Import your CSS file for styling
import auth from '../firebase';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // State variables to store form data

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigate();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, username, password)
        .then(() => {
            navigation("/");
            alert("Login Successfull!");
        }).catch((err) => {
            alert(err);
            console.log(err);
        })

  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <img 
            src={require('../assets/file_forge_app_logo.png')} 
            width='100'
            height='100'
            style={{ margin: 'auto', display: 'block', marginTop: 20 }}
        />

        <h2>Welcome Back!</h2>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button style={{ margin: 'auto', display: 'block', marginTop: 20, marginBottom: 20 }} type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
