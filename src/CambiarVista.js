import {useMap} from 'react-leaflet'

function CambiarVista({center,zoom}){
    const map = useMap();
    map.setView(center,zoom);
    return null
}

export default CambiarVista