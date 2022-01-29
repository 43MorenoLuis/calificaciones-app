const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        name: String,
        email: String,
        password: String,
        rol: String,
    }

    type UserRes{
        name: String,
        email: String,
        rol: String,
        state: Boolean,
        google: Boolean,
        id: ID,
    },

    type Login {
        ok: Boolean,
        user: UserRes
        token: String
    }

    # Inputs
    input IUser {
        name: String,
        email: String,
        password: String,
        rol: String,
    }

    input ILogin {
        email: String,
        password: String
    }

    # Queries
    type Query {
        getAllUsers: [User!]!
    }

    # Mutations
    type Mutation {
        createUser( input:IUser ): User!
        login( input:ILogin ): Login
    }
`
module.exports = {
    typeDefs
}