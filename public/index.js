class VecPos {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
  get len(){
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
  set len(value) {
      const f = value / this.len
      this.x *= f
      this.y *= f
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
      return this.pos.y + this.radio
  }
  get top(){
      return this.pos.y - this.radio
  }
}

class Player extends Rect{
  constructor() {
    super(20, 100)
    this.speed = new VecPos
    this._lastPos = new VecPos
    this.score = 0
  }
}

class Pong {
  constructor(canvas) {
    var counter = 0
    var time = 20
    const rad = 5
    this._canvas = canvas
    this._context = canvas.getContext('2d')

    this.ball = new Ball(rad)


    this.players = [new Player, new Player]
    this.reset()

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

    this.CHAR_PIXEL = 10  //Pixel's size
    this.CHARS = [        //AWESOME METHOD
      '111101101101111',
      '010010010010010',
      '111001111100111',
      '111001111001111',
      '101101111001001',
      '111100111001111',
      '111100111101111',
      '111001001001001',
      '111101111101111',
      '111101111001111',
    ].map(str => {
      const canvas = document.createElement('canvas') //New HTML to create canvas to paint the score
      canvas.height = this.CHAR_PIXEL * 5
      canvas.width = this.CHAR_PIXEL * 3
      const context = canvas.getContext('2d')
      context.fillStyle = '#fff'
      str.split('').forEach((fill, i) => {
        if(fill == '1'){
          context.fillRect((i % 3) * this.CHAR_PIXEL, (i / 3 | 0) * this.CHAR_PIXEL,
          this.CHAR_PIXEL, this.CHAR_PIXEL)
        }
      })
      return canvas
    })
  }
  update(dt) {
    this.ball.pos.x += this.ball.speed.x * dt
    this.ball.pos.y += this.ball.speed.y * dt

    this.players[1].pos.y = this.ball.pos.y
    this.draw()
    this.players.forEach(player => this.collide(player, this.ball))

    if (this.ball.right > this._canvas.width || this.ball.left < 0) {
      let playerId = this.ball.speed.x < 0 | 0
      this.ball.speed.x = -this.ball.speed.x
      this.players[playerId].score++
      this.reset()
    }

    if (this.ball.bottom > this._canvas.height || this.ball.top < 0) {
      this.ball.speed.y = -this.ball.speed.y
    }
  }
  start(){
    if(this.ball.speed.x == 0 && this.ball.speed.y == 0){
      this.ball.speed.x = 300 * (Math.random() > .5 ? 1 : -1)
      this.ball.speed.y = 300 * (Math.random() * 2 -1)
      this.ball.speed.len = 200
    }
  }
  reset(){
    this.ball.pos.x = this._canvas.width / 2
    this.ball.pos.y = this._canvas.height / 2
    this.ball.speed.x = 0
    this.ball.speed.y = 0

    //Give different coord to each player
    this.players[0].pos.x = 40
    this.players[1].pos.x = this._canvas.width - 40
    this.players.forEach(player => {
      player.pos.y = this._canvas.height / 2
    })
  }
  collide(player, ball){
    if (player.left < ball.right && player.right > ball.left &&
            player.top < ball.bottom && player.bottom > ball.top) {
        const len = ball.speed.len
        ball.speed.x = -ball.speed.x
        ball.speed.y += 300 * (Math.random() - .5)
        console.log(ball.speed.y)
        ball.speed.len *= 1.05
    }else{
      if (player.left < ball.right && player.right > ball.left &&
              player.bottom < ball.bottom && player.bottom > ball.top) {
          ball.speed.x = -ball.speed.x
          ball.speed.y = -ball.speed.y
                console.log(this.ball.speed.x);
      }
    }
    //SI LA BARRA VA CON VELOCIDAD NEGATIVA Y EL TOP ESTA IGUAL QUE LA BOLA, CONSIDERAR
  }
  draw(){
    this.drawBackground()
    this.drawBall()
    this.drawPlayers()
    this.drawScore()
  }
  drawBackground() {
    this._context.beginPath()
    this._context.fillStyle = '#09AB3F'
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height)
  }
  drawBall() {
    this._context.arc(this.ball.pos.x, this.ball.pos.y, this.ball.radio, 0, 2 * Math.PI)
    this._context.fillStyle = 'white'
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
  drawScore(){
    const align = this._canvas.width / 3
    const CHAR_W = this.CHAR_PIXEL * 4    //Canvas with 1 space
    this.players.forEach((player, index) => {
      const chars = player.score.toString().split('')
      const offset = align * (index + 1) - (CHAR_W * chars.length / 2) + this.CHAR_PIXEL / 2
      chars.forEach((char, position) => {
        let canvasScore = this.CHARS[char|0]
        this._context.drawImage(canvasScore, offset + position * CHAR_W, 20)

      })
    })
  }
}

const canvas = document.getElementById('pong')
const pong = new Pong(canvas)

canvas.addEventListener('mousemove', event => {
  const scale = event.offsetY / event.target.getBoundingClientRect().height
  pong.players[0].pos.y = canvas.height * scale
})

canvas.addEventListener('click', event => {
  pong.start()
})
