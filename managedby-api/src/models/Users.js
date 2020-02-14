const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String, 
    username: String, 
    company_name: String, 
    company_email: String,
    password: String,
    subscription: Boolean,
    role: String,
    industry: String, 
    company_size: String,
    creator: String
})

module.exports = mongoose.model('User', userSchema)