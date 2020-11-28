import {MapContainer,TileLayer} from 'react-leaflet';
import'./Map.css'
import CambiarVista from "./CambiarVista";
import {showDataOnMap} from "./utilityFunctions";


const Mapa=({freeM,center,zoom,paises,casesType})=>{
    return(
        <div className="map">
            <MapContainer center={center} zoom={zoom}>
                <CambiarVista center={center} zoom={zoom}/>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataOnMap(paises,casesType)}
            </MapContainer>
        </div>
    )
}

export default Mapa