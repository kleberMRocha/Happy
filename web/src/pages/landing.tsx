import React,{useState,useEffect} from "react";
import logo from "../images/logo.svg";
import landingImg from "../images/landing.svg";
import { FiArrowRight} from "react-icons/fi";
import { Link } from "react-router-dom";


function Landing() {

  useEffect(()=>{
    fetch('http://localhost:4000/orphanages')
    .then(response => response.json())
    .then(json => setOrphanages(json.length))
  },[])



  const [orphanages,setOrphanages] = useState(0);


  return (
    <div id="page_landing">
      <div className="wrapper">
        <img src={logo} className="logo-landing" alt="logo Happy" />
        
        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <img
          src={landingImg}
          alt="Ilustração crianças"
          className="landing-img"
        />

        <div className="location">
          <strong>São Paulo </strong>
          <span> Guarulhos</span>
          <div id="info">
                      {orphanages} {' '}
                      instituições cadastradas. 
          </div>
        </div>

        <Link to="/maps" className="enter-app">
          <FiArrowRight size={26} color="#0000008a" />
        </Link>
      </div>
    </div>
  );
}

export default Landing;
