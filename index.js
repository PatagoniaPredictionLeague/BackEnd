import app from './app.js';
import sequelize from './database/db.js';
import { Server  } from 'socket.io';
import http from 'http';
import { PORT } from './config.js';

import  './database/models/User.js';
import  './database/models/Competicion.js';
import './database/models/Partido.js';
import  './database/models/Prediccion.js';
import './database/models/Tabla.js';
import  './database/models/UserTabla.js';
import  './database/models/Fecha.js';


//Setting
const port = PORT;

const httpServer = http.createServer(app);
const io =  new Server(httpServer,{
  cors: {
    origin: "*",
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
  socket.on('update partido', (msg) => {
    console.log('message: ' + msg);
    io.emit('update partido', msg);
  });
});

httpServer.listen(port, function () {
  sequelize.sync({alter:true}).then( () => {
    console.log("Nos hemos conectado a la base de datos");
  }).catch(error =>{
    console.log("Se ha producido un error", error);
  })
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

