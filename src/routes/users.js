const usersController = require('../controllers/users')

module.exports = function (router) {
    router.get('/users', usersController.get)

    return router
}