import { useState, useEffect } from "react";
import axios from "axios";
import "./PlatformManager.css";
import { useTranslate } from "../../../hooks/useTranslate";
import { errorToast, successToast } from "../../../utils/notification";
import { confirmDialog, errorAlert, okAlert } from "../../../utils/SweetAlert";
import { toast } from "react-toastify";

const PlatformManager = () => {
  const [platforms, setPlatforms] = useState([]);
  const [newPlatform, setNewPlatform] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [message, setMessage] = useState("");
  const translate = useTranslate();

  const fetchPlatforms = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/platforms`);
      setPlatforms(data.platforms);
      console.log(platforms);
    } catch (error) {
      console.error("Error al cargar plataformas");
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const createPlatform = async () => {
    if (!newPlatform.trim()) return;

    try {
      const { data } = await axios.post("http://localhost:3000/platforms", {
        platformName: newPlatform,
      });
      if (data.success) {
        toast.success(translate("Platform_created"), {
        position: "top-right",
        autoClose: 3000,
      });
        setNewPlatform("");
        fetchPlatforms();
      } else {
        setMessage(data.message);
      }
    } catch {
       toast.error(translate("Err_delete_user"), {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const updatePlatform = async (id) => {
    try {
      await axios.put(`http://localhost:3000/platforms/${id}`, {
        platformName: editName,
      });
      successToast(translate("Platform_updated"));
      setEditId(null);
      setEditName("");
      fetchPlatforms();
    } catch {
      toast.success(translate("Error_update_platform"), {
        position: "top-right",
        autoClose: 3000,
      });
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
      await axios.delete(`http://localhost:3000/platforms/${id}`);
       okAlert({
                      title: translate("Deleted"),
                      text: translate("Delete_platform"),
                    });
      fetchPlatforms();
    } catch {
       toast.error(translate("Err_delete_platform"), {
              position: "top-right",
              autoClose: 3000,
            });
      setMessage("Error al eliminar plataforma");
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
                <button onClick={() => updatePlatform(p.id)}>{translate("Save")}</button>
                <button onClick={() => setEditId(null)}>{translate("Cancel")}</button>
              </>
            ) : (
              <>
                <span>{p.platformName}</span>
                <button
                  onClick={() => {
                    setEditId(p.id);
                    setEditName(p.platformName);
                  }}
                >
                  Editar
                </button>
                <button onClick={() => deletePlatform(p.id)}>{translate("Delete")}</button>
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
