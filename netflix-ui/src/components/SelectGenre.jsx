import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchDataByGenre } from "../store";

export default function SelectGenre({ genres, type }) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const selectedGenre = e.target.value;
    if (selectedGenre) {
      dispatch(
        fetchDataByGenre({
          genres,
          genre: selectedGenre,
          type,
        })
      );
    }
  };

  if (!genres.length) {
    return <p>No genres available</p>; // Handle case when no genres are provided
  }

  return (
    <Select onChange={handleChange}>
      <option value="" disabled>Select Genre</option>
      {genres.map((genre) => (
        <option value={genre.id} key={genre.id}>
          {genre.name}
        </option>
      ))}
    </Select>
  );
}

const Select = styled.select`
z-index:10;
  margin-left: 5rem;
  cursor: pointer;
  font-size: 1.4rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  border: none;
  border-radius: 0.3rem;
  padding: 0.5rem;
  width: 15rem; // Adjust width for better visibility

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-left: 2rem;
    padding: 0.5rem;
    width: 50%; // Adjust width to fit better on tablets and smaller screens
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-left: 1rem;
    padding: 0.5rem;
    width: 50%; // Increase width for very small screens
  }
`;
