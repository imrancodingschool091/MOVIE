import { useGetAllMoviesQuery } from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import MovieCard from "./MovieCard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import banner from "../../assets/banner.jpg";
import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from "../../redux/features/movies/moviesSlice";

const AllMovies = () => {
  const dispatch = useDispatch();
  const { data } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

  const movieYears = data?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears)).sort((a, b) => b - a);

  useEffect(() => {
    dispatch(setFilteredMovies(data || []));
    dispatch(setMovieYears(movieYears));
    dispatch(setUniqueYears(uniqueYears));
  }, [data, dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));

    const filteredMovies = data.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    dispatch(setFilteredMovies(filteredMovies));
  };

  const handleGenreClick = (genreId) => {
    const filterByGenre = data.filter((movie) => movie.genre === genreId);
    dispatch(setFilteredMovies(filterByGenre));
    dispatch(setMoviesFilter({ selectedGenre: genreId }));
  };

  const handleYearChange = (year) => {
    const filterByYear = data.filter((movie) => movie.year === +year);
    dispatch(setFilteredMovies(filterByYear));
    dispatch(setMoviesFilter({ selectedYear: year }));
  };

  const handleSortChange = (sortOption) => {
    dispatch(setMoviesFilter({ selectedSort: sortOption }));
    
    switch (sortOption) {
      case "new":
        dispatch(setFilteredMovies(newMovies));
        break;
      case "top":
        dispatch(setFilteredMovies(topMovies));
        break;
      case "random":
        dispatch(setFilteredMovies(randomMovies));
        break;
      default:
        dispatch(setFilteredMovies(data || []));
        break;
    }
  };

  const resetFilters = () => {
    dispatch(setFilteredMovies(data || []));
    dispatch(setMoviesFilter({
      searchTerm: "",
      selectedGenre: "",
      selectedYear: "",
      selectedSort: ""
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Banner */}
      <div className="relative h-[32rem] w-full mb-16 flex items-center justify-center bg-cover bg-center overflow-hidden">
        <img 
          src={banner} 
          alt="Cinematic banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            The Movies Hub
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300">
            Cinematic Odyssey: Unveiling the Magic of Movies
          </p>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="bg-gray-800/90 backdrop-blur-md rounded-xl shadow-2xl p-6 border border-gray-700">
          {/* Search Input */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-3 text-lg bg-gray-700/80 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-white transition duration-200"
              placeholder="Search for movies..."
              value={moviesFilter.searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              {/* Genre Filter */}
              <select
                className="flex-1 bg-gray-700/80 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                value={moviesFilter.selectedGenre}
                onChange={(e) => handleGenreClick(e.target.value)}
              >
                <option value="">All Genres</option>
                {genres?.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))}
              </select>

              {/* Year Filter */}
              <select
                className="flex-1 bg-gray-700/80 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                value={moviesFilter.selectedYear}
                onChange={(e) => handleYearChange(e.target.value)}
              >
                <option value="">All Years</option>
                {uniqueYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              {/* Sort Options */}
              <select
                className="flex-1 bg-gray-700/80 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                value={moviesFilter.selectedSort}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="new">New Releases</option>
                <option value="top">Top Rated</option>
                <option value="random">Random Picks</option>
              </select>
            </div>

            {/* Reset Button */}
            {(moviesFilter.selectedGenre || moviesFilter.selectedYear || moviesFilter.selectedSort || moviesFilter.searchTerm) && (
              <button
                onClick={resetFilters}
                className="px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-lg transition duration-200 whitespace-nowrap font-medium shadow-md hover:shadow-lg"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="container mx-auto px-4 py-12">
        {filteredMovies?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-12 w-12 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-xl font-medium text-gray-300">
                No movies found matching your criteria
              </h3>
              <p className="mt-2 text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-lg transition duration-200 font-medium shadow-md hover:shadow-lg"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllMovies;