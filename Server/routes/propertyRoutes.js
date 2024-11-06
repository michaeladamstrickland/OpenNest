const express = require('express');
const router = express.Router();
const { Property } = require('../models');

// Get all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get property by ID
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new property
router.post('/', async (req, res) => {
  const { title, description, price, address, city, state, zip, viewingOption } = req.body;
  try {
    const property = await Property.create({ title, description, price, address, city, state, zip, viewingOption });
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update property details
router.put('/:id', async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    const updatedProperty = await property.update(req.body);
    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
