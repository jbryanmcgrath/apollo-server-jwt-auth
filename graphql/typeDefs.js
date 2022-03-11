const { gql } = require('apollo-server');

module.exports = gql`
    # TYPES
    type Message {
        text:String
        createdAt:String
        createdBy:String
    }

    type User {
        username:String
        email:String
        password:String
        token: String

    }
    # INPUTS
    input MessageInput {
        text: String
        username: String
    }

    input RegisterInput {
        username: String
        email: String
        password:String
    }

    input LoginInput{
        email:String
        password:String
    }

    # QUERIES
    type Query {
        message(id: ID!): Message
    }


    # MUTATIONS
    type Mutation{
        createMessage(messageInput: MessageInput): Message!
    }
`