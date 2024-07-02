import express from "express";
import { MovieControllers } from "./movie.controller";
import { ReviewControllers } from "../reviews/review.controller";

const router = express.Router();

router.post("/", MovieControllers.createMovie);
router.get("/:slug", MovieControllers.getMovieBySlug);
router.get("/", MovieControllers.getAllMovies);
router.post("/:slug/review", ReviewControllers.addReview);
router.get("/:slug/reviews", ReviewControllers.getAllReviews);
router.get("/:id/single-review", ReviewControllers.getReviewById);
router.patch("/:slug/review", ReviewControllers.updateReview);
// router.delete("/:slug/review", ReviewControllers.deleteReview);

export const MovieRoutes = router;
