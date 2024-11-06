const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cors = require('cors');


// Define middleware here
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}




// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://strickland1514:OpenNest247@opennest.d9nhx.mongodb.net/?retryWrites=true&w=majority&appName=OpenNest", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  writeConcern: {
    w: 'majority',
    wtimeout: 5000
  }
});

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
