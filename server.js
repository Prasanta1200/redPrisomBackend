const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const cors= require("cors")
//app.use(cors())
//app.use(cors({ origin: "*" }));


// Import the routes

const hrRecruiterRoutes = require('./routes/hrRecruiterRoutes');
const jobSeekerRoutes = require('./routes/jobSeekerRoutes')
const jobPostRoutes = require('./routes/jobPostRoutes');

// const app = express();
const PORT = process.env.PORT || 4000;
const DB = process.env.MONGODB_URI || "mongodb+srv://Prasanta:Prasanta@cluster0.z4m8koz.mongodb.net/?retryWrites=true&w=majority";

if (!DB) {
    console.error("DB_CONNECTION_STRING environment variable is not set");
    process.exit(1);
}
mongoose.connect(DB).then(() => {
    console.log("Connection Success");
}).catch((err) => {
    console.log(err.message);
})

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Routes
app.use('/hr-recruiters', hrRecruiterRoutes);
app.use('/job-seekers', jobSeekerRoutes);
app.use('/job-posts', jobPostRoutes);


app.get('/something', (req, res) => {
    res.send('Hello, this is the response for the GET request!');
  });
  // Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Job Portal API!');
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
