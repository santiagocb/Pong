//Using express
const express = require ('express');
//Create the app
const app = express();
//The webServer is creted with http
var server = require('http').Server(app);
// WebSockets work with the HTTP server and express
var io = require('socket.io')(server);
var root_path = process.cwd();

//Express middleware
app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.get('/', function(req, res) {
  res.sendFile('./public/index.html', {"root": __dirname}); //Problem
});

/*
io.on('connection', function(socket) {
  console.log("Alguien se ha conectado a la sesion ");
})

socket.on('move', function(data) {
  socket.broadcast.emit('move', data);
})

socket.on('game_over', function(data) {
  io.emit('game_over', data);
  console.log("Game Over");
})
*/

//Call back: Tells  server has started
server.listen(8080, function() {
    var port = server.address().port
    console.log('Servidor corriendo en http://localhost' + ':' + port);
});
