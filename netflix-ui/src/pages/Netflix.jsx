import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";

import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Slider from "../components/Slider";

function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  }, [dispatch, genres, genresLoaded]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY !== 0);
    };

    window.addEventListener("scroll", handleScroll);

    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate("/login");
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigate]);

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img
          src={backgroundImage}
          alt="background"
          className="background-image"
        />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button
              onClick={() => navigate("/player")}
              className="flex j-center a-center"
            >
              <FaPlay />
              Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </Container>
  );
}

const Container = styled.div`
  background-color: black;

  .hero {
    position: relative;

    .background-image {
      filter: brightness(60%);
      height: 100vh;
      width: 100vw;
      object-fit: cover; /* Ensure the image covers the background */
    }

    .container {
      position: absolute;
      bottom: 5rem;
      left: 5rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2rem;
      max-width: 90%; /* Constrain width to prevent overflow on small screens */

      .logo {
        img {
          width: 100%;
          max-width: 500px; /* Max width for large screens */
          height: auto; /* Maintain aspect ratio */
        }
      }

      .buttons {
        display: flex;
        gap: 2rem;

        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem 2rem;
          border: none;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          display: flex;
          align-items: center;
          justify-content: center;

          &:hover {
            opacity: 0.8;
          }

          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;

            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }

  @media (max-width: 1024px) {
    .hero .container {
      bottom: 3rem;
      left: 2rem;

      .logo img {
        max-width: 400px;
      }

      .buttons {
        flex-direction: column;
        gap: 1rem;
      }
    }
  }

  @media (max-width: 768px) {
    .hero .container {
      bottom: 2rem;
      left: 1rem;

      .logo img {
        max-width: 300px;
      }

      .buttons {
        flex-direction: column;
        gap: 1rem;

        button {
          font-size: 1.2rem;
          padding: 0.5rem 1.5rem;

          svg {
            font-size: 1.5rem;
          }
        }
      }
    }
  }

  @media (max-width: 480px) {
    .hero .container {
      bottom: 1rem;
      left: 0.5rem;

      .logo img {
        max-width: 200px;
      }

      .buttons {
        gap: 0.5rem;

        button {
          font-size: 1rem;
          padding: 0.5rem 1rem;

          svg {
            font-size: 1.2rem;
          }
        }
      }
    }
  }
`;

export default Netflix;
