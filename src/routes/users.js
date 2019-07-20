const usersController = require('../controllers/users')
const passport = require('passport');

module.exports = function (router) {
    router.get('/users', passport.authenticate('jwt', {session: false}), usersController.get)

    return router
}