const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')
const livesSpan = document.getElementById('lives')
const spanTime = document.getElementById('time')
const spanRecord = document.querySelector('#record')
const pResult = document.querySelector('#result')

let canvasSize;
let elementSize

let level = 0;
let lives = 3;

let timeStart;
let timeInterval;

const playerPosition = {
    x: undefined,
    y: undefined
}

const giftPosition = {
    x: undefined,
    y: undefined
}

let enemiesPositions = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize)

window.addEventListener('keydown', moveByKeys)
btnUp.addEventListener('click', moveUp)
btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)
btnDown.addEventListener('click', moveDown)


function setCanvasSize() {
    if (window.innerWidth < window.innerHeight) {
        canvasSize = window.innerWidth * 0.8
    } else {
        canvasSize = window.innerHeight * 0.8
    }

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementSize = canvasSize / 10
    startGame()
}

function startGame() {
    game.font = elementSize + 'px Verdana'
    game.textAlign = 'end'

    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    }

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
        showRecord();
    }

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    showLives()
    enemiesPositions = []
    game.clearRect(0, 0, canvasSize, canvasSize);
    // for (let row = 1; row <= 10; row++) {
    //     for (let col = 1; col <= 10; col++) {
    //         game.fillText(emojis[mapRowCols[col - 1][row - 1]], elementSize * row, elementSize * col)
    //     }
    // }
    //! versión con forEach
    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col]
            const posX = elementSize * (colI + 1);
            const posY = elementSize * (rowI + 1)

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX
                    playerPosition.y = posY
                }
            } else if (col == 'I') {
                giftPosition.x = posX
                giftPosition.y = posY
            } else if (col == 'X') {
                enemiesPositions.push({
                    x: posX,
                    y: posY
                })
            }

            game.fillText(emoji, posX, posY)
        })
    })
    movePlayer()
}

function movePlayer() {
    if (playerPosition.x.toFixed(3) === giftPosition.x.toFixed(3) && playerPosition.y.toFixed(3) === giftPosition.y.toFixed(3)) {
        levelWin()
    }

    const enemyCollision = enemiesPositions.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3)
        const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3)
        return enemyCollisionX && enemyCollisionY
    })

    if (enemyCollision) {
        levelFail()
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

function levelWin() {
    console.log('win');
    level++;
    startGame()
}

function levelFail() {
    lives--;

    if (lives <= 0) {
        level = 0;
        lives = 3;
        timeStart = undefined;
    }

    playerPosition.x = undefined
    playerPosition.y = undefined
    console.log(lives);
    startGame()
}

function gameWin() {
    clearInterval(timeInterval)
    let timePlayer = Date.now() - timeStart
    const recordTime = localStorage.getItem('record_time')

    if (!recordTime || timePlayer < recordTime) {
        localStorage.setItem('record_time', timePlayer)
        pResult.innerHTML = 'Nuevo Record!'
    } else { 
        pResult.innerHTML = 'Felicidades! pero no superaste el record'
    }

}

function showLives() {
    const heartArray = Array(lives).fill(emojis['HEART'])
    livesSpan.innerHTML = ''
    heartArray.forEach(heart => livesSpan.append(emojis['HEART']))
}

function showTime() {
    spanTime.innerHTML = Date.now() - timeStart
}

function showRecord() {
    spanRecord.innerHTML = localStorage.getItem('record_time')
}

function moveByKeys(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp()
            break;
        case 'ArrowDown':
            moveDown()
            break;
        case 'ArrowLeft':
            moveLeft()
            break;
        case 'ArrowRight':
            moveRight()
            break;
        default:
            break;
    }
}

function moveUp() {
    if ((playerPosition.y - elementSize) < elementSize) {
    } else {
        playerPosition.y -= elementSize;
        startGame()
    }
}
function moveLeft() {
    if ((playerPosition.x - elementSize) < elementSize) {
    } else {
        playerPosition.x -= elementSize;
        startGame();
    }
}
function moveRight() {

    if ((playerPosition.x + elementSize) > canvasSize) {
    } else {
        playerPosition.x += elementSize;
        startGame();
    }
}
function moveDown() {
    if ((playerPosition.y + elementSize) > canvasSize) {
    } else {
        playerPosition.y += elementSize;
        startGame();
    }
}

