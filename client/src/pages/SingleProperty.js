import React from 'react';
import { useParams } from 'react-router-dom';
import { usePropertyContext } from './Context';  // Assuming properties are in context
import { useAuth } from '../context/AuthContext';  // Import authentication context
import ScheduleViewingModal from '../components/ScheduleViewingModal';  // Modal for scheduling a viewing
import { Button } from '@mui/material';  // Material UI for buttons

const SinglePropertyPage = () => {
  const { id } = useParams();  // Get property ID from route
  const { properties } = usePropertyContext();  // Get properties from context
  const { user } = useAuth();  // Get logged-in user from authentication context
  const [openModal, setOpenModal] = React.useState(false);  // State to handle modal visibility

  // Find the property (parse id to integer)
  const property = properties.find((prop) => prop.id === parseInt(id));

  if (!property) {
    return <div>Property not found.</div>;
  }

  const handleScheduleViewing = () => {
    setOpenModal(true);  // Open the modal when user clicks "Schedule Viewing"
  };

  const handleCloseModal = () => {
    setOpenModal(false);  // Close the modal
  };

  return (
    <div>
      <h1>{property.title}</h1>
      <p>{property.description}</p>
      <p>Price: ${property.price.toLocaleString()}</p>
      <p>Location: {property.city}, {property.state} {property.zip}</p>
      <p>Beds: {property.beds} | Baths: {property.baths} | Sqft: {property.sqft}</p>
      <p>Lot Size: {property.lot_size} sqft | Year Built: {property.year_built}</p>

      {/* Display additional actions only if user is logged in */}
      {user ? (
        <>
          <p>Your approval level: ${user.approvalLevel}</p>
          {user.approvalLevel >= property.price ? (
            <Button variant="contained" color="primary" onClick={() => alert('Offer submitted successfully!')}>
              Submit Offer
            </Button>
          ) : (
            <p>Your approval level is not high enough to make an offer on this property.</p>
          )}

          {/* Schedule Viewing Button */}
          <Button variant="outlined" color="secondary" onClick={handleScheduleViewing}>
            Schedule Viewing
          </Button>

          {/* Schedule Viewing Modal */}
          <ScheduleViewingModal
            open={openModal}
            handleClose={handleCloseModal}
            propertyTitle={property.title}
          />
        </>
      ) : (
        <p>Please log in to make an offer or schedule a tour.</p>
      )}
    </div>
  );
};

export default SinglePropertyPage;
