import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export default function Header({ login }) {
    const navigate = useNavigate();

    return (
        <Container className='flex a-center j-between'>
            <div className='logo'>
                <img src={logo} alt='logo' />
            </div>
            <button onClick={() => navigate(login ? "/login" : "/signup")}>
                {login ? "Log In" : "Sign Up"}
            </button>
        </Container>
    )
}

const Container = styled.div`
    padding: 0 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
        img {
            height: 3rem;

            @media (min-width: 768px) {
                height: 4rem;
            }

            @media (min-width: 1024px) {
                height: 5rem;
            }
        }
    }

    button {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1rem;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #f40612;
        }

        @media (min-width: 768px) {
            font-size: 1.1rem;
            padding: 0.75rem 1.25rem;
        }

        @media (min-width: 1024px) {
            font-size: 1.2rem;
            padding: 1rem 1.5rem;
        }
    }
`;
