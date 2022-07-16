import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

import router from "./routes/"
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
import { v4 as uuidv4 } from "uuid"; 


require ("dotenv").config({ path: `${__dirname}/../../.env` } )
const app = express();

const PORT = process.env.PORT_BACK || 3333

let demoLogger = (req, res, next) => {
    let current_datetime = new Date();
    let formatted_date =
      current_datetime.getFullYear() +
      "-" +
      (current_datetime.getMonth() + 1) +
      "-" +
      current_datetime.getDate() +
      " " +
      current_datetime.getHours() +
      ":" +
      current_datetime.getMinutes() +
      ":" +
      current_datetime.getSeconds();
    let method = req.method;
    let url = req.url;
    let status = res.statusCode;
    let log = `[${formatted_date}] ${method}:${url} ${status}`;
    console.log(log);
    next();
  };



  const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: "Shop API",
        version: '1.0.0',
      },
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js']
    };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  

app.use(cookieParser())
app.use(demoLogger);

app.use(session({
  genid: () => uuidv4(),
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: false
}));


app.use((req,res,next) => {
  if(!('nome' in req.cookies)) res.cookie('nome','Alinis Morissette');
  next();
})
  


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));



app.use(router);





app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


