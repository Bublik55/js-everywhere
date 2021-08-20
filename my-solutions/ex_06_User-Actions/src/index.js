const	express = require('express');
const	{ ApolloServer } = require('apollo-server-express');
require('dotenv').config();


const	db = require('./db');
const	models = require('./models')
const	typeDefs = require('./schema')
const	resolvers = require('./resolves');
const	jwt = require('jsonwebtoken');
const	port = process.env.PORT || 3030;

const	DATABASE_URL = process.env.DATABASE_URL;

const	app = express();

db.connect(DATABASE_URL);

const getUser = token => {
	if (token) {
		try {
			return jwt.verify(token, process.env.JWT_SECRET);
		} catch (err) {
			throw new Error ('Session invalid');
		}
	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		const token = req.headers.authorization;
		const user = getUser(token);
		console.log(user);
		return { models,user }
	}	
});

server.applyMiddleware({app, path : '/api'})

app.listen(port, () => 
	console.log(
		`GraphQL Server running on ${port}${server.graphqlPath}!`)
);
