const express = require('express');
const Job = require('../models/job');
const mongoose = require('mongoose');

const router = express.Router();

// Route to create a new job post
router.post('/create', async (req, res) => {
  try {
    const { technology, location, description, company, experience, salary, postedBy, autoApprove } = req.body;

    let message = 'Job post submitted for admin approval.';
    let approved = false;

    if (autoApprove) {
      message = 'Job post created and approved.';
      approved = true;
    }

    const job = new Job({
      technology,
      location,
      description,
      company: {
        name: company.name,
        phoneNumber: company.phoneNumber,
        logo: company.logo,
        banner: company.banner,
        activeStatus: company.activeStatus
      },
      experience,
      salary,
      postedBy,
      approved
    });

    await job.save();

    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get all job posts
router.get('/all', async (req, res) => {
  try {
    const jobs = await Job.find().exec();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the job posts.' });
  }
});

// Route to get a specific job post by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).exec();

    if (!job) {
      return res.status(404).json({ error: 'Job post not found.' });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the job post.' });
  }
});

// Route to update a specific job post by ID
router.put('/:id', async (req, res) => {
  try {
    const { technology, location, description, company, experience, salary, postedBy, approved } = req.body;

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      {
        technology,
        location,
        description,
        company: {
          name: company.name,
          phoneNumber: company.phoneNumber,
          logo: company.logo,
          banner: company.banner,
          activeStatus: company.activeStatus
        },
        experience,
        salary,
        postedBy,
        approved
      },
      { new: true }
    ).exec();

    if (!job) {
      return res.status(404).json({ error: 'Job post not found.' });
    }

    res.status(200).json({ message: 'Job post updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the job post.' });
  }
});

// Route to delete a specific job post by ID
router.delete('/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id).exec();

    if (!job) {
      return res.status(404).json({ error: 'Job post not found.' });
    }

    res.status(200).json({ message: 'Job post deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the job post.' });
  }
});

module.exports = router;
