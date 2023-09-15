import React from 'react'
import { FormPost, Input, TextArea } from './styled'
import useForms from '../../hooks/useForms'
import axios from 'axios'
import { BASE_URL } from '../../constants/BASE_URL'
import { notify, notifyError } from '../../hooks/toast'

export default function CriarPost() {

  const { form, onChange } = useForms({
    titulo: "",
    post: "",
  })

  const reload = () => {
    window.location.reload()
  }


  console.log(form)

  const enviarPost = (e) => {
    e.preventDefault()

    console.log("entrou")

    const token = localStorage.getItem('token')

    const body = {
      title: form.titulo,
      body: form.post,
    }

    const headers = {
      headers: {
        Authorization: token
      }
    };

    axios.post(`${BASE_URL}/posts`, body, headers)
      .then((response) => {
        console.log(response)
        notify()
        reload()
      })
      .catch((error) => {
        console.log(error)
        notifyError()
      })
  }

  return (
    <FormPost onSubmit={enviarPost}>
      <label htmlFor='tituloPost'>Título:</label>
      <Input
        placeholder='digite um título para o seu post'
        name="titulo"
        value={form.titulo}
        onChange={onChange}
      />

      <label htmlFor='textoPost'>Texto:</label>

      <TextArea
        placeholder='crie um post!'
        name='post'
        value={form.post}
        onChange={onChange}
      />
      <button>Enviar</button>
    </FormPost>
  )
}
