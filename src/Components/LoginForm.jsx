import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Form from '../UI/Form';
import '../Components/SignupForm.css';
import Button from '../UI/Button';

export default function LoginForm({ goBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const SubmitForm = async (e) => {
    e.preventDefault();
    console.log('Submit Form Function invoked');
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password: password }),
      });

      const result = await response.json();
      setMessage(result.message);

      if (response.status === 200) {
        localStorage.setItem('authToken', result.token);
        setSuccessMessage(result.message);
        console.log(result.token);
        console.log('Login successful!');
        // console.log()
        // Redirect based on user role
        console.log(result.level); 
        console.log(result.role); 
        if (result.level === 'admin') {
          console.log('Navigating to Admin Dashboard...');
          navigate('/admin'); // Navigate to Admin Dashboard
        } else if (result.role === 'manager') {
          console.log('Navigating to manager Dashboard...');
          navigate('/manager'); // Navigate to Manager Dashboard
        } else {
          console.log('Navigating to user Dashboard...');
          navigate('/user'); // Navigate to User Dashboard
        }
      } else {
        setErrorMessage(result.message);
        console.log(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const signOut = () => {
    localStorage.removeItem('authToken');
    navigate('/login'); // Redirect to login page on signout
  };

  return (
    <div className='signup-container'>
      <h1>Login Form</h1>
      <Form className='signup' onSubmit={SubmitForm}>
        <label>Enter your password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Enter your mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button onSubmit={SubmitForm} className='submit-button'>
          Login
        </Button>

      </Form>
      {message && <p>{message}</p>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
}
