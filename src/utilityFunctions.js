import {Circle,Popup} from 'react-leaflet';
import numeral from 'numeral'
import './Map.css'

const casesTypeColors = {
    cases:{
        hex:"#fb4443",
        multiplier:400
    },
    recovered:{
        hex:"#7dd71d",
       multiplier:400
    },
    deaths:{
        hex:"#696969",
        multiplier:1600
    }
}


export const ordenarDatos=(datos)=>{
    const ordenar=[...datos];
    ordenar.sort((a,b)=>{
        if(a.cases > b.cases){
            return -1
        }else{
            return 1
        }
    })
    return ordenar
}






export const showDataOnMap=(data,casesType)=>(
    data.map(country=>(
        <Circle
        center={[country.countryInfo.lat,country.countryInfo.long]}
        fillOpacity={0.4}
        pathOptions={{
            color:casesTypeColors[casesType].hex,
            fillColor:casesTypeColors[casesType].hex
        }}

        radius={
            Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
        >
            <Popup>
               <div className="info__container">
                   <div
                   className="info__flag"
                   style={{backgroundImage:`url(${country.countryInfo.flag})`}}
                   />
                   <div className="info__name">{country.country}</div>
                   <div className="info__confirmados">Casos: {numeral(country.cases).format("0,0")}</div>
                   <div className="info__recuperados">Recuperados: {numeral(country.recovered).format("0,0")}</div>
                   <div className="info__fallecidos">Fallecidos: {numeral(country.deaths).format("0,0")}</div>
               </div>
            </Popup>
        </Circle>
    ))
)
