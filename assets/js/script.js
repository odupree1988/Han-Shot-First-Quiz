//set interval time for total quiz/ 0 = quiz over
//clear html once they answer the question & start new question
//subtract time if they answer incorrectly
//use local storage to log score and name and new page to show score
//game also ends when all questions are answered
var timeLeft = 120

//run this timer once startQuiz is initiated
var testTimer = setInterval(function () {
  if (timeLeft <= 0) {
    clearInterval(testTimer);
    document.getElementById("timer").innerHTML = "Time's Up!";
  } else {
    document.getElementById("timer").innerHTML = timeLeft + " seconds";
  }
  timeLeft -= 1;
}, 1000);

// var subtractTime = setInterval(function () {
//   if (olEl)
// }