const gameArea = document.getElementById('gameArea');
const maxSnakeLength = 20;
const initialSnakeLength = 1;  
let snake = [{x: 160, y: 200}];  
let snakeSize = 20;
let food = { x: 100, y: 100 };
let poison = { x: 300, y: 100 };
let dx = snakeSize;
let dy = 0;
let speed = 100;
let snakeElements = [];
let foodElement = null;
let poisonElement = null;

window.addEventListener('resize', resizeGameArea);
function resizeGameArea() {
    gameArea.style.width = `${window.innerWidth}px`;
    gameArea.style.height = `${window.innerHeight}px`;
}

resizeGameArea();

function createDiv(className, x, y) {
    let div = document.createElement('div');
    div.className = className;
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
    gameArea.appendChild(div);
    return div;
}

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

function moveSnake() {
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

    snake.forEach((segment, index) => {
        if (index > 0 && head.x === segment.x && head.y === segment.y) {
            resetGame();
        }
    });

    updateProgressBar();
    drawSnake();
}

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


function drawFood() {
    if (!foodElement) {
        foodElement = createDiv('food', food.x, food.y);
    } else {
        foodElement.style.left = `${food.x}px`;
        foodElement.style.top = `${food.y}px`;
    }
}

function placeFood() {
    const minX = 50;
    const minY = 50; 
    const maxX = window.innerWidth - snakeSize - 50;
    const maxY = window.innerHeight - snakeSize - 50;

    food.x = Math.floor((Math.random() * ((maxX - minX) / snakeSize)) + (minX / snakeSize)) * snakeSize;
    food.y = Math.floor((Math.random() * ((maxY - minY) / snakeSize)) + (minY / snakeSize)) * snakeSize;

    drawFood();
}

function drawPoison() {
    if (!poisonElement) {
        poisonElement = createDiv('poison', poison.x, poison.y);
    } else {
        poisonElement.style.left = `${poison.x}px`;
        poisonElement.style.top = `${poison.y}px`;
    }
}

function placePoison() {
    const minX = 50;
    const minY = 50;
    const maxX = window.innerWidth - snakeSize - 50;  
    const maxY = window.innerHeight - snakeSize - 50;  

    poison.x = Math.floor((Math.random() * ((maxX - minX) / snakeSize)) + (minX / snakeSize)) * snakeSize;
    poison.y = Math.floor((Math.random() * ((maxY - minY) / snakeSize)) + (minY / snakeSize)) * snakeSize;

    drawPoison();
}

function resetGame() {
    snake = [{x: 160, y: 200}];
    dx = snakeSize;
    dy = 0;
    placeFood();
    placePoison();
    updateProgressBar();
}

function updateProgressBar() {
    let bar = document.getElementById('progressBar');
    let snakeLength = snake.length;
    let widthPercentage = ((snakeLength - initialSnakeLength) / (maxSnakeLength - initialSnakeLength)) * 100;
    bar.style.width = `${Math.max(0, widthPercentage)}%`;
}

function gameLoop() {
    setTimeout(() => {
        moveSnake();
        gameLoop();
    }, speed);
}

document.addEventListener('keydown', e => {
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

resetGame();
gameLoop();