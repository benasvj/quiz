import React from 'react';

const Results = (props)=>{
    return(
        <div className="results">
           <h1>Rezultatai</h1>
           <div className="line"></div>
           <h3>{props.userName} {props.userSurname}</h3>
           <p>Laikas: {props.duration}</p>
           
           <div className="score-bar">
                <div className="filled-score-bar" style={{width:props.results+"%"}}></div>
                <span className="score" style={{color:props.results>50? "white" : "rgb(46,84,151)"}}>{props.results} %</span>
           </div>
        </div>
    )
};

export default Results;