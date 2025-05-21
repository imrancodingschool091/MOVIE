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
    year: "",
    detail: "",
    cast: "",
    rating: "",
    genre: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [createMovie, { isLoading: isCreatingMovie }] = useCreateMovieMutation();
  const [uploadImage, { isLoading: isUploadingImage }] = useUploadImageMutation();
  const { data: genres = [], isLoading: isLoadingGenres } = useFetchGenresQuery();

  useEffect(() => {
    if (!movieData.genre && genres.length > 0) {
      setMovieData((prev) => ({ ...prev, genre: genres[0]._id }));
    }
  }, [genres]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCastChange = (e) => {
    setMovieData((prev) => ({
      ...prev,
      cast: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCreateMovie = async (e) => {
    e.preventDefault();

    const { name, year, detail, cast, rating, genre } = movieData;

    if (!name || !year || !detail || !cast || !selectedImage || !genre) {
      toast.error("Please fill all required fields");
      return;
    }

    const castArray = cast
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const uploadResponse = await uploadImage(formData).unwrap();
      const imageUrl = uploadResponse.imageUrl;

      if (!imageUrl) {
        toast.error("Upload succeeded but image URL is missing.");
        return;
      }

      await createMovie({
        name,
        year,
        detail,
        cast: castArray,
        rating,
        genre,
        image: imageUrl,
      }).unwrap();

      toast.success("Movie added successfully!");
      navigate("/admin/movies-list");

      setMovieData({
        name: "",
        year: "",
        detail: "",
        cast: "",
        rating: "",
        genre: genres[0]?._id || "",
      });
      setSelectedImage(null);
      setImagePreview(null);
    } catch (err) {
      console.error("Error:", err);
      toast.error(err.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container flex justify-center items-center mt-4">
      <form onSubmit={handleCreateMovie} className="w-full max-w-3xl">
        <p className="text-green-200 text-2xl mb-4">Create Movie</p>

        {[
          { label: "Name", type: "text", name: "name", value: movieData.name },
          { label: "Year", type: "number", name: "year", value: movieData.year },
          { label: "Rating", type: "number", name: "rating", value: movieData.rating },
        ].map((field) => (
          <div className="mb-4" key={field.name}>
            <label className="block text-sm font-medium mb-1">
              {field.label}:
              <input
                {...field}
                onChange={handleChange}
                className="border px-2 py-1 w-full rounded"
                required
              />
            </label>
          </div>
        ))}

        {/* Detail */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Detail:
            <textarea
              name="detail"
              value={movieData.detail}
              onChange={handleChange}
              className="border px-2 py-1 w-full rounded"
              rows="4"
              required
            />
          </label>
        </div>

        {/* Cast */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Cast (comma-separated):
            <input
              type="text"
              name="cast"
              value={movieData.cast}
              onChange={handleCastChange}
              className="border px-2 py-1 w-full rounded"
              required
            />
          </label>
        </div>

        {/* Genre */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Genre:
            <select
              name="genre"
              value={movieData.genre}
              onChange={handleChange}
              className="border px-2 py-1 w-full rounded"
              required
            >
              <option value="" disabled>
                Select a genre
              </option>
              {isLoadingGenres ? (
                <option disabled>Loading genres...</option>
              ) : (
                genres.map((g) => (
                  <option key={g._id} value={g._id}>
                    {g.name}
                  </option>
                ))
              )}
            </select>
          </label>
        </div>

        {/* Image */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Upload Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border px-2 py-1 w-full rounded"
              required
            />
          </label>
          {imagePreview && (
            <div className="mt-2">
              <p className="text-sm mb-1">Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-40 border rounded"
              />
            </div>
          )}
          {isUploadingImage && (
            <p className="text-sm text-yellow-500 mt-1">Uploading image...</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
          disabled={isCreatingMovie || isUploadingImage}
        >
          {isCreatingMovie || isUploadingImage ? "Creating..." : "Create Movie"}
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;
