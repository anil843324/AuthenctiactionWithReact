import React, { useState } from 'react';

import { TextField, Button, Box, Alert, Grid, CircularProgress } from '@mui/material';

import { useSendPasswordResetEmailUserMutation } from '../../service/userAuthApi';
const SendPasswordResetEmail = () => {
  const [error, setError] = useState({
    status: false,
    msg: '',
    type: '',
  });

  const  [  sendPasswordResetEmail ,{isLoading}]=useSendPasswordResetEmailUserMutation()
  const handleSubmit = async(e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const actualData = {
      email: data.get('email'),
    };

    if (actualData.email) {
      console.log(actualData);

      const res= await sendPasswordResetEmail(actualData);

      console.log(res)

       if(res.data.status==='success'){
        document.getElementById('password-reset-email-form').reset();
        setError({ status: true, msg: 'Password Reset Email Sent. Check YOur Email !!', type: 'success' });
       }

       if(res.data.status==='failed'){
        setError({ status: true, msg:res.data.message, type: 'error' });
       }
     
    } else {
      setError({ status: true, msg: 'Please Provide Valid Email', type: 'error' });
    }
  };

  return (
    <>
      <Grid container justifyContent='center'>
        <Grid item sm={6} xs={12}>
        <h1>Reset Password</h1>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            id="password-reset-email-form"
          >
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              margin="normal"
              label="Email Address"
            />

            <Box textAlign="center">
            {
              isLoading ? <CircularProgress/> :<Button
                type="submit"
                sx={{ mt: 3, mb: 2, px: 5 }}
                variant="contained"
              >
                Send
              </Button>
            }
              
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

export default SendPasswordResetEmail;
