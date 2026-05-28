const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// Public: Submit a lead (no auth required - for landing page / Google Ads)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, source } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Name, email, and phone are required.' });
    }

    // Check if lead with same email already exists for this source
    const existingLead = await Lead.findOne({ email: email.toLowerCase(), source: source || 'node-js-course' });
    if (existingLead) {
      return res.status(200).json({ success: true, message: 'Thank you! We already have your details. Our team will reach out soon.' });
    }

    const lead = await Lead.create({
      name,
      email: email.toLowerCase(),
      phone,
      source: source || 'node-js-course'
    });

    res.status(201).json({ success: true, message: 'Thank you! Our team will contact you shortly.', lead });
  } catch (error) {
    console.error('Lead submission error:', error);
    res.status(500).json({ message: 'Failed to submit. Please try again.' });
  }
});

// Admin: Get all leads (protected - called from admin dashboard)
router.get('/', async (req, res) => {
  try {
    const { source } = req.query;
    const filter = source ? { source } : {};
    const leads = await Lead.find(filter).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({ message: 'Failed to fetch leads.' });
  }
});

// Admin: Update lead status
router.put('/:id', async (req, res) => {
  try {
    const { status, notes } = req.body;
    const updateData = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const lead = await Lead.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!lead) return res.status(404).json({ message: 'Lead not found.' });
    res.json({ success: true, lead });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update lead.' });
  }
});

// Admin: Delete a lead
router.delete('/:id', async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found.' });
    res.json({ success: true, message: 'Lead deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete lead.' });
  }
});

module.exports = router;
