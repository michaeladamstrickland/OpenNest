// controllers/tourController.js
const { Tour, Property } = require('../models');

const getUpcomingTours = async (req, res) => {
    const { userId } = req.query;
  
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
  
    try {
      const tours = await Tour.findAll({
        where: { userId },
        include: [
          {
            model: Property,
            attributes: [
              'id',
              'title',
              'address',
              'city',
              'state',
              'zip',
              'imageUrl',
              'price',
              'description',
              'isImmediateTourAvailable',
              'viewingOption'
            ],
          },
        ],
        order: [['scheduledDate', 'ASC']],
      });
  
      // Filter out tours that don't have an associated Property
      const populatedTours = tours.filter((tour) => tour.Property);
      res.status(200).json(populatedTours);
    } catch (error) {
      console.error("Error fetching upcoming tours:", error);
      res.status(500).json({ error: "Failed to fetch upcoming tours" });
    }
  };
  

  const getTourCode = async (req, res) => {
    const { tourId } = req.params;
  
    try {
      const tour = await Tour.findByPk(tourId, { include: Property });
  
      if (!tour) {
        return res.status(404).json({ message: 'Tour not found' });
      }
  
      const currentTime = new Date();
      const scheduledTime = new Date(tour.scheduledDate);
  
      if (currentTime >= scheduledTime || tour.Property.isImmediateTourAvailable) {
        const tourCode = 'CODE123'; // Replace with unique code logic if needed
        return res.status(200).json({ tourCode });
      } else {
        return res.status(403).json({
          message: 'The tour code will be available at the scheduled time.',
        });
      }
    } catch (error) {
      console.error('Error fetching tour code:', error);
      res.status(500).json({ message: 'Failed to retrieve tour code' });
    }
  };
  
const scheduleTour = async (req, res) => {
    const { propertyId, userId, scheduledDate } = req.body;
  
    try {
      // Check for conflicting tours at the same time
      const existingTour = await Tour.findOne({
        where: { propertyId, scheduledDate, status: 'confirmed' },
      });
  
      if (existingTour) {
        return res.status(409).json({ message: 'This tour time is already booked. Please choose another time.' });
      }
  
      // Create the new tour
      const newTour = await Tour.create({
        propertyId,
        userId,
        scheduledDate,
        status: 'pending',
      });
  
      res.status(201).json(newTour);
    } catch (error) {
      console.error('Error scheduling tour:', error);
      res.status(500).json({ message: 'Failed to schedule tour' });
    }
  };

  const cancelTour = async (req, res) => {
    const { tourId } = req.params;
  
    try {
      const tour = await Tour.findByPk(tourId);
  
      if (!tour) {
        return res.status(404).json({ message: 'Tour not found' });
      }
  
      tour.status = 'canceled';
      await tour.save();
  
      res.status(200).json({ message: 'Tour canceled successfully' });
    } catch (error) {
      console.error('Error canceling tour:', error);
      res.status(500).json({ message: 'Failed to cancel tour' });
    }
  };
  
  
  
  
module.exports = { getUpcomingTours, scheduleTour, cancelTour, getTourCode };
