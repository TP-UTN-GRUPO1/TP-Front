import { useState, useEffect, useContext } from "react";
import "./PlatformManager.css";
import { useTranslate } from "../../../hooks/useTranslate";
import { confirmDialog, okAlert } from "../../../utils/SweetAlert";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import {
  getAllPlatforms,
  createPlatform as createPlatformAPI,
  updatePlatform as updatePlatformAPI,
  deletePlatform as deletePlatformAPI,
  getErrorMessage,
} from "../../../services/platformService.js";

const PlatformManager = () => {
  const [platforms, setPlatforms] = useState([]);
  const [newPlatform, setNewPlatform] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [message, setMessage] = useState("");
  const translate = useTranslate();
  const { token } = useContext(AuthContext);

  const fetchPlatforms = async () => {
    try {
      const data = await getAllPlatforms();
      setPlatforms(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar plataformas", error);
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const createPlatform = async () => {
    if (!newPlatform.trim()) return;
    try {
      await createPlatformAPI(newPlatform, token);
      toast.success(translate("Platform_created"), {
        position: "top-right",
        autoClose: 3000,
      });
      setNewPlatform("");
      setMessage("");
      fetchPlatforms();
    } catch (error) {
      const msg = getErrorMessage(error);
      setMessage(msg);
      toast.error(msg, { position: "top-right", autoClose: 3000 });
    }
  };

  const updatePlatform = async (id) => {
    try {
      await updatePlatformAPI(id, editName, token);
      toast.success(translate("Platform_updated"), {
        position: "top-right",
        autoClose: 3000,
      });
      setEditId(null);
      setEditName("");
      setMessage("");
      fetchPlatforms();
    } catch (error) {
      const msg = getErrorMessage(error);
      setMessage(msg);
      toast.error(msg, { position: "top-right", autoClose: 3000 });
    }
  };

  const deletePlatform = async (id) => {
    const confirmed = await confirmDialog({
      title: translate("Confirm_delete_platform"),
      text: translate("Are_you_sure"),
      confirmButtonText: translate("Yes_Confirm"),
      cancelButtonText: translate("Cancel"),
    });
    if (!confirmed) return;
    try {
      await deletePlatformAPI(id, token);
      okAlert({
        title: translate("Deleted"),
        text: translate("Delete_platform"),
      });
      fetchPlatforms();
    } catch (error) {
      const msg = getErrorMessage(error);
      setMessage(msg);
      toast.error(msg, { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <div className="platform-manager">
      <h2>{translate("Platform_Management")}</h2>

      <div className="create-section">
        <input
          type="text"
          value={newPlatform}
          onChange={(e) => setNewPlatform(e.target.value)}
          placeholder="Nueva plataforma"
        />
        <button onClick={createPlatform}>{translate("Create")}</button>
      </div>

      <ul className="platform-list">
        {platforms.map((p) => (
          <li key={p.id}>
            {editId === p.id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <button onClick={() => updatePlatform(p.id)}>
                  {translate("Save")}
                </button>
                <button onClick={() => setEditId(null)}>
                  {translate("Cancel")}
                </button>
              </>
            ) : (
              <>
                <span>{p.name}</span>
                <button
                  onClick={() => {
                    setEditId(p.id);
                    setEditName(p.name);
                  }}
                >
                  Editar
                </button>
                <button onClick={() => deletePlatform(p.id)}>
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

export default PlatformManager;
