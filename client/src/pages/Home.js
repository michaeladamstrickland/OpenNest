// Home.js or BuyerDashboard.js
import React, { useState } from 'react';
import PropertyFilter from '../components/PropertyFilter';
import PropertyList from '../components/PropertyList';
import Chatbot from '../components/Chatbot';
import { Drawer, Button } from '@mui/material';

const Home = () => {
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 5000000,
    bedrooms: 0,
    bathrooms: 0,
    city: ''
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  // Apply filters handler
  const handleApplyFilters = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  // Reset filters handler
  const resetFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 5000000,
      bedrooms: 0,
      bathrooms: 0,
      city: ''
    });
  };

  return (
    <div>
      {/* Open Drawer Button */}
      <Button onClick={() => setDrawerOpen(true)} variant="outlined">
        Open Filter Drawer
      </Button>

      {/* Filter Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <PropertyFilter onFilter={handleApplyFilters} onResetFilters={resetFilters} filters={filters} />
      </Drawer>

      {/* Property List */}
      <PropertyList filters={filters} />

      {/* Chatbot with filter options */}
      <Chatbot onFilter={handleApplyFilters} onResetFilters={resetFilters} />
    </div>
  );
};

export default Home;
