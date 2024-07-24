import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { firebaseAuth } from "../utils/firebase-config";
import { FaPowerOff, FaSearch, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({ isScrolled }) {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  return (
    <Container isScrolled={isScrolled}>
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="Logo" />
          </div>
          <ul className={`links ${menuOpen ? "open" : ""} flex`}>
            {links.map(({ name, link }) => (
              <li key={name}>
                <Link to={link}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div>
          <button
            onClick={() => {
              alert("hello");
              signOut(firebaseAuth);
            }}
          >
            <FaPowerOff />
          </button>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 6.5rem;
    transition: background-color 0.3s ease-in-out;
    background-color: ${({ isScrolled }) => (isScrolled ? "black" : "transparent")};

    .left {
      display: flex;
      align-items: center;
      gap: 1rem;
      .brand {
        img {
          height: 2.5rem;
          @media (min-width: 768px) {
            height: 3.5rem;
          }
          @media (min-width: 1024px) {
            height: 4rem;
          }
        }
      }
      .links {
        display: none;
        list-style: none;
        gap: 1rem;
        @media (min-width: 768px) {
          display: flex;
        }
        li {
          a {
            color: white;
            text-decoration: none;
            font-size: 0.9rem;
            @media (min-width: 1024px) {
              font-size: 1rem;
            }
          }
        }
      }
      .links.open {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 6.5rem;
        left: 0;
        width: 100%;
        background-color: black;
        padding: 1rem;
        z-index: 1;
        @media (min-width: 768px) {
          display: flex;
          flex-direction: row;
          position: static;
          width: auto;
          background-color: transparent;
          padding: 0;
        }
        li {
          margin: 0.5rem 0;
          a {
            color: white;
          }
        }
      }
    }

    .right {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        svg {
          font-size: 1.2rem;
        }
      }
      .search {
        position: relative;
        button {
          svg {
            font-size: 1rem;
            @media (min-width: 768px) {
              font-size: 1.2rem;
            }
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: width 0.3s, opacity 0.3s, visibility 0.3s;
          background: transparent;
          border: none;
          color: white;
          &::placeholder {
            color: white;
          }
          &:focus {
            outline: none;
          }
        }
        &.show-search {
          border: 1px solid white;
          background-color: rgba(0, 0, 0, 0.6);
          input {
            width: 10rem;
            opacity: 1;
            visibility: visible;
            padding: 0.2rem 0.5rem;
          }
        }
      }
      .hamburger {
        display: none;
        @media (max-width: 768px) {
          display: block;
        }
      }
    }
  }
`;
