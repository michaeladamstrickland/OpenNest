import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Grid, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const ScheduleViewingModal = ({ open, handleClose, propertyTitle }) => {
  const [selectedSlot, setSelectedSlot] = useState('');

  const timeSlots = [
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '4:00 PM - 5:00 PM',
  ];

  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value);
  };

  const handleConfirm = () => {
    alert(`Viewing scheduled for ${propertyTitle} at ${selectedSlot}`);
    handleClose();  // Close the modal after confirmation
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="schedule-viewing-title"
      aria-describedby="schedule-viewing-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '10px',
        }}
      >
        <Typography id="schedule-viewing-title" variant="h6" component="h2" gutterBottom>
          Schedule Viewing for {propertyTitle}
        </Typography>

        <Typography id="schedule-viewing-description" sx={{ mt: 2 }}>
          Select a time slot for your viewing:
        </Typography>

        <RadioGroup value={selectedSlot} onChange={handleSlotChange}>
          {timeSlots.map((slot, index) => (
            <FormControlLabel
              key={index}
              value={slot}
              control={<Radio />}
              label={slot}
            />
          ))}
        </RadioGroup>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirm}
              disabled={!selectedSlot}  // Disable if no slot is selected
            >
              Confirm
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ScheduleViewingModal;
