const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Connect to DB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Set the static folder
app.use(express.static(path.join(__dirname, "client")));
app.use("/box_art", express.static("uploads"));

// Set the routes for the endpoints.
app.use("/api/games", require("./routes/api/games"));
app.use("*", (req, res) => {
  res.status(400).json("Bad request");
});

// Start server
app.listen(process.env.PORT, () => {
  console.log("Server started on port: " + process.env.PORT);
});
