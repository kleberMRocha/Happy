import React from "react";
import { Link } from "react-router-dom";
import LogoSymbol from '../images/pin.svg';
import {FiPlus} from 'react-icons/fi';
import {Map,TileLayer} from 'react-leaflet';

import '../style/pages/institutionsMap.css';
import 'leaflet/dist/leaflet.css';

function InstitutionsMap() {
  return (
    <div className="maps">
      <aside className="sidebar">
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

            </Map>
            <Link  className="add-institution" to="/">
                    <FiPlus size={36} color="#ffffff"/>
            </Link>
        </main>


    </div>
  );
}

export default InstitutionsMap;
