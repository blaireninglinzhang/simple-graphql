const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

async function startApolloServer() {
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app: app });

    app.use((req, res) => {
        res.send("Hello from express apollo server!");
    });

    try {
        await mongoose.connect('mongodb://localhost:27017/blaire', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Mongoose is connected!');
    } catch (e) {
        console.error(e);
    }

    app.listen(4000, () => console.log("Server is running on port 4000!"));
}

startApolloServer();