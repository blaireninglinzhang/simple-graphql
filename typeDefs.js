const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Post {
        id: ID
        title: String
        description: String
    }
    type Query {
        getAllPosts: [Post]
    }
    input PostInput {
        title: String
        description: String
    }
    type Mutation {
        createPost(post: PostInput): Post
        updatePost(id: ID, post: PostInput): Post
    }
`

module.exports = typeDefs;