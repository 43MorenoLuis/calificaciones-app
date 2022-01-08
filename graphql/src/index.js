const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');

const { typeDefs } = require('./Schema/TypeDefs');
const { resolvers } = require('./Schema/Resolvers');

const express = require('express');
const app = express();
const http = require('http');

const PORT = process.env.PORTGR || 9090;

require('./database/config').dbConnection();

async function startApolloServer(typeDefs, resolvers) {
  
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  
  server.applyMiddleware({ app });

  await new Promise(resolve => 
    httpServer.listen(PORT, resolve)
  );

  console.log(`[ 🖥 Server Running 🚀 ] in port, ${PORT}` )
}
startApolloServer(typeDefs, resolvers);