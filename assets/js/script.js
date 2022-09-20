const timeDisplay = document.querySelector(".time-display");
const scoreDisplay = document.querySelector(".score-display");
const resultMessage = document.querySelector(".message");

const viewHighScores = document.querySelector(".view-scores");
const welcomePage = document.querySelector(".start-game");
const finalScorePage = document.querySelector(".final-score");

const buttonArray = document.querySelectorAll("button");
const startButton = document.querySelector(".start-button");
const submitScoreButton = document.querySelector(".submit-score");

const questionArray = document.querySelectorAll(".quiz-question");

const nameInput = document.querySelector("#initials");

let score = 0;
let timer = 60;

let scoreListItem = {
  scoreArray: [],
  initialsArray: [],
};

function init() {
  timeDisplay.textContent = "Time: " + timer;
  const bigTimer = setInterval(function () {
    if (timer >= 0) {
      timeDisplay.textContent = "Time: " + timer;
      timer = timer - 1;
    } else {
      renderFinalScore();
      clearInterval(bigTimer);
    }
  }, 1000);
  assignEventListener();
  welcomePage.style.display = "none";
  questionArray[0].style.display = "block";
}

function assignEventListener() {
  for (let i = 0; i < buttonArray.length; i++) {
    buttonArray[i].addEventListener("click", renderQuestion);
  }
}

function checkAnswer(index, rightAnswer) {
  if (index != 5) {
    if (rightAnswer === "true") {
      score = score + 2;
      resultMessage.style.display = "block";
      resultMessage.style.color = "Green";
      resultMessage.textContent = "Correct!";
      const transitionCorrct = setInterval(function () {
        resultMessage.style.display = "none";
        questionArray[index].style.display = "none";
        questionArray[index + 1].style.display = "block";
        clearInterval(transitionCorrct);
      }, 1000);
    } else {
      if (score > 0) {
        score = score - 1;
      } else {
        score = 0;
      }
      resultMessage.style.display = "block";
      resultMessage.style.color = "red";
      resultMessage.textContent = "Incorrect!";

      const transitionIncorrect = setInterval(function () {
        resultMessage.style.display = "none";
        questionArray[index].style.display = "none";
        questionArray[index + 1].style.display = "block";
        clearInterval(transitionIncorrect);
      }, 1000);
    }
  } else {
    if (rightAnswer === "true") {
      score = score + 2;
      resultMessage.style.display = "block";
      resultMessage.style.color = "Green";
      resultMessage.textContent = "Correct!";
      const transitionCorrct = setInterval(function () {
        // resultMessage.style.display = "none";
        // questionArray[index].style.display = "none";
        // finalScorePage.style.display = "block";
        timer = 0;
        clearInterval(transitionCorrct);
      }, 1000);
    } else {
      if (score > 0) {
        score = score - 1;
      } else {
        score = 0;
      }
      resultMessage.style.display = "block";
      resultMessage.style.color = "red";
      resultMessage.textContent = "Incorrect!";

      const transitionIncorrect = setInterval(function () {
        // resultMessage.style.display = "none";
        // questionArray[index].style.display = "none";
        // finalScorePage.style.display = "block";
        timer = 0;
        clearInterval(transitionIncorrect);
      }, 1000);
    }
  }

  console.log(score);
}

function renderQuestion(event) {
  let id = event.target.getAttribute("class");
  let rightAnswer = event.target.dataset.correct;
  let index = 0;

  event.preventDefault();
  event.stopPropagation();

  if (id === "q1") {
    index = 0;
    checkAnswer(index, rightAnswer);
  } else if (id === "q2") {
    index = 1;
    checkAnswer(index, rightAnswer);
  } else if (id === "q3") {
    index = 2;
    checkAnswer(index, rightAnswer);
  } else if (id === "q4") {
    index = 3;
    checkAnswer(index, rightAnswer);
  } else if (id === "q5") {
    index = 4;
    checkAnswer(index, rightAnswer);
  } else if (id === "q6") {
    index = 5;
    checkAnswer(index, rightAnswer);
  } else {
    index = 0;
    // welcomePage.style.display = "none";
    // questionArray[index].style.display = "block";
  }
}

function renderFinalScore() {
  scoreListItem.scoreArray.push(score);

  for (let i = 0; i < questionArray.length; i++) {
    questionArray[i].style.display = "none";
  }

  scoreDisplay.textContent = "Your score is: " + score;

  resultMessage.style.display = "none";

  finalScorePage.style.display = "block";

  console.log(scoreListItem.scoreArray);
}

startButton.addEventListener("click", init);

submitScoreButton.addEventListener("click", function () {
  let initials = nameInput.value;

  if (initials != "") {
    scoreListItem.initialsArray.push(initials);
    nameInput.value = "";
    console.log(scoreListItem.initialsArray);
  }
});
