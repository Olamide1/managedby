const userController = require('../controllers/userController');
const requestController = require('../controllers/requestController')

const routes = [
    {
        method: 'POST',
        url: '/api/login',
        handler: userController.login
    },
    {
        method: 'POST',
        url: '/api/signup',
        handler: userController.signup
    },
    {
        method: 'GET',
        url: '/api/users',
        handler: userController.allUsers
    },
    {
        method: 'POST',
        url: '/api/deleteuser',
        handler: userController.deleteUser
    },
    {
        method: 'POST',
        url: '/api/companyname',
        handler: userController.SearchByCompany
    },
    {
        method: 'POST',
        url: '/api/updaterequest',
        handler: requestController.updateRequestStatus
    },
    {
        method: 'POST',
        url: '/api/addemployee',
        handler: userController.addEmployees
    },
    {
        method: 'POST',
        url: '/api/getcompanyrequest',
        handler: requestController.loadCompanyRequests  
    },
    {
        method: 'POST',
        url: '/api/createrequest',
        handler: requestController.createRequest
    },
    {
        method: 'POST',
        url: '/api/myrequests',
        handler: requestController.findMyRequests
    },
    {
        method: 'POST',
        url: '/api/coll',
        handler: userController.searchByCreatedBy
    },
    {
        method: 'POST',
        url: '/api/deleterequest',
        handler: requestController.deleteRequest
    }, 
    {
        method: 'POST',
        url: '/api/findrequestsbyid',
        handler: requestController.findById
    },
    {
        method: 'POST',
        url: '/api/findundone',
        handler: requestController.findUndoneRequests
    }

]

module.exports = routes