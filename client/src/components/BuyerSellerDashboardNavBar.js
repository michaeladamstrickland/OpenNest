import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MailIcon from '@mui/icons-material/Mail';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EventIcon from '@mui/icons-material/Event';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

const BuyerSellerDashboardNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <AppBar position="static" color="primary">
    <Toolbar>
      {/* Back to Dashboard Link */}
      <IconButton
        component={Link}
        to="/buyer-dashboard"
        color="inherit"
        edge="start"
        sx={{ mr: 2 }}
      >
        <HomeIcon />
      </IconButton>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        OpenNest
      </Typography>

      {/* Other Navigation Links */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <MuiLink component={Link} to="/buyer-dashboard" color="inherit" underline="none">
          <Button color="inherit">Dashboard</Button>
        </MuiLink>
        <MuiLink component={Link} to="/dashboard/messages" color="inherit" underline="none">
    <Button color="inherit" sx={{ color: 'white', display: 'flex', alignItems: 'center' }}>
      <MailIcon sx={{ mr: 1, color: 'inherit' }} />
      Messages
    </Button>
  </MuiLink>
  
  <MuiLink component={Link} to="/dashboard/offers" color="inherit" underline="none">
    <Button color="inherit" sx={{ color: 'white', display: 'flex', alignItems: 'center' }}>
      <LocalOfferIcon sx={{ mr: 1, color: 'inherit' }} />
      Offers
    </Button>
  </MuiLink>
  
  <MuiLink component={Link} to="/dashboard/tours" color="inherit" underline="none">
    <Button color="inherit" sx={{ color: 'white', display: 'flex', alignItems: 'center' }}>
      <EventIcon sx={{ mr: 1, color: 'inherit' }} />
      Tours
    </Button>
  </MuiLink>
      </Box>

      {/* Logout Button */}
      <IconButton color="inherit" onClick={handleLogout}>
        <LogoutIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
);
};

export default BuyerSellerDashboardNavbar;
