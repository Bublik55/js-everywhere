const	express = require('express');
const	{ ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();

const	db = require('./db');

const	port = process.env.PORT || 3030;

const	DATABASE_URL = process.env.DATABASE_URL;

let notes = [
	{id: '1', content: 'This is a first node', author: 'Me'},
	{id: '2', content: 'This is a second node', author: 'Me too'},
	{id: '3', content: 'This is a last node', author: 'Me too too'},
]

const	typeDefs = gql `
	type Note {
		id: ID!
		content: String!
		author: String!
	}

type Query {
		hello: String
		notes: [Note!]!		
		note(id: ID!): Note!
	}
	
	
	type Mutation {
		newNote(content: String!): Note!
	}
`;

const	resolvers = {
	Query: {
		hello: () => `Hello World!`,
		notes: () => notes,
		note: (parent, args) => {
			return notes.find(note =>note.id === args.id)
		}
	},

	Mutation: {
		newNote: (parent, args) => {
			let noteValue = {
				id: String(notes.length + 1),
				content: args.content,
				author: 'Me'
			};
			notes.push(noteValue);
			return noteValue;
		}
	}
};

const	app = express();
db.connect(DATABASE_URL);

const server = new ApolloServer({typeDefs,resolvers});

server.applyMiddleware({app, path : '/api'})

app.listen(port, () => 
	console.log(
		`GraphQL Server running on ${port}${server.graphqlPath}!`)
);
