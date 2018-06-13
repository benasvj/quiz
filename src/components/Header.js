import React from 'react';

const Header = (props)=>{

    return(
        <div className="login-box">
            <h1>&lt;Programavimo Testas/&gt;</h1>
            <input type="text" placeholder="vardas" onChange={(e)=>props.loginHandler(e.target.value, "name")}/>
            <input type="text" placeholder="pavardė" onChange={(e)=>props.loginHandler(e.target.value, "surname")}/>
            <button onClick={()=>{
                props.startQuiz("test")
                }}>Pradėti</button>
        </div>
    )

};

export default Header;