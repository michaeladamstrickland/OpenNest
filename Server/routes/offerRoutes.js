const express = require('express');
const router = express.Router();
const { Offer } = require('../models');

// Submit an offer
router.post('/', async (req, res) => {
  const { propertyId, buyerId, offerAmount, status } = req.body;
  try {
    const offer = await Offer.create({ propertyId, buyerId, offerAmount, status });
    res.status(201).json(offer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all offers for a property
router.get('/property/:propertyId', async (req, res) => {
  try {
    const offers = await Offer.findAll({ where: { propertyId: req.params.propertyId } });
    res.json(offers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Accept or reject an offer
router.put('/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const offer = await Offer.findByPk(req.params.id);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    const updatedOffer = await offer.update({ status });
    res.json(updatedOffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
