class VecPos  {
  constructor(x = 0, y = 0){
    this.x = x;
    this.y = y;
  }
}

class Bar{
  constructor(w, h){
    this.pos = new VecPos;
    this.size = new VecPos(w, h);
  }
}

class Ball {
  constructor(r) {
    this.r = r;
    this.pos = new VecPos;
    this.speed = new VecPos;
  }
}

class Player {
  constructor() {
    this.score = 0;

  }
}
var counter = 0;
var time = 20;
var canvas = document.getElementById('pong');
var contex = canvas.getContext('2d');
const rad = 10;

function setBackground() {
  contex.beginPath();
  contex.fillStyle = 'pink';
  contex.fillRect(0, 0, canvas.width, canvas.height);
}
function setBall() {
  contex.arc(ball.pos.x, ball.pos.y, ball.r, 0, 2*Math.PI);
  contex.fillStyle = 'yellow';
  contex.fill();
  contex.stroke();
}
function setLeftBar() {
  contex.fillStyle = 'white';
  contex.fillRect(leftBar.pos.x, leftBar.pos.y, leftBar.size.x, leftBar.size.y);
}
function setRightBar() {
  contex.fillStyle = 'white';
  contex.fillRect(rightBar.pos.x, rightBar.pos.y, rightBar.size.x, rightBar.size.y);
}
const ball = new Ball(rad);
ball.pos.x = 100;
ball.pos.y = 100;
ball.speed.x = 100;
ball.speed.y = 100;

const leftBar = new Bar(10, 50);
leftBar.pos.x = 10;
leftBar.pos.y = 10;
const rightBar = new Bar(10, 50);
rightBar.pos.x = canvas.width - 20;
rightBar.pos.y = canvas.height - 60;

//Calculate time to draw with request animation frame
let lasTime;
function callback(millisec) {
  if (lasTime) {
    update((millisec - lasTime)/1000); //convert to seconds
  }
  lasTime = millisec;
  requestAnimationFrame(callback);
}
function update(dt) {
  ball.pos.x += ball.speed.x * dt;
  ball.pos.y += ball.speed.y * dt;

  if((ball.pos.x + rad) > canvas.width ||
          (ball.pos.x - rad) < 0){
    ball.speed.x = - ball.speed.x;
  }

  if((ball.pos.y + rad) > canvas.height ||
          (ball.pos.y - rad) < 0){
    ball.speed.y = - ball.speed.y;
  }
  setBackground();
  setBall();
  setLeftBar();
  setRightBar();
}
callback();
