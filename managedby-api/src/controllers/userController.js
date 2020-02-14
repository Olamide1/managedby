const boom = require('boom')
const User = require('../models/Users')

exports.login = async (req, reply) => {
    try {
        var company_email = req.body.company_email
        var password = req.body.password
        const users = User.findOne({'company_email': company_email, 'password': password})
        return users
    } catch(err) {
        throw boom.boomify(err);
    }
}

exports.checkUsername = async (req, reply) => {
    try {
        let username = req.body.username;
        var user = User.findOne({username})
    return user
    } catch (err){
        throw boom.boomify(err);
    }
}
exports.signup = async (req, reply) => {
    try {
        const user = new User(req.body)
        return user.save()
    } catch (err) {
        throw boom.boomify(err);
    }
}

exports.addEmployees = async (req, reply) => {
    try {
       // var company_name = req.body.company_name
       // var company_email = req.body.company_email
       // var role = req.body.role
        const users = new User(req.body)
        return users.save()
    } catch(err){
        throw boom.boomify(err);
    }
}

exports.deleteUser = async (req, reply) => {
    try {
        var id = req.body.id
        const users =  User.findByIdAndRemove(id)
        return users
    } catch(err) {
        throw boom.boomify(err)
    }
}

exports.allUsers = async (req, reply) => {
    try {
        const users = User.find()
        return users
    } catch(err) {
        throw boom.boomify(err)
    }
}