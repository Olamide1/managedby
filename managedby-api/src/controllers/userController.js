const boom = require('boom')
const User = require('../models/Users')

exports.login = async (req, reply) => {
    try {
        var company_email = req.body.company_email
        var pin = req.body.company_pin
        const users = User.find({
            $and: [
                {'company_email': company_email, 'company_pin': pin}
            ]
        })
        return users
    } catch(err) {
        throw boom.boomify(err);
    }
}

exports.SearchByCompany = async (req, reply) => {
    try {
        let company_email =  req.body.company_email
        var user = User.findOne({'company_email': company_email})
    return user
    } catch (err){
        throw boom.boomify(err);
    }
}

exports.searchByCreatedBy = async(req, reply) => {
    try{
        let creator = req.body.creator
        var user = User.find({'creator': creator})
        return user
    } catch(err){
        throw boom.boomify(err)
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