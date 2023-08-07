import React from 'react'
import CardPost from '../../components/CardPost/CardPost'
import CriarPost from '../../components/CriarPost/CriarPost'
import useRequestData from '../../hooks/useRequestData'
import { FeedContainer } from './styled'
import { useProtectedPage } from '../../hooks/useProtecdPage'
import { Container } from '@chakra-ui/react'


export default function Feed() {

  useProtectedPage()

  const tokenLogado = localStorage.getItem('token')

  const config = {
    headers: {
      Authorization: tokenLogado
    }
  }

  const [posts] = useRequestData([], '/posts', config)

  return (
    <FeedContainer>
      <section>
        <h1>Novo post</h1>
        <CriarPost />
      </section>
      {
        posts.map((post) => {
          return <CardPost key={post.id} post={post} />
        })
      }
    </FeedContainer>
  )
}
