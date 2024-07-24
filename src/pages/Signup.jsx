import React, { useState } from 'react';
import styled from 'styled-components';
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import { firebaseAuth } from "../utils/firebase-config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  
  const handleSignUp = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className='content'>
        <Header login />
        <div className='body flex column a-center j-center'>
          <div className='text flex column'>
            <h1>Unlimited movies, TV shows and more</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart your membership.
            </h6>
          </div>
          <div className='form'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={formValues.email}
              onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
            />
            {showPassword && (
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={formValues.password}
                onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
              />
            )}
            {!showPassword && <button onClick={() => setShowPassword(true)}>Get Started</button>}
          </div>
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;

    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        padding: 0 2rem;
        
        h1 {
          padding: 0;
        }
        
        h4, h6 {
          padding: 0;
        }
      }

      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) => showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 90%;
        max-width: 600px;
        input {
          color: black;
          border: none;
          padding: 1rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.05rem;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: #f40612;
          }
        }
      }

      button {
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #f40612;
        }
      }
    }
  }

  @media (min-width: 768px) {
    .text {
      h1 {
        padding: 0 15rem;
      }
    }
  }

  @media (max-width: 768px) {
    .body {
      .text {
        font-size: 1.5rem;
      }

      .form {
        grid-template-columns: ${({ showPassword }) => showPassword ? "1fr 1fr" : "1fr"};
        width: 80%;
      }
    }
  }

  @media (max-width: 480px) {
    .body {
      .text {
        font-size: 1.2rem;
      }

      .form {
        grid-template-columns: 1fr;
        width: 90%;
      }

      button {
        font-size: 1rem;
      }
    }
  }
`;
