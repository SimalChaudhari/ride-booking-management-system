import React from 'react';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import './signup.css';

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  return (
    <div className='signup-container'>
      <div className='signup-form'>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group'>
            <input
              type='text'
              {...register('username', {
                required: 'Username is required.',
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message: 'Username must contain only letters, numbers, or underscores.',
                },
              })}
            />
            <span className='highlight' />
            <span className='bar' />
            <label>Username*</label>
            {errors.username && <p className='error-text'>{errors.username.message}</p>}
          </div>
          <div className='form-group'>
            <input
              type='email'
              {...register('email', {
                required: 'Email is required.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address.',
                },
              })}
            />
            <span className='highlight' />
            <span className='bar' />
            <label>Email*</label>
            {errors.email && <p className='error-text'>{errors.email.message}</p>}
          </div>
          <div className='form-group'>
            <input
              type='password'
              {...register('password', {
                required: 'Password is required.',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long.',
                },
              })}
            />
            <span className='highlight' />
            <span className='bar' />
            <label>Password*</label>
            {errors.password && <p className='error-text'>{errors.password.message}</p>}
          </div>
          <button type='submit' className='signup-button'>
            Sign Up
            <div className='ripples'>
              <span className='ripplesCircle'></span>
            </div>
          </button>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Link to='/'>Login</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
