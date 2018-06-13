import React, { Component } from 'react';
import Header from './components/Header';
import Question from './components/Question';
import Results from './components/Results';
import "./sass/main.scss";
import axios from 'axios';
const API="http://enigmatic-cliffs-25405.herokuapp.com/questions";

class App extends Component {
  state={
    name:"",
    surname:"",
    activePart:"login",
    questions:[],
    activeQuestion:0,
    answered:[],
    results:[],  
    startTime:0,
    endTime:0
  }

  componentDidMount(){
    axios.get(API).then((data)=>{
      const questions = [];
      console.log(data)
      const questionData = data.data.questions;
      for(let field in questionData){
        const target = Math.floor(Math.random()*3);
        questions.push(questionData[field][target]);
      };
      this.setState({questions});
    })
  };

  addAnswer = (answer, activeQ)=>{
    if(this.state.answered[activeQ]){                           //tikrinam ar jau yra irasytas atsakymas prie sio klausimo, jei taip ta verte pakeiciam i naujai pasirinkta           
      const newAnswered = [...this.state.answered];
      newAnswered[activeQ] = answer;
      this.setState({answered:newAnswered});
    }else{                            
      const answered = [...this.state.answered,answer];     //jei ne - tiesiog ipushinam i state masyva "answered" nauja nari t.y. atsakyma
      this.setState({answered});
    }
  };

  startQuiz = ()=>{
    this.setState({activePart:"test",startTime:new Date()});
  };

  endQuiz = ()=>{
    var correctOnes = 0;
    this.state.answered.forEach((oneQuestion, i)=>{
      if(oneQuestion.user_selected===oneQuestion.correct){
        correctOnes++
      };
    });
    const score = correctOnes*100/this.state.questions.length;
    this.setState({activePart:"results", endTime:new Date(), results:score});
  };

  changeQuestion = (type)=>{
    switch(type){
      case "forward" : return this.state.activeQuestion<this.state.questions.length-1 ? this.setState({activeQuestion:this.state.activeQuestion+1}) : null;
      case "backward" : return this.state.activeQuestion>0 ? this.setState({activeQuestion:this.state.activeQuestion-1}) : null;
      default : console.log("error")
    }
  };

  loginHandler = (value, type)=>{
    switch(type){
      case "name" : return this.setState({name:value});
      case "surname" : return this.setState({surname:value});
      default : console.log("error")
    }
  };

  renderContent =()=>{
    switch(this.state.activePart){
      case "login" : return <Header loginHandler={this.loginHandler} startQuiz={this.startQuiz}/>
      case "test" : return <Question questions={this.state.questions} activeQuestion={this.state.activeQuestion} changeQuestion={this.changeQuestion} addAnswer={this.addAnswer} answered={this.state.answered} endQuiz={this.endQuiz}/>
      case "results" : return <Results userName={this.state.name} userSurname={this.state.surname} results={this.state.results} duration={(this.state.endTime-this.state.startTime)/1000}/>
      default : console.log("error")
    }
  };

  render() {
    return (
      <div className="quiz-app">
        {this.renderContent()}
      </div>
    );
  }
}

export default App;
