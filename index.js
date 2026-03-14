import express from 'express'; //OR: const express = require('express');
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import hotelRoute from "./routes/hotels.js";
import roomRoute from "./routes/rooms.js";


const app = express();
dotenv.config();



//initial connection settings to mongodb
const connect = async () => {
try{
    await mongoose.connect(process.env.MONGO_URL); 
    console.log('connected to mongodb.'); 
}catch(error){
    console.log(error);
}};

//connectoin LISTENING
mongoose.connection.on('disconnected', () => {
    console.log('disconnected from mongodb.');
});

//middlewares (intermediates) : used to reach requests & responses
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//these are the routes (endpoints)
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/hotels', hotelRoute);
app.use('/api/rooms', roomRoute);



//error handling : create custom error message
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500; //500 is the default error status
    const errorMessage = err.message || "something went wrong!";  // custom error message
    return res.status(errorStatus).json({
       success: false,
       status: errorStatus, 
       message: errorMessage,
       stack: err.stack, //more details about the error
    }) 
})


app.listen(8800, () => {
    connect();
    console.log('server is running on http://localhost:8800/api/');
});
