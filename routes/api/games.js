const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const fileExtension = (file.originalname.match(/\.+[\S]+$/) || [])[0];
    cb(null, Date.now() + fileExtension);
  }
});
const upload = multer({ storage });
const Game = require("../../models/game");

// Gets all the stored game data
router.get("/", (req, res) => {
  Game.find({})
    .then((games) => res.json(games))
    .catch((err) => res.status(404).json({ success: false }));
});

// Gets a single game
router.get("/:id", (req, res) => {
  Game.findById(req.params.id)
    .then((game) => res.json(game))
    .catch((err) => res.status(404).json({ success: false }));
});

// Create new game
router.post("/", (req, res) => {
  new Game({
    name: req.body.name.toUpperCase(),
    platform: req.body.platform,
    genre: req.body.genre.toUpperCase(),
    releaseDate: req.body.releaseDate,
    players: req.body.players,
    publisher: req.body.publisher.toUpperCase(),
    boxArt: req.body.boxArt
  })
    .save()
    .then((game) => {
      game["success"] = true;
      res.status(201).json(game);
    })
    .catch((err) => {
      const errors = [];
      for (let e in err.errors) {
        errors.push({ [e]: err.errors[e].message });
      }
      console.log(errors);
      res.status(400).json({ success: false, msg: errors });
    });
});

router.post("/image", upload.single("boxArt"), (req, res) => {
  if (req.file) {
    res.status(201).json({
      success: true,
      path: req.file.filename
    });
  } else {
    res.status(400).json({
      success: false
    });
  }
});

module.exports = router;
