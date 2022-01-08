const { users } = require('../FakeData');

const resolvers = {
    Query: {
        getAllUsers() {
            return users
        }
    },
}

module.exports = {
    resolvers
}