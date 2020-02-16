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
        const requests = Requests.find({'company_name': req.params.company_name})
        return requests
    } catch(err){
        throw boom.boomify(err)
    }
}
exports.findMyRequests = async(req, reply) => {
    try {
        const myrequest = Requests.find({'company_email': req.params.company_email})
        return myrequest
    }catch(err){
        throw boom.boomify(err)
    }
}
