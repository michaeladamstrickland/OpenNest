const express = require('express');
const router = express.Router();
const { Tour, Property } = require('../models');
const { getUpcomingTours, scheduleTour  } = require('../controllers/tourController');

// Schedule a tour (buyer schedules a tour)
router.post('/', scheduleTour);

// Endpoint to get upcoming tours for a specific user
router.get('/upcoming', getUpcomingTours);

// Get all confirmed tours for a buyer
router.get('/buyer/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const tours = await Tour.findAll({
            where: { userId, status: 'confirmed' }, // Only confirmed tours
            include: [{ model: Property }],
            order: [['scheduledDate', 'ASC']]
        });

        res.json(tours);
    } catch (error) {
        console.error("Error fetching buyer's tours:", error);
        res.status(500).json({ error: "An error occurred while fetching tours" });
    }
});

// Approve or reschedule a tour (seller approves or reschedules)
router.put('/approve/:tourId', async (req, res) => {
    const { tourId } = req.params;
    const { status, newScheduledDate } = req.body;

    try {
        const tour = await Tour.findByPk(tourId);
        if (!tour) {
            return res.status(404).json({ error: "Tour not found" });
        }

        // If rescheduling, update the date
        if (newScheduledDate) {
            tour.scheduledDate = newScheduledDate;
        }

        // Update tour status to confirmed or as per seller's decision
        tour.status = status || 'confirmed';
        await tour.save();

        res.json(tour);
    } catch (error) {
        console.error("Error approving/rescheduling tour:", error);
        res.status(500).json({ error: "An error occurred while approving the tour" });
    }
});

// Get all pending tours for a property (for seller to review)
router.get('/property/:propertyId/pending', async (req, res) => {
    const { propertyId } = req.params;

    try {
        const tours = await Tour.findAll({
            where: { propertyId, status: 'pending' },
            include: [{ model: Property }]
        });

        res.json(tours);
    } catch (error) {
        console.error("Error fetching pending tours for property:", error);
        res.status(500).json({ error: "An error occurred while fetching pending tours" });
    }
});

// Get all upcoming tours for a specific buyer
router.get('/buyer/:buyerId/upcoming', async (req, res) => {
    try {
        const tours = await Tour.findAll({
            where: { userId: req.params.buyerId },
            include: [{ model: Property }],
            order: [['scheduledDate', 'ASC']],
        });
        res.json(tours);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
