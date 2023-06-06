import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { login } from './../../services/authService';
import { toast } from 'react-toastify';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      // Redirect to the dashboard or desired page
      navigate('/dashboard');
    } catch (error) {
      toast.error('An error occurred: ' + error.message);
      setError(error.message);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-form'>
        <h2>Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group'>
            <input
              type='text'
              {...register('username', { required: 'Username is required.' })}
            />
            <span className='highlight' />
            <span className='bar' />
            <label>Username*</label>
            {errors.username && <p className='error-text'>{errors.username.message}</p>}
          </div>
          <div className='form-group'>
            <input
              type='password'
              {...register('password', { required: 'Password is required.' })}
            />
            <span className='highlight' />
            <span className='bar' />
            <label>Password*</label>
            {errors.password && <p className='error-text'>{errors.password.message}</p>}
          </div>
          <button type='submit' className='login-button'>
            Login
            <div className='ripples'>
              <span className='ripplesCircle'></span>
            </div>
          </button>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Link to='/signup'>Sign Up</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default Login;
