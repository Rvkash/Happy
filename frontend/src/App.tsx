import React from 'react'
import GlobalStyle from './styles/global'
import 'leaflet/dist/leaflet.css'
import Routes from './routes'

const App = () => {
  return (
    <div className='app'>
      <GlobalStyle />
      <Routes />
    </div>
  )
}

export default App
