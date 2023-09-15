import styled from "styled-components";

export const ContainerLabeddit = styled.div`
  width: 700px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto; 
  margin-top: 6%;
  gap: 2rem;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);

  h1 {
    font-size: 32px;
    text-align: center; 
    margin-bottom: 10px; 
  }

  h3 {
    font-size: 24px;
    text-align: center; 
    margin-bottom: 20px; 
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    margin-left: 1rem;
    padding: 1rem 2rem; /* Aumente o tamanho do botão para torná-lo mais apresentável */
    cursor: pointer;
    font-size: 18px;
  }

  a {
    margin: 1em;
    font-size: 28px;
    text-decoration: none; /* Remova sublinhado padrão dos links */
    color: #333; /* Altere a cor do link para algo mais legível */
    cursor: pointer;
  }
`;
