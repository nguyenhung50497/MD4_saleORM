import express from "express";
import { router } from './src/router/router';
import bodyParser from "body-parser";
import fileUpload from 'express-fileupload';
import mongoose from "mongoose";
import session from "express-session";
import flash from "connect-flash";
import { Cookie } from "express-session";

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/demo01').then(() => {
    console.log('Connected to Mongo');
}).catch(err => console.log(err));
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static('./public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
    createParentPath: true
}));
app.use(flash());
app.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: 'somesecret', 
    cookie: { maxAge: Infinity }
}));

app.use('', router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');

})