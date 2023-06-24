


// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const JobSeeker = require('../models/jobSeeker');
// const { generateOTP } = require('../utils/passwordUtils');

// const router = express.Router();

// const SECRET_KEY = "Secret";

// router.post('/signup', async (req, res) => {
//     try {
//       const {
//         firstName,
//         lastName,
//         username,
//         password,
//         phoneNumber,
//         gender,
//         email,
//         currentCompany,
//         techSkills,
//         experience,
//         city,
//         state,
//         zip,
//         lookingForJob,
//         noticePeriod,
//         immediateJoiner
//       } = req.body;
  
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       const jobSeeker = new JobSeeker({
//         firstName,
//         lastName,
//         username,
//         password: hashedPassword,
//         phoneNumber,
//         gender,
//         email,
//         currentCompany,
//         techSkills,
//         experience,
//         city,
//         state,
//         zip,
//         lookingForJob,
//         noticePeriod,
//         immediateJoiner
//       });
  
//       // Validate the jobSeeker data
//       const validationError = jobSeeker.validateSync();
//       if (validationError) {
//         const errorMessage = validationError.errors[Object.keys(validationError.errors)[0]].message;
//         return res.status(400).json({ error: errorMessage });
//       }
  
//       await jobSeeker.save();
  
//       res.status(200).json({ message: `Successfully registered on ${username}. Redirected to the login page.` });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ error: 'An error occurred during sign up.' });
//     }
//   });
  
// router.post('/signin', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const jobSeeker = await JobSeeker.findOne({ username });

//     if (!jobSeeker) {
//       return res.status(404).json({ error: 'Job seeker not found.' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, jobSeeker.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid password.' });
//     }

//     // Generate and send OTP to the registered phone number
//     const otp = generateOTP();
//     // Code to send OTP via SMS or any other medium

//     // Generate a token
//     const token = jwt.sign({ username: jobSeeker.username }, SECRET_KEY, { expiresIn: '1h' });

//     res.status(200).json({ otp, token });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred during sign in.' });
//   }
// });

// module.exports = router;

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JobSeeker = require('../models/jobSeeker');
const { generateOTP } = require('../utils/passwordUtils');

const router = express.Router();

const SECRET_KEY = "Secret";

router.post('/signup', async (req, res) => {
  try {
    // Extract data from the request body
    const {
      firstName,
      lastName,
      username,
      password,
      phoneNumber,
      gender,
      email,
      currentCompany,
      techSkills,
      experience,
      city,
      state,
      zip,
      lookingForJob,
      noticePeriod,
      immediateJoiner
    } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new job seeker
    const jobSeeker = new JobSeeker({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      phoneNumber,
      gender,
      email,
      currentCompany,
      techSkills,
      experience,
      city,
      state,
      zip,
      lookingForJob,
      noticePeriod,
      immediateJoiner
    });

    // Validate the jobSeeker data
    const validationError = jobSeeker.validateSync();
    if (validationError) {
      const errorMessage = validationError.errors[Object.keys(validationError.errors)[0]].message;
      return res.status(400).json({ error: errorMessage });
    }

    await jobSeeker.save();

    res.status(200).json({ message: `Successfully registered on ${username}. Redirected to the login page.` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred during sign up.' });
  }
});


router.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;

    const jobSeeker = await JobSeeker.findOne({ username });

    if (!jobSeeker) {
      return res.status(404).json({ error: 'Job seeker not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, jobSeeker.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    // Generate and send OTP to the registered phone number
    const otp = generateOTP();
    // Code to send OTP via SMS or any other medium

    // Generate a token
    const token = jwt.sign({ username: jobSeeker.username }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ otp, token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during sign in.' });
  }
});

module.exports = router;
