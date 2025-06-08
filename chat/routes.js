const express=require("express")
const ChatModel=require("./models")
const router=express.Router()
const x=new ChatModel()

//if chat instance is not present in database
router.post("/startNewChat",async (req,res)=>{
    const newChat=await x.startNewChat(req);
    res.json(newChat);
})
//send message to chat
//get all messages from chat
router.get("/searchUsers",async (req,res)=>{
    console.log("this one")
    const users=await x.searchUsers(req);
    res.json(users);
})

router.get("/getMyChats",async (req,res)=>{
    const chats=await x.myChats(req);
    res.json({message:"My chats",chats:chats})
})
module.exports=router;
