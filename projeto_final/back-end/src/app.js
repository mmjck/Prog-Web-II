import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
const path = require('path');

import router from './routes/';
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
import { v4 as uuidv4 } from 'uuid';

require('dotenv').config({ path: `${__dirname}/../../.env` });

const PORT = process.env.PORT_BACK || 3333;

const app = express();

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'public', 'uploads'))
);

app.use(cors({ credentials: true, origin: 'http://localhost:3366' }));
app.use(express.json());
app.use(morgan('dev'));
console.log(path.resolve(__dirname, '../', 'public', 'uploads'));

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Minha loja API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(
  session({
    genid: () => uuidv4(),
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
  })
);
app.use(cookieParser());

app.use((req, res, next) => {
  if (!('nome' in req.cookies)) res.cookie('nome', 'Alinis Morissette');
  next();
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
