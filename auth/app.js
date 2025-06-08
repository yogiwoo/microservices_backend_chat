const express=require('express')
const mongoose=require("mongoose")
const app=express()
const approute=require("./routes")
const cors=require("cors")
require('dotenv').config()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/welcome-auth',(req,res)=>{
    console.log("=============================")
    res.send('Welcome to user auth module')
})

const corsOptions = {
  origin: ['http://localhost:6006','http://localhost:5173'], // Remove trailing slash
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // If you need cookies/authentication
};

app.use(cors(corsOptions)); // Apply CORS middleware with options
app.use('/auth',approute)

mongoose.connect(process.env.dbURI).then(()=>{
    console.log("DB connection success! connected to mongodb atlas cluster")
}).catch(()=>{
    console.log("DB Error failed to connect")
})

app.listen(process.env.port,()=>{
    console.log('auth service is running at port',process.env.port)
})