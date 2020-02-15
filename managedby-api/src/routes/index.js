const userController = require('../controllers/userController');

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
        url: '/api/username',
        handler: userController.SearchByUsername
    }
]

module.exports = routes