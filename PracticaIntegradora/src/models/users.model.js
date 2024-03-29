import mongoose, { Mongoose } from "mongoose"



const userCollection = 'usuarios'

const userSchema = new mongoose.Schema({
    name: String,
    last_name: String,
    email: {type: String,unique: true},
    age:Number,
    password: String,
    rol: String,
})

const userModel = mongoose.model(userCollection, userSchema)

export default userModel