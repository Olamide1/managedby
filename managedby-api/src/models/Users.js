const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    lastname: String, 
    firstname: String, 
    company_name: String, 
    company_email: String,
    subscription: Boolean,
    role: String,
    industry: String, 
    company_size: String,
    creator: String,
    office: String,
    company_pin: String
})

module.exports = mongoose.model('User', userSchema)