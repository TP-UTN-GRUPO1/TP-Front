import "./gigantCarrousel.css";
import data from "../../../data/data.json";
import { useRef, useState, useEffect } from "react";

const gigantCarrousel = () => {
  const listRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const listNode = listRef.current;
    const imgNode = listNode.querySelectorAll("li > img")[currentIndex];

    if (imgNode) {
      imgNode.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const scrollToImage = (direction) => {
    if (direction === "prev") {
      setCurrentIndex((curr) => {
        const isFirstSlide = currentIndex === 0;
        return isFirstSlide ? 0 : curr - 1;
      });
    } else {
      const isLastSlide = currentIndex === data.length - 1;
      if (!isLastSlide) {
        setCurrentIndex((curr) => curr + 1);
      }
    }
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
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
          <ul className="ul-gigantCarrousel" ref={listRef}>
            {data.map((item) => {
              return (
                <li className="li-gigantCarrousel" key={item.id}>
                  <img src={item.imageUrl} width={500} height={280} />
                </li>
              );
            })}
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
              🐸
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default gigantCarrousel;
