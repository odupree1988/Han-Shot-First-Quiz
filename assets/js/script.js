//set interval time for total quiz/ 0 = quiz over
//clear html once they answer the question & start new question
//subtract time if they answer incorrectly
//use local storage to log score and name and new page to show score
//game also ends when all questions are answered
var answerEl = document.getElementById("btn-answers");
var questionEl = document.getElementById("question");
var startBtnEl = document.getElementById("start-btn");
var testTimer;
var currentQuestionIndex = 0;
var score = 0;
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
];

function showNextQuestion() {
  setTimeout(function () {
    if (currentQuestionIndex > questionsArray.length - 1) {
      highScore();
      return;
    }

    document.body.classList.remove("correct");
    document.body.classList.remove("wrong");

    var currentQuestion = questionsArray[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;

    answerEl.innerHTML = "";

    for (var i = 0; i < currentQuestion.answers.length; i++) {
      var button = document.createElement("button");
      button.addEventListener("click", checkAnswer);
      button.setAttribute("data-index", i);
      button.textContent = currentQuestion.answers[i];
      answerEl.appendChild(button);
    }
  }, 1000);
}

function highScore() {
  console.log("show high score");
  alert("You got " + score + " questions correct!");
  clearInterval(testTimer);
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

startBtnEl.addEventListener("click", function () {
  showNextQuestion();
  startTimer();
  startBtnEl.style.display = "none";
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

// var subtractTime = setInterval(function () {
//   if (olEl)
// }
