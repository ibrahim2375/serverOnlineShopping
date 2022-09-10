const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

require('dotenv').config();

//server variables
var port = process.env.PORT || 5000;
var host = process.env.SERVER_HOST || 'localhost';


const app = express();
//router
const router = require('./src/router/index');
//import database
const connect_to_db = require('./config/DB');
///uses
app.use(cors({
    origin: [process.env.ORIGIN_SITE],
    method: ['GET', 'POST'],
    credentials: true, //to allow to cookies take session data
}));
app.use(session({
    key: 'user_id',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //     expires: 60 * 60 * 24 * 100000
    // }
}));

app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// set the view engine to ejs
app.set('views', __dirname + '/src/views');
app.set('view engine', 'ejs');

//router
app.use('/', router);

//handel errors
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "something wrong ..."
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});
// if no user
app.use(async (req, res, next) => {
    if (req.cookies.user_id && !req.session.user) {
        await res.clearCookie('user_id');
        await res.clearCookie('access_token_admin');
    }
    next();
});
//server running
app.listen(process.env.PORT || 5000, () => {
    connect_to_db();
    console.log(`server running on port ${port} : Link : http://${host}:${port}`);
});
