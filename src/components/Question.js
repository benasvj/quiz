import React from 'react';

const Question = (props)=>{
    console.log(props.questions);
    const question = props.questions.filter((ques, i)=>{
        return i===props.activeQuestion
    }).map((question, i)=>{
        return <div key={i}> 
            <h2>{question.question}</h2>
        </div>
    });

    const answerContent = props.questions[props.activeQuestion].answers.map((answer, i)=>{
        return(
            <label key={i}>
                {answer}
                <input
                    onClick={()=>props.addAnswer({user_selected:i, correct:props.questions[props.activeQuestion].correct}, props.activeQuestion)}
                    className="answer-option"
                    name="question"
                    id="red"
                    type="radio"
                    
                />
            </label>
    )});

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
                {question}
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
                        props.changePart("results")
                        props.setTime("ending")
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