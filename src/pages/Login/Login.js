import React from 'react'
import { useNavigate } from 'react-router-dom'
import useForms from '../../hooks/useForms'
import { BASE_URL } from '../../constants/BASE_URL'
import { ContainerForm, ContainerLogin, Input } from './styled'
import { irParaCadastro, irParaFeed, irParaLogin } from '../../routes/coordinator'
import axios from 'axios'
import { useProtectedPage } from '../../hooks/useProtecdPage'
import 'react-toastify/dist/ReactToastify.css';
import { notify, notifyError } from '../../hooks/toast'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'

export default function Login() {

  const navigate = useNavigate()

  useProtectedPage()

  const { form, onChange } = useForms({
    email: "",
    password: ""
  })

  const enviaLogin = (e) => {
    e.preventDefault()
    console.log(form)

    const body = {
      email: form.email,
      password: form.password,
    }

    axios.post(`${BASE_URL}/users/login`, body)
      .then((resp) => {
        console.log(resp.data.token)
        localStorage.setItem('token', resp.data.token)
        irParaFeed(navigate)
        notify()
      })
      .catch((err) => {
        console.log(err)

        notifyError()
      })
  }

  return (
    <ContainerLogin>
      <ContainerForm onSubmit={enviaLogin}>
        <Flex
          w={'full'}
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}
          pb={'14rem'}>
          <Stack
            spacing={4}
            w={'full'}
            maxW={'md'}
            bg={useColorModeValue('white', 'gray.700')}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
            my={12}>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
              Faça o seu Login
            </Heading>
            <FormControl id="email" isRequired>
              <FormLabel fontWeight={'700'}
              >Endereço de email</FormLabel>
              <Input
                placeholder="your-email@example.com"
                _placeholder={{ color: 'gray.500', }}
                id='email'
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                required
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel fontWeight={'700'}>Senha</FormLabel>
              <Input
                type="password"
                id='senha'
                name="password"
                minLength={8}
                value={form.password}
                onChange={onChange}
                placeholder="Digite sua senha"
                required />
            </FormControl>
            <Stack spacing={6}>
              <Button type='submit'
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Fazer Login
              </Button>
              <Button onClick={() => irParaCadastro(navigate)} type='submit'
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Fazer Cadastro
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </ContainerForm>
    </ContainerLogin>
  )
}

