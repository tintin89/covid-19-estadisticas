import './Tabla.css'
import numeral from 'numeral'

const Tabla=({datosTabla})=>{
    return (
        <div className="tabla">

            {datosTabla.map(d=>(

                <tr key={datosTabla.indexOf(d)}>
                    <td>{d.country}</td>
                    <td><strong>{numeral(d.cases).format("0,0")}</strong></td>
                </tr>

                )
            )}

        </div>
    )
}

export default Tabla