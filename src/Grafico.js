import {Line} from 'react-chartjs-2'
import {useEffect, useState} from 'react'
import numeral from 'numeral'
import './App.css'

const options = {
    legend:{
        display:false
    },
    elements:{
        point:{
            radius:0,
        },
    },
    maintainAspectRatio:false,
    tooltips:{
        mode:"index",
        intersect:false,
        callbacks:{
            label:function (tooltipItem,data) {
                return numeral(tooltipItem.value).format("0,0");
            },
        },
    },
    scales:{
        xAxes:[
            {
                type:"time",
                time:{
                    parser:"MM/DD/YY",
                    tooltipFormat:"ll"
                },
                ticks:{
                    maxTicksLimit:5
                }


            }
        ],
        yAxes:[
            {
                gridLines:{
                    display:false
                },
                ticks:{
                    callback:function (value,index,values) {
                        return numeral(value).format('0,0');
                    },
                   maxTicksLimit:7


                }
            }
        ]
    }
};

const datosGrafico=(data,casesType)=>{
    let lineData=[];
    let lastDataPoint;
    for(let date in data[casesType]){
        if(lastDataPoint){
            let newData={
                x:date,
                y:data[casesType][date] - lastDataPoint,
            }
            lineData.push(newData);
        }
        lastDataPoint=data[casesType][date];

    }
    return lineData;
}

function Grafico({casesType,...props}) {
    const [data,setData] =useState({})

    useEffect(()=>{
       const getDataFetch= async ()=>{
          await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
               .then(response=>{
                   return response.json();
               })
               .then(data=>{

                   let dataGraph=datosGrafico(data,casesType);
                   setData(dataGraph);

               })
       }
       getDataFetch();
    },[casesType])

    return (
        <div className={props.className}>
            {data?.length > 0 && (
                <Line
                data={{
                datasets:[
                    {
                        backgroundColor:props.colorG,
                        borderColor:props.border,
                        data:data
                    }
                ],
            }}
                options={options}

                />
                )

            }


        </div>
    )
}

export default Grafico