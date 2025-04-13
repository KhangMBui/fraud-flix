const express = require("express");
const router = express.Router();
const adminUserController = require("../controllers/adminUserController");
const adminMovieController = require("../controllers/adminMovieController");
const adminGenreController = require("../controllers/adminGenreController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");