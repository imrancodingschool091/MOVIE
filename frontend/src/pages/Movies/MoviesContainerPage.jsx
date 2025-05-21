import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../component/SliderUtil";
import { FiFilter, FiX } from "react-icons/fi";

const MoviesContainerPage = () => {
  const { data } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId === selectedGenre ? null : genreId);
  };

  const resetFilters = () => {
    setSelectedGenre(null);
  };

  const filteredMovies = selectedGenre
    ? data?.filter((movie) => movie.genre === selectedGenre)
    : data;

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Mobile filter toggle */}
      <div className="lg:hidden flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Movie Collections</h1>
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
        >
          {mobileFiltersOpen ? <FiX size={20} /> : <FiFilter size={20} />}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* Genre Filters - Desktop */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              {selectedGenre && (
                <button
                  onClick={resetFilters}
                  className="text-sm text-teal-600 hover:text-teal-800 transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
            <nav className="space-y-2">
              {genres?.map((g) => (
                <button
                  key={g._id}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center ${
                    selectedGenre === g._id
                      ? "bg-teal-100 text-teal-800 font-medium border-l-4 border-teal-500"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => handleGenreClick(g._id)}
                >
                  <span>{g.name}</span>
                  {selectedGenre === g._id && (
                    <span className="ml-auto bg-teal-500 text-white text-xs px-2 py-1 rounded-full">
                      Active
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content - Wider area for movies */}
        <main className="flex-1 min-w-0"> {/* Added min-w-0 to prevent overflow */}
          {/* Random Movies */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold text-gray-900">
                Curated For You
              </h2>
              <span className="text-sm text-gray-500">
                Personalized recommendations
              </span>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <SliderUtil data={randomMovies} />
            </div>
          </section>

          {/* Top Movies */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold text-gray-900">
                Top Rated Movies
              </h2>
              <span className="text-sm text-gray-500">
                Highest audience scores
              </span>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <SliderUtil data={topMovies} />
            </div>
          </section>

          {/* Filtered Movies */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedGenre
                  ? `${genres?.find((g) => g._id === selectedGenre)?.name} Movies`
                  : "All Movies"}
              </h2>
              {selectedGenre && (
                <button
                  onClick={resetFilters}
                  className="text-sm text-teal-600 hover:text-teal-800 transition-colors flex items-center"
                >
                  <FiX className="mr-1" />
                  Clear filter
                </button>
              )}
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <SliderUtil data={filteredMovies} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default MoviesContainerPage;