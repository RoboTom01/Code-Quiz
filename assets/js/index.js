// variables

var startButton = document.getElementById('start-button');
var nextButton = document.getElementById('next-button');
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');
var timer = document.getElementById('timer');

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


let shuffledQuestions, currentQuestionIndex

// event listeners

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})



// functions

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  timer.classList.remove('hide')
  setNextQuestion()
}

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
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}