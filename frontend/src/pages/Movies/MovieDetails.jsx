import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FiArrowLeft } from "react-icons/fi";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();

      refetch();
      setRating(0);
      setComment("");
      toast.success("Review submitted successfully");
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-teal-400 hover:text-teal-300 transition-colors duration-200 mb-8 text-lg"
        >
          <FiArrowLeft className="mr-2" size={20} />
          Back to Movies
        </Link>

        {/* Movie Content */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Movie Poster */}
          <div className="lg:w-2/5 xl:w-1/3">
            <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700 hover:border-teal-400 transition-all duration-300">
              <img
                src={movie?.image || '/placeholder-movie.jpg'}
                alt={movie?.name || 'Movie poster'}
                className="w-full h-full object-cover aspect-[2/3]"
                onError={(e) => {
                  e.target.src = '/placeholder-movie.jpg';
                }}
              />
            </div>
          </div>

          {/* Movie Info */}
          <div className="lg:w-3/5 xl:w-2/3">
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-teal-400">
                  {movie?.name}
                </h1>
                {movie?.year && (
                  <span className="text-2xl text-gray-400 bg-gray-800 px-4 py-2 rounded-lg">
                    {movie.year}
                  </span>
                )}
              </div>

              {/* Rating */}
              {movie?.rating && (
                <div className="flex items-center mb-6">
                  <StarRating rating={movie.rating} />
                  <span className="ml-3 text-xl text-gray-300">
                    {movie.rating.toFixed(1)}/5
                  </span>
                </div>
              )}

              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {movie?.detail || 'No description available.'}
              </p>

              {/* Cast */}
              {movie?.cast?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-teal-400">Cast</h3>
                  <div className="flex flex-wrap gap-3">
                    {movie.cast.map((actor, index) => (
                      <span
                        key={index}
                        className="bg-gray-800 px-4 py-2 rounded-full text-sm hover:bg-teal-600 hover:text-white transition-colors duration-200"
                      >
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tabs Section */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
              <MovieTabs
                loadingMovieReview={loadingMovieReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                movie={movie}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;