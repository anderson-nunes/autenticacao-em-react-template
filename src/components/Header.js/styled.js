import styled from "styled-components";

export const Cabecalho = styled.header`
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    background-color: #fe7e02;
    padding: 2rem;
    font-size: 26px;
    font-weight: 700;

`
export const Titulo = styled.h1`
    :hover{
        cursor:pointer;
    }
`
// OBS: mudar o tipo do cursor ajuda o usuário a perceber que aquele item é clicável.