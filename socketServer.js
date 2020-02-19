/* alors ça dario c'est juste pour mon kiff, on l'utilise pas mais c'est un création de serveur en socket
En gros c'est avec ça qu'ont fais du temps réel en node JS, c'est ultra efficace niveau perf, mais ce serait pas utile pour l'api */

const express = require('express'); 
const app = express();
const server = app.listen(3001,console.log('Socket.io Hello Wolrd server started!'));
const io = require('socket.io')(server);
//const fs = require('fs');
require('jsonminify');

io.on('connection', (socket) => {console.log('client connected')
  

  socket.on('action', (msg) => {
    AllRoomLoaded.action(JSON.parse(msg),socket.user);
  });

  socket.on('message', (msg) => {
    if (socket.user)
      AllRoomLoaded.sendAllClientInfoRoom(socket.user.room,socket.user.name+' say '+msg);
  });

  socket.on('connection', (msg) => {//console.log(AllRoomLoaded)
    var userexist;
    userexist = AllRoomLoaded.connectUser(JSON.parse(msg),socket);
  });
  
      
      
});
