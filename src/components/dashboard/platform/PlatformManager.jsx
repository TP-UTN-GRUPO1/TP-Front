import { useState, useEffect } from "react";
import axios from "axios";
import "./PlatformManager.css";

const PlatformManager = () => {
  const [platforms, setPlatforms] = useState([]);
  const [newPlatform, setNewPlatform] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [message, setMessage] = useState("");

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
        setMessage("Plataforma creada");
        setNewPlatform("");
        fetchPlatforms();
      } else {
        setMessage(data.message);
      }
    } catch {
      setMessage("Error al crear plataforma");
    }
  };

  const updatePlatform = async (id) => {
    try {
      await axios.put(`http://localhost:3000/platforms/${id}`, {
        platformName: editName,
      });
      setMessage("Plataforma actualizada");
      setEditId(null);
      setEditName("");
      fetchPlatforms();
    } catch {
      setMessage("Error al actualizar plataforma");
    }
  };

  const deletePlatform = async (id) => {
    if (
      !window.confirm("¿Estás seguro de que querés eliminar esta plataforma?")
    )
      return;

    try {
      await axios.delete(`http://localhost:3000/platforms/${id}`);
      setMessage("Plataforma eliminada");
      fetchPlatforms();
    } catch {
      setMessage("Error al eliminar plataforma");
    }
  };

  return (
    <div className="platform-manager">
      <h2>Gestión de Plataformas</h2>

      <div className="create-section">
        <input
          type="text"
          value={newPlatform}
          onChange={(e) => setNewPlatform(e.target.value)}
          placeholder="Nueva plataforma"
        />
        <button onClick={createPlatform}>Crear</button>
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
                <button onClick={() => updatePlatform(p.id)}>Guardar</button>
                <button onClick={() => setEditId(null)}>Cancelar</button>
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
                <button onClick={() => deletePlatform(p.id)}>Eliminar</button>
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
