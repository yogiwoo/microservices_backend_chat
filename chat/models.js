const axios = require("axios");
const ChatSession = require("./chatModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class ChatModel {
    constructor() {
        // Initialize any required properties
    }

    async searchUsers(data) {
        try {
            const name = data.query.name;
            const userDetails = await axios.get(`http://localhost:5005/auth/users?name=${name}`);
            return userDetails.data;
        } catch (error) {
            throw new Error(`Error searching users: ${error.message}`);
        }
    }

    async startNewChat(data) {
        try {
            const ids = data.body.members.map(i => new ObjectId(i))
            const newChat = new ChatSession({
                members: ids,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            const savedChat = await newChat.save();
            return savedChat;
        } catch (error) {
            throw new Error(`Error creating chat session: ${error.message}`);
        }
    }
    async myChats(data) {
        console.log("-------------------------->",data)
        let query = [
            {
                $match: {
                    members: new ObjectId("6835a14127409d02fda2f088")
                }
            },
            {
                $unwind: "$members"
            },
            {
                $match: {
                    members: { $ne: new ObjectId("6835a14127409d02fda2f088") }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "members",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: '$user' },
            {
                $project: {
                    userName: "$user.name",
                    image:"$user.image",
                    createdAt: 1,
                    updatedAt: 1
                }
            }
        ]

        const chats = await ChatSession.aggregate(query)
        if (chats.length > 0)
           return chats
        else
            return []
    }
}

module.exports = ChatModel;