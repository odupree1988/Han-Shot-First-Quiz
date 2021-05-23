//set interval time for total quiz/ 0 = quiz over
//clear html once they answer the question & start new question
//subtract time if they answer incorrectly
//use local storage to log score and name and new page to show score
//game also ends when all questions are answered
var answerEl = document.getElementById("btn-answers");
var questionEl = document.getElementById("question");
var startBtnEl = document.getElementById("start-btn");
var restartBtnEl = document.getElementById("restart");
var loadName = localStorage.getItem("Name");
var loadScore = localStorage.getItem("Score");
var testTimer;
var currentQuestionIndex = 0;
var score = 0;
var initial = "";
var timeLeft = 120;

var questionsArray = [
  {
    question: "question1",
    answers: ["answer1", "answer2", "answer3", "answer4"],
    correctAnswer: 0,
  },
  {
    question: "question2",
    answers: ["answer1", "answer2", "answer3", "answer4"],
    correctAnswer: 1,
  },
  {
    question: "question3",
    answers: ["answer1", "answer2", "answer3", "answer4"],
    correctAnswer: 3,
  },
  {
    question: "question4",
    answers: ["answer1", "answer2", "answer3", "answer4"],
    correctAnswer: 1,
  },
  {
    question: "question5",
    answers: ["answer1", "answer2", "answer3", "answer4"],
    correctAnswer: 2,
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
    questionEl.className = "test-questions"
    questionEl.textContent = currentQuestion.question;

    answerEl.innerHTML = "";

    for (var i = 0; i < currentQuestion.answers.length; i++) {
      var button = document.createElement("button");
      button.addEventListener("click", checkAnswer);
      button.setAttribute("data-index", i);
      button.textContent = currentQuestion.answers[i];
      answerEl.appendChild(button);
    }
  }, 3000);
}

function highScore() {
  console.log("show high score");
  alert("You got " + score + " questions correct!");
  initial = prompt("Enter your initials");
  clearInterval(testTimer);
  if (score > loadScore) {
    saveName();
    saveScore();
    newHighScore();
  } else {
    return;
  }
}

function checkAnswer(event) {
  var selectedAnswer = event.target.getAttribute("data-index");
  var answer = questionsArray[currentQuestionIndex].correctAnswer;
  if (selectedAnswer == answer) {
    score++;
    document.body.classList.add("correct");
  } else {
    timeLeft -= 20;
    document.body.classList.add("wrong");
  }
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
  restartBtnEl.style.display = "none";
  loadName = localStorage.getItem("Name");
  loadScore = localStorage.getItem("Score");
  newHighScore();
  showNextQuestion();
  startTimer();
});
// run this timer once startQuiz is initiated

function startTimer() {
  testTimer = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(testTimer);
      highScore();
      document.getElementById("timer").innerHTML = "Time's Up!";
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
