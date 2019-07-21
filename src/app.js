/* eslint-disable no-undef */
require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

require('./services/passport')

const express = require('express')
const cors = require('cors')
const router = express.Router()

const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express()
app.use(cors())
app.use(express.json())

//require('./routes/index')(app, router)

const {User} = require('./models/index')
const {Post} = require('./models/index')

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type Post {
            id: ID!
            title: String!
            body: String!
            userId: ID!
            createdAt: String!
            updatedAt: String!
        }

        input PostInput {
            title: String!
            body: String!
            userId: ID!
        }

        type User {
            id: ID!
            name: String!
            email: String!
            password: String!
            createdAt: String!
            updatedAt: String!
            posts: [Post]
        }

        input UserInput {
            name: String!
            email: String!
            password: String!
        }

        type RootQuery {
            posts: [Post!]!
            users: [User!]!
        }

        type RootMutation {
            createPost(postInput: PostInput): Post
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        posts: async () => {
            const posts = await Post.findAll()
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
    },
    graphiql: true
}))

module.exports = app