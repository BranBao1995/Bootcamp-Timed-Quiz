const timeDisplay = document.querySelector(".time-display");
const scoreDisplay = document.querySelector(".score-display");
const resultMessage = document.querySelector(".message");

const welcomePage = document.querySelector(".start-game");
const finalScorePage = document.querySelector(".final-score");
const viewHighScoresPage = document.querySelector(".view-history");

const buttonArray = document.querySelectorAll(".button");
const startButton = document.querySelector(".start-button");
const submitScoreButton = document.querySelector(".submit-score");
const viewHighScoresButton = document.querySelector(".view-scores");
const backToWelcomePageButton = document.querySelector(".button-go-back");

const questionArray = document.querySelectorAll(".quiz-question");

const nameInput = document.querySelector("#initials");

console.log(buttonArray);

let score = 0;
let timer = 10;

let scoreListItem = {
  scoreArray: [],
  userInitials: [],
};

scoreListItem = JSON.parse(localStorage.getItem("scoreListItem"));

function init() {
  enableButtons();
  viewHighScoresButton.style.display = "none";
  timeDisplay.textContent = "Time: " + timer;
  const bigTimer = setInterval(function () {
    if (timer > 0) {
      timeDisplay.textContent = "Time: " + timer;
      timer = timer - 1;
    } else {
      timeDisplay.textContent = "Time: " + timer;
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

function disableButtons(id) {
  let buttonArray = document.querySelectorAll(id);

  console.log(buttonArray);
  for (let i = 0; i < buttonArray.length; i++) {
    buttonArray[i].disabled = true;
  }
}

function enableButtons() {
  for (let i = 0; i < buttonArray.length; i++) {
    buttonArray[i].disabled = false;
  }
}

function checkAnswer(index, rightAnswer) {
  if (index != 5) {
    if (rightAnswer === "true") {
      score = score + 2;
      resultMessage.style.display = "block";
      resultMessage.style.color = "Green";
      resultMessage.textContent = "Correct!";
      if (timer > 1) {
        const transitionCorrct = setInterval(function () {
          resultMessage.style.display = "none";
          questionArray[index].style.display = "none";
          questionArray[index + 1].style.display = "block";
          clearInterval(transitionCorrct);
        }, 1000);
      }
    } else {
      if (timer >= 5) {
        timer = timer - 5;
      } else {
        timer = 0;
      }
      if (score > 0) {
        score = score - 1;
      } else {
        score = 0;
      }
      resultMessage.style.display = "block";
      resultMessage.style.color = "red";
      resultMessage.textContent = "Incorrect!";
      if (timer > 1) {
        const transitionIncorrect = setInterval(function () {
          resultMessage.style.display = "none";
          questionArray[index].style.display = "none";
          questionArray[index + 1].style.display = "block";
          clearInterval(transitionIncorrect);
        }, 1000);
      }
    }
  } else {
    if (rightAnswer === "true") {
      score = score + 2;
      resultMessage.style.display = "block";
      resultMessage.style.color = "Green";
      resultMessage.textContent = "Correct!";
      if (timer > 1) {
        const transitionCorrct = setInterval(function () {
          timer = 0;
          clearInterval(transitionCorrct);
        }, 1000);
      }
    } else {
      if (timer >= 5) {
        timer = timer - 5;
      } else {
        timer = 0;
      }
      if (score > 0) {
        score = score - 1;
      } else {
        score = 0;
      }
      resultMessage.style.display = "block";
      resultMessage.style.color = "red";
      resultMessage.textContent = "Incorrect!";

      if (timer > 1) {
        const transitionIncorrect = setInterval(function () {
          // resultMessage.style.display = "none";
          // questionArray[index].style.display = "none";
          // finalScorePage.style.display = "block";
          timer = 0;
          clearInterval(transitionIncorrect);
        }, 1000);
      }
    }
  }
}

function renderQuestion(event) {
  let id = event.target.getAttribute("class");
  let rightAnswer = event.target.dataset.correct;
  let index = 0;

  event.preventDefault();
  event.stopPropagation();

  if (id.includes("q1")) {
    index = 0;
    disableButtons(".q1");
    checkAnswer(index, rightAnswer);
  } else if (id.includes("q2")) {
    index = 1;
    disableButtons(".q2");
    checkAnswer(index, rightAnswer);
  } else if (id.includes("q3")) {
    index = 2;
    disableButtons(".q3");
    checkAnswer(index, rightAnswer);
  } else if (id.includes("q4")) {
    index = 3;
    disableButtons(".q4");
    checkAnswer(index, rightAnswer);
  } else if (id.includes("q5")) {
    disableButtons(".q5");
    checkAnswer(index, rightAnswer);
  } else if (id.includes("q6")) {
    index = 5;
    disableButtons(".q6");
    checkAnswer(index, rightAnswer);
  } else {
    index = 0;
    // welcomePage.style.display = "none";
    // questionArray[index].style.display = "block";
  }
}

function renderFinalScore() {
  viewHighScoresButton.style.display = "none";

  scoreListItem.scoreArray.push(score);

  for (let i = 0; i < questionArray.length; i++) {
    questionArray[i].style.display = "none";
  }

  scoreDisplay.textContent = "Your score is: " + score;

  resultMessage.style.display = "none";

  finalScorePage.style.display = "block";
}

function renderHighScores() {
  for (let i = 0; i < questionArray.length; i++) {
    questionArray[i].style.display = "none";
  }

  welcomePage.style.display = "none";
  finalScorePage.style.display = "none";
  viewHighScoresPage.style.display = "block";

  viewHighScoresButton.style.display = "none";

  let listItem = JSON.parse(localStorage.getItem("scoreListItem"));
  console.log(listItem);
  const ul = document.querySelector(".view-scores-list");
  for (let i = 0; i < listItem.scoreArray.length; i++) {
    let li = document.createElement("li");
    li.textContent =
      "User " +
      listItem.userInitials[i] +
      " scores " +
      listItem.scoreArray[i] +
      "points!";
    ul.appendChild(li);
  }
}

startButton.addEventListener("click", init);

submitScoreButton.addEventListener("click", function (event) {
  event.preventDefault();
  event.stopPropagation();

  let initials = nameInput.value;

  if (initials != "") {
    scoreListItem.userInitials.push(initials);
    nameInput.value = "";
  }
  localStorage.setItem("scoreListItem", JSON.stringify(scoreListItem));

  renderHighScores();
  console.log(scoreListItem);
});

viewHighScoresButton.addEventListener("click", renderHighScores);

backToWelcomePageButton.addEventListener("click", function (event) {
  timer = 5;

  event.stopPropagation();

  finalScorePage.style.display = "none";
  viewHighScoresPage.style.display = "none";
  welcomePage.style.display = "block";
  viewHighScoresButton.style.display = "block";
});
