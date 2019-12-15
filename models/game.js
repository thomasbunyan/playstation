const mongoose = require("mongoose");

const GameSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true,
    enum: ["PS", "PS2", "PS3", "PS4"]
  },
  genre: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  players: {
    type: Number,
    required: true,
    min: [1, "You need at least one player"],
    max: [128, "Too many players"]
  },
  publisher: {
    type: String,
    required: true
  },
  boxArt: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Game", GameSchema);
