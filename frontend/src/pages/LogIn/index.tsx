import React, { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'

import  './styles.css'
import api from '../../services/api'


export default function LogIn () {
  const history = useHistory()

  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    console.log({name, email, senha})
    const data = new FormData()
    
    data.append('name',  name)
    data.append('email', email)
    data.append('senha', senha)

    try {
     await api.post('/users', data)
      alert('Cadastro realizado')

      history.push('users')
    }catch(err) {
      console.error(err)
    }
  }

  return (
    <div id='page-create-orphanage'>
      <Sidebar />
      <main>
        <form onSubmit={handleSubmit} className='create-orphanage-form'>
            <fieldset>
              <legend>Cadastro Perfil</legend>
              <div className='input-block'>
                <label htmlFor='name'>Nome</label>
                <input 
                id='name' 
                value={name} 
                onChange={e => setName(e.target.value)} 
              />

              <div className='input-block'> 
                <label htmlFor='email'>Email</label>
                <input 
                id='name' 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
              />

              <label htmlFor='senha'>Senha</label>
                <input 
                id='name' 
                value={senha} 
                onChange={e => setSenha(e.target.value)} 
                />
              </div>
          
              </div>
            </fieldset>

            <button className='confirm-button' type='submit'>
              Confirmar
            </button>

            <a href='/'>Já tenho uma conta</a>
        </form>
      </main>
    </div>
  )
}
