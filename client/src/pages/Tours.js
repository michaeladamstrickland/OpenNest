import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, Link as MuiLink, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Tours = () => {
  const { authenticatedUser } = useAuth();
  const [upcomingTours, setUpcomingTours] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [tourToCancel, setTourToCancel] = useState(null);


  useEffect(() => {
    const fetchTours = async () => {
      if (!authenticatedUser || !authenticatedUser.id) {
        console.error("No authenticated user found.");
        return;
      }
  
      try {
        const response = await axios.get('/api/tours/upcoming', {
          params: { userId: authenticatedUser.id }
        });
        setUpcomingTours(response.data);
      } catch (error) {
        console.error("Failed to fetch upcoming tours", error);
      }
    };
  
    fetchTours();
  }, [authenticatedUser]);


  const handleOpenDialog = (tourId) => {
    setTourToCancel(tourId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTourToCancel(null);
  };

  const handleConfirmCancel = async () => {
    try {
      await axios.delete(`/api/tours/${tourToCancel}`);
      setUpcomingTours(upcomingTours.filter((tour) => tour.id !== tourToCancel));
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to cancel tour", error);
    }
  };

  const isTourAvailableNow = (tour) => {
    const currentTime = new Date();
    const scheduledTime = new Date(tour.scheduledDate);
    return currentTime >= scheduledTime || tour.Property?.isImmediateTourAvailable;
  };

  return (
    <Box p={3}>
      <MuiLink component={Link} to="/buyer-dashboard" sx={{ mb: 2, display: 'inline-block', color: 'secondary.main' }}>
        &larr; Back to Dashboard
      </MuiLink>
      <Typography variant="h4">Scheduled Tours</Typography>
      {upcomingTours.length > 0 ? (
        upcomingTours.map((tour) => (
          <Card key={tour.id} sx={{ display: 'flex', mb: 2, p: 1 }}>
            <Link to={`/property/${tour.propertyId}`}>
              <CardMedia
                component="img"
                sx={{ width: 100 }}
                image={tour.Property?.imageUrl || '/images/default.jpg'}
                alt={tour.Property?.title || "Property Image"}
              />
            </Link>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography variant="h6">{tour.Property?.title || "Title Unavailable"}</Typography>
              <Typography>Address: {tour.Property?.address || "Address Unavailable"}</Typography>
              <Typography>Price: {tour.Property?.price || "N/A"}</Typography>
              <Typography>{new Date(tour.scheduledDate).toLocaleString()}</Typography>
              <Typography>Status: {tour.status}</Typography>
              
              {/* Cancel Tour Button */}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleOpenDialog(tour.id)}
              >
                Cancel Tour
              </Button>

              {/* Get Code Button */}
              <Button
                variant="contained"
                color="primary"
                sx={{ ml: 1 }}
                disabled={!isTourAvailableNow(tour)}
              >
                Get Code
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No upcoming tours scheduled.</Typography>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Cancel Tour</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this tour?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmCancel} color="secondary" autoFocus>
            Yes, Cancel Tour
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tours;
