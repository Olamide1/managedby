const boom = require('boom')
const User = require('../models/Users')
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'theolaakomolafe@gmail.com',
        pass: 'Holyjesus2016'
    }
})


exports.sendSignUpEmail = async(req, reply) => {
    try {
        var firstname = req.body.firstname
        var email = req.body.company_email
        await transporter.sendMail({
            from: 'Mandy from ManagedBy <theolaakomolafe@gmail.com>',
            to: email,
            subject: 'Welcome to ManagedBy, ' + firstname,
            html: "<center> <img src='cid:unique@cid'/> </center> <br> <p> Welcome " +'<b>' + firstname+ '</b>' 
            + ", Thank you for being a part of our journey & joining our Beta. <br>"
            + " <b>Managedby</b> allows Office managers, space managers, & house managers, add people," 
            + " recieve internal helpdesk requests, "
            + " manage tasks, while keeping everyone in the loop on progress.</p><br>" 
            + "<h3> Say goodbye to taps on the shoulder and awkward office visits.</h3>"
            + "<p>Of course, this beta is free for a month as we are mostly getting feedback to suit all" 
            + " all the companies we'd be working with. Please feel free to reach out at any time.</p><br> Cheers.",
            attachments: [{
                filename: 'Header.png',
                path: 'C:/Users/admin/Documents/managedby/managedby-api/src/assets/Header.png',
                cid: 'unique@cid'
            }]
        })
        return 'email sent'
    } catch( err){
        throw boom.boomify(err)
    }
}


exports.sendEmpInvite = async (req, reply) => {
    try {
        var firstname = req.body.firstname
        var pin = req.body.pin
        var creator = req.body.created_by
    } catch(err){
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