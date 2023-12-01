const express = require("express");
const { db } = require('./db/db');
const router = require('./routes/router');
const dotenv = require("dotenv");
const cors = require("cors")
const cookieParser=require("cookie-parser")
const app=express();

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(cookieParser())
app.use(router)


const PORT = process.env.PORT

//cheked
app.get('/', (req, res)=>{
    res.send('Loginform')
})


//Database connection
db()

//local host connection
app.listen(PORT, ()=>{console.log('Local host success:', PORT)})