import { apiSlice } from "./apiSlice";
import { MOVIE_URL, UPLOAD_URL } from "../constants";

export const moviesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: () => ({
        url: `${MOVIE_URL}/all-movies`,
        credentials: "include",
      }),
    }),

    createMovie: builder.mutation({
      query: (newMovie) => ({
        url: `${MOVIE_URL}/create-movie`,
        method: "POST",
        body: newMovie,
        credentials: "include",
      }),
    }),

    updateMovie: builder.mutation({
      query: ({ id, updatedMovie }) => ({
        url: `${MOVIE_URL}/update-movie/${id}`,
        method: "PUT",
        body: updatedMovie,
        credentials: "include",
      }),
    }),

    addMovieReview: builder.mutation({
      query: ({ id, rating, comment }) => ({
        url: `${MOVIE_URL}/${id}/reviews`,
        method: "POST",
        body: { rating, id, comment },
        credentials: "include",
      }),
    }),

    deleteComment: builder.mutation({
      query: ({ movieId, reviewId }) => ({
        url: `${MOVIE_URL}/delete-comment`,
        method: "DELETE",
        body: { movieId, reviewId },
        credentials: "include",
      }),
    }),

    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `${MOVIE_URL}/delete-movie/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),

    getSpecificMovie: builder.query({
      query: (id) => ({
        url: `${MOVIE_URL}/specific-movie/${id}`,
        credentials: "include",
      }),
    }),

    uploadImage: builder.mutation({
      query: (formData) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: formData,
        credentials: "include",
      }),
    }),

    getNewMovies: builder.query({
      query: () => ({
        url: `${MOVIE_URL}/new-movies`,
        credentials: "include",
      }),
    }),

    getTopMovies: builder.query({
      query: () => ({
        url: `${MOVIE_URL}/top-movies`,
        credentials: "include",
      }),
    }),

    getRandomMovies: builder.query({
      query: () => ({
        url: `${MOVIE_URL}/random-movies`,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetAllMoviesQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useAddMovieReviewMutation,
  useDeleteCommentMutation,
  useGetSpecificMovieQuery,
  useUploadImageMutation,
  useDeleteMovieMutation,
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} = moviesApiSlice;
