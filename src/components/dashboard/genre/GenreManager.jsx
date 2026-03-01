import { useState, useEffect, useContext } from "react";
import "./GenreManager.css";
import { useTranslate } from "../../../hooks/useTranslate";
import { confirmDialog, okAlert } from "../../../utils/SweetAlert";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import {
  getAllGenres,
  createGenre as createGenreAPI,
  updateGenre as updateGenreAPI,
  deleteGenre as deleteGenreAPI,
  getGenreErrorMessage,
} from "../../../services/genreService.js";

const GenreManager = () => {
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [message, setMessage] = useState("");
  const translate = useTranslate();
  const { token } = useContext(AuthContext);

  const fetchGenres = async () => {
    try {
      const data = await getAllGenres();
      setGenres(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar géneros", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const createGenre = async () => {
    if (!newGenre.trim()) return;
    try {
      await createGenreAPI(newGenre, token);
      toast.success(translate("Genre_created"), {
        position: "top-right",
        autoClose: 3000,
      });
      setNewGenre("");
      setMessage("");
      fetchGenres();
    } catch (error) {
      const msg = getGenreErrorMessage(error);
      setMessage(msg);
      toast.error(msg, { position: "top-right", autoClose: 3000 });
    }
  };

  const updateGenre = async (id) => {
    try {
      await updateGenreAPI(id, editName, token);
      toast.success(translate("Genre_updated"), {
        position: "top-right",
        autoClose: 3000,
      });
      setEditId(null);
      setEditName("");
      setMessage("");
      fetchGenres();
    } catch (error) {
      const msg = getGenreErrorMessage(error);
      setMessage(msg);
      toast.error(msg, { position: "top-right", autoClose: 3000 });
    }
  };

  const deleteGenre = async (id) => {
    const confirmed = await confirmDialog({
      title: translate("Confirm_delete_genre"),
      text: translate("Are_you_sure"),
      confirmButtonText: translate("Yes_Confirm"),
      cancelButtonText: translate("Cancel"),
    });
    if (!confirmed) return;
    try {
      await deleteGenreAPI(id, token);
      okAlert({
        title: translate("Deleted"),
        text: translate("Delete_genre"),
      });
      fetchGenres();
    } catch (error) {
      const msg = getGenreErrorMessage(error);
      setMessage(msg);
      toast.error(msg, { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <div className="genre-manager">
      <h2>{translate("Genre_Management")}</h2>

      <div className="create-section">
        <input
          type="text"
          value={newGenre}
          onChange={(e) => setNewGenre(e.target.value)}
          placeholder={translate("New_genre_placeholder")}
        />
        <button onClick={createGenre}>{translate("Create")}</button>
      </div>

      <ul className="genre-list">
        {genres.map((g) => (
          <li key={g.id}>
            {editId === g.id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <button onClick={() => updateGenre(g.id)}>
                  {translate("Save")}
                </button>
                <button onClick={() => setEditId(null)}>
                  {translate("Cancel")}
                </button>
              </>
            ) : (
              <>
                <span>{g.name}</span>
                <button
                  onClick={() => {
                    setEditId(g.id);
                    setEditName(g.name);
                  }}
                >
                  {translate("Edit")}
                </button>
                <button onClick={() => deleteGenre(g.id)}>
                  {translate("Delete")}
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      {message && <p className="msg">{message}</p>}
    </div>
  );
};

export default GenreManager;
