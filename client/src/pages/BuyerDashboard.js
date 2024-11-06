import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import PropertyList from '../components/PropertyList';
import axios from 'axios';

const BuyerDashboard = () => {
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 500000,
    bedrooms: 0,
    bathrooms: 0,
    city: ''
  });

  const handleApplyFilters = (newFilters) => {
    setFilters({
      ...filters,
      ...newFilters,
    });
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2">Available Properties</Typography>
        </Grid>
        
        <Grid item xs={12}>
          <PropertyList filters={filters} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BuyerDashboard;

