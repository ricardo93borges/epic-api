const userResolver = require('./user')
const postResolver = require('./post')

const rootResolver = {
    ...userResolver,
    ...postResolver
}

module.exports = rootResolver