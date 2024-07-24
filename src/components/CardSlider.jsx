import React, { useRef, useState } from "react";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Card from "./Card";

export default React.memo(function CardSlider({ data, title }) {
  const listRef = useRef();
  const [sliderPosition, setSliderPosition] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < data.length - 1) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };

  return (
    <Container
      className="flex column"
      showControls={showControls}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h1>{title}</h1>
      <div className="wrapper">
        <div
          className={`slider-action left ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineLeft onClick={() => handleDirection("left")} />
        </div>
        <div className="slider flex" ref={listRef}>
          {data.map((movie, index) => (
            <Card movieData={movie} index={index} key={movie.id} />
          ))}
        </div>
        <div
          className={`slider-action right ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineRight onClick={() => handleDirection("right")} />
        </div>
      </div>
    </Container>
  );
});

const Container = styled.div`
  position: relative;
  padding: 2rem 1rem;
  h1 {
    margin-left: 1rem;
    font-size: 1.5rem;
    @media (min-width: 768px) {
      font-size: 2rem;
      margin-left: 2rem;
    }
    @media (min-width: 1024px) {
      font-size: 2.5rem;
      margin-left: 3rem;
    }
  }
  .wrapper {
    position: relative;
    .slider {
      display: flex;
      gap: 1rem;
      transition: transform 0.3s ease-in-out;
      width: max-content;
      margin-left: 1rem;
      @media (min-width: 768px) {
        margin-left: 2rem;
      }
      @media (min-width: 1024px) {
        margin-left: 3rem;
      }
    }
    .slider-action {
      position: absolute;
      z-index: 99;
      height: 100%;
      top: 0;
      bottom: 0;
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.3s ease-in-out;
      svg {
        font-size: 1.5rem;
        @media (min-width: 768px) {
          font-size: 2rem;
        }
        @media (min-width: 1024px) {
          font-size: 2.5rem;
        }
      }
    }
    .none {
      display: none;
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
    h1 {
      font-size: 1.2rem;
      margin-left: 0.5rem;
    }
    .slider-action {
      width: 40px;
      svg {
        font-size: 1.2rem;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.2rem;
    h1 {
      font-size: 1rem;
      margin-left: 0.2rem;
    }
    .slider-action {
      width: 30px;
      svg {
        font-size: 1rem;
      }
    }
  }
`;
