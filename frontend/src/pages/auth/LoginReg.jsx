import React, { useState } from 'react';
import Pic1 from '../../images/pic1.png';
import { Grid, Card, Typography, Tabs, Tab, Box } from '@mui/material';
import UserLogin from './UserLogin';
import UserRegistration from './UserRegistration';
import { ShoppingBag } from '@mui/icons-material';

const TabPanel = (props) => {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const LoginReg = () => {
  const [value, SetValue] = useState(0);

  const handleChange = (event, newValue) => {
    SetValue(newValue);
  };

  return (
    <>
      <Grid container sx={{ height: '90vh' }}>
        <Grid
          item
          lg={7}
          sm={5}
          sx={{
            backgroundImage: `url(${Pic1})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: { xs: 'none', sm: 'block' },
          }}
        ></Grid>
        <Grid item lg={5} sm={7} sx={{}}>
          <Card sx={{ width: '100%', height: '100%' }}>
            <Box sx={{ mx: 3  }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="primary"
                  indicatorColor="primary"
                >
                  <Tab
                    label="Login"
                    sx={{ textTransform: 'none', fontWeight: 'bold' }}
                  ></Tab>

                  <Tab
                    label="Registration"
                    sx={{ textTransform: 'none', fontWeight: 'bold' }}
                  ></Tab>
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <UserLogin />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <UserRegistration />
              </TabPanel>
            </Box>

            <Box textAlign="center" sx={{ mt: 2 }}>

              <ShoppingBag sx={{ color: 'red', fontSize: 100 }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                ecommerceFind.com
              </Typography>


            </Box>


          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginReg;
