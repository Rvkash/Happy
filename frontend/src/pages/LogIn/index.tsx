import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'

import './styles.css'
import api from '../../services/api'

export default function LogIn () {
  const history = useHistory()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit (e: any) {
    e.preventDefault()

    const data = {
      name,
      email,
      password
    }

    try {
      await api.post('/users', data)

      history.push('/login')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div id='page-create-orphanage'>
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className='create-orphanage-form'>
          <fieldset>
            <legend>Faça seu registro</legend>

            <div className='input-block'>
              <label htmlFor='name'>Nome</label>
              <input
                id='name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='name'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='senha'>Senha</label>
              <input
                type='password'
                id='name'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

          </fieldset>
          <button className='confirm-button' type='submit'>
            Confirmar
          </button>
        </form>
      </main>
    </div>
  )
}
