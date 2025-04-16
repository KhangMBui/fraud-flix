import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, Plus } from "lucide-react";
import Swal from "sweetalert2";
import "./ManageGenres.css"; // Import the CSS file

export default function ManageGenres() {
  const [newGenre, setNewGenre] = useState({
    name: "",
    description: "",
    tmdbId: null,
  });
  const [showAddGenreModal, setShowAddGenreModal] = useState(false);
  const [genres, setGenres] = useState([]);
  const [editingGenreId, setEditingGenreId] = useState(null);
  const [editedGenre, setEditedGenre] = useState({
    name: "",
    descriptin: "",
    tmdbId: -1,
  });

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/genres", {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the Authorization header
        },
      });
      setGenres(res.data);
    } catch (err) {
      console.error("Error fetching genres:", err);
    }
  };

  const handleAddGenre = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/admin/genres",
        newGenre,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the Authorization header
          },
        }
      );
      Swal.fire("Success", "Genre added successfully!", "success");
      setShowAddGenreModal(false);
      setNewGenre({
        name: res.name,
        description: res.description,
        tmdbId: res.tmdbId,
      });
      fetchGenres();
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
        await axios.delete(`http://localhost:5000/api/admin/genres/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the Authorization header
          },
        });
        setGenres(genres.filter((u) => u.id !== id));
        Swal.fire("Deleted!", "The genre has been deleted.", "success");
      } catch (err) {
        console.error("Failed to delete genre:", err);
        Swal.fire(
          "Error!",
          "Failed to delete the genre. Please try again.",
          "error"
        );
      }
    }
  };

  const handleEdit = (genre) => {
    setEditingGenreId(genre.id);
    setEditedGenre({
      name: genre.name,
      description: genre.description,
      tmdbId: genre.tmdbId,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedGenre((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (genreId) => {
    const token = localStorage.getItem("token");
    const originalGenre = genres.find((u) => u.id === genreId);
    const hasChanged =
      editedGenre.name !== originalGenre.name ||
      editedGenre.description !== originalGenre.description ||
      editedGenre.tmdbId !== originalGenre.tmdbId;

    // If nothing was changed, just exit editing state
    if (!hasChanged) {
      setEditingGenreId(null);
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to update this genre's information?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, update it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.put(
          `http://localhost:5000/api/admin/genres/${genreId}`,
          editedGenre,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEditingGenreId(null);
        fetchGenres(); // refresh updated list
      } catch (err) {
        console.error("Error updating genre:", err);
        Swal.fire({
          title: "Update Failed",
          text: err.response?.data?.error || "An unexpected error occurred.",
          icon: "error",
        });
      }
    } else {
      setEditingGenreId(null);
      return;
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h2>Genre Management</h2>
      <div className="table-container">
        <table className="genre-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>tmdbId</th>
              <th>Actions</th>
              <th className="text-right">
                <button
                  onClick={() => setShowAddGenreModal(true)}
                  className="add-button"
                >
                  <Plus size={20} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {genres.map((genre, index) =>
              editingGenreId === genre.id ? (
                <tr key={genre.id}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      name="name"
                      value={editedGenre.name}
                      onChange={handleChange}
                      className="name-edit-input"
                    />
                  </td>
                  <td>
                    <input
                      name="description"
                      value={editedGenre.description}
                      onChange={handleChange}
                      className="description-edit-input"
                    />
                  </td>
                  <td>
                    <input
                      name="tmdbId"
                      value={editedGenre.tmdbId}
                      onChange={handleChange}
                      className="tmdbId-edit-input"
                    />
                  </td>
                  <td>
                    <button
                      className="save-button"
                      onClick={() => handleSave(genre.id)}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={genre.id}>
                  <td>{index + 1}</td>
                  <td>{genre.name}</td>
                  <td>{genre.description}</td>
                  <td>{genre.tmdbId}</td>
                  <td>
                    <button
                      className="icon-btn edit"
                      title="Edit"
                      onClick={() => handleEdit(genre)}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="icon-btn delete"
                      title="Delete"
                      onClick={() => handleDelete(genre.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
          {/* Modal to add a new genre */}
          {showAddGenreModal && (
            <div className="modal">
              <div className="modal-content">
                <h2 className="modal-title">Add New Genre</h2>
                <input
                  type="text"
                  placeholder="Genre Name"
                  value={newGenre.name}
                  onChange={(e) =>
                    setNewGenre({ ...newGenre, name: e.target.value })
                  }
                  className="editInput"
                />
                <textarea
                  placeholder="Genre Description"
                  value={newGenre.description}
                  onChange={(e) =>
                    setNewGenre({ ...newGenre, description: e.target.value })
                  }
                  className="editInput"
                />
                <textarea
                  placeholder="tmdbId (Optional)"
                  value={newGenre.tmdbId}
                  onChange={(e) =>
                    setNewGenre({ ...newGenre, tmdbId: e.target.value })
                  }
                  className="editInput"
                />
                <button onClick={handleAddGenre} className="save-button">
                  Add Genre
                </button>
                <button
                  onClick={() => setShowAddGenreModal(false)}
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
