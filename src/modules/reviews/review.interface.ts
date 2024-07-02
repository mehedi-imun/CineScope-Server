import { ObjectId } from "mongoose";

export type TReview = {
  movie: ObjectId;
  email: string;
  rating: number;
  comment: string;
};
