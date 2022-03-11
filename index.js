const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers/messages.js');


MONGODB = "mongodb+srv://jbryanmcgrath:MongoDB123@cluster0.wkwck.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log("MongoDB Connected.")
        return server.listen({ port: 4001 })

    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    })