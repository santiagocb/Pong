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
  constructor( r = 10) {
    //this.x = x;
    //this.y = y;
    this.r = r;
    this.pos = new VecPos;
  }
}

var counter = 0;
var time = 20;
var canvas = document.getElementById('pong');
var contex = canvas.getContext('2d');


function setBackground() {
  //Board
  contex.fillStyle = 'pink';
  contex.fillRect(0, 0, canvas.width, canvas.height);
  //Ball
  contex.fillStyle = 'yellow';
  contex.arc(ball.pos.x, ball.pos.y, ball.r, 0, 2*Math.PI);
  contex.fill();
  contex.stroke();

  //Bars
  contex.fillStyle = 'white';
  contex.fillRect(10, 10, 10, 50);

}

const ball = new Ball;
ball.pos.x = 100;
ball.pos.y = 100;

function update(dt) {
  ball.pos.x =+ xspeed * dt;
  ball.pos.y =+ yspeed * dt;
}
function init() {
  setBackground();
}
init();
