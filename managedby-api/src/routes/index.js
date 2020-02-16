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
        url: '/api/addemployee',
        handler: userController.addEmployees
    },
    {
        method: 'GET',
        url: '/api/getcompanyrequest',
        handler: requestController.loadCompanyRequests  
    }
]

module.exports = routes