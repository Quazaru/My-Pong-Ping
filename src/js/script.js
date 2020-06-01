import '../css/styles.scss';
const restartBtn = document.querySelector('.restart');
const keysControlBtn = document.querySelector('#keys-control-btn');
const mouseControlBtn =  document.querySelector('#mouse-control-btn');
const chooseControlMenu = document.querySelector(".choose-control");


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
const chooseControl = () => {
    chooseControlMenu.style.display = 'block';
    keysControlBtn.addEventListener('click', () => {
        document.addEventListener("keydown", keyDownHandler);
        document.addEventListener("keyup", keyUpHandler);
        chooseControlMenu.style.display = 'none';
    });
    mouseControlBtn.addEventListener('click', () => {
        canvas.addEventListener("mousemove", mouseMoveHandler);
        chooseControlMenu.style.display = 'none';

    });

}
chooseControl();

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

const drawEndGameScreen = () =>{
    
    drawRect(+(canvas.width / 4), +(canvas.height / 4),+(canvas.width / 2),+(canvas.height/2), 'fill','rgba(0,0,0, 0.7)'  );
    ctx.beginPath();
    ctx.font = "50px poppins";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#BF3030"; 
    ctx.fillText("You Died",  +(canvas.width / 2)  , +(canvas.height/2));
    ctx.font = '20px poppins'
    ctx.fillStyle = "#fff";
    ctx.fillText(`Your score: ${counter}`,  +(canvas.width / 2)  , +(canvas.height/2 + 50));
    ctx.closePath();
    clearInterval(interval);
    restartBtn.style.display = 'block';

}
const drawWinScreen = () =>{
    drawRect(+(canvas.width / 4), +(canvas.height / 4),+(canvas.width / 2),+(canvas.height), 'fill','rgba(0,0,0, 0.7)'  );
    ctx.beginPath();
    ctx.font = "50px poppins";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#FFE773"; 
    ctx.fillText("You WIN!",  +(canvas.width / 2)  , +(canvas.height/2));
    ctx.font = '20px poppins'
    ctx.fillStyle = "gold";
    ctx.fillText('Congrats!',  +(canvas.width / 2)  , +(canvas.height/2 + 150));
    ctx.fillText(`Your score: ${counter}`,  +(canvas.width / 2)  , +(canvas.height/2 + 50));
    ctx.closePath();
    clearInterval(interval);
    restartBtn.style.display = 'block';
    restartBtn.style.backgroundColor = '#FFE773';
    restartBtn.style.color = '#000';
    restartBtn.style.fontWeight = '700'
}
const drawCounter = () => {
    ctx.beginPath();
    ctx.font = '20px poppins'
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${counter}`,  10  , +(canvas.height - 20 ));
    ctx.closePath();

}

const draw = () => {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    collisionDetection();
    console.log(ballCurrentColor);
    drawCircumference(radius, ballCurrentColor); // рисуем шар
    drawPaddle();              //рисуем ракетку
    drawBricks();
    drawCounter();
    

    //Условия для отскока от стен
    if(x + moveX > canvas.width-radius || x + moveX < radius) {
        moveX = -moveX;
    }
    if(y  < radius) {
        moveY = -moveY;
    } else if(y  > canvas.height-radius) {
        if(x > paddleX  && x  < paddleX + paddleWidth + radius ) {
            moveY = -moveY;
            
        }
        else {
            drawEndGameScreen();
            moveY = moveX = 0;
            
           

        }
    }
    if(rightPressed & paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed & (paddleX > 0)) {
        paddleX -= 7;
    }
    
    x+=moveX;
    y+=moveY;

    
    
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






document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

restartBtn.addEventListener('click', () => {
    document.location.reload();
})
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
                if(counter == 10 * brickColumnCount * brickRowCount){
                    drawWinScreen();
                }
                ballCurrentColor = getRandElem(ballUnlockColors);
                
            }
        }
    }
}
let interval = setInterval(draw, 15 );


