import SliderUtil from "../../component/SliderUtil";
import { useGetNewMoviesQuery } from "../../redux/api/movies";
import { Link } from "react-router-dom";
import { FiHome, FiFilm, FiStar, FiCompass } from "react-icons/fi";

const Header = () => {
  const { data } = useGetNewMoviesQuery();

  return (
    <header className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Navigation and Slider Container */}
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
          {/* Navigation Sidebar */}
          <nav className="w-full lg:w-56 bg-gray-800/70 border border-gray-700 rounded-xl p-5 backdrop-blur-lg shadow-lg">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300 mb-6 pb-2 border-b border-gray-700/50">
              Movie Hub
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gradient-to-r from-teal-600/30 to-cyan-500/30 transition-all duration-300 p-3 rounded-lg group border border-transparent hover:border-teal-400/30"
                >
                  <div className="p-2 bg-gray-700 rounded-lg group-hover:bg-teal-600 transition-colors duration-300">
                    <FiHome className="text-lg text-teal-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-medium">Home</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/movies"
                  className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gradient-to-r from-teal-600/30 to-cyan-500/30 transition-all duration-300 p-3 rounded-lg group border border-transparent hover:border-teal-400/30"
                >
                  <div className="p-2 bg-gray-700 rounded-lg group-hover:bg-teal-600 transition-colors duration-300">
                    <FiFilm className="text-lg text-teal-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-medium">Browse Movies</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/top-rated"
                  className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gradient-to-r from-teal-600/30 to-cyan-500/30 transition-all duration-300 p-3 rounded-lg group border border-transparent hover:border-teal-400/30"
                >
                  <div className="p-2 bg-gray-700 rounded-lg group-hover:bg-teal-600 transition-colors duration-300">
                    <FiStar className="text-lg text-teal-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-medium">Top Rated</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/discover"
                  className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gradient-to-r from-teal-600/30 to-cyan-500/30 transition-all duration-300 p-3 rounded-lg group border border-transparent hover:border-teal-400/30"
                >
                  <div className="p-2 bg-gray-700 rounded-lg group-hover:bg-teal-600 transition-colors duration-300">
                    <FiCompass className="text-lg text-teal-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-medium">Discover</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Main Slider Area */}
          <div className="flex-1 w-full lg:w-[calc(100%-14rem)]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
                  New Releases
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full mt-2"></div>
              </div>
              <Link 
                to="/movies" 
                className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300"
              >
                View All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-700/50 hover:border-teal-400/30 transition-all duration-500">
              <SliderUtil data={data} />
            </div>
          </div>
        </div>
      </div>

      {/* Add this to your global CSS or CSS-in-JS */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </header>
  );
};

export default Header;