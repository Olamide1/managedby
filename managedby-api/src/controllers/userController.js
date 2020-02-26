const boom = require('boom')
const User = require('../models/Users')
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: 'in-v3.mailjet.com',
    port: 587,
    auth: {
        user: '63d42e9528ef8736196c3deed05a6309',
        pass: '506d441ab8b912079e43bf8545d036b6'
    }
})


exports.sendSignUpEmail = async(req, reply) => {
    try {
        var firstname = req.body.firstname
        var email = req.body.company_email
        await transporter.sendMail({
            from: '"Manny from ManagedBy" <manny@managedby.com>',
            to: email,
            subject: 'Welcome to ManagedBy, ' + firstname,
            text: "Welcome, " + firstname+ " Thank you for being a part of our journey.",
            html: `<img src='' alt='Welcome'>`,
        }, (err, info) => {
            if (err) {
                return process.exit(1)
            }
            return 'Message sent'
        })
    } catch( err){
        throw boom.boomify(err)
    }
}


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