const boom = require('boom')
const User = require('../models/Users')

exports.login = async (req, reply) => {
    try {
        var company_email = req.body.company_email
        var password = req.body.password
        const users = User.find({
            $and: [
                {'company_email': company_email, 'password': password}
            ]
        })
        return users
    } catch(err) {
        throw boom.boomify(err);
    }
}

exports.SearchByUsername = async (req, reply) => {
    try {
        let username =  req.body.username
        var user = User.findOne({'username': username})
    return user
    } catch (err){
        throw boom.boomify(err);
    }
}
exports.signup = async (req, reply) => {
    try {
        let email =  req.body.company_email
        var user = User.find({'company_email': email})
        if ( (await user).length === 0) {
            const signup = new User(req.body)
            return signup.save()
        } else {
            return {"message": "User's email exist"}
        }
    } catch (err) {
        throw boom.boomify(err);
    }
}

exports.addEmployees = async (req, reply) => {
    try {
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