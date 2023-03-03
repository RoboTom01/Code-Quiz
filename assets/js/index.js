// variables:
  // from doc
var start = document.getElementById("start");
var quizDiv = document.getElementById("quiz_div");
var timer = document.getElementById("timer");
var timerSeconds = document.getElementById("timer_seconds");
var quizQuestion = document.getElementById("quiz_question");
var quizList = document.getElementById("quiz_list");
var resultsDiv = document.getElementById("results_div");
var completeMsg = document.getElementById("complete_msg");
var score = document.getElementById("score");
var restart = document.getElementById("restart");
var next = document.getElementById("next");
var totalQuestions = document.getElementById("total_questions");

  // for functions
var timerTimeValue = 75;
var questionCount = 0;
var questionNumber = 1;
var userScore = 0;
var counter;
var counterLine;
var widthValue = 0;

  // Questions array:
let questions = [
    {
    numb: 1,
    question: " ?",
    answer: "",
    options: [
      "",
      "",
      "",
      ""
    ]
  },
    {
    numb: 2,
    question: " ?",
    answer: "",
    options: [
      "",
      "",
      "",
      ""
    ]
  },
    {
    numb: 3,
    question: " ?",
    answer: "",
    options: [
      "",
      "",
      "",
      ""
    ]
  },
    {
    numb: 4,
    question: " ?",
    answer: "",
    options: [
      "",
      "",
      "",
      ""
    ]
  },
    {
    numb: 5,
    question: " ?",
    answer: "",
    options: [
      "",
      "",
      "",
      ""
    ]
  },

];



  // listeners

start.onclick = ()=>{
  quizDiv.classList.add("activeInfo");
}

restart.onclick = ()=>{
  quizDiv.classList.add("activeQuiz"); //show quiz box
  resultsDiv.classList.remove("activeResult"); //hide result box
  timerTimeValue = 15; 
  questionCount = 0;
  questionNumber = 1;
  userScore = 0;
  widthValue = 0;
  showQuetions(questionCount); //calling showQestions function
  questionCounter(questionNumber); //passing que_numb value to queCounter
  clearInterval(counter); //clear counter
  clearInterval(counterLine); //clear counterLine
  startTimer(timerTimeValue); //calling startTimer function
  startTimerLine(widthValue); //calling startTimerLine function
  timerSeconds.textContent = "Time Left"; //change the text of timeText to Time Left
}

next.onclick = ()=>{
  if(questionCount < questions.length - 1){ //if question count is less than total question length
      questionCount++; //increment the que_count value
      questionNumber++; //increment the que_numb value
      showQuetions(questionCount); //calling showQestions function
      questionCounter(questionNumber); //passing que_numb value to queCounter
      clearInterval(counter); //clear counter
      clearInterval(counterLine); //clear counterLine
      startTimer(timerTimeValue); //calling startTimer function
      startTimerLine(widthValue); //calling startTimerLine function
      timerSeconds.textContent = "Time Left"; //change the timeText to Time Left
      next.classList.remove("show"); //hide the next button
  }else{
      clearInterval(counter); //clear counter
      clearInterval(counterLine); //clear counterLine
      showResult(); //calling showResult function
  }
}



  // functions

