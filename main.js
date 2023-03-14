const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')

let canvasSize;
let elementSize

let playerPosition = {
    x: undefined,
    y: undefined
}

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize)

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

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    game.clearRect (0,0,canvasSize,canvasSize)
    // for (let row = 1; row <= 10; row++) {
    //     for (let col = 1; col <= 10; col++) {
    //         game.fillText(emojis[mapRowCols[col - 1][row - 1]], elementSize * row, elementSize * col)
    //     }
    // }
    //! versión con forEach
    mapRowCols.forEach ((row, rowI) => {
        row.forEach((col,colI)=>{
            const emoji = emojis[col]
            const posX = elementSize*(colI + 1);
            const posY = elementSize*(rowI + 1)

            if (col == 'O') { 
                if (!playerPosition.x && !playerPosition.y) {
                playerPosition.x = posX
                playerPosition.y = posY}
            }
            game.fillText(emoji, posX, posY)
        })
    })
    movePlayer()
}

function movePlayer() {
    game.fillText (emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

window.addEventListener('keydown', moveByKeys)
btnUp.addEventListener('click', moveUp)
btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)
btnDown.addEventListener('click', moveDown)

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

function moveUp () {
    if ((playerPosition.y - elementSize) < elementSize) {
    } else {
        playerPosition.y -= elementSize;
        startGame()
    }
}
function moveLeft () {
    if ((playerPosition.x - elementSize) < elementSize) {
    } else {
        playerPosition.x -= elementSize;
        startGame();
    }
}
function moveRight () {

    if ((playerPosition.x + elementSize) > canvasSize) {
    } else {
        playerPosition.x += elementSize;
        startGame();
    }
}
function moveDown () {
    if ((playerPosition.y + elementSize) > canvasSize) {
    } else {
        playerPosition.y += elementSize;
        startGame();
    }
}

