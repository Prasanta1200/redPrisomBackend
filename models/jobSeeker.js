const mongoose = require('mongoose');

// const stateCityMap = {
//   'West Bengal': ['Bankura', 'Prulia', 'Kolkata', 'Hugly'],
//   'Karnataka': ['Bidar', 'Ballary', 'Udupi'],
//   'Maharashtra': ['City A', 'City B', 'City C'],
//   'Rajasthan': ['City X', 'City Y', 'City Z'],
//   'Gujarat': ['City M', 'City N', 'City O'],
//   'Bihar': ['City P', 'City Q', 'City R']
// };

const jobSeekerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, unique: true },
  password: String,
  phoneNumber: String,
  gender: {
    type: String,
    enum: ['male', 'female', 'prefer not to say'],
    default: 'prefer not to say'
  },
  email: String,
  currentCompany: { type: String, default: 'NA' },
  techSkills: {
    type: String,
    enum: ['Java', 'Testing', 'Python']
  },
  experience: String,
  // location: {
  //   state: {
  //     type: String,
  //     enum: ['West Bengal', 'Karnataka', 'Maharashtra', 'Rajasthan', 'Gujarat', 'Bihar'],
  //     validate: {
  //       validator: function(value) {
  //         if (this.location.city && this.location.city.length > 0) {
  //           const cities = stateCityMap[value];
  //           return this.location.city.every(city => cities.includes(city));
  //         }
  //         return true;
  //       },
  //       message: 'Invalid city for the selected state.'
  //     }
  //   },
  //   city: {
  //     type: [String],
  //     validate: {
  //       validator: function(value) {
  //         if (this.location.state && this.location.state !== '') {
  //           const cities = stateCityMap[this.location.state];
  //           return value.every(city => cities.includes(city));
  //         }
  //         return true;
  //       },
  //       message: 'Invalid city for the selected state.'
  //     }
  //   },
  //   area: String,
  //   isActive: Boolean
  // },
  city:String,
  state:String,
  zip:String,
  // lookingForJob: Boolean,
  // noticePeriod: Boolean,
  // immediateJoiner: Boolean
    lookingForJob: String,
   noticePeriod: String,
   immediateJoiner: String
});

module.exports = mongoose.model('JobSeeker', jobSeekerSchema);
