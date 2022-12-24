import { Button, CssBaseline, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../service/LocalstorageService';
import ChangePassword from './auth/ChangePassword';
import { useGetLoggedUserQuery } from '../service/userAuthApi';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserInfo, UnSetUserInfo } from '../features/userSlice';
import { UnSetUserToken } from '../features/authSlice';
const Dashboard = () => {

  const dispatch= useDispatch();

  const navigate=useNavigate();

  const handleLogout = () => {

    dispatch(UnSetUserInfo({
      email:"",
      name:"",
    }))
    dispatch(UnSetUserToken({
   token:null
    }))

    removeToken('token');

    
    navigate('/login')
  };

  const  token=getToken('token')

    const  {data,isSuccess}=useGetLoggedUserQuery(token)
   

    const [userData,setUserData]=useState({
      email:"",
      name:""
    })
    // Stored User Data in Local State
    

     useEffect(() => {
        if(data && isSuccess){
          setUserData({
            email:data.user.email,
            name:data.user.name,
          })
        }
     }, [data,isSuccess])

      // Stored User Data in Redux Store

     useEffect(() => {
      if(data && isSuccess){
        
        dispatch(setUserInfo({
          email:data.user.email,
          name:data.user.name,
        }))
      }
   }, [data,isSuccess,dispatch])
     

  return (
    <>
      <CssBaseline>
        <Grid container>
          <Grid
            item
            sm={4}
            sx={{ backgroundColor: 'gray', p: 5, color: 'white' }}
          >
            <Typography variant="h5">Email: {userData.email}</Typography>
            <Typography variant="h6">Name:{userData.name}</Typography>

            
            
            <Button
              variant="contained"
              color="warning"
              size="large"
              onClick={handleLogout}
              sx={{ mt: 8 }}
            >
              Logout
            </Button>

            <Button
              variant="contained"
             
              component={NavLink}
              size="large"
              to="/"
              sx={{ mt: 8 ,ml:2 }}
            >
             Home
            </Button>

           

           
          </Grid>

          <Grid item sm={8}>
            <ChangePassword/>
          </Grid>
        </Grid>
      </CssBaseline>
    </>
  );
};

export default Dashboard;
