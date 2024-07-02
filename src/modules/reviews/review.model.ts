import { Schema, model } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new Schema<TReview>({
  movie: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

export const Review = model<TReview>("Review", reviewSchema);
