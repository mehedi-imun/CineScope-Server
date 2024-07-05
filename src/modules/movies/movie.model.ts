import { format } from "date-fns";
import { Schema, model } from "mongoose";
import slugify from "slugify";
import { TMovie, TMovieMethods, TMovieModel } from "./movie.interface";

const movieSchema = new Schema<TMovie, TMovieModel, TMovieMethods>({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  releaseDate: {
    type: Date,
  },
  genre: {
    type: String,
    required: [true, "Genre is required"],
  },
  director: {
    type: String,
    required: [true, "Director is required"],
  },
  cast: {
    type: String,
    required: [true, "Cast is required"],
  },
  slug: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: [true, "image is required"],
  },
});

/* Way-2: Using pre hook middleware
     
     movieSchema.pre("save", async function (next) {
     const date = format(this.releaseDate, "dd-MM-yyyy");

  //creating slug
  this.slug = slugify(`${this.title}-${date}}`, {
  lower: true,
  });
   
next();
// }
);

*/

movieSchema.method("createSlug", function createSlug(payload: TMovie) {
  const date = format(payload.releaseDate, "dd-MM-yyyy");

  //creating slug
  const slug = slugify(`${payload.title}-${date}}`, {
    lower: true,
  });

  return slug;
});
export const Movie = model<TMovie, TMovieModel>("Movie", movieSchema);
