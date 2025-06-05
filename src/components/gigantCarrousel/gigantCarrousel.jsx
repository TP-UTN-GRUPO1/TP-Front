import "./gigantCarrousel.css";
import data from "./imgs.js";
import { useRef, useState, useEffect } from "react";
import imgLogo from "../../assets/img/theFrogGames2.png";

const GigantCarrousel = () => {
  const listRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToImage = (direction) => {
    setCurrentIndex((curr) => {
      if (direction === "prev") {
        return curr === 0 ? data.length - 1 : curr - 1;
      } else {
        return curr === data.length - 1 ? 0 : curr + 1;
      }
    });
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      scrollToImage("next");
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-container">
      <div className="slider-container">
        <div className="leftArrow" onClick={() => scrollToImage("prev")}>
          &#10092;
        </div>
        <div className="rightArrow" onClick={() => scrollToImage("next")}>
          &#10093;
        </div>
        <div className="container-images">
          <ul
            className="ul-gigantCarrousel"
            ref={listRef}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {data.map((item) => (
              <li className="li-gigantCarrousel" key={item.id}>
                <img
                  className="imgCarousel"
                  src={item.imageUrl}
                  width={900}
                  height={400}
                  alt={`Slide ${item.id}`}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="dots-container">
          {data.map((_, idx) => (
            <div
              key={idx}
              className={`dot-container-item ${
                idx === currentIndex ? "active" : ""
              } `}
              onClick={() => goToSlide(idx)}
            >
              <img
                src={imgLogo}
                alt="🐸"
                className="imgCarousel"
                style={{
                  width: "24px",
                  height: "24px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GigantCarrousel;
