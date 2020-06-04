import '../css/styles.scss';

const keysControlBtn = document.querySelector('#keys-control-btn');
const mouseControlBtn =  document.querySelector('#mouse-control-btn');
const chooseControlMenu = document.querySelector(".choose-control");
const gameOverMenu = document.querySelector('.game-over');
let animationDraw;

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let ballCurrentColor = '#fff';
let ballUnlockColors = ['#FFC373',  '#FFDC40', '#FF9200'  ];
let radius = 10;
let x = 0 + radius;     //Координаты для шара
let y = canvas.height/2;    

let moveX = 3;          //Скорость шара
let moveY = -3;

let spriteWidth = 30;   //Ширина текстуры
let spriteHeight = 30;  //Высота текстуры



let rightPressed = false;
let leftPressed = false;

//PADDLE
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth)/2;

let counter = 0;
let exit = false;

//BRICKS
let brickRowCount = 3;
let brickColumnCount = 10;
let brickWidth = 75;
let brickHeight = 30;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, exist: true};
    }
}

const getRandElem = (arr) =>{
    let rand = Math.floor(Math.random() * arr.length);
    
    return arr[rand];

}



const drawRect = (rectX, rectY, rectWidth, rectHeight, style, color) => {
    ctx.beginPath();
    ctx.rect(rectX, rectY, rectWidth, rectHeight);
    ctx.strokeStyle = 'red';
    if(color){
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
    }
    if(style){
        style == 'fill' ? ctx.fill() : ctx.stroke();
    }else{
        ctx.fill();
    }
    ctx.closePath();

}

const drawCircumference = (r, color) =>{
    ctx.beginPath();
    ctx.fillStyle = color; 
    ctx.strokeStyle = 'black';
    ctx.arc(x, y, r, 0 , Math.PI*2);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}
const  drawPaddle = ()  => {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawEndGameScreen() {
    
    cancelAnimationFrame(animationDraw);
    gameOverMenu.insertAdjacentHTML('afterbegin', `
    <div class="game-over__menu">
    <h3 class="game-over__header">You Died</h3>
    <p class="game-score">Your score: ${counter}</p>
    <button class="game-over__btn restart">Restart</button>
    </div>
    `);
    const restartBtn = document.querySelector('.restart');
    restartBtn.style.display = 'block';
restartBtn.addEventListener('click', () => {
    location.reload();
})
    canvas.removeEventListener("mousemove", mouseMoveHandler);
    
    
    
}
const drawWinScreen = () =>{

    exit = 1;
    cancelAnimationFrame(animationDraw);
    gameOverMenu.insertAdjacentHTML('afterbegin', `
    <div class="game-over__menu  game-over__menu_win">
    <h3 class="game-over__header">You Win</h3>
    <p class="game-score">Your score: ${counter}</p>
    <button class="game-over__btn restart">Try again</button>
    <p class="game-score">Congrats</p>  
    </div>
    `);
    const restartBtn = document.querySelector('.restart');
    restartBtn.style.display = 'block';
    restartBtn.addEventListener('click', () => {
        location.reload();
    })
    canvas.removeEventListener("mousemove", mouseMoveHandler);

}
const drawCounter = () => {
    ctx.beginPath();
    ctx.font = '20px poppins'
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${counter}`,  10  , +(canvas.height - 20 ));
    ctx.closePath();

}

function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    collisionDetection();
    drawCircumference(radius, ballCurrentColor); // рисуем шар
    drawPaddle();              //рисуем ракетку
    drawBricks();
    drawWinScreen();
    

    //Условия для отскока от стен
    if(x + moveX > canvas.width-radius || x + moveX < radius) {
        moveX = -moveX;
    }
    if(y  < radius) {
        moveY = -moveY;
    } else if(y  >  canvas.height - radius - paddleHeight) {
        if(x > paddleX  &&  x < paddleX + paddleWidth  ) {
            
            moveY = -moveY;
                      
        }
        else if (y  >  canvas.height - radius){
            window.cancelAnimationFrame(animationDraw);
            drawEndGameScreen();
            exit = 1;

            moveY = moveX = 0;
            
        }
    } else {

    if(rightPressed & paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed & (paddleX > 0)) {
        paddleX -= 7;
    }
}
    x+=moveX;
    y+=moveY;

    drawCounter();
    if(!exit){
        requestAnimationFrame(draw);
    }else{
        cancelAnimationFrame(draw);
        console.log('exit');
    }


}

const drawBricks = () => {
    for(let c=0; c<brickColumnCount; c++) {
        
        for(let r=0; r<brickRowCount; r++) {
            
            if(bricks[c][r].exist){
                let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "rgb(170, 51, 1)";
                ctx.fill();
                ctx.closePath();
            }
        }
    }

}
const chooseControl = () => {
    if(localStorage.getItem('controlChoosen')){
        console.log(localStorage.getItem('controlType'))
        if(localStorage.getItem('controlType') ==  'keys'){
            document.addEventListener("keydown", keyDownHandler);
            document.addEventListener("keyup", keyUpHandler);
        }else if(localStorage.getItem('controlType') ==  'mouse'){
            canvas.addEventListener("mousemove", mouseMoveHandler);
        }
        draw();
        
    }else{
    cancelAnimationFrame(draw);
    chooseControlMenu.style.display = 'block';
    keysControlBtn.addEventListener('click', () => {
        document.addEventListener("keydown", keyDownHandler);
        document.addEventListener("keyup", keyUpHandler);
        chooseControlMenu.style.display = 'none';
        draw();
        localStorage.setItem('controlType', 'keys');
    });
    mouseControlBtn.addEventListener('click', () => {
        canvas.addEventListener("mousemove", mouseMoveHandler);
        chooseControlMenu.style.display = 'none';
        draw();
        localStorage.setItem('controlType', 'mouse');
    });
}

}







// restartBtn.addEventListener('click', () => {
//     localStorage.setItem('controlChoosen', true);
//     document.location.reload();
// })
function mouseMoveHandler(e){
    
    let relativeX = e.clientX - canvas.offsetLeft - paddleWidth/2;

   
    if(relativeX > 0 && relativeX < canvas.width ){
        paddleX = relativeX;
       
    }
}
function keyDownHandler(e) {
    if(e.keyCode == 39) {    
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight && b.exist) {
                b.exist = false;
                moveY = -moveY; 
                counter+=10;
                ballCurrentColor = getRandElem(ballUnlockColors);
                
            }
        }
    }
}
chooseControl();




