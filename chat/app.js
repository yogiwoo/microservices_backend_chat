const express = require('express');
const app = express();
require('dotenv').config();
const route = require("./routes");
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
//app.options('*', cors(corsOptions));
app.use(cors(corsOptions)); // Apply CORS middleware with options
app.use('/chat', route);
app.get("/getChats", (req, res) => {
    res.send("Hello World from chats");
});

mongoose.connect(process.env.dbURI).then(() => {
    console.log("DB connected successfully ")
}).catch(() => {
    console.log("Problem while connecting with mongodb")
})

app.listen(process.env.port, () => {
    console.log('chat service is running at port', process.env.port)
})
// Connect to MongoDB