import React, { useState } from 'react';
import { useRegisterUserMutation } from '../../service/userAuthApi';
import {
  TextField,
  Button,
  Box,
  Alert,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { storeToken } from '../../service/LocalstorageService';
const UserRegistration = () => {
  const [error, setError] = useState({
    status: false,
    msg: '',
    type: '',
  });
  const navigate = useNavigate();


   const [ registerUser ,{isLoading}] =useRegisterUserMutation()


  const handleSubmit = async(e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const actualData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      password_confirmation: data.get('password_confirmation'),
      tc: data.get('tc'),
    };

    if (
      actualData.email &&
      actualData.password &&
      actualData.password &&
      actualData.password_confirmation &&
      actualData.tc !== null
    ) {
      if (actualData.password === actualData.password_confirmation) {
       

      const res= await registerUser(actualData);
    
       if(res.data.status==='success'){

         storeToken(res.data.token)


        navigate('/dashboard');
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
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
        id="registration-form"
      >
        <TextField
          required
          fullWidth
          id="name"
          name="name"
          margin="normal"
          label="Name"
        />
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
        <TextField
          required
          margin="normal"
          fullWidth
          id="password_confirmation"
          name="password_confirmation"
          label="Confirm Password"
          type="password"
        />

        <FormControlLabel
          control={<Checkbox value={true} color="primary" name="tc" id="tc" />}
          label="I agree to term and condition."
        />

        <Box textAlign="center">
        {
          isLoading ? <CircularProgress/> :<Button
            type="submit"
            sx={{ mt: 3, mb: 2, px: 5 }}
            variant="contained"
          >
            Register
          </Button>
        }

          
        </Box>

        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
      </Box>
    </>
  );
};

export default UserRegistration;
