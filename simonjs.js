let gameSequence = [];
let userSequence = [];
let gameStarted = false;
let level = 0;

const colors = ["red", "yellow", "green", "violet"];
const h2 = document.querySelector("h2");
const h1=document.querySelector("h1");

function buttonFlash(button) {
    button.classList.add("flash");
    setTimeout(function () {
        button.classList.remove("flash");
    }, 250);
}

document.addEventListener("keypress", function () {
    if (!gameStarted) {
        startGame();
    }
});


document.querySelector(".start").addEventListener("click", function () {
    if (!gameStarted) {
        startGame();
    }
});


function startGame() {
    gameStarted = true;
    gameSequence = [];
    userSequence = [];
    level = 0;
    nextLevel();
}

function nextLevel() {
    level++;
    h2.innerText = `Level ${level}`;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(randomColor);

    playSequence();
}

function playSequence() {
    let i = 0;
    const interval = setInterval(function () {
        buttonFlash(document.querySelector(`.${gameSequence[i]}`));
        i++;
        if (i >= gameSequence.length) {
            clearInterval(interval);
        }
    }, 1000);

    userSequence = [];
}

function checkUserInput() {
    if (userSequence.length === gameSequence.length) {
        for (let i = 0; i < userSequence.length; i++) {
            if (userSequence[i] !== gameSequence[i]) {
                gameOver();
                return;
            }
        }

        setTimeout(function () {
            nextLevel();
        }, 1000);
    }
}

function gameOver() {
    gameStarted = false;
    h1.innerText=`Your Score is ${level-1}`;
    h2.innerText = `Game Over! Press any key to restart.`;
}

function buttonClick() {
    if (gameStarted) {
        const color = this.classList[1];
        buttonFlash(this);
        userSequence.push(color);
        checkUserInput();
    }
}

const buttons = document.querySelectorAll(".button");
buttons.forEach(function (button) {
    button.addEventListener("click", buttonClick);
});



