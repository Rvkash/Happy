import React from 'react'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { useHistory } from 'react-router-dom'

import { useState, FormEvent, ChangeEvent } from 'react'
import { FiPlus } from 'react-icons/fi'
import { LeafletMouseEvent } from 'leaflet'
  
import './styles.css'

import Sidebar from '../../components/Sidebar'
import api from '../../services/api'
import mapIcon from '../../utils/mapIcon'


export default function CreateOrphanage () {
  const [position, setPosition ] = useState({ latitude: 0, longitude: 0})
  const history = useHistory()

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  function handleMapClick(e: LeafletMouseEvent) {
    const { lat, lng } = e.latlng

    setPosition ({
      latitude: lat,
      longitude: lng,
    })
  }

  function handleSelectImages(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return
    }

  const selectedImages = images.concat(Array.from(e.target.files))

    setImages(selectedImages)

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    })

    
    setPreviewImages(selectedImagesPreview)
  }


  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const { latitude, longitude } = position
    const data = new FormData()
    
    data.append('name', name);
    data.append('about', about); 
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('opening_hours', opening_hours);
    data.append('instructions', instructions);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => {
      data.append('images', image)
    })

    await api.post('/orphanages', data)
    alert('Cadastro realizado')

    history.push('/app')
  }

  return (
    <div id='page-create-orphanage'>
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className='create-orphanage-form'>
          <fieldset>
            <legend>Dados</legend>
            <h1> Selecione um local no mapa </h1>
    
            <Map
              center={[-27.6594698, -48.6712079]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              { position.latitude != 0 
              ? <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]} />
              :null }
            </Map>
             
            <div className='input-block'>
              <label htmlFor='name'>Nome</label>
              <input 
              id='name' 
              value={name} 
              onChange={e => setName(e.target.value)} 
              />
            </div>

            <div className='input-block'>
              <label htmlFor='about'>Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
              id='name' 
              maxLength={300} 
              value={about} 
              onChange={e => setAbout(e.target.value)}
              />
            </div>

            <div className='input-block' >
              <label htmlFor='images'>Fotos</label>
              <div  className='images-container'>
                {previewImages.map((image) => {
                  return <img key={image} src={image} alt={name} /> 
                })}

                <label htmlFor="image[]" className='new-image'>
                <FiPlus size={24} color='#15b6d6' />
                
              </label>
            </div>

              <input multiple type="file" id="image[]" onChange={handleSelectImages} />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className='input-block'>
              <label htmlFor='instructions'>Instruções</label>
              <textarea 
              id='instructions' 
              value={instructions} 
              onChange={e => setInstructions(e.target.value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='opening_hours'>Hórario de funcionamento</label>
              <input 
              id='opening_hours' 
              value={opening_hours} 
              onChange={e => setOpeningHours(e.target.value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='open_on_weekends'>Atende fim de semana</label>
              <div className='button-select'>
                <button 
                type='button' 
                className={open_on_weekends ? 'active' : ''}
                onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>

                <button 
                type='button'
                className={!open_on_weekends ? 'active' : ''}
                onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
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