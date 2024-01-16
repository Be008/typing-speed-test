const input = document.getElementById("userInput");
const text = document.getElementById("text");
const reload = document.getElementById("reload");

const url = "https://api.quotable.io/random";

let letters;

let getQuote = () => {
  fetch(url)
    .then((data) => data.json())
    .then((item) => {
      text.innerText = item.content;
      splitText(text.innerText);
    });
};

function splitText(item) {
  letters = item.split("");
  text.innerHTML = "";

  letters.forEach((letter, index) => {
    var span = document.createElement("span");
    span.innerText = letter;
    text.appendChild(span);
  });

  input.addEventListener("input", checkInput);
}

function checkInput() {
  var inputText = input.value;
  var inputLetters = inputText.split("");

  text.childNodes.forEach((span, index) => {
    var correctLetter = letters[index];

    if (inputLetters[index] === correctLetter) {
      span.style.color = "green";
    } else {
      span.style.color = "";
    }
  });
}

function reloadQuote() {
  input.value = "";
  getQuote();
  resetTimer();
}

var timerStarted = false;
var timerInterval;

input.addEventListener("input", startTimer);
reload.addEventListener("click", reloadQuote);

function startTimer() {
  if (!timerStarted) {
    timerStarted = true;

    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;

    timerInterval = setInterval(setTime, 1000);
  }

  function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));

    if (input.value.trim() === text.innerText.trim()) {
      clearInterval(timerInterval);
      secondsLabel.style.color = "green";
      minutesLabel.style.color = "green";
      text.style.color = "green";
      input.value = "";
    }
  }

  function pad(val) {
    var valString = val + "";
    return valString.length < 2 ? "0" + valString : valString;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  var minutesLabel = document.getElementById("minutes");
  var secondsLabel = document.getElementById("seconds");
  minutesLabel.innerHTML = "00";
  secondsLabel.innerHTML = "00";
  timerStarted = false;
  secondsLabel.style.color = "rgb(116, 116, 116)";
  minutesLabel.style.color = "rgb(116, 116, 116)";
  text.style.color = "rgb(116, 116, 116)";
}

getQuote();
