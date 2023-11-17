const mongoose=require('mongoose')
const dotenv = require("dotenv");

dotenv.config()

const db=async()=>{
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DataBase Successfully Connected")
    } catch (error) {
        console.log("Database Connection Error")
        console.log(error)
    }
}

module.exports ={db}