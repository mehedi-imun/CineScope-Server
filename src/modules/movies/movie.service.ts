/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TMovie } from "./movie.interface";
import { Movie } from "./movie.model";
const createMovie = async (payload: TMovie) => {
  /* 
  Way1: Using business logic here....

   title - releaseDate
   WE will get: Inception Two 2010-07-16T00:00:00.000Z
   We want:  inception-two -2010-07-16
    
   const date = format(payload.releaseDate, "dd-MM-yyyy");

   //creating slug 
   const slug = slugify(`${payload.title}-${date}}`, {
       lower: true,
   });
   //const result = await Movie.create(payload);
*/
  /* Way3: Using instance method logic here....

  
  const result = new Movie(payload);
  
  const slug = result.createSlug(payload);
  
  result.slug = slug;
  await result.save(); // database save

  return result;
  */

  const result = new Movie(payload);

  const slug = result.createSlug(payload);

  result.slug = slug;
  await result.save(); // database save

  return result;
};

const getAllMovies = async () => {
  const result = await Movie.find();
  return result;
};

const getMovieBySlug = async (slug: string) => {
  const movie = await Movie.findOne({ slug: slug });
  return movie;
};

export const MovieServices = {
  createMovie,
  getAllMovies,
  getMovieBySlug,
};

//interface => schema => model => query
