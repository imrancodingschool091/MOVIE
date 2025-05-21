import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateMovieMutation,
  useUploadImageMutation,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";

const CreateMovie = () => {
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    rating: 0,
    image: null,
    genre: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [createMovie, { isLoading: isCreatingMovie, error: createMovieError }] =
    useCreateMovieMutation();

  const [uploadImage, { isLoading: isUploadingImage, error: uploadImageError }] =
    useUploadImageMutation();

  const { data: genres = [], isLoading: isLoadingGenres } = useFetchGenresQuery();

  useEffect(() => {
    if (genres.length > 0 && !movieData.genre) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: genres[0]._id,
      }));
    }
  }, [genres]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMovieData((prevData) => ({
      ...prevData,
      [name]: name === "year" || name === "rating" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleCastChange = (e) => {
    const castArray = e.target.value.split(",").map((c) => c.trim());
    setMovieData((prevData) => ({
      ...prevData,
      cast: castArray,
    }));
  };

  const handleCreateMovie = async () => {
    try {
      const { name, year, detail, cast, genre } = movieData;

      if (!name || !year || !detail || cast.length === 0 || !selectedImage || !genre) {
        toast.error("Please fill all required fields");
        return;
      }

      // Upload image
      const formData = new FormData();
      formData.append("image", selectedImage);
      const { data: uploadData } = await uploadImage(formData);

      if (!uploadData?.image) {
        toast.error("Failed to upload image");
        return;
      }

      // Create movie
      await createMovie({
        ...movieData,
        image: uploadData.image,
      });

      toast.success("Movie added to database");
      navigate("/admin/movies-list");

      // Reset form
      setMovieData({
        name: "",
        year: 0,
        detail: "",
        cast: [],
        rating: 0,
        image: null,
        genre: genres[0]?._id || "",
      });
      setSelectedImage(null);
    } catch (error) {
      console.error("Movie creation failed:", createMovieError);
      toast.error("Failed to create movie");
    }
  };

  return (
    <div className="container flex justify-center items-center mt-4">
      <form>
        <p className="text-green-200 w-[50rem] text-2xl mb-4">Create Movie</p>

        {/* Name */}
        <div className="mb-4">
          <label className="block">
            Name:
            <input
              type="text"
              name="name"
              value={movieData.name}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            />
          </label>
        </div>

        {/* Year */}
        <div className="mb-4">
          <label className="block">
            Year:
            <input
              type="number"
              name="year"
              value={movieData.year}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            />
          </label>
        </div>

        {/* Detail */}
        <div className="mb-4">
          <label className="block">
            Detail:
            <textarea
              name="detail"
              value={movieData.detail}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            />
          </label>
        </div>

        {/* Cast */}
        <div className="mb-4">
          <label className="block">
            Cast (comma-separated):
            <input
              type="text"
              name="cast"
              value={movieData.cast.join(", ")}
              onChange={handleCastChange}
              className="border px-2 py-1 w-full"
            />
          </label>
        </div>

        {/* Genre */}
        <div className="mb-4">
          <label className="block">
            Genre:
            <select
              name="genre"
              value={movieData.genre}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            >
              {isLoadingGenres ? (
                <option>Loading genres...</option>
              ) : (
                genres.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))
              )}
            </select>
          </label>
        </div>

        {/* Image */}
        <div className="mb-4">
          <label className="block">
            Upload Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border px-2 py-1 w-full"
            />
          </label>
        </div>

        {/* Button */}
        <button
          type="button"
          onClick={handleCreateMovie}
          className="bg-teal-500 text-white px-4 py-2 rounded"
          disabled={isCreatingMovie || isUploadingImage}
        >
          {isCreatingMovie || isUploadingImage ? "Creating..." : "Create Movie"}
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;
