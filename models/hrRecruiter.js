const mongoose = require('mongoose');
const validator = require('validator');

const hrRecruiterSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, unique: true },
  password: String,
  phoneNumber: String,
  email: {
    type: String,
    validate: {
      validator: (value) => validator.isEmail(value) && value.endsWith('@hr.com'),
      message: 'Please enter a valid hr email address.'
    }
  },
  companyName: String
});

module.exports = mongoose.model('HRRecruiter', hrRecruiterSchema);
