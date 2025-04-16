import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, Plus } from "lucide-react";
import Swal from "sweetalert2";
import "./ManageMovies.css"; // Import the CSS file

export default function ManageMovies() {
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    releaseDate: "",
    thumbnail: "",
  });
  const [movies, setMovies] = useState([]);
  const [showAddMovieModal, setShowAddMovieModal] = useState(false);
  const [editingMovieId, setEditingMovieId] = useState(null);
  const [editedMovie, setEditedMovie] = useState({
    title: "",
    description: "",
    releaseDate: "",
    thumbnail: "",
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/movies", {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the Authorization header
        },
      });
      setMovies(res.data.movies);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  const handleAddMovie = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/admin/movies",
        newMovie,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the Authorization header
          },
        }
      );
      Swal.fire("Success", "Movie added successfully!", "success");
      setShowAddMovieModal(false);
      setMovies({
        title: res.title,
        description: res.description,
        releaseDate: res.releaseDate,
        thumbnail: res.thumbnail,
      });
      fetchMovies();
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.error || "Something went wrong",
        "error"
      );
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        await axios.delete(`http://localhost:5000/api/admin/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the Authorization header
          },
        });
        setMovies(movies.filter((m) => m.id !== id));
        Swal.fire("Deleted!", "The movie has been deleted.", "success");
      } catch (err) {
        console.error("Failed to delete movie:", err);
        Swal.fire(
          "Error!",
          "Failed to delete the user. Please try again.",
          "error"
        );
      }
    }
  };

  const handleEdit = (movie) => {
    setEditingMovieId(movie.id);
    setEditedMovie({
      title: movie.title,
      description: movie.description,
      releaseDate: movie.releaseDate,
      thumbnail: movie.thumbnail,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedMovie((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async (movieId) => {
    const token = localStorage.getItem("token");
    const originalMovie = movies.find((m) => m.id === movieId);
    const hasChanged =
      editedMovie.title !== originalMovie.title ||
      editedMovie.description !== originalMovie.description ||
      editedMovie.releaseDate !== originalMovie.releaseDate ||
      editedMovie.thumbnail !== originalMovie.thumbnail;

    // If nothing was changed, just exit editing state
    if (!hasChanged) {
      setEditingMovieId(null);
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to update this movies's information?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, update it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.put(
          `http://localhost:5000/api/admin/movies/${movieId}`,
          editedMovie,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMovies(
          movies.map((m) => (m.id === movieId ? { ...m, ...editedMovie } : m))
        );
        setEditingMovieId(null);
        fetchMovies(); // refresh updated list
      } catch (err) {
        console.error("Error updating user:", err);
        Swal.fire({
          title: "Update Failed",
          text: err.response?.data?.error || "An unexpected error occurred.",
          icon: "error",
        });
      }
    } else {
      setEditingMovieId(null);
      return;
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h2>Manage Movies</h2>
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Release Date</th>
              <th>Thumbnail</th>
              <th>Actions</th>
              <th className="text-right">
                <button
                  onClick={() => setShowAddMovieModal(true)}
                  className="add-button"
                >
                  <Plus size={20} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td>
                  {editingMovieId === movie.id ? (
                    <input
                      type="text"
                      name="title"
                      value={editedMovie.title}
                      onChange={handleChange}
                      className="title-edit-input"
                    />
                  ) : (
                    movie.title
                  )}
                </td>
                <td>
                  {editingMovieId === movie.id ? (
                    <textarea
                      name="description"
                      value={editedMovie.description}
                      onChange={handleChange}
                      className="description-edit-input"
                    />
                  ) : (
                    movie.description
                  )}
                </td>
                <td>
                  {editingMovieId === movie.id ? (
                    <input
                      type="date"
                      name="releaseDate"
                      value={editedMovie.releaseDate}
                      onChange={handleChange}
                      className="release-date-edit-input"
                    />
                  ) : (
                    new Date(movie.releaseDate).toLocaleDateString()
                  )}
                </td>
                <td>
                  {editingMovieId === movie.id ? (
                    <input
                      type="text"
                      name="thumbnail"
                      value={editedMovie.thumbnail}
                      onChange={handleChange}
                      className="thumbnail-edit-input"
                    />
                  ) : (
                    <img
                      src={movie.thumbnail}
                      alt={movie.title}
                      style={{ width: "100px" }}
                    />
                  )}
                </td>
                <td>
                  {editingMovieId === movie.id ? (
                    <>
                      <button
                        className="save-button"
                        onClick={() => handleSave(movie.id)}
                      >
                        Save
                      </button>
                      <button
                        className="cancel-button"
                        onClick={() => setEditingMovieId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="icon-btn edit"
                        title="Edit"
                        onClick={() => handleEdit(movie)}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="icon-btn delete"
                        title="Delete"
                        onClick={() => handleDelete(movie.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          {/* Modal to add a new genre */}
          {showAddMovieModal && (
            <div className="modal">
              <div className="modal-content">
                <h2 className="modal-title">Add New Movie</h2>
                <input
                  placeholder="Movie name"
                  value={newMovie.title}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, title: e.target.value })
                  }
                  className="editInput"
                />
                <textarea
                  placeholder="Movie Description"
                  value={newMovie.description}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, description: e.target.value })
                  }
                  className="editInput"
                />
                <input
                  type="date"
                  value={
                    typeof newMovie.releaseDate === "string"
                      ? newMovie.releaseDate
                      : ""
                  }
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, releaseDate: e.target.value })
                  }
                  className="editInput"
                />
                <button onClick={handleAddMovie} className="save-button">
                  Add Movie
                </button>
                <button
                  onClick={() => setShowAddMovieModal(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </table>
      </div>
    </div>
  );
}
