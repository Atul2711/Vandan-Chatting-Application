import styled from 'styled-components';
import {ROOTS} from '../utility/globalstyle';

export const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 3rem;
background-color: ${ROOTS.theme};
height: 100vh;
width: 100vw;
.loader {
  max-inline-size: 100%;
}
.title-container {
  h1 {
    color: ${ROOTS.themedark};
  }
}
.avatars {
  display: flex;
  gap: 2rem;
  .avatar {
    border: 0.4rem solid transparent;
    padding: 0.4rem;
    border-radius: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease-in-out;
    img {
      height: 6rem;
      transition: 0.5s ease-in-out;
    }
  }
  .selected {
    border: 0.4rem solid ${ROOTS.themedark};
  }
}
.submit-btn {
  background-color:${ROOTS.themedark};
    color: ${ROOTS.theme};
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  &:hover {
    background-color: ${ROOTS.theme};
      border:2px solid ${ROOTS.themedark};
      color:${ROOTS.themedark};
  }
}
`;