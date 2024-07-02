/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type TMovie = {
  title: string;
  description: string;
  releaseDate: Date;
  genre: string;
  slug: string;
  viewCount: number;
  totalRating: number;
  isDeleted?: boolean;
};

// Put all user instance methods in this interface:
export type TMovieMethods = {
  createSlug(payload: TMovie): string;
};

export type TMovieModel = Model<TMovie, Record<string, unknown>, TMovieMethods>;
