let gameSequence = [];
        let userSequence = [];
        let gameStarted = false;
        let level = 0;

        const colors = ["red", "yellow", "green", "purple"];
        const h2 = document.querySelector("h2");
        const h1 = document.querySelector("h1");
        const buttons = document.querySelectorAll(".button");

        async function buttonFlash(button) {
            await Flash(button);
        }

        function Flash(button) {
            return new Promise((res) => {
                button.classList.add("flash");
                setTimeout(() => {
                    button.classList.remove("flash");
                    res();
                }, 250);
            });
        }

        document.addEventListener("keypress", function () {
            if (!gameStarted) {
                startGame();
            }
        });

        document.querySelector(".start").addEventListener("click", function () {
            if (!gameStarted) {
                startGame();
                updateButton("restart");
            } else {
                // updateButton("Start");
                location.reload();
            }
        });

        function updateButton(text) {
            const sb = document.querySelector(".start");
            sb.innerText = text;
            sb.classList.toggle("restart");
        }

        function startGame() {
            gameStarted = true;
            gameSequence = [];
            userSequence = [];
            level = 0;
            h1.textContent = `Simon Game Says`;
            h2.textContent = `Press any key to start`
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
                const currentColor = gameSequence[i];
                const button = document.querySelector(`.${currentColor}`);
                if (button) {
                    buttonFlash(button);
                } else {
                    console.error(`Element with class "${currentColor}" not found.`);
                }
        
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
            h1.innerText = `Your Score is ${level - 1}`;
            h2.innerText = `Game Over! Press any key to restart.`;

            // Remove the "flash" class from all buttons
            buttons.forEach((button) => {
                button.classList.remove("flash");
            });
        }

        function buttonClick() {
            if (gameStarted) {
                const color = this.classList[1];
                buttonFlash(this);
                userSequence.push(color);
                checkUserInput();
            }
        }

        buttons.forEach(function (button) {
            button.addEventListener("click", buttonClick);
        });
