import { apiSlice } from "./apiSlice";
import { MOVIE_URL, UPLOAD_URL } from "../constants";

export const moviesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: () => ({
        url: `${MOVIE_URL}/all-movies`,
        credentials: "include",
      }),
      providesTags: ["Movies"],
    }),

    createMovie: builder.mutation({
      query: (newMovie) => ({
        url: `${MOVIE_URL}/create-movie`,
        method: "POST",
        body: newMovie,
        credentials: "include",
      }),
      invalidatesTags: ["Movies"],
    }),

    updateMovie: builder.mutation({
      query: ({ id, updatedMovie }) => ({
        url: `${MOVIE_URL}/update-movie/${id}`,
        method: "PUT",
        body: updatedMovie,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Movies", id },
        "Movies",
      ],
    }),

    addMovieReview: builder.mutation({
      query: ({ id, rating, comment }) => ({
        url: `${MOVIE_URL}/${id}/reviews`,
        method: "POST",
        body: { rating, comment },
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Movies", id },
      ],
    }),

    deleteComment: builder.mutation({
      query: ({ movieId, reviewId }) => ({
        url: `${MOVIE_URL}/delete-comment`,
        method: "DELETE",
        body: { movieId, reviewId },
        credentials: "include",
      }),
      invalidatesTags: (result, error, { movieId }) => [
        { type: "Movies", id: movieId },
      ],
    }),

    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `${MOVIE_URL}/delete-movie/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Movies"],
    }),

    getSpecificMovie: builder.query({
      query: (id) => ({
        url: `${MOVIE_URL}/specific-movie/${id}`,
        credentials: "include",
      }),
      providesTags: (result, error, id) => [{ type: "Movies", id }],
    }),

    uploadImage: builder.mutation({
      query: (formData) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: formData,
        credentials: "include",
        // Don't set Content-Type manually, browser sets it automatically with FormData
      }),
      invalidatesTags: ["Movies"], // optional: update if your upload affects movie list
    }),

    getNewMovies: builder.query({
      query: () => ({
        url: `${MOVIE_URL}/new-movies`,
        credentials: "include",
      }),
      providesTags: ["Movies"],
    }),

    getTopMovies: builder.query({
      query: () => ({
        url: `${MOVIE_URL}/top-movies`,
        credentials: "include",
      }),
      providesTags: ["Movies"],
    }),

    getRandomMovies: builder.query({
      query: () => ({
        url: `${MOVIE_URL}/random-movies`,
        credentials: "include",
      }),
      providesTags: ["Movies"],
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
