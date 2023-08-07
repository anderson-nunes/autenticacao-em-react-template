import React from "react";
import useForms from "../../hooks/useForms";
import { ContainerForm, ContainerSignup, Input } from "./styled";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import { useNavigate } from "react-router-dom";
import { irParaLogin } from "../../routes/coordinator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNotifySuccess } from "../../hooks/useNotifySuccess";
import { useNotifyError } from "../../hooks/useNotifyError";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Signup() {
  // const notifySuccess = useNotifySuccess()

  const notifySuccess = () =>
    toast.success("Email Cadastrado!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyError = () =>
    toast.error("Email já cadastrado", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const { form, onChange } = useForms({
    email: "",
    senha: "",
    nomeUsuario: "",
    confirmaSenha: "",
  });

  const navigate = useNavigate();

  const enviarCadastro = (e) => {
    e.preventDefault();
    //* EXTRA: validando a senha - ter certeza que o usuário sabe qual senha cadastrou
    // não é necessário caso use o pattern para a mesma funcionalidade
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
          console.log("aquiiiiiiii", resp.data.token);
          localStorage.setItem("token", resp.data.token);
          notifySuccess();
          irParaLogin(navigate);
        })
        .catch((err) => {
          console.log(err.response.data);
          notifyError();
        });
    } else {
      alert("Digite a mesma senha nos campos 'senha' e 'confirmação de senha'");
    }
  };

  return (
    <ContainerSignup>
      <ContainerForm onSubmit={enviarCadastro}>
        <Flex
          minH={"80vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
              Faça o seu Cadastro
            </Heading>
            <FormControl id="name" isRequired>
              <FormLabel>Nome de usuario</FormLabel>
              <Input
                placeholder="Digite o se nome"
                _placeholder={{ color: "gray.500" }}
                id="nome"
                name="nomeUsuario"
                pattern="[a-zA-Z\u00C0-\u00FF ]{3,}"
                title="Nome de usuário deve ter no mínimo 3 caracteres. Podendo conter letras, acentos e espaço"
                value={form.nomeUsuario}
                onChange={onChange}
                required
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Endereço de email</FormLabel>
              <Input
                placeholder="seu-email@exemplo.com"
                _placeholder={{ color: "gray.500" }}
                id='email'
                name='email'
                type={"email"}
                value={form.email}
                onChange={onChange}
                required
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Senha</FormLabel>
              <Input
                placeholder="Digite a sua senha"
                _placeholder={{ color: "gray.500" }}
                id='senha'
                name='senha'
                type="password"
                minLength={8}
                value={form.senha}
                onChange={onChange}
                required
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Confirmação de senha</FormLabel>
              <Input
                id="confirma-senha"
                name="confirmaSenha"
                type={"password"}
                value={form.confirmaSenha}
                onChange={onChange}
                placeholder="Confirme a senha"
                // verifica se a senha é a mesma nos dois campos
                pattern={`${form.senha}`}
                title="confirme a senha digitada"
                required
              />
            </FormControl>
            <Stack spacing={6}>
              <Button
                type="submit"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Fazer Login
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </ContainerForm>
    </ContainerSignup>
  );
}
