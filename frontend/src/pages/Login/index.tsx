import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Sidebar from '../../components/Sidebar'

import './styles.css'
import api from '../../services/api'

export default function Login () {
  const history = useHistory()  
  const [password, setPassword] = useState('')

  async function handleLogin (e: any) {
    e.preventDefault()

    try{
      const response = await api.post('/sessions', {password} )

      console.log(response.data.password)
    } catch(err) {
      alert('Falha na validação')
      
    }
      history.push('/login')
       
  }

  return (
    <div id='page-create-orphanage'>
      <Sidebar />

      <main>
        <form onSubmit={handleLogin} className='create-orphanage-form'>
          <fieldset>
            <legend>Valide seu cadastro</legend>

            <div className='input-block'>
              <input
                placeholder="Sua ID"
                type='name'
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
