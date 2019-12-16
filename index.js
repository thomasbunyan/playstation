const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Connect to DB
const MONGO_URL = "mongodb+srv://tom:0jk7FehIzIcBRtBK@projects-9nj1p.mongodb.net/playstation?retryWrites=true&w=majority";
mongoose
  .connect(MONGO_URL, {
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

const PORT = 4000;

// Start server
app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
