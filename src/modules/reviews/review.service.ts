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

export const ReviewServices = {
  addReview,
  //   getAllReviews,
  //   getReviewById
  //   updateReview,
  //   deleteReview,
};
