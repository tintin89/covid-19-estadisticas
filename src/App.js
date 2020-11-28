import './App.css';
import InfoBox from "./InfoBox";
import Mapa from './Mapa'
import Grafico from './Grafico'
import {MenuItem,FormControl,Select,Card,CardContent} from "@material-ui/core";
import {useEffect, useState} from 'react';
import Tabla from './Tabla'
import {ordenarDatos} from "./utilityFunctions";
import 'leaflet/dist/leaflet.css'
import numeral from 'numeral'

function App() {
    const [paises,setPaises]=useState([]);
    const [paisSelected,setPaisSelected]=useState('mundo');
    const [paisInfo,setPaisInfo]=useState({});
    const [dataTable,setDataTable]=useState([]);
    const [mapCenter,setMapCenter] = useState({lat:34.80746, lng:-40.4796});
    const [mapZoom,setMapZoom]= useState(3);
    const [mapPaises,setMapPaises]=useState([]);
    const [casesType,setCasesType]=useState('cases');


    useEffect(()=>{
        if(window.matchMedia("(max-width:801px)").matches){
            setMapZoom(1);
        }
       fetch('https://disease.sh/v3/covid-19/all')
           .then(response=>response.json())
           .then(data=>{
               setPaisInfo(data);
           })
    },[])

    const onPaisChange= async e=>{
        const code = e.target.value;


        const url = code==="mundo" ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${code}`;

        await fetch(url)
            .then(response=>response.json())
            .then(data=>{

                if(code!=="mundo"){
                    setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
                    setMapZoom(4);
                }else{
                setMapCenter({lat:34.80746, lng:-40.4796});
                setMapZoom(3);}
                setPaisInfo(data);
                setPaisSelected(code);

            })
    }

    useEffect(()=>{
        const getPaisesData = async ()=>{
           await fetch('https://disease.sh/v3/covid-19/countries')
               .then(response=>response.json())
               .then(data=>{
                   const dataPaises = data.map(pais=>(
                       {
                           nombre:pais.country,
                           value:pais.countryInfo.iso2
                       }
                       ));
                   const dataSorted=ordenarDatos(data);
                   setDataTable(dataSorted)
                   setMapPaises(data);
                   setPaises(dataPaises);
               });
        };
        getPaisesData();
    },[])

    const algo=casesType==="cases" ? "casos" : (casesType==="recovered" ? "recuperados" : "fallecidos");
  return (

    <div className="app">
        <div className="app__left">
            <div className="app__header">
                <h1>Estadísticas del COVID-19</h1>
                <FormControl className="app__dropdown">
                    <Select

                        variant="outlined"
                        value={paisSelected}
                        onChange={onPaisChange}
                    >
                        <MenuItem value="mundo">Mundo</MenuItem>
                        {
                            paises.map(p=>(
                                    <MenuItem key={paises.indexOf(p)} value={p.value}>{p.nombre}</MenuItem>
                                )
                            )
                        }
                    </Select>
                </FormControl>
            </div>



            <div className="app__stats">

                <InfoBox
                    classtitulo="infoBox__covid"
                    estilo="red"
                    colorc="infoBox--selected--rojo"
                    active={casesType==="cases"}
                    onClick={e=>setCasesType('cases')}
                    title="Casos"
                    cases={numeral(paisInfo.todayCases).format("0,0")}
                    total={numeral(paisInfo.cases).format("0,0")}
                />
                <InfoBox

                    classtitulo="infoBox__recup"
                    estilo="#8acb26"
                    colorc="infoBox--selected--verde"
                    active={casesType==="recovered"}
                    onClick={e=>setCasesType('recovered')}
                    title="Recuperados"
                    cases={numeral(paisInfo.todayRecovered).format("0,0")}
                    total={numeral(paisInfo.recovered).format("0,0")}
                />
                <InfoBox

                    classtitulo="infoBox__fall"
                    estilo="dimgray"
                    colorc="infoBox--selected--negro"
                    active={casesType==="deaths"}
                    onClick={e=>setCasesType('deaths')}
                    title="Fallecidos"
                    cases={numeral(paisInfo.todayDeaths).format("0,0")}
                    total={numeral(paisInfo.deaths).format("0,0")}
                />

            </div>

            <Mapa

             casesType={casesType}
             paises={mapPaises}
             center={mapCenter}
             zoom={mapZoom}

            />

        </div>

        <Card className="app__right">
            <CardContent>
                <h3>Lista de países por casos confirmados</h3>
                <Tabla datosTabla={dataTable}/>

                <h3>{`Indice de ${algo} en los últimos 4 meses a nivel mundial`}</h3>
                <Grafico
                    border={
                        casesType==="cases" ? "#cc1034" : (casesType==="recovered" ? "green" : "black")

                    }
                    colorG={
                        casesType==="cases" ? "rgba(204,16,52,0.5)" : (casesType==="recovered" ? "rgba(138,203,38,0.5)" : "rgba(105,105,105,0.5")
                    }
                    className="app__grafico"
                    casesType={casesType}/>
            </CardContent>
        </Card>





    </div>
  );

}

export default App;
