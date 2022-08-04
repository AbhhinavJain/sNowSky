import React from 'react'

function Forecast(props) {
  return (
    <div>
        <div className="card text-center" style={{width: "22rem"}}>
        <div className="card-body">
            <h5 className="card-title text-center">{props.date}</h5>
            <p className="card-text">
                {props.text} 
                <img src = {props.icon} alt={props.text}></img>
            </p>
                
            <p className="card-text">Temp {props.mintemp}&#8451; - {props.maxtemp}&#8451;</p>
            <p className="card-text">
                Sunrise at {props.sunrise}    
             </p>
            <p className="card-text">
                Sunset at {props.sunset}    
             </p>
        </div>
        </div>
    </div>
  )
}

export default Forecast