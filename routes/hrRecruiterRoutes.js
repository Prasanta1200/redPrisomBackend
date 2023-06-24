// const express = require('express');
// const bcrypt = require('bcrypt');
// // const HRRecruiter = require('../models/hrRecruiter');
// // const { generateOTP } = require('../utils/passwordUtils');
// const HRRecruiter = require('../models/hrRecruiter');
// const {generateOTP} = require('../utils/passwordUtils')

// const router = express.Router();

// router.post('/signup', async (req, res) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       username,
//       password,
//       phoneNumber,
//       email,
//       companyName
//     } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const hrRecruiter = new HRRecruiter({
//       firstName,
//       lastName,
//       username,
//       password: hashedPassword,
//       phoneNumber,
//       email,
//       companyName
//     });

//     await hrRecruiter.save();

//     res.status(200).json({ message: 'Successfully registered on XXX. Go to login page.' });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred during sign up.' });
//   }
// });

// router.post('/signin', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const hrRecruiter = await HRRecruiter.findOne({ username });

//     if (!hrRecruiter) {
//       return res.status(404).json({ error: 'HR recruiter not found.' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, hrRecruiter.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid password.' });
//     }

//     // Generate and send OTP to the registered phone number
//     const otp = generateOTP();
//     // Code to send OTP via SMS or any other medium

//     res.status(200).json({ otp });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred during sign in.' });
//   }
// });

// module.exports = router;




const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HRRecruiter = require('../models/hrRecruiter');
const { generateOTP } = require('../utils/passwordUtils');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      password,
      phoneNumber,
      email,
      companyName
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const hrRecruiter = new HRRecruiter({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      phoneNumber,
      email,
      companyName
    });

    await hrRecruiter.save();

    res.status(200).json({ message: `Successfully registered on ${username}. Go to login page.` });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during sign up.' });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;

    const hrRecruiter = await HRRecruiter.findOne({ username });

    if (!hrRecruiter) {
      return res.status(404).json({ error: 'HR recruiter not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, hrRecruiter.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    // Generate and send OTP to the registered phone number
    const otp = generateOTP();
    // Code to send OTP via SMS or any other medium

    // Generate a token
    const token = jwt.sign({ username: hrRecruiter.username }, 'your-secret-key', { expiresIn: '1h' });
    console.log(token);

    res.status(200).json({ otp, token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during sign in.' });
  }
});

module.exports = router;
