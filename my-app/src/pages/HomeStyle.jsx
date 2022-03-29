import styled from 'styled-components';
import { ROOTS } from '../utility/globalstyle';

export const ChatContainer=styled.div`

  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: ${ROOTS.theme};
  .container {
    height: 85vh;
    width: 85vw;
    background-color: ${ROOTS.themelight};
    display: grid;
    border:1px solid ${ROOTS.themedark};
    box-shadow: 10px 10px 25px -10px grey;
    grid-template-columns: 25% 75%;
    border-radius:1rem;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    @media screen and (min-width: 360px) and (max-width: 480px) {
      grid-template-columns: 35% 65%;
    }
  }

`;

