
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { irParaFeed, irParaHome, irParaLogin } from '../../routes/coordinator'
import { Cabecalho, Titulo } from './styled'
import { Link } from '@chakra-ui/react'

export default function Header() {
    const navigate = useNavigate()
    const mudarPagina = () => {
        if (localStorage.getItem('token')) {
            irParaHome(navigate)
        } else {
            irParaFeed(navigate)
        }
    }
    return (
        <Cabecalho>
            <Titulo onClick={() => mudarPagina(navigate)}>Labeddit</Titulo>
            <Link onClick={() => irParaLogin(navigate)}>Login</Link>
        </Cabecalho>
    )

}
