const boom = require('boom')
const Requests = require('../models/Requests')

exports.createRequest = async(req, reply)=> {
    try {
            const request = new Requests(req.body)
            return request.save()
    } catch(err) {
        throw boom.boomify(err)
    }
}

exports.loadCompanyRequests = async(req, reply)=> {
    try{
        const requests = Requests.find({'company_name': req.body.company_name})
        return requests
    } catch(err){
        throw boom.boomify(err)
    }
}
exports.findMyRequests = async(req, reply) => {
    try {
        const myrequest = Requests.find({'request_by': req.body.request_by})
        return myrequest
    }catch(err){
        throw boom.boomify(err)
    }
}

exports.updateRequestStatus = async (req, reply) => {
    try {
        const id = req.body.id
        const updatedrequest = req.body
        const { ...updateData } = updatedrequest
        const update = await Requests.findByIdAndUpdate(id, updateData, {new: true})
        return update
    }catch(err){
        throw boom.boomify(err)
    }
}
exports.findUndoneRequests = async (req, reply)=> {
    try {

        var company_name = req.body.company_name
        var status = req.body.status
        const request = Requests.find({
            $and: [
                {'company_name': company_name, 'status': status}
            ]
        })
        return request

    } catch(err) {
        throw boom.boomify(err)
    }
}

exports.allRequests = async (req, reply) => {
    try {
        const request = Requests.find()
        return request
    } catch(err) {
        throw boom.boomify(err)
    }
}
exports.findById = async (req, reply) => {
    try {
        var id = req.body.id
        const finder = Requests.findById(id)
        return finder
    } catch(err){
        throw boom.boomify(err)
    }
}

exports.deleteRequest = async (req, reply) => {
    try {
        const id = req.body.id
        const deleteRequest = Requests.findByIdAndRemove(id)
        return deleteRequest
    } catch(err){
        throw boom.boomify(err)
    }
}