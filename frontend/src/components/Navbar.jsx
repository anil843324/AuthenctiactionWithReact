import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { getToken } from '../service/LocalstorageService';
const Navbar = () => {
  const token = getToken('token');

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            background:
              'linear-gradient(0deg, rgba(116,148,167,1) 0%, rgba(221,104,104,1) 100%, rgba(232,232,232,1) 100%)',
          }}
        >
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              ElectronicFind.com
            </Typography>

            <Button
              component={NavLink}
              to="/"
              sx={{ color: 'white', textTransform: 'none' }}
              style={({ isActive }) => {
                return { backgroundColor: isActive ? 'black' : '' };
              }}
            >
              Home
            </Button>

            <Button
              component={NavLink}
              sx={{ color: 'white', textTransform: 'none' }}
              to="/contact"
              style={({ isActive }) => {
                return { backgroundColor: isActive ? 'black' : '' };
              }}
            >
              Contact
            </Button>

            {token ? (
              <Button
                component={NavLink}
                sx={{ color: 'white', textTransform: 'none' }}
                to="/dashboard"
                style={({ isActive }) => {
                  return { backgroundColor: isActive ? 'black' : '' };
                }}
              >
                Dashboard
              </Button>
            ) : (
              <Button
                component={NavLink}
                sx={{ color: 'white', textTransform: 'none' }}
                to="/login"
                style={({ isActive }) => {
                  return { backgroundColor: isActive ? 'black' : '' };
                }}
              >
                Login/Registration
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
