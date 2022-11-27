import * as dotenv from 'dotenv'
import express from 'express';
import  cors from "cors";

dotenv.config()

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;
