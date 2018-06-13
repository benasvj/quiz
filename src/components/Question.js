import React from 'react';

const Question = (props)=>{

    const answerContent = props.questions[props.activeQuestion].answers.map((answer, i)=>{
        return(
            <label key={i}>
                {answer}
                <input
                    onClick={()=>props.addAnswer({user_selected:i, correct:props.questions[props.activeQuestion].correct}, props.activeQuestion)}
                    className="answer-option"
                    name="question"
                    type="radio"
                />
            </label>
    )});

    //  styles 
    const emptyBarStyle = {
        backgroundColor:'rgb(46,84,151)',
        width:`${500/props.questions.length}px`,
    };

    const bars = props.answered.map((ques, i)=>{
        return <div className="bar" key={i} style={emptyBarStyle}></div>
    });

    const endTestStyle ={
        color:'white',
        backgroundColor:'rgb(46,84,151)',
    };


    return(
        <div className="question-page">
            <h3>Klausimas {props.activeQuestion+1}/5</h3>
            <h4>
                {props.questions[props.activeQuestion].question}
            </h4>
            <form>
                {answerContent}
            </form>
            <div className="buttons-block">
                <div className ="button-left">
                    <button onClick={()=>props.changeQuestion("backward")}>Atgal</button>
                </div>
                <div className ="button-right">
                    <button disabled={props.answered.length<props.activeQuestion+1? 'disabled' : null} onClick={()=>props.changeQuestion("forward")}>Sekantis</button>
                    <button disabled={props.answered.length<=0? 'disabled' : null} style={props.answered.length>0? endTestStyle : null} type="button" onClick={()=>{
                        props.endQuiz()
                    }}>Baigti Testą</button>
                </div>

            </div>
            <div className="progress">
                {bars}
            </div>
        </div>
    )

};

export default Question;