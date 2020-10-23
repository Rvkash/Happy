import React, { useEffect, useState } from 'react'
import { FiTrash2, FiPlus, FiLogOut } from 'react-icons/fi'
import { useHistory, useParams } from 'react-router-dom'
import './styles.css'

import api from '../../services/api'

interface User {
  id: number,
  email: string
  name: string, 
}

interface UserParams {
  id: string,
}

export default function Profile () {
  const history = useHistory()  
  const params = useParams<UserParams>()
    const [user, setUser] = useState<User>()

    useEffect(() => {
      api.get(`users/${params.id}`).then(response => {
      setUser(response.data)
      })
      }, [])

      if(!user) {
        return <h1>Carregando... </h1>
      }
    

      async function handleDeleteUser(id: any) {
        alert('Deletado')
          try{
            await api.delete(`users/${id}`)
          } catch(err) {
            alert('erro ao deletar')
          }
          history.push('/')
      }

      async function handleLogout() {
        history.push('/')

      }

  return (
    <main>
      <div id='container'>
        <div className='form'>

          <div className="my-perfil">
            <h1>Bem Vindo</h1>
              <FiTrash2 size={20} color='#FFF' />
          </div>

          <div className='avatar'>
            <img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpickaface.net%2Fgallery%2Favatar%2F20150620_022710_4480_test.png&f=1&nofb=1' />
            <h1>{user.name}</h1>
            <p>Instituições Cadastradas: 3</p>
            <p>{user.email}</p>
          </div>

          <div className='institution'>
            <div className="img_img">
              <img src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fg.glbimg.com%2Fog%2Fgs%2Fgsat5%2Ff%2Foriginal%2F2014%2F05%2F03%2Fajuda-2-620_4285108544569871250.jpg&f=1&nofb=1'/>
              <h1>Ong</h1>
              <p>Sobre Lorem Ipsslum</p>
              <a href="">Visualizar</a>
            </div>

          <div className='institution'>
           <div className="img_img">
              <img src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fg.glbimg.com%2Fog%2Fgs%2Fgsat5%2Ff%2Foriginal%2F2014%2F05%2F03%2Fajuda-2-620_4285108544569871250.jpg&f=1&nofb=1' />
              <h1>Criança Feliz</h1>
              <p>Visite crianças</p>
              <a href="">Visualizar</a>
           </div>

           <div className='institution'>
           <div className="img_img">
              <img src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fg.glbimg.com%2Fog%2Fgs%2Fgsat5%2Ff%2Foriginal%2F2014%2F05%2F03%2Fajuda-2-620_4285108544569871250.jpg&f=1&nofb=1' />
              <h1>Instituição Alitude</h1>
              <p>Sobre Lorem Ipsslum</p>
              <a href="">Visualizar</a>

            </div>
           </div>
          </div> 
        </div>

          <div id='button'>
            <button
              className='new' type='submit'
              onSubmit={() => {}}
            >
              Nova Instituição
              <FiPlus size={20} color='#FFF' />
            </button>
          </div>

          <div id='button'>
            <button
              className='delete' type='submit'
              onClick={() => handleDeleteUser(user.id)}
            >
              Deletar meu perfil
              <FiTrash2 size={20} color='#FFF' />
            </button>

          </div>

          <div id='button'>
            <button
              className='logout' type='submit'
              onClick={handleLogout}
            >
              Sair
              <FiLogOut size={20} color='#FFF' />
            </button>

          </div>

        </div>
      </div>
    </main>
  )
}
