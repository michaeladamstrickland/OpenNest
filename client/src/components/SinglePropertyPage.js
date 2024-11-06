import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePropertyContext } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';
import { Button, Modal, Typography, TextField, Box } from '@mui/material';
import axios from 'axios';

const SinglePropertyPage = () => {
  const { id: propertyId } = useParams();
  const { properties } = usePropertyContext();
  const { authenticatedUser } = useAuth();
  const [tourProperty, setTourProperty] = useState(null);
  const [scheduledTour, setScheduledTour] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [tourCode, setTourCode] = useState(null);
  const [scheduleError, setScheduleError] = useState('');
  const [mainImage, setMainImage] = useState('');
  const property = properties?.find((prop) => prop.id.toString() === propertyId);
  const extraImages = property?.extra_images || [];

  useEffect(() => {
    if (property) {
      setMainImage(property.image_url || '');
    }
  }, [property]);

  useEffect(() => {
    const fetchPropertyAndTour = async () => {
      try {
        const propertyResponse = await axios.get(`/api/properties/${propertyId}`);
        setTourProperty(propertyResponse.data);
        console.log(propertyResponse, 'Property Details');

        const tourResponse = await axios.get('/api/tours/upcoming', {
          params: { userId: authenticatedUser.id, propertyId },
        });
        if (tourResponse.data.length > 0) {
          setScheduledTour(tourResponse.data[0]);
        }
      } catch (error) {
        console.error("Error fetching property or tour details:", error);
      }
    };

    fetchPropertyAndTour();
  }, [authenticatedUser, propertyId]);

  const handleThumbnailClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  const handleScheduleTour = async () => {
    try {
      const response = await axios.post('/api/tours', {
        propertyId,
        userId: authenticatedUser.id,
        scheduledDate,
        status: 'pending',
      });
      setScheduledTour(response.data);
      setModalOpen(false);
      setScheduleError('');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setScheduleError('This time slot is already booked. Please choose another.');
      } else {
        setScheduleError('Failed to schedule tour. Please try again later.');
      }
    }
  };

  const handleCancelTour = async () => {
    if (scheduledTour) {
      try {
        await axios.delete(`/api/tours/${scheduledTour.id}`);
        setScheduledTour(null);  // Reset scheduled tour on successful deletion
      } catch (error) {
        console.error("Error canceling tour:", error);
        alert("Failed to cancel the tour. Please try again later.");
      }
    }
  };

  const handleGetCode = async () => {
    if (!scheduledTour) return;

    try {
      const response = await axios.get(`/api/tours/${scheduledTour.id}/code`);
      setTourCode(response.data.tourCode);
    } catch (error) {
      console.error("Failed to retrieve tour code", error);
      alert("The code will be available at the scheduled time.");
    }
  };

  const handleMakeOffer = () => {
    window.location.href = `/offer/${propertyId}`;
  };

  const isTourAvailableNow = () => {
    if (!scheduledTour) return false;
    const currentTime = new Date();
    const scheduledTime = new Date(scheduledTour.scheduledDate);
    return currentTime >= scheduledTime || tourProperty?.isImmediateTourAvailable;
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1>{tourProperty?.title || property?.title}</h1>
      <p>{tourProperty?.description || property?.description}</p>
      <strong>Price:</strong> ${tourProperty?.price?.toLocaleString() || property?.price?.toLocaleString()} <br />
      <strong>Beds:</strong> {tourProperty?.beds || property?.beds} | <strong>Baths:</strong> {tourProperty?.baths || property?.baths} <br />
      <strong>Address:</strong> {tourProperty?.address || property?.address}, {tourProperty?.city || property?.city}, {tourProperty?.state || property?.state} {tourProperty?.zip || property?.zip}

      {/* Main Image */}
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <img
          src={mainImage}
          alt="Main property"
          style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
        />
      </div>

      {/* Thumbnail Carousel */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {[property?.image_url, ...extraImages].map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            style={{
              width: '100px',
              height: '70px',
              objectFit: 'cover',
              cursor: 'pointer',
              border: mainImage === image ? '2px solid blue' : '2px solid transparent',
            }}
            onClick={() => handleThumbnailClick(image)}
          />
        ))}
      </div>

      {/* Conditional Buttons */}
      {scheduledTour ? (
        <>
          <Typography>Date: {new Date(scheduledTour.scheduledDate).toLocaleDateString()}</Typography>
          <Typography>Time: {new Date(scheduledTour.scheduledDate).toLocaleTimeString()}</Typography>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleCancelTour}
            sx={{ mt: 2, mr: 1 }}
          >
            Cancel Tour
          </Button>

          {tourCode ? (
            <Typography>Your Code: {tourCode}</Typography>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleGetCode}
              disabled={!isTourAvailableNow()}
              sx={{ mt: 2 }}
            >
              Get Code
            </Button>
          )}
        </>
      ) : (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setModalOpen(true)}
          sx={{ mt: 2 }}
        >
          Schedule Tour
        </Button>
      )}

      {/* Make an Offer Button */}
      <Button
        variant="outlined"
        color="success"
        onClick={handleMakeOffer}
        sx={{ mt: 2 }}
      >
        Make an Offer
      </Button>

      {/* Schedule Tour Modal */}
      <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
        <Box p={4} bgcolor="background.paper" mx="auto" my={4}>
          <Typography variant="h6">Select Date and Time</Typography>
          <TextField 
            type="datetime-local" 
            value={scheduledDate} 
            onChange={(e) => setScheduledDate(e.target.value)}
            fullWidth
          />
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleScheduleTour}>
              Confirm Schedule
            </Button>
          </Box>
          {scheduleError && <Typography color="red">{scheduleError}</Typography>}
        </Box>
      </Modal>
    </div>
  );
};

export default SinglePropertyPage;
