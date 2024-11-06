import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';
import { usePropertyContext } from '../context/PropertyContext';

const PropertyList = ({ filters }) => {
  const { sortedProperties, loading } = usePropertyContext();
  const navigate = useNavigate();

  if (loading) return <div>Loading properties...</div>;

  const filteredProperties = sortedProperties.filter((property) =>
    property.price <= filters.maxPrice &&
    property.price >= filters.minPrice &&
    property.beds >= filters.bedrooms &&
    property.baths >= filters.bathrooms &&
    (filters.city ? property.city.toLowerCase().includes(filters.city.toLowerCase()) : true)
  );

  if (!filteredProperties.length) return <div>No properties match your filters.</div>;

  return (
    <Grid container spacing={3}>
      {filteredProperties.map((property) => (
        <Grid item xs={12} sm={6} md={4} key={property.id}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={property.image_url || "fallback_image_url.jpg"} // Use fallback if image_url is missing
              alt={property.title}
            />
            <CardContent>
              <Typography variant="h5">{property.title}</Typography>
              <Typography>{`${property.address}, ${property.city}, ${property.state} ${property.zip}`}</Typography>
              <Typography>Price: ${property.price.toLocaleString()}</Typography>
              <Typography>Beds: {property.beds} | Baths: {property.baths} | Sqft: {property.sqft}</Typography>
              <Button variant="contained" onClick={() => navigate(`/property/${property.id}`)}>
                View Property
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PropertyList;
