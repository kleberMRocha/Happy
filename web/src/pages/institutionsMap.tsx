import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoSymbol from '../images/pin.svg';
import {FiPlus,FiArrowRight} from 'react-icons/fi';
import {Map,TileLayer,Marker,Popup} from 'react-leaflet';
import api from '../services/api';

import '../style/pages/institutionsMap.css';
import 'leaflet/dist/leaflet.css';
import MapIcon from "../utils/MapIcon";


function InstitutionsMap() {
  useEffect(()=>{
    api.get('/orphanages')
    .then(orphanages => setOrphanagesList(orphanages.data))
  },[])

interface Orphanage{
  id:number,
  nome:string,
  latitude:number,
  longitude:number,

}

const [orphanagesList,setOrphanagesList] = useState<Orphanage[]>([]);

console.log(orphanagesList);

  return (
    <div className="maps">
      <aside className="maps-sideBar">
          <img src={LogoSymbol} alt="logo Happy"/>
          <header>
                <h2>Escolha um orfanato no mapa</h2>
                <p>Muitas crianças estão esperando a sua visita :)</p>
          </header>
            <div className="city">
                <strong>São Paulo </strong>
                <span> Guarulhos</span>
            </div>
      </aside>

        <main className="institutions-map">
            <Map 
            center={[-23.4443073,-46.530403]} 
            zoom={15} 
            style={{width:'100%',height:'100%'}}>

            <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

            {
              orphanagesList.map(orphanage =>{

                const {
                    id,
                    nome,
                    latitude,
                    longitude,
                } = orphanage;

                  return(
                    <Marker key={id}
                        icon={MapIcon}
                        position={[latitude,longitude]}
                        >
                        <Popup 
                          closeButton={false}
                          maxHeight={240} 
                          minWidth={240}
                          className="map-popup"

                        >
                            {nome}
                            <Link to={`/orphanage/${id}`}>
                                <FiArrowRight size={20} color="#ffffff"/>
                            </Link>
                        </Popup>
                        </Marker> 
                  )
              })
            }

            </Map>
            <Link  className="add-institution" to="/orphanage/create">
                    <FiPlus size={36} color="#ffffff"/>
            </Link>
        </main>


    </div>
  );
}

export default InstitutionsMap;
