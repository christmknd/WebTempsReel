import * as dotenv from 'dotenv'
import express from 'express';
import  cors from "cors";

dotenv.config()

import userRouter from "./user/user.routes.js";

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.json("Hello world !");
});
  
app.get('/message', (req, res) => {
    res.json({message: 'MyMessage'});
});

app.use('/users', userRouter);

export default app;
