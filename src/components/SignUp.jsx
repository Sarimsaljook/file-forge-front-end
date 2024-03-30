// SignUpPage.js
import React, { useState } from 'react';
import './../styles/SignUpPage.css'; // Import your CSS file for styling
import auth from '../firebase';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  // State variables to store form data
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigate();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, username, password)
        .then(() => {
            navigation("/login");
            alert("Sign Up Successfull!");
            alert("You can now use your new credentials to login and use FileForge.");
        }).catch((err) => {
            alert(err);
            console.log(err);
        })

  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <img 
            src={require('../assets/file_forge_app_logo.png')} 
            width='100'
            height='100'
            style={{ margin: 'auto', display: 'block', marginTop: 20 }}
        />

        <h2>Sign Up!</h2>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button style={{ margin: 'auto', display: 'block', marginTop: 20, marginBottom: 20 }} type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
