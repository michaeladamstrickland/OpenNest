import React, { useState } from 'react';
import { TextField, Slider, Box, Button } from '@mui/material';

const PropertyFilter = ({ onFilter, onResetFilters, filters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSliderChange = (e, newValue) => {
    setLocalFilters((prev) => ({
      ...prev,
      minPrice: newValue[0],
      maxPrice: newValue[1],
    }));
  };

  const handleApplyFilters = () => {
    onFilter(localFilters);
  };

  return (
    <Box p={3}>
      {/* Bedrooms */}
      <TextField
        name="bedrooms"
        label="Bedrooms"
        type="number"
        value={localFilters.bedrooms}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

      {/* Bathrooms */}
      <TextField
        name="bathrooms"
        label="Bathrooms"
        type="number"
        value={localFilters.bathrooms}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

      {/* Price Range Slider */}
      <Slider
        value={[localFilters.minPrice, localFilters.maxPrice]}
        onChange={handleSliderChange}
        min={0}
        max={5000000}
        step={10000}
        valueLabelDisplay="auto"
      />

      {/* City */}
      <TextField
        name="city"
        label="City"
        type="text"
        value={localFilters.city}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

      {/* Apply and Reset Filters */}
      <Button onClick={handleApplyFilters} variant="contained" fullWidth>
        Apply Filters
      </Button>
      <Button onClick={onResetFilters} variant="outlined" color="secondary" fullWidth>
        Reset Filters
      </Button>
    </Box>
  );
};

export default PropertyFilter;
