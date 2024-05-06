// Initialize a ton of stuff (so fun)
const gameArea = document.getElementById('gameArea');
const maxSnakeLength = 20;
const initialSnakeLength = 1;

let snake = [{x: 160, y: 200}];
let snakeSize = 20;
let food = { x: 100, y: 100 };
let poison = { x: 300, y: 100 };
let endGame = { x: 200, y: 200 };

let dx = snakeSize;
let dy = 0;
let speed = 100;

let snakeElements = [];
let foodElement = null;
let poisonElement = null;
let endGameElement = null;

let endGameActive = false;
let endGameTimer;
let gameRunning = true;

// Adjust the game area size based on the window (to allow the silly snake to travel from one side of the window to another)
window.addEventListener('resize', resizeGameArea);
function resizeGameArea() {
    gameArea.style.width = `${window.innerWidth}px`;
    gameArea.style.height = `${window.innerHeight}px`;
}

resizeGameArea();

// Create a new HTML div element with a specified class at a specific place
function createDiv(className, x, y) {
    let div = document.createElement('div');
    div.className = className;
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
    gameArea.appendChild(div);
    return div;
}

// Draw the snake on the screen
function drawSnake() {
    snake.forEach((segment, index) => {
        if (snakeElements[index] == null) {
            snakeElements[index] = createDiv('snake', segment.x, segment.y);
        } else {
            snakeElements[index].style.left = `${segment.x}px`;
            snakeElements[index].style.top = `${segment.y}px`;
        }
    });
    while (snakeElements.length > snake.length) {
        gameArea.removeChild(snakeElements.pop());
    }
}

// Move the snake and check for various kinds of silly collisions
function moveSnake() {
    if (!gameRunning) return;

    const head = { x: (snake[0].x + dx + window.innerWidth) % window.innerWidth, y: (snake[0].y + dy + window.innerHeight) % window.innerHeight };
    snake.unshift(head);

    if (checkCollision(head, food)) {
        if (snake.length <= maxSnakeLength) {
            placeFood();
        } else {
            snake.shift();
        }
    } else {
        snake.pop();
    }

    if (checkCollision(head, poison)) {
        if (snake.length > initialSnakeLength) {
            snake.pop();
            placePoison();
        }
    }

    // Colliding with yellow ends the game and resets (so, now there is a conclusion, unlike the version last week)!
    if (endGameActive && checkCollision(head, endGame)) {
        alert("Volume set!");
        gameRunning = false;
        resetGame();
        return;
    }

    snake.forEach((segment, index) => {
        if (index > 0 && head.x === segment.x && head.y === segment.y) {
            resetGame();
        }
    });

    updateProgressBar();
    drawSnake();
}

// Check if the snake collides with another thing on the screen (very silly)
function checkCollision(head, item) {
    let headCenterX = head.x + snakeSize / 2;
    let headCenterY = head.y + snakeSize / 2;
    let itemCenterX = item.x + 40 / 2;
    let itemCenterY = item.y + 40 / 2;

    let dx = headCenterX - itemCenterX;
    let dy = headCenterY - itemCenterY;

    let distance = Math.sqrt(dx * dx + dy * dy);
    let totalRadii = (snakeSize / 2) + (40 / 2);

    return distance < totalRadii;
}

// Draw the food (a really cool green circle) on the screen
function drawFood() {
    if (!foodElement) {
        foodElement = createDiv('food', food.x, food.y);
    } else {
        foodElement.style.left = `${food.x}px`;
        foodElement.style.top = `${food.y}px`;
    }
}

// Randomly place the food within the game area
function placeFood() {
    const minX = 50;
    const minY = 150;
    const maxX = window.innerWidth - snakeSize - 50;
    const maxY = window.innerHeight - snakeSize - 50;

    food.x = Math.floor((Math.random() * ((maxX - minX) / snakeSize)) + (minX / snakeSize)) * snakeSize;
    food.y = Math.floor((Math.random() * ((maxY - minY) / snakeSize)) + (minY / snakeSize)) * snakeSize;

    drawFood();
}

// Draw the poison (a really cool red circle) on the screen
function drawPoison() {
    if (!poisonElement) {
        poisonElement = createDiv('poison', poison.x, poison.y);
    } else {
        poisonElement.style.left = `${poison.x}px`;
        poisonElement.style.top = `${poison.y}px`;
    }
}

// Randomly place the poison within the game area
function placePoison() {
    const minX = 50;
    const minY = 150;
    const maxX = window.innerWidth - snakeSize - 50;
    const maxY = window.innerHeight - snakeSize - 50;

    poison.x = Math.floor((Math.random() * ((maxX - minX) / snakeSize)) + (minX / snakeSize)) * snakeSize;
    poison.y = Math.floor((Math.random() * ((maxY - minY) / snakeSize)) + (minY / snakeSize)) * snakeSize;

    drawPoison();
}

// Draw the end game item (a really cool yellow circle) (if it's ready and it's time)
function drawEndGame() {
    if (endGameActive) {
        if (!endGameElement) {
            endGameElement = createDiv('yellow', endGame.x, endGame.y);
        } else {
            endGameElement.style.left = `${endGame.x}px`;
            endGameElement.style.top = `${endGame.y}px`;
        }
    }
}

// Randomly place the end game item within the game area
function placeEndGame() {
    const minX = 50;
    const minY = 150;
    const maxX = window.innerWidth - snakeSize - 50;
    const maxY = window.innerHeight - snakeSize - 50;

    endGame.x = Math.floor((Math.random() * ((maxX - minX) / snakeSize)) + (minX / snakeSize)) * snakeSize;
    endGame.y = Math.floor((Math.random() * ((maxY - minY) / snakeSize)) + (minY / snakeSize)) * snakeSize;

    drawEndGame();
}

// Toggle the visibility of the end game item
function toggleEndGame() {
    endGameActive = !endGameActive;
    if (endGameActive) {
        placeEndGame();
    } else {
        if (endGameElement) {
            gameArea.removeChild(endGameElement);
            endGameElement = null;
        }
    }
}

// Start a timer that toggles the end game item for three seconds every thirty seconds (to make the game more annoying :) )
function startendGameTimer() {
    endGameTimer = setInterval(() => {
        toggleEndGame();
        setTimeout(() => {
            toggleEndGame();
        }, 3000);
    }, 30000);
}

// Update the progress bar based on the current snake length
function updateProgressBar() {
    let bar = document.getElementById('progressBar');
    let snakeLength = snake.length;
    let widthPercentage = ((snakeLength - initialSnakeLength) / (maxSnakeLength - initialSnakeLength)) * 100;
    bar.style.width = `${Math.max(0, widthPercentage)}%`;
}

// Reset the game
function resetGame() {
    snake = [{x: 160, y: 200}];
    dx = snakeSize;
    dy = 0;
    gameRunning = true;
    placeFood();
    placePoison();
    startendGameTimer();
    updateProgressBar();
}

// Main game loop that continuously moves the snake
function gameLoop() {
    if (gameRunning) {
        setTimeout(() => {
            moveSnake();
            gameLoop();
        }, speed);
    }
}

// Event listener to change the snake's direction based on the very cool arrow keys
document.addEventListener('keydown', e => {
    if (!gameRunning) return;

    if (e.key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -snakeSize;
    } else if (e.key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = snakeSize;
    } else if (e.key === 'ArrowLeft' && dx === 0) {
        dx = -snakeSize;
        dy = 0;
    } else if (e.key === 'ArrowRight' && dx === 0) {
        dx = snakeSize;
        dy = 0;
    }
});

// Initialize the game
resetGame();
gameLoop();

// Thank you for a fun semester, Anthony!