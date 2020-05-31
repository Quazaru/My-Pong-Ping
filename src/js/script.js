import '../css/styles.scss';
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");


let radius = 10;
let x = 0 + radius;     //Координаты для шара
let y = canvas.height/2;    

let moveX = 3;          //Скорость шара
let moveY = -3;

let spriteWidth = 30;   //Ширина текстуры
let spriteHeight = 30;  //Высота текстуры

let interval = setInterval( draw, 15 );

let rightPressed = false;
let leftPressed = false;

//PADDLE
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth)/2;

let counter = 0;

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
        bricks[c][r] = { x: 0, y: 0 };
    }
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

const drawCircumference = (r) =>{
    ctx.beginPath();
    ctx.fillStyle = '#fff';

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

const drawEndGameScreen = () =>{
    
    drawRect(+(canvas.width / 4), +(canvas.height / 4),+(canvas.width / 2),+(canvas.height/2), 'fill','rgba(0,0,0, 0.7)'  );
    ctx.beginPath();
    ctx.font = "50px poppins";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#A0000F"; 
    ctx.fillText("You Died",  +(canvas.width / 2)  , +(canvas.height/2));
    ctx.font = '20px poppins'
    ctx.fillStyle = "orange";
    ctx.fillText(`Your score: ${counter}`,  +(canvas.width / 2)  , +(canvas.height/2 + 50));
    ctx.closePath();

}

const draw = () => {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawBricks();
    drawCircumference(radius); // рисуем шар
    drawPaddle();              //рисуем ракетку
    //Условия для отскока от стен
    if(x + moveX > canvas.width-radius || x + moveX < radius) {
        moveX = -moveX;
    }
    if(y  < radius) {
        moveY = -moveY;
    } else if(y  > canvas.height-radius) {
        if(x > paddleX  && x  < paddleX + paddleWidth + radius ) {
            moveY = -moveY;
            counter+=10;
        }
        else {
            drawEndGameScreen();
            moveY = moveX = 0;
            clearInterval(setInterval(draw, 15 ));
           

        }
    }
    if(rightPressed & paddleX < canvas.width-paddleWidth) {
        paddleX += 5;
    }
    else if(leftPressed & (paddleX > 0)) {
        paddleX -= 5;
    }
    
    x+=moveX;
    y+=moveY;

    
    
}
const drawBricks = () => {


    for(let c=0; c<brickColumnCount; c++) {
        let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
        for(let r=0; r<brickRowCount; r++) {
            
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






document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
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



setInterval(draw, 15 );