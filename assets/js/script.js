// declaring all HTML elements that need to be manupulated as variables

const timeDisplay = document.querySelector(".time-display");
const scoreCounter = document.querySelector(".score-counter");
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
const clearScoresButton = document.querySelector(".clear-scores");

const questionArray = document.querySelectorAll(".quiz-question");

const nameInput = document.querySelector("#initials");

let score = 0; // initialize the score variable
let timer = 50; // initialize the timer variable

// initialize the score and initials tracking object
let scoreListItem = {
  scoreArray: [],
  userInitials: [],
};

// if local storage is not empty, fill the object with infomation at the launch of the application
if (localStorage.getItem("scoreListItem") != null) {
  scoreListItem = JSON.parse(localStorage.getItem("scoreListItem"));
  // otherwise set object to be empty
} else {
  scoreListItem = {
    scoreArray: [],
    userInitials: [],
  };
}

// init function triggered when the 'start game' button is clicked
function init() {
  // enable all UI buttons for all questions
  enableButtons();
  viewHighScoresButton.style.display = "none"; // when game starts users are not allowed to visit the high scores page
  timeDisplay.textContent = "Time: " + timer; // display timer
  scoreCounter.textContent = "Score: " + score; //display score
  // initialize timer
  const bigTimer = setInterval(function () {
    // timer will decrement by 1 as long as the time left is greater than 0
    if (timer > 0) {
      timeDisplay.textContent = "Time: " + timer;
      timer = timer - 1;
      // else the game is deemed over and the final score page will be rendered, clear the timer
    } else {
      timeDisplay.textContent = "Time: " + timer;
      renderFinalScore();
      clearInterval(bigTimer);
    }
  }, 1000);

  // assigning event listeners to all buttons
  assignEventListener();
  welcomePage.style.display = "none"; // hide welcome page
  questionArray[0].style.display = "block"; // render first question
}

// assigning event listeners to all buttons
function assignEventListener() {
  for (let i = 0; i < buttonArray.length; i++) {
    buttonArray[i].addEventListener("click", renderQuestion);
  }
}

// disable all buttons when a question is answered, untill next question comes up
function disableButtons(id) {
  let buttonArray = document.querySelectorAll(id);

  console.log(buttonArray);
  for (let i = 0; i < buttonArray.length; i++) {
    buttonArray[i].disabled = true;
  }
}

// enable all buttons at the start of the next game
function enableButtons() {
  for (let i = 0; i < buttonArray.length; i++) {
    buttonArray[i].disabled = false;
  }
}

// checking if the user selected the correct answer
function checkAnswer(index, rightAnswer) {
  // if this is not the last question
  if (index != 5) {
    // if the answer selected is correct
    if (rightAnswer === "true") {
      score = score + 2; // add 2 points to the score
      scoreCounter.textContent = "Score: " + score;
      // display correct or incorrect message
      resultMessage.style.display = "block";
      resultMessage.style.color = "Green";
      resultMessage.textContent = "Correct!";
      // if the timer still has more than 1 second left, render the next question (no point of rendering the next question when the timer has less than 1s)
      if (timer > 1) {
        const transitionCorrct = setInterval(function () {
          resultMessage.style.display = "none";
          questionArray[index].style.display = "none";
          questionArray[index + 1].style.display = "block";
          clearInterval(transitionCorrct);
        }, 1000);
      }
      // if the answer is wrong
    } else {
      if (timer >= 5) {
        // minus 5 seconds from the timer as a punishment if the timer still has >= 5s left
        timer = timer - 5;
      } else {
        timer = 0;
      }
      if (score > 0) {
        score = score - 1; // take away 1 point
        scoreCounter.textContent = "Score: " + score;
      } else {
        score = 0;
        scoreCounter.textContent = "Score: " + score;
      }
      // display message of result
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
    // if this is the last question
  } else {
    if (rightAnswer === "true") {
      score = score + 2;
      scoreCounter.textContent = "Score: " + score;
      resultMessage.style.display = "block";
      resultMessage.style.color = "Green";
      resultMessage.textContent = "Correct!";
      if (timer > 1) {
        const transitionCorrct = setInterval(function () {
          timer = 0; // set timer to 0 even if there's still time left.
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
        scoreCounter.textContent = "Score: " + score;
      } else {
        score = 0;
        scoreCounter.textContent = "Score: " + score;
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

// the fucntion that will be triggered when buttons are clicked
function renderQuestion(event) {
  let id = event.target.getAttribute("class"); // get the class attribute for the target button
  let rightAnswer = event.target.dataset.correct; // this variable indicates whether or not the answer is correct.
  let index = 0; // index that will decides which next question to render.

  event.preventDefault();
  event.stopPropagation();

  if (id.includes("q1")) {
    // if the target button class includes 'q1'
    index = 0;
    disableButtons(".q1"); // disable all button for the question.
    checkAnswer(index, rightAnswer); // execute checkAnswer()
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
    index = 4;
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

// function rendering the final score page
function renderFinalScore() {
  viewHighScoresButton.style.display = "none"; // won't allow users to check high scores yet

  scoreListItem.scoreArray.push(score); // push the final score into the array.

  for (let i = 0; i < questionArray.length; i++) {
    //make sure to hide all questions
    questionArray[i].style.display = "none";
  }

  scoreDisplay.textContent = "Your score is: " + score; // display score

  score = 0; // reset score to 0
  scoreCounter.textContent = "Score: " + score;

  resultMessage.style.display = "none";

  finalScorePage.style.display = "block";
}

// function for rendering a list of highest scores
function renderHighScores() {
  for (let i = 0; i < questionArray.length; i++) {
    questionArray[i].style.display = "none";
  }

  welcomePage.style.display = "none";
  finalScorePage.style.display = "none";
  viewHighScoresPage.style.display = "block";

  viewHighScoresButton.style.display = "none";

  // get info from the local storage
  let listItem = JSON.parse(localStorage.getItem("scoreListItem"));
  const ul = document.querySelector(".view-scores-list");
  document.querySelector(".view-scores-list").textContent = ""; // clear all previously rendered list items, to prevent redundancy.
  for (let i = 0; i < listItem.scoreArray.length; i++) {
    let li = document.createElement("li"); // create <li> element
    li.textContent =
      "User " +
      listItem.userInitials[i] +
      " scores " +
      listItem.scoreArray[i] +
      " points."; // set text content
    ul.appendChild(li); // append under ul
  }
}

startButton.addEventListener("click", init); // add event listener to the start game button

// submitting final score and user's initials
submitScoreButton.addEventListener("click", function (event) {
  event.preventDefault();
  event.stopPropagation();

  let initials = nameInput.value;

  if (initials != "") {
    scoreListItem.userInitials.push(initials);
    nameInput.value = "";
  }
  localStorage.setItem("scoreListItem", JSON.stringify(scoreListItem)); // store the info into local storage

  renderHighScores();
});

viewHighScoresButton.addEventListener("click", renderHighScores); // renders the high scores page when clicked

// the 'go back' button that will take users back to the game, start a new game.
backToWelcomePageButton.addEventListener("click", function (event) {
  timer = 50;

  event.stopPropagation();

  finalScorePage.style.display = "none";
  viewHighScoresPage.style.display = "none";
  welcomePage.style.display = "block";
  viewHighScoresButton.style.display = "block";
});

// clears all score history
clearScoresButton.addEventListener("click", function () {
  localStorage.removeItem("scoreListItem");
  scoreListItem.scoreArray = [];
  scoreListItem.userInitials = [];
  document.querySelector(".view-scores-list").textContent = "";
});
