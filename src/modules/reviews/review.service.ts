/* eslint-disable @typescript-eslint/no-explicit-any */
import { Movie } from "../movies/movie.model";
import { TReview } from "./review.interface";
import { Review } from "./review.model";

const addReview = async (
  slug: string,
  reviewData: Partial<TReview>
): Promise<TReview | any> => {
  const session = await Movie.startSession();

  const movie = await Movie.findOne({ slug });

  if (!movie) {
    throw new Error("Movie not found");
  }

  try {
    session.startTransaction();

    const review = await Review.create(
      [
        {
          movie: movie._id,
          ...reviewData,
        },
      ],
      { session }
    );

    const reviewsCount = await Review.countDocuments({
      movie: movie._id,
    }).session(session);

    // throw new Error("Movie not found");

    await Movie.updateOne({ slug }, { totalRating: reviewsCount }, { session });

    await session.commitTransaction();

    return review[0];
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    throw error;
  }

  session.endSession();
};
const getAllReviews = async (slug: string): Promise<TReview[]> => {
  const movie = await Movie.findOne({ slug });

  if (!movie) {
    throw new Error("Movie not found");
  }

  return await Review.find({ movie: movie._id });
};

const getReviewBySlug = async (id: string): Promise<TReview | null> => {
  return await Review.findById(id);
};
const updateReview = async (id: string, reviewData: Partial<TReview>): Promise<TReview | null> => {
  const review = await Review.findByIdAndUpdate(id, reviewData, { new: true });

  if (!review) {
    throw new Error("Review not found");
  }

  return review;
};
export const ReviewServices = {
  addReview,
  getAllReviews,
  getReviewBySlug,
    updateReview,
  //   deleteReview,
};
