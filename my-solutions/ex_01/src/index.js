"use srtict"

const	express = require('express');
const	{ ApolloServer, gql } = require('apollo-server-express');

const	port = process.env.PORT || 3030

const	typeDefs = gql `
	type Query {
		hello: String
	} 
`;

const	resolvers = {
	Query: {
		hello: () => `Hello World!`
	}
};

const	app = express();

const server = new ApolloServer({typeDefs,resolvers});

server.applyMiddleware({app, path : '/api'})

app.listen(port, () => 
	console.log(
		`GraphQL Server running on ${port}${server.graphqlPath}!`)
);
