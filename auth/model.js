const userCollection =require('./user')
const bcrypt = require('bcrypt');
class UserModule{
    constructor(){

    }

    async  signup(data) {
        console.log("model called");
        console.log("data",data)
        try {
            // Check if user already exists
            const existingUser = await userCollection.findOne({ 
                $or: [{ email: data.email }, { phone: data.phone }]
            });
            
            if (existingUser) {
                return {
                    success: true,
                    message: 'User already exists',
                };
            }
    
            // Encrypt password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    
            // Create new user
            const newUser = new userCollection({
                name: data.name,
                phone: data.phone,
                email: data.email,
                password: hashedPassword,
                joinedAt: new Date(),
                lastSeen: new Date(),
                active: true
            });
    
            // Save user to database
            await newUser.save();
    
            return {
                success: true,
                message: 'User registered successfully',
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    phone: newUser.phone
                }
            };
    
        } catch (error) {
            console.error('Signup error:', error);
            return {
                success: false,
                message: error.message || 'Internal server error'
            };
        }
    }
    async login(){
        return true;
    }
}

module.exports=UserModule