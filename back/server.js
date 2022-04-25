const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.routes');
const mysql = require('./config/db');
require('dotenv').config({ path: './config/.env' });

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ['sessionsId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
};

// config
app.use(cors(corsOptions));
app.use(express.json());

// jwt cookie

// routes
app.use('/api/user', userRouter);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
