/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/mini-css-extract-plugin/dist/loader.js?!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./css/styles.scss":
/*!*************************************************************************************************************************************************************************!*\
  !*** ../node_modules/mini-css-extract-plugin/dist/loader.js??ref--4-1!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./css/styles.scss ***!
  \*************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ "./css/styles.scss":
/*!*************************!*\
  !*** ./css/styles.scss ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/mini-css-extract-plugin/dist/loader.js??ref--4-1!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./styles.scss */ "../node_modules/mini-css-extract-plugin/dist/loader.js?!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./css/styles.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/styles.scss */ "./css/styles.scss");
/* harmony import */ var _css_styles_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_styles_scss__WEBPACK_IMPORTED_MODULE_0__);

var restartBtn = document.querySelector('.restart');
var keysControlBtn = document.querySelector('#keys-control-btn');
var mouseControlBtn = document.querySelector('#mouse-control-btn');
var chooseControlMenu = document.querySelector(".choose-control");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballCurrentColor = '#fff';
var ballUnlockColors = ['#FFC373', '#FFDC40', '#FF9200'];
var radius = 10;
var x = 0 + radius; //Координаты для шара

var y = canvas.height / 2;
var moveX = 3; //Скорость шара

var moveY = -3;
var spriteWidth = 30; //Ширина текстуры

var spriteHeight = 30; //Высота текстуры

var rightPressed = false;
var leftPressed = false; //PADDLE

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var counter = 0; //BRICKS

var brickRowCount = 3;
var brickColumnCount = 10;
var brickWidth = 75;
var brickHeight = 30;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];

for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];

  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = {
      x: 0,
      y: 0,
      exist: true
    };
  }
}

var getRandElem = function getRandElem(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var drawRect = function drawRect(rectX, rectY, rectWidth, rectHeight, style, color) {
  ctx.beginPath();
  ctx.rect(rectX, rectY, rectWidth, rectHeight);
  ctx.strokeStyle = 'red';

  if (color) {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
  }

  if (style) {
    style == 'fill' ? ctx.fill() : ctx.stroke();
  } else {
    ctx.fill();
  }

  ctx.closePath();
};

var drawCircumference = function drawCircumference(r, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.strokeStyle = 'black';
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
};

var drawPaddle = function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

var drawEndGameScreen = function drawEndGameScreen() {
  drawRect(+(canvas.width / 4), +(canvas.height / 4), +(canvas.width / 2), +(canvas.height / 2), 'fill', 'rgba(0,0,0, 0.7)');
  ctx.beginPath();
  ctx.font = "50px poppins";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#BF3030";
  ctx.fillText("You Died", +(canvas.width / 2), +(canvas.height / 2));
  ctx.font = '20px poppins';
  ctx.fillStyle = "#fff";
  ctx.fillText("Your score: ".concat(counter), +(canvas.width / 2), +(canvas.height / 2 + 50));
  ctx.closePath();
  restartBtn.style.display = 'block';
  restartBtn.style.top = canvas.height / 2 + 75 + 'px';
  canvas.removeEventListener("mousemove", mouseMoveHandler);
  cancelAnimationFrame(draw);
};

var drawWinScreen = function drawWinScreen() {
  drawRect(+(canvas.width / 4), +(canvas.height / 4), +(canvas.width / 2), +canvas.height, 'fill', 'rgba(0,0,0, 0.7)');
  ctx.beginPath();
  ctx.font = "50px poppins";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#FFE773";
  ctx.fillText("You WIN!", +(canvas.width / 2), +(canvas.height / 2));
  ctx.font = '20px poppins';
  ctx.fillStyle = "gold";
  ctx.fillText('Congrats!', +(canvas.width / 2), +(canvas.height / 2 + 150));
  ctx.fillText("Your score: ".concat(counter), +(canvas.width / 2), +(canvas.height / 2 + 50));
  ctx.closePath();
  restartBtn.style.top = canvas.height / 2 + 75 + 'px';
  restartBtn.style.display = 'block';
  restartBtn.style.backgroundColor = '#FFE773';
  restartBtn.style.color = '#000';
  restartBtn.style.fontWeight = '700';
  moveX = moveY = 0;
  cancelAnimationFrame(draw);
};

var drawCounter = function drawCounter() {
  ctx.beginPath();
  ctx.font = '20px poppins';
  ctx.fillStyle = 'black';
  ctx.fillText("Score: ".concat(counter), 10, +(canvas.height - 20));
  ctx.closePath();
};

var draw = function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  collisionDetection();
  drawCircumference(radius, ballCurrentColor); // рисуем шар

  drawPaddle(); //рисуем ракетку

  drawBricks();
  drawCounter(); //Условия для отскока от стен

  if (x + moveX > canvas.width - radius || x + moveX < radius) {
    moveX = -moveX;
  }

  if (y < radius) {
    moveY = -moveY;
  } else if (y > canvas.height - radius - paddleHeight) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      moveY = -moveY;
    } else if (y > canvas.height - radius) {
      console.log('NOOs');
      drawEndGameScreen();
      moveY = moveX = 0;
    }
  } else {
    if (rightPressed & paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
    } else if (leftPressed & paddleX > 0) {
      paddleX -= 7;
    }
  }

  x += moveX;
  y += moveY;
  requestAnimationFrame(draw);
};

var drawBricks = function drawBricks() {
  for (var _c = 0; _c < brickColumnCount; _c++) {
    for (var _r = 0; _r < brickRowCount; _r++) {
      if (bricks[_c][_r].exist) {
        var brickX = _c * (brickWidth + brickPadding) + brickOffsetLeft;
        var brickY = _r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[_c][_r].x = brickX;
        bricks[_c][_r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "rgb(170, 51, 1)";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
};

var chooseControl = function chooseControl() {
  if (localStorage.getItem('controlChoosen')) {
    console.log(localStorage.getItem('controlType'));

    if (localStorage.getItem('controlType') == 'keys') {
      document.addEventListener("keydown", keyDownHandler);
      document.addEventListener("keyup", keyUpHandler);
    } else if (localStorage.getItem('controlType') == 'mouse') {
      canvas.addEventListener("mousemove", mouseMoveHandler);
    }

    requestAnimationFrame(draw);
  } else {
    cancelAnimationFrame(draw);
    chooseControlMenu.style.display = 'block';
    keysControlBtn.addEventListener('click', function () {
      document.addEventListener("keydown", keyDownHandler);
      document.addEventListener("keyup", keyUpHandler);
      chooseControlMenu.style.display = 'none';
      requestAnimationFrame(draw);
      localStorage.setItem('controlType', 'keys');
    });
    mouseControlBtn.addEventListener('click', function () {
      canvas.addEventListener("mousemove", mouseMoveHandler);
      chooseControlMenu.style.display = 'none';
      requestAnimationFrame(draw);
      localStorage.setItem('controlType', 'mouse');
    });
  }
};

restartBtn.addEventListener('click', function () {
  localStorage.setItem('controlChoosen', true);
  document.location.reload();
});

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft - paddleWidth / 2;

  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX;
  }
}

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}

function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];

      if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight && b.exist) {
        b.exist = false;
        moveY = -moveY;
        counter += 10;
        ballCurrentColor = getRandElem(ballUnlockColors);
      }
    }
  }
}

chooseControl();

/***/ }),

/***/ 0:
/*!********************************************!*\
  !*** multi @babel/polyfill ./js/script.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! @babel/polyfill */"../node_modules/@babel/polyfill/lib/index.js");
module.exports = __webpack_require__(/*! ./js/script.js */"./js/script.js");


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map