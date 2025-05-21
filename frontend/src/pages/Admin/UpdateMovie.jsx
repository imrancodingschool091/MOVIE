import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSpecificMovieQuery,
  useUpdateMovieMutation,
  useUploadImageMutation,
  useDeleteMovieMutation,
} from "../../redux/api/movies";
import { toast } from "react-toastify";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: "",
    detail: "",
    cast: [],
    ratings: 0,
    image: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const { data: initialMovieData } = useGetSpecificMovieQuery(id);

  const [updateMovie, { isLoading: isUpdatingMovie }] = useUpdateMovieMutation();
  const [uploadImage, { isLoading: isUploadingImage }] = useUploadImageMutation();
  const [deleteMovie] = useDeleteMovieMutation();

  useEffect(() => {
    if (initialMovieData) {
      setMovieData({
        ...initialMovieData,
        cast: Array.isArray(initialMovieData.cast)
          ? initialMovieData.cast
          : initialMovieData.cast?.split(",").map((c) => c.trim()) || [],
      });
    }
  }, [initialMovieData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: name === "year" || name === "ratings" ? Number(value) : value,
    }));
  };

  const handleCastChange = (e) => {
    const castArray = e.target.value.split(",").map((c) => c.trim());
    setMovieData((prevData) => ({ ...prevData, cast: castArray }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpdateMovie = async () => {
    try {
      const { name, year, detail, cast } = movieData;
      if (!name || !year || !detail || cast.length === 0) {
        toast.error("Please fill in all required fields");
        return;
      }

      let imagePath = movieData.image;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);
        const { data, error } = await uploadImage(formData);

        if (error || !data?.imageUrl) {
          toast.error("Image upload failed");
          return;
        }

        imagePath = data.imageUrl;
      }

      await updateMovie({
        id,
        updatedMovie: { ...movieData, image: imagePath },
      }).unwrap();

      toast.success("Movie updated successfully");
      navigate("/movies");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update movie");
    }
  };

  const handleDeleteMovie = async () => {
    try {
      await deleteMovie(id).unwrap();
      toast.success("Movie deleted successfully");
      navigate("/movies");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete movie");
    }
  };

  return (
    <div className="container flex justify-center items-center mt-4">
      <form className="w-full max-w-xl p-6 border rounded shadow bg-white">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Update Movie</h2>

        <label className="block mb-3">
          <span className="text-gray-700">Name:</span>
          <input
            type="text"
            name="name"
            value={movieData.name}
            onChange={handleChange}
            className="w-full mt-1 border px-3 py-2 rounded"
          />
        </label>

        <label className="block mb-3">
          <span className="text-gray-700">Year:</span>
          <input
            type="number"
            name="year"
            value={movieData.year}
            onChange={handleChange}
            className="w-full mt-1 border px-3 py-2 rounded"
          />
        </label>

        <label className="block mb-3">
          <span className="text-gray-700">Detail:</span>
          <textarea
            name="detail"
            value={movieData.detail}
            onChange={handleChange}
            className="w-full mt-1 border px-3 py-2 rounded"
          />
        </label>

        <label className="block mb-3">
          <span className="text-gray-700">Cast (comma-separated):</span>
          <input
            type="text"
            value={movieData.cast.join(", ")}
            onChange={handleCastChange}
            className="w-full mt-1 border px-3 py-2 rounded"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Upload Image:</span>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleUpdateMovie}
            disabled={isUpdatingMovie || isUploadingImage}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded disabled:opacity-60"
          >
            {isUpdatingMovie || isUploadingImage ? "Updating..." : "Update Movie"}
          </button>

          <button
            type="button"
            onClick={handleDeleteMovie}
            disabled={isUpdatingMovie}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-60"
          >
            Delete Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMovie;
