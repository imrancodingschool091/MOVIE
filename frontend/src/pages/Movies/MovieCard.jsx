import { Link } from "react-router-dom";
import { FaStar, FaPlay } from "react-icons/fa";

const MovieCard = ({ movie }) => {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-[250px] h-[375px] mx-auto bg-gray-800">
      <Link to={`/movies/${movie._id}`} className="block h-full">
        {/* Movie Poster with Gradient Overlay */}
        <div className="relative h-full">
          <img
            src={movie.image}
            alt={movie.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/250x375/333/666?text=No+Image";
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Bottom info (always visible) */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
          <h3 className="text-white font-bold text-lg truncate">{movie.name}</h3>
          <div className="flex items-center mt-1">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="text-white text-sm">
              {movie.rating?.toFixed(1) || 'N/A'}
            </span>
            <span className="text-gray-300 text-sm mx-2">|</span>
            <span className="text-gray-300 text-sm">
              {movie.year || 'Unknown'}
            </span>
          </div>
        </div>

        {/* Expanded Info (appears on hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-black/90">
          <p className="text-gray-300 text-sm mt-2 line-clamp-3">
            {movie.description || 'No description available'}
          </p>
          
          <div className="mt-3 flex justify-between items-center">
            <span className="text-teal-400 text-sm font-medium">
              {movie.genre || 'Genre not specified'}
            </span>
            <span className="text-gray-400 text-xs">
              {movie.duration || '-- min'}
            </span>
          </div>
        </div>

        {/* Play Button (appears on hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-teal-500/90 hover:bg-teal-400 rounded-full p-3 transition-all duration-200 transform group-hover:scale-110">
            <FaPlay className="text-white text-lg" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;