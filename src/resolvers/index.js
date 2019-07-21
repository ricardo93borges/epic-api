const {User, Post} = require('../models/index')

module.exports = {
    posts: async () => {
        const posts = await Post.findAll({
            include: [{model: User, as:'user'}]
        })
        return posts
    },
    users: async () => {
        const users = await User.findAll({
            include: [{model:Post, as:'posts'}]
        })
        return users
    },
    createPost: async (args) => {
        const post = await Post.create(args.postInput)
        return post
    },
    createUser: async (args) => {
        const user = await User.create(args.userInput)
        return {...user, password:null}
    }
}