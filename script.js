const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let gameOver = false;
let foodX, foodY;
let snakeX = 5,
    snakeY = 10;
let snakeBody = [];
let velocityX = 0,
    velocityY = 0;
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score:${highScore}`;
const changeFoodPosition = () => {
    // passing a random 0 - 30 value into food position
    // foodX = Math.floor(Math.random() * 30) + 1;
    // foodY = Math.floor(Math.random() * 30) + 1;
    let newFoodPosition;
    do {
        newFoodPosition = [Math.floor(Math.random() * 30) + 1, Math.floor(Math.random() * 30) + 1];
    } while (snakeBody.some(segment => segment[0] === newFoodPosition[0] && segment[1] === newFoodPosition[1]));

    [foodX, foodY] = newFoodPosition;
}
const handleGameOVer = () => {
    // clearing timer and reloading th  e page
    clearInterval(setIntervalId);
    alert("Game Over! Press ok to replay...")
    location.reload()
}

const changeDirection = (e) => {
    // changing velocity value based on key points
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0,
            velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0,
            velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1,
            velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1,
            velocityY = 0;
    }
    // initGame()
}
const initGame = () => {
    if (gameOver) { return handleGameOVer() }
    let htmlMarkup = `<div class="food" style="grid-area:${foodY}/${foodX}"></div>`

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        console.log(snakeBody);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score:${score}`;
        highScoreElement.innerText = `High Score:${highScore}`
    }
    snakeBody[0] = [snakeX, snakeY]
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];

    }

    //updating snakes head position based on the current 1velocity
    snakeX += velocityX;
    snakeY += velocityY;
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        // console.log("Game Over");
        gameOver = true;

    }
    for (let i = 0; i < snakeBody.length; i++) {
        // adding a div for each part of the snake body
        htmlMarkup += `<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`
        if (i < 0 && snakeBody[i] && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
            return
        }
    }

    playBoard.innerHTML = htmlMarkup
}
changeFoodPosition();
setIntervalId = setInterval(() => {
    initGame()
}, 125);

initGame();
document.addEventListener("keydown", changeDirection);