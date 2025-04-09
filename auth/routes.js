const express=require('express')
const router=express.Router()
const userMode=require("./model")
const x=new userMode();



router.post('/signup',async (req,res)=>{
    console.log("===============================>",req.body)
   const a= await x.signup(req.body);
   console.log("answer",a)
   if(a){
    res.json(a);
   }
})


router.post('/login',()=>{

})
module.exports=router