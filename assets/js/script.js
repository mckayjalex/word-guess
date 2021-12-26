let wordBlank = document.querySelector(".word-blanks");
let win = document.querySelector(".win");
let lose = document.querySelector(".lose");
let timerElement = document.querySelector(".timer-count");
let startButton = document.querySelector(".start-button");

let chosenWord = "";
let numBlanks = 0;
let winCounter = 0;
let loseCounter = 0;
let isWin = false;
let timer;
let timerCount;

let lettersInChosenWord = [];
let blanksLetters = [];

let words = ["variable","array", "modulus", "object", "function", "string", "boolean"];

function init() {
    getWins();
    getLosses();
}

function startGame() {
    isWin = false;
    timerCount = 10;
    startButton.disabled = true;
    renderBlanks();
    startTimer();
}

function winGame() {
    wordBlank.textContent = "YOU WON!!!🏆";
    winCounter++;
    startButton.disabled = false;
    setWins();
}

function loseGame() {
    wordBlank.textContent = "GAME OVER";
    loseCounter++;
    startButton.disabled = false;
    setLosses();
}

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            if (isWin && timerCount > 0) {
                clearInterval(timer);
                winGame();
            }
        }
        if (timerCount === 0) {
            clearInterval(timer);
            loseGame();
        }
    }, 1000);
}

function renderBlanks(){
    chosenWord = words[Math.floor(Math.random() * words.length)];
    lettersInChosenWord = chosenWord.split("");
    numBlanks = lettersInChosenWord.length;
    blanksLetters = [];
    for (let i = 0; i < numBlanks; i++) {
        blanksLetters.push("_");
    }
    wordBlank.textContent = blanksLetters.join(" ");
}

function setWins() {
    win.textContent = winCounter;
    localStorage.setItem("winCount", winCounter);
}

function setLosses() {
    lose.textContent = loseCounter;
    localStorage.setItem("LoseCount", loseCounter);
}

function getWins() {
    let storedWins = localStorage.getItem("winCount");
    if (storedWins === null) {
        winCounter = 0;
    } else {
        winCounter = storedWins;
    }
    win.textContent = winCounter;
}

function getLosses() {
    let storedLosses = localStorage.getItem("loseCount");
    if (storedLosses === null){
        loseCounter = 0;
    } else {
        loseCounter = storedLosses;
    }
    lose.textContent = loseCounter;
}

function checkWin() {
    if (chosenWord === blanksLetters.join("")) {
        isWin = true;
    }
}

function checkLetters(letter) {
    let lettersInWord = false;
    for (let i = 0; i < numBlanks; i++) {
        if (chosenWord[i] === letter) {
            lettersInWord = true;
        }
    }
    if (lettersInWord) {
        for (let j = 0; j < numBlanks; j++) {
            if (chosenWord[j] === letter) {
                blanksLetters[j] = letter;            
            }
        }
        wordBlank.textContent = blanksLetters.join(" ");
    }
}

document.addEventListener("keydown", function(event) {
    if (timerCount === 0) {
        return;
    }
    let key = event.key.toLowerCase();
    let alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
    if (alphabetNumericCharacters.includes(key)) {
        let letterGuessed = event.key;
        checkLetters(letterGuessed);
        checkWin();
    }
});

startButton.addEventListener("click", startGame);

init();

let resetButton = document.querySelector(".reset-button");

function resetGame() {
    winCounter = 0;
    loseCounter = 0;
    setWins();
    setLosses();
}

resetButton.addEventListener("click", resetGame);

