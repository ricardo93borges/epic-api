const {User, Post} = require('../models/index')

module.exports = {
    users: async () => {
        const users = await User.findAll({
            include: [{model:Post, as:'posts'}]
        })
        return users
    },
    createUser: async (args) => {
        const user = await User.create(args.userInput)
        return {...user, password:null}
    }
}