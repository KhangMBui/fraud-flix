const express = require("express");
const router = express.Router();
const movieController = require("./../controllers/movieController");

router.get("/search", movieController.search);

router.get("/getAllMovies", movieController.getAllMovies);

router.get("/getMovie/:id", movieController.getMovie);

module.exports = router;
