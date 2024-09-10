// gameconstants
let inputDir = { x: 0, y: 0 };
const foodsound = new Audio("food.mp3");
const gameoversound = new Audio("gameover.mp3");
const movesound = new Audio("move.mp3");
const musicsound = new Audio("bgmusic.mp3");
let Score = 0;
let speed = 5;
let lastpainttime = 0;
let SnakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };

// Get the game board element
const board = document.getElementById("board");

// game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    console.log(ctime);
    if ((ctime - lastpainttime) / 1000 < 1 / speed) {
        return;
    }

    lastpainttime = ctime;
    GameEngine();
}

function iscollide(snake) {
    // Add collision detection logic here
for(let i=1;i<snake.length;i++){
    if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
        return true;
    }
    if(snake[i].x >=18||snake[i].x <=0 || snake[i].y >=18||snake[i].y <=0)

    return true;
}
}

function GameEngine() {
    if (iscollide(SnakeArr)) {
        gameoversound.play();
        musicsound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over PRESS ANY KEY to continue");
        SnakeArr = [{ x: 13, y: 15 }];
        musicsound.play();
        score = 0;
    }

    if (SnakeArr[0].y === food.y && SnakeArr[0].x === food.x) {
        foodsound.play();
        Score+=1;
        Scorebox.innerHTML="Score:" +Score;
        SnakeArr.unshift({
            x: SnakeArr[0].x + inputDir.x,
            y: SnakeArr[0].y + inputDir.y
        });
        let a = 2;
        let b = 16;
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        };
    }

    // moving the snake
    for (let i = SnakeArr.length - 2; i >= 0; i--) {
        SnakeArr[i + 1] = { ...SnakeArr[i] };
    }
    SnakeArr[0].x += inputDir.x;
    SnakeArr[0].y += inputDir.y;

    // Render the game
    board.innerHTML = "";
    SnakeArr.forEach((e, index) => {
        // Inside the GameEngine function
        SnakeElement = document.createElement('div');
        SnakeElement.style.gridRowStart = e.y;
        SnakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            SnakeElement.classList.add('head');
        } else {
            SnakeElement.classList.add('snake');
        }
        board.appendChild(SnakeElement);
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// main logic starts here
window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
});

