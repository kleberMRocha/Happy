import React, { ChangeEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import {FiPlus } from "react-icons/fi";
import '../style/pages/create-orphanage.css';
import SideBar from "../components/sidebar";
import MapIcon from "../utils/MapIcon";
import { LeafletMouseEvent } from "leaflet";
import api from "../services/api";
import { useHistory } from "react-router-dom";


export default function CreateOrphanage() {

  const [position,setPosition] = useState({latitude:0,longitude:0});

  const [nome,setNome] = useState('');
  const [about,setAbout] = useState('');
  const [instructions,setInstructions] = useState('');
  const [open_on_weekends,setOpen] = useState(0);
  const [opening_hours,setHours] = useState('');
  const [images,setImages] = useState<File[]>([]);
  const [preview,setpreview] = useState<string[]>([]);

  const history = useHistory();

  function handleMapClick(event:LeafletMouseEvent){
     const {lat,lng} = event.latlng;
      setPosition({latitude:lat,longitude:lng});
  }

  function handlechangeImgae(event:ChangeEvent<HTMLInputElement>){
    if(!event.target.files)return;

   const selectedImages = Array.from(event.target.files);

   setImages(selectedImages);

   const selectedPreview = selectedImages.map(img =>{

    return URL.createObjectURL(img);

   })

   setpreview(selectedPreview);


  }
  
  return (
    <div id="page-create-orphanage">
     <SideBar />
      <main>
        <form className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-23.413,-46.4445]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer 
                   url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {position.latitude && 
              <Marker interactive={false} icon={MapIcon} position={[position.latitude,position.longitude]} /> 
              }
              
            </Map>

            <div className="input-block">
            <label htmlFor="name">Nome</label>
              <input id="name" value={nome} onChange={(event)=> setNome(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={(event)=>{
                setAbout(event.target.value)
              }} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>
              <div className="images-container">
                <div className="uploaded-image">

                  {
                    preview.map((img) => {
                      return(<img  key={img} src={img} alt={nome}/>)
                    })
                  }


                  <label htmlFor="image[]" className="new-image">
                    <FiPlus size={24} color="#15b6d6" />
                  </label>
                  

                </div>
                <input multiple onChange={handlechangeImgae} type="file" id="image[]" />
              </div>

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" 
              value={instructions} 
              onChange={(event)=>{
                setInstructions(event.target.value)
              }}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horario de funcionamento</label>
              <input id="opening_hours" 
              value={opening_hours}
              onChange={(event)=>{
                setHours(event.target.value);
              }} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>
              {open_on_weekends}
              <div className="button-select">
                
                <button type="button" 
                className={open_on_weekends === 1 ? 'active' : ''}
                onClick={()=>{
                  setOpen(1);
                }}
                >Sim</button>

                <button 
                type="button" 
                className={open_on_weekends === 0 ? 'active' : ''}
                onClick={()=>{
                 setOpen(0);
                }}

                >Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" 
          onClick={(e)=>{
            const {latitude,longitude} = position;
            e.preventDefault() 

              const data = new FormData();

              data.append('nome',nome);
              data.append('latitude',String(latitude));
              data.append('longitude',String(longitude));
              data.append('about',String(about));
              data.append('instructions',instructions);
              data.append('open_on_weekends',String(open_on_weekends));
              data.append('opening_hours',opening_hours);
              images.forEach(img =>{
                data.append('images',img);
              })
           
      
            console.log(data)

             api.post('orphanages',data)
             .then(res => {
               alert('cadastros realziados com sucesso!');
               history.push('/maps');
             }).catch(err =>{
               alert('aconteceu algo de errado');
               console.log(err)
             })

            
          }

          }
            type="submit">

            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}


