const sessionsController = require('../controllers/session')
const passport = require('passport')

module.exports = function (router) {
    router.post('/login', sessionsController.login)

    return router
}