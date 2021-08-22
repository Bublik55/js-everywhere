const express = require('express');
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require ('graphql-validation-complexity');
const { ApolloServer } = require('apollo-server-express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const db = require('./db');
const models = require('./models')
const typeDefs = require('./schema')
const resolvers = require('./resolves');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 3030;

const DATABASE_URL = process.env.DATABASE_URL;

const app = express();
app.use(helmet());
app.use(cors());
db.connect(DATABASE_URL);

const getUser = token => {
	if (token) {
		try {
			return jwt.verify(token, process.env.JWT_SECRET);
		} catch (err) {
			throw new Error('Session invalid');
		}
	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
	context: ({ req }) => {
		const token = req.headers.authorization;
		const user = getUser(token);
		return { models, user }
	}
});

server.applyMiddleware({ app, path: '/api' })

app.listen(port, () =>
	console.log(
		`GraphQL Server running on ${port}${server.graphqlPath}!`)
);
