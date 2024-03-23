const express = require('express');
const app = express();
const port = 5000;
const hostname = '127.0.0.1';
const mongoDB = require('./db');
const dotenv = require('dotenv');
dotenv.config();
const FRONTEND_URL = process.env.REACT_FRONTEND_URL;
mongoDB();

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", FRONTEND_URL);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(express.json());
app.get('/', (req, res)=>{
    res.send('Hello World!!');
});


app.use('/api', require('./Routes/AdminLogin'));
app.use('/api', require('./Routes/DeleteImage'));
app.use('/api', require('./Routes/Teacher'));
app.use('/api', require('./Routes/Activity'));
app.use('/api', require('./Routes/Result'));
app.use('/api', require('./Routes/Home'));

app.listen(port, ()=>{
});