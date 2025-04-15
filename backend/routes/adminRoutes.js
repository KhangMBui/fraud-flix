const express = require("express");
const router = express.Router();
const adminUserController = require("../controllers/adminUserController");
const adminMovieController = require("../controllers/adminMovieController");
const adminGenreController = require("../controllers/adminGenreController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.use(authMiddleware);
router.use(adminMiddleware);
router.get("/dashboard", adminUserController.getDashboardStats);
router.get("/users", adminUserController.getUsers);
router.get("/users/:userId", adminUserController.getUserById);
router.put("/users/:userId", adminUserController.updateUserType);
router.delete("/users/:userId", adminUserController.deleteUser);

router.get("/movies", adminMovieController.getMovies);
router.get("/movies/:id", adminMovieController.getMovieByID);
router.put("/movies/:id", adminMovieController.updateMovie);
router.delete("/movies/:id", adminMovieController.deleteMovie);

router.get("/genres", adminGenreController.getGenres);
router.get("/genres/:id", adminGenreController.getGenreByID);
router.put("/genres/:id", adminGenreController.updateGenre);

module.exports = router;
