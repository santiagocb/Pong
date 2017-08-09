class VecPos {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
}

class Rect {
  constructor(x = 0, y = 0) {
    this.pos = new VecPos(0, 0)
    this.size = new VecPos(x, y)
  }
  get left(){
      return this.pos.x - this.size.x / 2
  }
  get right(){
      return this.pos.x + this.size.x / 2
  }
  get top(){
      return this.pos.y - this.size.y / 2
  }
  get bottom(){
      return this.pos.y + this.size.y / 2
  }
}

class Ball {
  constructor(r) {
    this.radio = r
    this.pos = new VecPos
    this.speed = new VecPos
  }
  get left(){
      return this.pos.x - this.radio
  }
  get right(){
      return this.pos.x + this.radio
  }
  get bottom(){
      return this.pos.y - this.radio
  }
  get top(){
      return this.pos.y + this.radio
  }
}

class Player extends Rect{
  constructor() {
    super(20, 100)
    this.speed = new VecPos
    this._lastPos = new VecPos
  }
}

class Pong {
  constructor(canvas) {
    var counter = 0
    var time = 20
    const rad = 10
    this._canvas = canvas
    this._context = canvas.getContext('2d')

    this.ball = new Ball(rad)

    this.players = [new Player, new Player]
    //Give different coord to each player


    let lasTime

    //Calculate time to draw with request animation frame
    const callback = (millisec) => {
      if (lasTime) {
        this.update((millisec - lasTime) / 1000) //convert to seconds
      }
      lasTime = millisec
      requestAnimationFrame(callback)
    }
    callback()
  }
  update(dt) {
    this.ball.pos.x += this.ball.speed.x * dt
    this.ball.pos.y += this.ball.speed.y * dt

    this.frameControl()
    this.drawBackground()
    this.drawBall()
    this.drawPlayers()
    this.players.forEach(player => this.collide(player, this.ball))
  }
  reset(){
    this.ball.pos.x = 100
    this.ball.pos.y = 100
    this.ball.speed.x = 100
    this.ball.speed.y = 100
    
    this.players[0].pos.x = 40
    this.players[1].pos.x = this._canvas.width - 40
    this.players.forEach(player => {
      player.pos.y = this._canvas.height / 2
    })
  }
  frameControl(){
    if (this.ball.right > this._canvas.width || this.ball.left < 0) {
      let playerId = this.ball.speed.x < 0 | 0
      //this.ball.speed.x = -this.ball.speed.x
      this.players[playerId].score++
      this.reset()
    }

    if (this.ball.top > this._canvas.height || this.ball.bottom < 0) {
      this.ball.speed.y = -this.ball.speed.y
    }
  }
  collide(player, ball){
    if(player.left < ball.right && player.right > ball.left &&
      player.top < ball.bottom && player.bottom > ball.top){
        ball.speed.x = -ball.speed.x
      }
    //SI LA BARRA VA CON VELOCIDAD NEGATIVA Y EL TOP ESTA IGUAL QUE LA BOLA, CONSIDERAR
  }
  drawBackground() {
    this._context.beginPath()
    this._context.fillStyle = 'pink'
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height)
  }
  drawBall() {
    this._context.arc(this.ball.pos.x, this.ball.pos.y, this.ball.radio, 0, 2 * Math.PI)
    this._context.fillStyle = 'yellow'
    this._context.fill()
    this._context.stroke()
  }
  drawRect(rect){
    this._context.fillStyle = '#fff'
    this._context.strokeStyle = 'black'
    this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y)
    this._context.strokeRect(rect.left, rect.top, rect.size.x, rect.size.y)
  }
  drawPlayers(){
    this.players.forEach(player => this.drawRect(player))
  }
}

const canvas = document.getElementById('pong')
const pong = new Pong(canvas)

canvas.addEventListener('mousemove', event => {
  pong.players[0].pos.y = event.offsetY
})

/*function

function

function drawLeftBar() {
  contex.fillStyle = 'white'
  contex.fillRect(leftBar.pos.x, leftBar.pos.y, leftBar.size.x, leftBar.size.y)
}

function drawRightBar() {
  contex.fillStyle = 'white'
  contex.fillRect(rightBar.pos.x, rightBar.pos.y, rightBar.size.x, rightBar.size.y)
}

const leftBar = new Bar(10, 50)
leftBar.pos.x = 10
leftBar.pos.y = 10
const rightBar = new Bar(10, 50)
rightBar.pos.x = canvas.width - 20
rightBar.pos.y = canvas.height - 60
*/
