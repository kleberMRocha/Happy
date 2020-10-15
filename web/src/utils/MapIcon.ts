import leaflet from 'leaflet';
import mapMarkerImg from '../images/pin.svg';

const MapIcon = leaflet.icon({
    iconUrl:mapMarkerImg,
    iconSize:[58,58],
    iconAnchor:[28,58],
    popupAnchor:[170,5]
})




export default MapIcon;