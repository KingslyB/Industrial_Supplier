import createError from 'http-errors';
import express  from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import * as DBConfig from './db';
import mongoose from 'mongoose';
import indexRouter from '../routes/index';
import usersRouter from '../routes/users';

const projectFolder = path.normalize(__dirname + path.sep + "..");
let app = express();

/* DB CONFIGURATION*/
mongoose.connect(DBConfig.LocalURI);
const db = mongoose.connection;
db.on("error", function (){
  console.log("Connection Error | Connection failed or dropped");
})
db.once("open", function(){
  console.log("Connection to DB established");
})

// view engine setup
app.set('views', path.join(projectFolder, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(projectFolder, 'public')));

app.use(indexRouter);
app.use(usersRouter);

app.use(express.static(path.join(projectFolder, 'node_modules')));
app.use(express.static(path.join(projectFolder, 'client')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(req, res, next) {
  // set locals, only providing error in development
  res.locals.message = "'err.message' is no longer a parameter";
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(500); //err.status || 500
  res.render('error');
});

export default app;
