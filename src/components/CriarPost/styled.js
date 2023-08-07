import styled from "styled-components";

export const FormPost = styled.form`
    width: fit-content;
    display: flex;
    flex-direction: column ;
    padding: 60px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    ;

    label {
    font-size: 24px;
    margin: 1rem 0;
    }

    button {
    padding: 10px;
    background-color: #4299e1;
    color: white;
    font-weight: 700;
    }
`
export const Input = styled.input`
    width: 40vw;
    margin-bottom: 16px;
`
export const TextArea = styled.textarea`
    width: 40vw;
    height: 10vh;
    margin: 3px;
`