const express = require('express');
const app = express();
require('dotenv').config();
const route = require("./routes");
const mongoose =require("mongoose")
const cors=require("cors")
require("dotenv").config()
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/chat', route);
const corsoptions={
    origin:["http://localhost:3000",'http://localhost:5173'],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}
app.use(cors(corsoptions))
app.get("/getChats", (req, res) => {
    res.send("Hello World from chats");
});

mongoose.connect(process.env.dbURI).then(()=>{
    console.log("DB connected successfully ")
}).catch(()=>{
    console.log("Problem while connecting with mongodb")
})

app.listen(process.env.port,()=>{
    console.log('chat service is running at porn',process.env.port)
})
// Connect to MongoDB