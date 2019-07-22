const {User, Post} = require('../models/index')

module.exports = {
    posts: async () => {
        const posts = await Post.findAll({
            include: [{model: User, as:'user'}]
        })
        return posts
    },    
    createPost: async (args) => {
        const post = await Post.create(args.postInput)
        return post
    },    
}