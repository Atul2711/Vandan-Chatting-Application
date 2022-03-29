import styled from 'styled-components';
import {ROOTS} from '../utility/globalstyle';

export const FormContainer=styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
gap:1rem;
background-color:${ROOTS.theme};
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 3rem;
      width:3rem;
      border-radius:50%;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color:${ROOTS.themedark};
    box-shadow: 10px 10px 25px -10px black;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid ${ROOTS.themedark};
    border-radius: 0.5rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid ${ROOTS.theme};
      outline: none;
    }
  }

  button {
    display:block;
    background-color:${ROOTS.theme};
    color: ${ROOTS.themedark};
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: ${ROOTS.themedark};
      border:2px solid ${ROOTS.theme};
      color:white;
    }
  }

  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }

`;


