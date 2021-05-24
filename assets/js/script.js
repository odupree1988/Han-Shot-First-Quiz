//set interval time for total quiz/ 0 = quiz over
//clear html once they answer the question & start new question
//subtract time if they answer incorrectly
//use local storage to log score and name and new page to show score
//game also ends when all questions are answered
var answerEl = document.getElementById("btn-answers");
var questionEl = document.getElementById("question");
var startBtnEl = document.getElementById("start-btn");
var restartBtnEl = document.getElementById("restart");
var containerEl = document.getElementById("questions-box");
var loadName = localStorage.getItem("Name");
var loadScore = localStorage.getItem("Score");
var currentQuestionIndex = 0;
var score = 0;
var initial = "";
var timeLeft = 120;

var questionsArray = [
  {
    question: "What color is Luke Skywalkers lightsaber?",
    answers: ["Green", "Red", "Blue", "Purple"],
    correctAnswer: 0,
  },
  {
    question:
      "What is the name of the planet that Qui-Gon Jinn first discovered Anakin Skywalker?",
    answers: ["Naboo", "Tatooine", "Mustafar", "Geonosis"],
    correctAnswer: 1,
  },
  {
    question:
      "What are the creatures, living on Endor, that helped the Rebel’s to defeat the second Death Star?",
    answers: ["Twi'leks", "Jawas", "Wookies", "Ewoks"],
    correctAnswer: 3,
  },
  {
    question: "Who blew up the first Death Star, and with what weapon?",
    answers: [
      "Princess Leia with a thermal detonator",
      "Luke Skywalker with an X-Wing",
      "Princess Leia with an X-Wing",
      "Luke Skywalker with his Lightsaber",
    ],
    correctAnswer: 1,
  },
  {
    question: "Who shot first?",
    answers: ["Han Solo", "Greedo"],
    correctAnswer: 0,
  },
];

restartBtnEl.style.display = "none";

function showNextQuestion() {
  setTimeout(function () {
    if (currentQuestionIndex > questionsArray.length - 1) {
      restartBtnEl.style.display = "block";
      return highScore();
    }

    document.body.classList.remove("correct");
    document.body.classList.remove("wrong");

    var currentQuestion = questionsArray[currentQuestionIndex];
    questionEl.className = "test-questions";
    questionEl.textContent = currentQuestion.question;

    answerEl.innerHTML = "";

    for (var i = 0; i < currentQuestion.answers.length; i++) {
      var button = document.createElement("button");
      button.addEventListener("click", checkAnswer);
      button.setAttribute("data-index", i);
      button.textContent = currentQuestion.answers[i];
      answerEl.appendChild(button);
    }
  }, 2000);
}

function highScore() {
  clearInterval(testTimer);
  alert("You got " + score + " questions correct!");
  initial = prompt("Enter your initials");
  if (!initial) {
    alert("You didn't enter your initials!");
    highScore();
  } else {
    if (score > loadScore) {
      saveName();
      saveScore();
      newHighScore();
    } else {
      return;
    }
  }
}

function checkAnswer(event) {
  console.log(event);
  var selectedAnswer = event.target.getAttribute("data-index");
  var answer = questionsArray[currentQuestionIndex].correctAnswer;
  if (selectedAnswer == answer) {
    score++;
    document.body.classList.add("correct");
    event.target.style.backgroundColor = "green";
  } else {
    timeLeft -= 20;
    document.body.classList.add("wrong");
    event.target.style.backgroundColor = "red";
  }
  // questionEl.classList.add("background-green")
  // setTimeout(function () {
  //   document.body.classList.remove("correct");
  //   document.body.classList.remove("wrong");
  // }, 1000);
  console.log(score);

  currentQuestionIndex++;
  showNextQuestion();
}

newHighScore();

startBtnEl.addEventListener("click", function () {
  showNextQuestion();
  startTimer();
  startBtnEl.style.display = "none";
});

restartBtnEl.addEventListener("click", function () {
  currentQuestionIndex = 0;
  timeLeft = 120;
  score = 0
  containerEl.style.display = "block"
  restartBtnEl.style.display = "none";
  loadName = localStorage.getItem("Name");
  loadScore = localStorage.getItem("Score");
  newHighScore();
  showNextQuestion();
  startTimer();
});
// run this timer once startQuiz is initiated

function endGame() {
  containerEl.style.display = "none"
  restartBtnEl.style.display = "block";
}

function startTimer() {
  testTimer = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(testTimer);
      highScore();
      document.getElementById("timer").innerHTML = "Time's Up!";
      endGame();
    } else {
      document.getElementById("timer").innerHTML = timeLeft + " seconds";
    }
    timeLeft -= 1;
  }, 1000);
}

function saveName() {
  localStorage.setItem("Name", initial);
}
function saveScore() {
  localStorage.setItem("Score", JSON.stringify(score));
}

function newHighScore() {
  if (loadName === null && loadScore === null) {
    return;
  }
  document.getElementById("high-scores").innerHTML =
    "Current High Score: " + loadName + " - " + loadScore;
}
