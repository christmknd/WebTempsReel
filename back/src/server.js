import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import  cors from "cors";
const app = express();
app.use(cors())

import { createServer } from 'http';
const server = createServer(app);

import { Server } from "socket.io";
const io = new Server(server, {
  cors: {
      origin: "http://localhost:3000"
  }
});

app.get('/', (req, res) => {
  res.json("Hello world !");
});

app.get('/message', (req, res) => {
  res.json({message: 'MyMessage'});
});

io.on('connection', (socket) => {
  console.log('user connected');
});

server.listen(process.env.PORT_BACKEND, () => {
  console.log(`listening on http://localhost:${process.env.PORT_BACKEND}`);
});