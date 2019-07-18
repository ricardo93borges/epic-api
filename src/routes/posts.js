const postsController = require('../controllers/posts')

module.exports = function (router) {
    router.get('/posts', postsController.get)

    return router
}