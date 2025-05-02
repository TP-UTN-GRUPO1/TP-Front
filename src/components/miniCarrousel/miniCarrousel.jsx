import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GameCarousel({ onGameSelected }) {
  const [games, setGames] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:3000/games")
      .then((res) => {
        console.log("Datos cargados:", res.data);
        setGames(res.data);
      })
      .catch((err) => console.error("Error cargando juegos:", err));
  }, []);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - itemsPerPage, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + itemsPerPage < games.length ? prev + itemsPerPage : prev
    );
  };

  const visibleGames = games.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Juegos Disponibles</h2>

      <div style={styles.buttonContainer}>
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          style={styles.button}
        >
          ◀ Anterior
        </button>
        <button
          onClick={handleNext}
          disabled={startIndex + itemsPerPage >= games.length}
          style={styles.button}
        >
          Siguiente ▶
        </button>
      </div>

      <div style={styles.grid}>
        {visibleGames.map((game) => (
          <div
            key={game.id}
            style={styles.card}
            onClick={() => onGameSelected && onGameSelected(game)}
          >
            <img src={game.imageUrl} alt={game.gameName} style={styles.image} />
            <h3>{game.gameName}</h3>
            <p>{game.developer}</p>
            <p>
              <strong>{game.platform}</strong>
            </p>
            <p style={{ color: "green" }}>{game.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "20px",
    overflowX: "auto",
  },
  title: {
    fontSize: "24px",
    marginBottom: "16px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 16px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "16px",
    minWidth: "1000px",
  },
  card: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  image: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    borderRadius: "6px",
    marginBottom: "10px",
  },
};
