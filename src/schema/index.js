const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    type Post {
        id: ID!
        title: String!
        body: String!
        userId: ID!
        createdAt: String!
        updatedAt: String!
        user: User
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
`)