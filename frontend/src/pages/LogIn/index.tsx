import React from 'react'
import './styles.css'
import Sidebar from '../../components/Sidebar'

function Dashboard () {
  return (
    <div id='page-create-orphanage'>
      <Sidebar />

      <main>
        <form className='create-orphanage-form'>
          <fieldset>
            <legend>Cadastro Perfil</legend>
            <div className='input-block'>
              <label htmlFor='name'>Nome</label>
              <input id='name' />
              <label htmlFor='email'>Email</label>
              <input id='email' />
              <label htmlFor='senha'>Senha</label>
              <input id='senha' />
              <button className='confirm-button' type='submit'>
               Confirmar
              </button>
              <a href='/'>Já tenho uma conta</a>
            </div>
          </fieldset>
        </form>
      </main>
    </div>
  )
}

export default Dashboard
