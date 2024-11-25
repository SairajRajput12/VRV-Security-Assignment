import React from 'react'
import Form from '../UI/Form';
import '../Components/SignupForm.css';
import Button from '../UI/Button';

export default function AdminSignup() {
  const SubmitForm = (e) => {
        e.preventDefault()
        console.log('Submit Form Function invoked'); 
  }

  return (
    <>
      <div className='signup-container'>
      <h1>Admin Signup Form</h1>
      <Form className='signup' onSubmit={SubmitForm}>
          <label>Enter your name</label>
          <input type='text' /> 
          <label>Enter your password</label> 
          <input type='password' /> 
          <label>Enter your confirm password</label>
          <input type='password' />
          <label>Enter your mail</label> 
          <input type='email' />
          <Button onSubmit={SubmitForm} className='submit-button'>Signup</Button>
      </Form>
      </div>
    </>
  )
}