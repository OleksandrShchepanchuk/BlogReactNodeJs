import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRegister, selectIsAuth } from "../../slices/auth";
import { Navigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { useForm } from 'react-hook-form'
export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload){
      return alert("Can't register")

    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }
  if (isAuth) {
    return <Navigate to="/"/>;
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create an account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>

        <TextField 
        className={styles.field} 
        label="Full name" 
        error ={Boolean(errors.fullName ?.message)}
          helperText= {errors.fullName ?.message}
        {...register('fullName', {required: 'Enter your full name'})}
        fullWidth />
        <TextField 
        className={styles.field} 
        label="E-Mail"
        error ={Boolean(errors.email ?.message)}
          helperText= {errors.email ?.message}
          {...register('email', {required: 'Enter your email'})}
          
        fullWidth />
        <TextField 
        className={styles.field} 
        label="password" 
        type = 'password'
        error ={Boolean(errors.password ?.message)}
        helperText= {errors.password ?.message}
        {...register('password', {required: 'Enter your password'})}
        fullWidth />
        <Button type='Submit' disabled={!isValid} size="large" variant="contained" fullWidth>
          Sign up
        </Button>
      </form>
    </Paper>
  );
};
