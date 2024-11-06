// src/pages/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Paper, MenuItem } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Buyer');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await register({ email, password, role });
      navigate(role === 'Buyer' ? '/buyer-dashboard' : '/seller-dashboard'); // Redirect based on role
    } catch (err) {
      setError('Failed to create an account');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f2f5'
      }}
    >
      <Paper elevation={6} sx={{ padding: '40px', maxWidth: '400px', width: '100%' }}>
        <Typography variant="h5" align="center" mb={2}>
          Create an Account
        </Typography>

        {error && <Typography color="error">{error}</Typography>}

        <form onSubmit={handleSignUp}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            select
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Buyer">Buyer</MenuItem>
            <MenuItem value="Seller">Seller</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Sign Up
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SignUp;
