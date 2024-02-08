require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dbConn = require('./config/dbConn');
const app = express();
const cors = require('cors');
dbConn();
const PORT = process.env.PORT;


app.use(cors());
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const challengeRouter = require('./routes/challenges');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/users');
const refreshRouter = require('./routes/refresh');




app.use('/auth',authRouter);
app.use('/challenge',challengeRouter);
app.use('/admin',adminRouter);
app.use('/users',userRouter);
app.use('/refresh',refreshRouter);


mongoose.connection.once('open',()=>{
    console.log('connected to mongodb');
    app.listen(PORT,()=>{
        console.log('server running on port :',PORT);
    })
});
