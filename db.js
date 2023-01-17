const mongoose = require('mongoose');

// const mongoURI = "mongodb://localhost:27017/Blog"
const mongoURI = "mongodb+srv://syedurwah:fKL4YSfchTqrYF8T@cluster1.z8bwmqy.mongodb.net/?retryWrites=true&w=majority"
// const mongoURI = process.env.MONGO_STRING

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;