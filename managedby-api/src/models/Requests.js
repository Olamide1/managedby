const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    company_name: String, 
    request_by: String, 
    request: String,
    area: String,
    category: String,
    status: String
})

module.exports = mongoose.model('Request', requestSchema)