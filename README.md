# Template prática guiada Autenticação no React:

## Índice

- [1. Prática 1](#prática-1)
- [2. Prática 2](#prática-2)
- [3. Prática 3](#prática-3)
- [4. Prática 4](#prática-4)
- [5. Fixação](#fixação)

Clique [aqui](https://docs.google.com/presentation/d/e/2PACX-1vQfCwZ_yGr_1V1U-qv8D0uUDVRsilV7yYtx0eQRfVpvZZNsllw8aE57OOkCS6_UV1H0w6xlkS4sL5zc/pub?start=false&loop=false&delayms=3000&slide=id.g1de97eebd14_0_14) para visualizar os enunciados.

Clique [aqui](https://documenter.getpostman.com/view/24422099/2s93Xu1QR9#6aa45f83-bd02-4d9f-886b-f04939e89ace) para visualizar a documentação da API.

## Prática 1

- Em `Signup.js` , na função `enviarCadastro`:

  ```
      const enviarCadastro = (e) => {
          e.preventDefault();
          if (form.senha === form.confirmaSenha) {
              const dadosUsuario = {
                  username: form.nomeUsuario,
                  email: form.email,
                  password: form.senha,
              };
              console.log(dadosUsuario);
              axios
                  .post(`${BASE_URL}/users/signup`, dadosUsuario)
                  .then((resp) => {
                      console.log(resp.data.token);
                      localStorage.setItem('token', resp.data.token);
                      irParaFeed(navigate);
                  })
                  .catch((error) => {
                      console.log(error.response.data);
                      alert(error.response.data);
                  });
          } else {
              alert(
                  "Digite a mesma senha nos campos 'senha' e 'confirmação de senha'"
              );
          }
      };
  ```

- Importar o `useNavigate()` e armazenar em uma variável:

  ```
  const navigate = useNavigate();
  ```

## Prática 2

- Em `Login.js` na função `enviaLogin`:

  ```
      const enviaLogin = (e) => {
          e.preventDefault();
          console.log(form);

          const body = {
              email: form.email,
              password: form.password,
          };

          axios
              .post(`${BASE_URL}/users/login`, body)
              .then((resp) => {
                  console.log(resp.data.token);
                  localStorage.setItem('token', resp.data.token);
                  irParaFeed(navigate);
              })
              .catch((err) => {
                  console.log(err);
              });
      };
  ```

## Prática 3

- Em `useRequestData.js`, está acontecendo um erro:

  ![Alt text](image.png)

- O código em questão atualmente é esse:

  ```
  import React, { useEffect, useState } from 'react';
  import { BASE_URL } from '../constants/BASE_URL';
  import axios from 'axios';

  export default function useRequestData(estadoInicial, path) {
      const [dados, setDados] = useState(estadoInicial);
      const [erro, setErro] = useState('');

      const receberDados = () => {
          axios
              .get(`${BASE_URL}${path}`)
              .then((resposta) => {
                  setDados(resposta.data);
              })
              .catch((erro) => {
                  console.log(erro.response);
                  setErro(erro.response);
              });
      };

      useEffect(() => {
          receberDados();
      }, [path]);

      return [dados, receberDados, erro];
  }

  ```

- É preciso passar o `headers` para o `useRequestData` que é o token:

  ![Alt text](image-1.png)

- Em `Feed.js`:

  ```
      const tokenLogado = localStorage.getItem('token');

      const config = {
          headers: {
              Authorization: tokenLogado,
          },
      };

      const [posts] = useRequestData([], '/posts', config);
  ```

## Prática 4

- Em `Feed.js`:

  ```
      const navigate = useNavigate();
      const token = localStorage.getItem('token');
      console.log(token);

      useEffect(() => {
          if (!token) {
              irParaLogin(navigate);
          }
      }, []);
  ```

## Fixação

- Dentro da pasta `hooks` criar um arquivo chamado `useProtectedPage`, nesse arquivo irei colar e adaptar parte do código que recortei de `Feed.js`:

  - Código recortado de `Feed.js`:

    ```
    (...)
        const navigate = useNavigate();
        const token = localStorage.getItem('token');
        console.log(token);

        useEffect(() => {
            if (!token) {
                irParaLogin(navigate);
            }
        }, []);
    (...)
    ```

  - Colando e adaptando em `useProtectedPage`:

    ```
    import { useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { irParaLogin } from '../routes/coordinator';

    export const useProtectedPage = () => {
        const navigate = useNavigate();
        const token = localStorage.getItem('token');
        console.log(token);

        useEffect(() => {
            if (!token) {
                irParaLogin(navigate);
            }
        }, []);
    };
    ```

  - Agora em `Feed.js` vou importar e utilizar o hook `useProtectedPage`
    - importando:
      ```
      import { useProtectedPage } from '../../hooks/useProtectedPage';
      ```
    - utilizando:
      ```
      useProtectedPage();
      ```

- Em `CriarPost.js`, farei os controles dos inputs:

  ```
  const { form, onChange, limparCampos } = useForms({ title: '', post: '' });
  ```

  ```
  (...)
          <label htmlFor="title">Título:</label>
          <Input
              id="title"
              name="title"
              type="title"
              value={form.title}
              onChange={onChange}
              placeholder="digite um título para o seu post"
          />
          <label htmlFor="post">Texto:</label>
          <TextArea
              id="post"
              name="post"
              type="post"
              value={form.post}
              onChange={onChange}
              placeholder="crie um post!"
          />
  (...)
  ```

- Ainda em `CriarPost.js` irei criar a função de enviar esse post:
  ```
      const enviarPost = (e) => {
          e.preventDefault();
          // console.log('entrou');
          const body = {
              title: form.title,
              body: form.post,
          };
          const headers = {
              headers: { Authorization: localStorage.getItem('token') },
          };
          // body é antes de headers
          axios
              .post(`${BASE_URL}/posts`, body, headers)
              .then((resp) => {
                  console.log(resp.data);
                  limparCampos();
              })
              .catch((err) => {
                  console.log(err);
              });
      };
  ```
