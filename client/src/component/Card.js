import React from 'react'
import "./Card.css"
import { colors } from '@material-ui/core'

export default function Card(props){
    const {flight_number,mission_id,launch_year,launch_success,mission_name,image}=props.data;

    return(
        <div className="card-container">
            <div className="card ">
                <div className="img-container">
                <img src={image}/>
                </div>

               
               <div className="content-section">
                   <label style={{color:'blue'}}>{mission_name} #</label><span>{flight_number}</span><br/>
                   <label><b>Mission id:</b></label><span>{mission_id}</span><br/>
                   <label><b>Launch year:</b></label><span>{launch_year}</span><br/>
                   <label><b>Successful Launch:</b></label><span>{String(launch_success)}</span><br/>
                   <label><b>Successful Landing:</b></label><span>{}</span>

               </div>  
            </div>

        </div>
    )
} 