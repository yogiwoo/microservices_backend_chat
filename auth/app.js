const express=require('express')
const mongoose=require("mongoose")
const app=express()
const approute=require("./routes")
require('dotenv').config()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/welcome-auth',(req,res)=>{
    res.send('Welcome to user auth module')
})

/**this will call the user model ie model.js
 * 
 */
app.use('/auth',approute)

mongoose.connect(process.env.dbURI).then(()=>{
    console.log("DB connection success! connected to mongodb atlas cluster")
}).catch(()=>{
    console.log("DB Error failed to connect")
})

app.listen(process.env.port,()=>{
    console.log('auth service is running at port',process.env.port)
})