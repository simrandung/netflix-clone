import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import CardSlider from "../components/CardSlider";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";

function MoviePage() {
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
      dispatch(fetchMovies({ genres, type: "movie" }));
    }
  }, [genresLoaded, dispatch, genres]);

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) setUser(currentUser.uid);
      else navigate("/login");
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="data">
        <SelectGenre genres={genres} type="movie" />
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }

  @media (max-width: 768px) {
    .data {
      margin-top: 5rem;
      .not-available {
        font-size: 1rem;
      }
    }
  }

  @media (max-width: 480px) {
    .data {
      margin-top: 3rem;
      .not-available {
        font-size: 0.9rem;
      }
    }
  }
`;

export default MoviePage;
