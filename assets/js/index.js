// * variables

var startButton = document.getElementById('start-button');
var nextButton = document.getElementById('next-button');
var submitButton = document.getElementById('submit-button');
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');
var timer = document.getElementById('timer');
var timerSeconds = document.getElementById('time-seconds');
var answerStatus = document.getElementById('answer-status');
var header = document.getElementById('header');
var scoreContainer = document.getElementById('score-container');
var scoreCard = document.getElementById('score-card');
var userEl = document.getElementById('user');
var scoreEl = document.getElementById('score');
var highscoreEl = document.getElementById('highscores-link');
var timeLeft;
var userScore;
var userScoreFinal;
var user = '';


let timerID;
let shuffledQuestions, currentQuestionIndex;
let timeInterval;

let storedUsers = []

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
    question: 'What data type(s) does JS support?',
    answers: [
      { text: 'Boolean', correct: false },
      { text: 'String', correct: false },
      { text: 'Object', correct: false },
      { text: 'All of the above.', correct: true }
    ]
  },
  {
    question: 'How would you count the number of characters in a strong?',
    answers: [
      { text: 'length()', correct: true },
      { text: 'numberOfChar()', correct: false },
      { text: 'characterCount()', correct: false },
      { text: 'characterLength()', correct: false }
    ]
  },
  {
    question: '*var = "Hello World"* What is the order count for the letter "e" in the var?',
    answers: [
      { text: '2', correct: false },
      { text: '1', correct: true }
    ]
  },
  {
    question: 'Which of these is NOT a data type in JS?',
    answers: [
      { text: 'object', correct: false },
      { text: 'container', correct: true },
      { text: 'array', correct: false },
      { text: 'All of the above.', correct: false }
    ]
  }
]


// * event listeners

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})



// * functions


  // timer
function countdown() {
timeInterval = setInterval(function () {
    timerSeconds.textContent = timeLeft - 1;
    timeLeft--;
    if (timeLeft <= 0) {
      timerSeconds.textContent = '0';
      clearInterval(timeInterval);
      alert("Time is up! Try again.")
      questionContainerElement.classList.add('hide')
      nextButton.classList.add('hide')
      startButton.innerText = 'Restart'
      startButton.classList.remove('hide')
    }
  }, 1000);
}

  // render to check JSON and local
function renderPageLoad() {
  if (JSON.parse(localStorage.getItem("highscores")) === null) {
    storedUsers = [];
  } else {
  storedUsers = JSON.parse(localStorage.getItem("highscores"));
  }
  console.log(storedUsers);
}

  // start the quiz
function startGame() {
  startButton.classList.add('hide')
  scoreCard.classList.add('hide')
  highscoreEl.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  header.classList.add('hide')
  timer.classList.remove('hide')
  timer.classList.add('flex')
  timeLeft = 71
  userScore = 0
  setNextQuestion()
  countdown()
}

  // pick next question in shuffled array
function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

  // displays next question in array, and lets an answer be selected
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

  // resets box for next question
function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

  // answer selection > process of concluding quix when there are no more questions.
function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (correct) {
      // score increase for correct answer
    userScore = userScore +1;
  } else {
      // time lost for wrong answer
    timeLeft -=10;
    timerSeconds.classList.add('red-text')
    answerStatus.classList.remove('hide')
  }
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
      // ends quiz, finalizes score, allows user to input initials
    clearInterval(timeInterval);
    answerStatus.classList.add('hide')
    questionContainerElement.classList.add('hide')
    highscoreEl.classList.remove('hide')
    timer.classList.remove('flex')
    timer.classList.add('hide')
    scoreCard.classList.remove('hide')
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    userScoreFinal = (100 * (userScore)) / 5;
    user = prompt("Your score is " + userScoreFinal + "%! Please enter your initials. (Hit cancel to not save.)")
      if (user.length > 2) {
        alert("Please enter a 2 letter set of initials.")
        user = prompt("Your score is " + userScoreFinal + "%! Please enter your initials.")
      }
      if (user.length < 2) {
        alert("Please enter a 2 letter set of initials.")
        user = prompt("Your score is " + userScoreFinal + "%! Please enter your initials.")
      }
    scoreCard.textContent = "Thank you " + user + "! You got a " + userScoreFinal + "% score!";
    console.log(user, userScoreFinal);
    saveScore(e)
  }
}

  // recognize input as right/wrong to effect page view
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong')
  }
}

  // resets right/wrong status
function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
  answerStatus.classList.add('hide')
}

// save scores locally
function saveScore(e) {
  e.preventDefault();
  newScore = {
    userInitials: user,
    score: userScoreFinal,
  };
  // storedUsers = JSON.parse(localStorage.getItem("highscores"));
  storedUsers.push(newScore);
  window.localStorage.setItem("highscores", JSON.stringify(newScore));
  // window.location.href = "highscores.html";
  console.log("Saved!")
}