// const mongoose = require('mongoose');

// const jobSchema = new mongoose.Schema({
//     company: {
//         name: {
//           type: String,
//           required: true
//         },
//         phoneNumber: {
//           type: String,
//           required: true
//         },
//         logo: {
//           type: String,
//           required: true
//         },
//         banner: {
//           type: String,
//           required: true
//         },
//         activeStatus: {
//           type: Boolean,
//           required: true
//         }
//       },
//   location: {
//     type: String,
//     required: true
//   },
//   technology:{
//     type:String,
//     required:true
//   },
//   exp:{
//     type:Number,
//     required:true
//   },
//   salaryRange:{
//     type:Number,
//     required:true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   postedBy: {
//     type: String,
//     required: true
//   }
// });

// module.exports = mongoose.model('Job', jobSchema);

const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const jobSchema = new mongoose.Schema({
  // technology: {
  //   type: String,
  //   required: true
  // },
  // location: {
  //   type: String,
  //   required: true
  // },
  // description: {
  //   type: String,
  //   required: true
  // },
  // company: {
  //           name: {
  //             type: String,
  //             required: true
  //           },
  //           phoneNumber: {
  //             type: String,
  //             required: true
  //           },
  //           logo: {
  //             type: String,
  //             required: true
  //           },
  //           banner: {
  //             type: String,
  //             required: true
  //           },
  //           activeStatus: {
  //             type: Boolean,
  //             required: true
  //           }
  //         },
  // experience: {
  //   type: Number,
  //   required: true
  // },
  // salary: {
  //   type: Number,
  //   required: true
  // },
  // postedBy: {
  //   type: String,
  //   required: true
  // },
  // approved: {
  //   type: Boolean,
  //   default: false
  // }
  technology: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  company: {
    name: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: true
    },
    banner: {
      type: String,
      required: true
    },
    activeStatus: {
      type: Boolean,
      required: true
    }
  },
  experience: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  postedBy: {
    // type: Schema.Types.ObjectId,
    // ref: 'User',
    // required: true
    type: String,
    required: true
  },
  approved: {
    type: Boolean,
    default: false
  }

});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
