// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

const express = require("express");
const https = require("https");

// Start up an instance of app

const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

app.get("/all", function (req, res) {
  res.send(projectData);
});

app.post("/add", function (req, res) {
  projectData = {
    date: req.body.date,
    temp: req.body.temp,
    name: req.body.name,
    content: req.body.content,
  };
  console.log(projectData);
  res.send({
    success: true,
    message: "Data saved successfully",
    data: projectData,
  });
});

// Setup Server

const port = 8000;
const server = app.listen(port, listening);
function listening() {
  console.log("Server running on port 8000");
}
