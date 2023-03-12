// https://www.youtube.com/watch?v=riDzcEQbX6k&ab_channel=WebDevSimplified


// variables

var startButton = document.getElementById('start-button');
var nextButton = document.getElementById('next-button');
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');
var timer = document.getElementById('timer');
var timerSeconds = document.getElementById('time-seconds');
var answerStatus = document.getElementById('answer-status');
var header = document.getElementById('header');
var timeLeft = '';
var user = '';
var userScore = 0;


var questions = [
  {
    question: 'How do you link the JS file to the HTML?',
    answers: [
      { text: 'Import in JS file.', correct: false },
      { text: '<script src="...', correct: true },
      { text: '<link href="...', correct: false },
      { text: 'All of the above.', correct: false }
    ]
  },
  {
    question: ' ?',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true },
      { text: '', correct: false },
      { text: '', correct: false }
    ]
  },
  {
    question: ' ?',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true },
      { text: '', correct: false },
      { text: '', correct: false }
    ]
  },
  {
    question: ' ?',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true },
      { text: '', correct: false },
      { text: '', correct: false }
    ]
  },
  {
    question: ' ?',
    answers: [
      { text: '', correct: false },
      { text: '', correct: true },
      { text: '', correct: false },
      { text: '', correct: false }
    ]
  }
]

let timerID;
let shuffledQuestions, currentQuestionIndex;

// event listeners

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})



// functions

function countdown() {
  var timeInterval = setInterval(function () {
    if (timeLeft >= 1) {
      timerSeconds.textContent = timeLeft;
      timeLeft--;
    } else {
      timerSeconds.textContent = '';
      clearInterval(timeInterval);
      displayMessage();
      startButton.innerText = 'Restart'
      startButton.classList.remove('hide')
    }
  }, 1000);
}

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  header.classList.add('hide')
  timer.classList.remove('hide')
  timer.classList.add('flex')
  timeLeft = 70
  setNextQuestion()
  countdown()
}


//   startButton.innerText = 'Restart'
//   startButton.classList.remove('hide')


function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('button')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (correct) {
    userScore = userScore +1;
  } else {
    // timeLeft = -1;
  }
  // add else to remove 10 seconds
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    var userScoreFinal = (100 * (userScore)) / 5;
    user = prompt("Your score is " + userScoreFinal + "%! Please enter your name.")
    console.log(user, userScoreFinal);
    window.localStorage.setItem(user, userScoreFinal);
    userScore = 0;
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {

  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


