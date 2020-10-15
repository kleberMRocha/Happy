import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import "../style/pages/orphanage.css";
import SideBar from "../components/sidebar";
import MapIcon from "../utils/MapIcon";
import api from "../services/api";
import { useParams } from "react-router-dom";

export default function Orphanage() {
  interface RouteParms {
    id: string;
  }

  interface Orphanage {
    nome: string;
    latitude: number;
    longitude: number;
    about: string;
    instructions: string;
    open_on_weekends: boolean;
    opening_hours: string;
    images: Array<{
      url: string;
    }>;
  }

  const parms = useParams<RouteParms>();
  const [orphanage, setOrphanageList] = useState<Orphanage>();
  const [images, setImages] = useState<string>("");

  useEffect(() => {
    api.get(`/orphanages/${parms.id}`).then((orphanage) => {
      setOrphanageList(orphanage.data);
      setImages(orphanage.data.images[0].url);
    });
  }, [parms.id]);

  if (!orphanage) {
    return <p> carregando ...</p>;
  }

  return (
    <div id="page-orphanage">
      <SideBar />{" "}
      <main>
        <div className="orphanage-details">
          <img src={images} alt={orphanage.nome} />

          <div className="images">
            {orphanage.images.map((image, index) => {
              return (
                <button
                  key={image.url}
                  className={image.url == images ? "active" : ""}
                  onClick={() => {
                    setImages(orphanage.images[index].url);
                  }}
                  type="button"
                  data-index={index}
                >
                  <img src={image.url} alt={orphanage.nome} />
                </button>
              );
            })}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.nome}</h1>
            <p> {orphanage.about}</p>
            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: "100%", height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  interactive={false}
                  icon={MapIcon}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </Map>

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`http://www.google.com/maps/place/${orphanage.latitude},${orphanage.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>{orphanage.instructions}</h2>
            <p>
              Venha como se sentir mais à vontade e traga muito amor para dar.
            </p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              <div
                className={
                  orphanage.open_on_weekends ? "open-on-weekends" : "closed"
                }
              >
                <FiInfo
                  size={32}
                  color={orphanage.open_on_weekends ? "#37C77F" : "#FF669D"}
                />
                {orphanage.open_on_weekends ? "Atendemos" : "Não Atendemos"}
                <br />
                fim de semana
              </div>
              ) ||
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}

          </div>
        </div>
      </main>
    </div>
  );
}
