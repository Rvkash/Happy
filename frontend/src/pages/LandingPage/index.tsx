import React from 'react'
import './styles.css'
import Logo from '../../images/logo.svg'
import { Link } from 'react-router-dom'
import { FiLogIn, FiMap } from 'react-icons/fi'

function Landing () {
  return (
    <div id='page-landing'>
      <div className='content-wrapper'>
        <img src={Logo} alt='Logo imagem' />

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite instituições e mude o dia de muitas crianças</p>
        </main>

        <div className='location'>
          <strong>Florianópolis</strong>
          <span>Santa Catarina</span>
        </div>

        <div className='nav-bottom'>
          <Link to='/register' className='login'>
            <FiLogIn size={26} color='rgba(0, 0, 0, 0.6)' />
          </Link>

          <Link to='/app' className='enter-app'>
            <FiMap size={26} color='rgba(0, 0, 0, 0.6)' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Landing
