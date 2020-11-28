import {Card,CardContent,Typography} from "@material-ui/core";
import './InfoBox.css'



const InfoBox=({title,cases,active,colorc,estilo,classtitulo,total,...props})=>{

    return (
        <Card   onClick={props.onClick} className={`infoBox ${active && colorc}`}>
            <CardContent>
                <Typography className={classtitulo} color="textSecondary">
                    {title}
                </Typography>

                <h2 style={{color:estilo}} className="infoBox__cases">Hoy<br/>{cases}</h2>

                <Typography className="infoBox__total">
                    Total<br/>{total}
                </Typography>

            </CardContent>
        </Card>
    )
}

export default InfoBox