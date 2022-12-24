import React, { useEffect, useState } from 'react';

import { TextField, Button, Box, Alert, CircularProgress } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../service/userAuthApi';
import { getToken, storeToken } from '../../service/LocalstorageService';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../../features/authSlice';
const UserLogin = () => {
  const [error, setError] = useState({
    status: false,
    msg: '',
    type: '',
  });
  const navigate = useNavigate();

  const [userLogin, { isLoading }] = useLoginUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const actualData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    if (actualData.email && actualData.password) {
      const res = await userLogin(actualData);

      if (res.data.status === 'success') {
        storeToken(res.data.token);

        navigate('/dashboard');
      }
      if (res.data.status === 'failed') {
        setError({
          status: true,
          msg: res.data.message,
          type: 'error',
        });
      }
    } else {
      setError({ status: true, msg: 'All Fields are Required', type: 'error' });
    }
  };

   let token=getToken('token');
   const  dispatch=useDispatch();

   // Stored token in Redux Store

   useEffect(() => {
      dispatch(setUserToken({
        token:token,
      }))
 }, [token,dispatch])

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
        id="login-form"
      >
        <TextField
          required
          fullWidth
          id="email"
          name="email"
          margin="normal"
          label="Email Address"
        />
        <TextField
          required
          margin="normal"
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
        />

        <Box textAlign="center">
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              type="submit"
              sx={{ mt: 3, mb: 2, px: 5 }}
              variant="contained"
            >
              Login
            </Button>
          )}
        </Box>

        <NavLink to="/sendpasswordresetemail">Forgot Password ?</NavLink>

        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
      </Box>
    </>
  );
};

export default UserLogin;
