import React from 'react'
import { useNavigate } from 'react-router-dom'
import { irParaCadastro, irParaLogin } from '../../routes/coordinator'
import { ContainerLabeddit, ContainerButton } from '../Home/styled'
import { Link } from '@chakra-ui/react'

export default function Home() {
  const navigate = useNavigate()
  return (
    <ContainerLabeddit>
      <h1>Boas vindas ao Labeddit!!</h1>
      <h3>Faça seu login ou cadastre-se para continuar</h3>
      <ContainerButton>
        <Link onClick={() => irParaLogin(navigate)}>Login</Link>
        <Link onClick={() => irParaCadastro(navigate)}>Cadastro</Link>
      </ContainerButton>
    </ContainerLabeddit>
  )
}
