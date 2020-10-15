import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import './style.css';

import mapMarkerImg from '../../images/pin.svg';

function SideBar(){

    const {goBack} = useHistory();

    return(

        <aside className="aside-pages">
        <img src={mapMarkerImg} alt="Happy" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>
    )
}



export default SideBar;