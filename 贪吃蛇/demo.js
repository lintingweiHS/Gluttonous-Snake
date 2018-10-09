var content = document.getElementsByClassName('content')[0];
var startPage = document.getElementsByClassName('startPage')[0];
var startBtn = document.getElementsByClassName('startBtn')[0];
var startP = document.getElementsByClassName('startP')[0];
var scoreBox = document.getElementById('score');
var loser = document.getElementsByClassName('loser')[0];
var loserScore = document.getElementsByClassName('loserScore')[0];
var close = document.getElementsByClassName('close')[0];
var snakeMove;
var speed = 200;
var startPushBool = true;
var startGameBool = true;
init();
function init() {
    //地图信息
    this.mapW = parseInt(getStyle(content, 'width'));
    this.mapH = parseInt(getStyle(content, 'height'));
    this.mapDiv = content;
    //apple
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;
    //snake
    this.snakeW = 20;
    this.snakeH = 20;
    this.snakeBody = [[3, 1, 'head'], [2, 1, 'body'], [1, 1, 'body']];
    //游戏属性
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    this.score = 0;
    bindEvent();
}
function startGame() {
    startPage.style.display = 'none';
    startP.style.display = 'block';
    food();
    snake();
}
function food() {
    var food = document.createElement('div');
    foodX = Math.floor(Math.random() * (this.mapW / 20));
    foodY = Math.floor(Math.random() * (this.mapH / 20));
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    food.style.position = "absolute";
    food.style.left = this.foodX * 20 + 'px';
    food.style.top = this.foodY * 20 + 'px';
    this.mapDiv.appendChild(food).setAttribute('class', 'food');
}
function snake() {
    for (var i = 0; i < this.snakeBody.length; i++) {
        var snake = document.createElement('div');
        snake.style.width = this.snakeW + "px";
        snake.style.height = this.snakeH + "px";
        snake.style.position = 'absolute';
        snake.style.left = this.snakeBody[i][0] * 20 + 'px';
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';
        snake.classList.add(this.snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');
        switch (this.direct) {
            case 'right':
                break;
            case 'up':
                snake.style.transform = 'rotate(270deg)';
                break;
            case 'left':
                snake.style.transform = 'rotate(180deg)';
                break;
            case 'down':
                snake.style.transform = 'rotate(90deg)';
                break;
            default:
                break;
        }
    }

}
function move() {
    for (var i = this.snakeBody.length - 1; i > 0; i--) {
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    switch (this.direct) {
        case 'right':
            this.snakeBody[0][0] += 1;
            break;
        case 'left':
            this.snakeBody[0][0] -= 1;
            break;
        case 'down':
            this.snakeBody[0][1] += 1;
            break;
        case 'up':
            this.snakeBody[0][1] -= 1;
        default:
            break;

    }
    removeClass('snake');
    snake();
    if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
        switch (this.direct) {
            case 'right':
                this.snakeBody.push([snakeEndX + 1, snakeEndY, 'body']);
                break;
            case 'left':
                this.snakeBody.push([snakeEndX - 1, snakeEndY, 'body']);
                break;
            case 'down':
                this.snakeBody.push([snakeEndX, snakeEndY + 1, 'body']);
                break;
            case 'up':
                this.snakeBody.push([snakeEndX, snakeEndY - 1, 'body']);
                break;
            default:
                break;

        }
        this.score += 1;
        scoreBox.innerHTML = this.score;
        removeClass('food');
        food();
    }
    if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW / 20) {
        relodGame();
    }
    if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH / 20) {
        relodGame();
    }
    var snakeHX = this.snakeBody[0][0],
        snakeHY = this.snakeBody[0][1];
    for (var i = 1; i < this.snakeBody.length; i++) {
        if (snakeHX == snakeBody[i][0] && snakeHY == snakeBody[i][1]) {
            relodGame();
        }

    }

}
function relodGame() {
    removeClass('snake');
    removeClass('food');
    clearInterval(snakeMove);
    this.snakeBody = [[3, 1, 'head'], [2, 1, 'body'], [1, 1, 'body']];
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    loser.style.display = 'block';
    loserScore.innerHTML = this.score;
    this.score = 0;
    scoreBox.innerHTML = this.score;
    startGameBool = true;
    startPushBool = true;
    startP.setAttribute('src', 'img/start.png');
}
function removeClass(className) {
    var ele = document.getElementsByClassName(className);
    while (ele.length > 0) {
        ele[0].parentNode.removeChild(ele[0]);
    }
}
function setDerict(code) {
    switch (code) {
        case 37:
            if (this.left) {
                this.direct = 'left';
                this.right = false;
                this.left = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 38:
            if (this.up) {
                this.direct = 'up';
                this.right = true;
                this.left = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 39:
            if (this.right) {
                this.direct = 'right';
                this.right = false;
                this.left = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 40:
            if (this.down) {
                this.direct = 'down';
                this.right = true;
                this.left = true;
                this.up = false;
                this.down = false;
            }
            break;
        default:
            break;
    }
}
function bindEvent() {
    startBtn.onclick = function () {
        startAndPaush();
    }
    startP.onclick = function () {
        startAndPaush();
    }
    close.onclick = function () {
        loser.style.display = 'none';
    }
}
function startAndPaush() {
    if (startPushBool) {
        if (startGameBool) {
            startGame();
            startGameBool = false
        }
        startP.setAttribute('src', 'img/pause.png');
        document.onkeydown = function (e) {
            var event = e || window.event;
            var code = event.keyCode;
            setDerict(code);
        }
        snakeMove = setInterval(function () {
            move();
        }, speed);
        startPushBool = false;
    } else {
        startP.setAttribute('src', 'img/start.png');
        clearInterval(snakeMove);
        document.onkeydown = function (e) {
            e.returnValue = false;
            return false;
        }
        startPushBool = true;
    }
}