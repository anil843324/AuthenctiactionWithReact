import React, { useState } from 'react';

import { TextField, Button, Box, Alert, Grid, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../../service/userAuthApi';

const ResetPassword = () => {
  const [error, setError] = useState({
    status: false,
    msg: '',
    type: '',
  });
  const navigate = useNavigate();
  const  {id,token}=useParams();

    console.log(id,token)

  const [resetPassword,{isLoading}] =useResetPasswordMutation()

  const handleSubmit = async(e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const actualData = {
      password: data.get('password'),
      password_confirmation: data.get('password_confirmation'),
    };

    if (actualData.password && actualData.password_confirmation) {
      if (actualData.password === actualData.password_confirmation) {
       
             
            const res= await resetPassword({actualData,id,token})

           
             if(res.data.status==='success'){
              document.getElementById('password-reset-form').reset();
              setError({
                status: true,
                msg: 'Password Reset successfuly. Redirecting to Login Page...',
                type: 'success',
              });
      
              setTimeout(() => {
                navigate('/login');
              },300);
             }
             if(res.data.status==='failed'){
              

              setError({
                status: true,
                msg: res.data.message,
                type: 'error',
              });

             }

       
      } else {
        setError({
          status: true,
          msg: 'Password  and Confirm Password Does not Match',
          type: 'error',
        });
      }
    } else {
      setError({ status: true, msg: 'All Fields are Required', type: 'error' });
    }
  };

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item sm={6} xs={12}>
          <h1>Reset Password</h1>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            id="password-reset-form"
          >
            <TextField
              required
              margin="normal"
              fullWidth
              id="password"
              name="password"
              label=" New Password"
              type="password"
            />
            <TextField
              required
              margin="normal"
              fullWidth
              id="password_confirmation"
              name="password_confirmation"
              label="New Confirm Password"
              type="password"
            />

            <Box textAlign="center">
               { isLoading ?  <CircularProgress/> :  <Button
                type="submit"
                sx={{ mt: 3, mb: 2, px: 5 }}
                variant="contained"

              >
                Save
              </Button>}    
             
            </Box>

            {error.status ? (
              <Alert severity={error.type}>{error.msg}</Alert>
            ) : (
              ''
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ResetPassword;
