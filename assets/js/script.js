//set interval time for total quiz/ 0 = quiz over
//clear html once they answer the question & start new question
//subtract time if they answer incorrectly
//use local storage to log score and name and new page to show score
//game also ends when all questions are answered

var questionsEl = document.querySelector("#questions");
var answersEl = document.querySelector("#answers");
var colorAnswer = document.querySelector("#color-answer");
var timeLeft = 120;

var h1El = document.createElement("h1");
h1El.textContent = "Question 1";
var olEl = document.createElement("ol");
olEl.innerHTML =
  "<li>answer1</li><li>answer2</li><li>answer3</li><li>answer4</li>";
questionsEl.appendChild(h1El);
answersEl.appendChild(olEl);

var testTimer = setInterval(function () {
  if (timeLeft <= 0) {
    clearInterval(testTimer);
    document.getElementById("timer").innerHTML = "Time's Up!";
  } else {
    document.getElementById("timer").innerHTML = timeLeft + " seconds";
  }
  timeLeft -= 1;
}, 1000);
