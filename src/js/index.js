let express = require('express');
let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let path = require('path');

let pages = ['index', 'processing', 'printing'];
let indicator = 1;

app.use('/img',express.static('src/img'));
app.use('/css',express.static('src/css'));

app.get('/', function(req, res){
  res.sendFile(path.resolve('src/index.html'));
});

app.get('/processing', function(req, res){
  res.sendFile(path.resolve('src/processing.html'));
});

app.get('/printing', function(req, res){
  res.sendFile(path.resolve('src/printing.html'));
});

app.get('/index', function(req, res){
  res.sendFile(path.resolve('src/index.html'));
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('keydown', function(){
    let destination = pages[indicator];
    socket.emit('redirect', destination);
    indicator++;
    if(indicator > 2) {
      indicator = 0;
    }
  })
});
