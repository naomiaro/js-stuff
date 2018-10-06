const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const data = require('./data/data');
const PORT = 4848;
const app = express();

const typeDefs = gql`
  type Geo {
    lat: String
    lng: String
  }

  type Company {
    name: String
    catchPhrase: String
    bs: String
  }

  type Address {
    street: String
    suite: String
    city: String
    zipcode: String
    geo: Geo
  }

  type User {
    id: Int
    name: String
    username: String
    email: String
    address: Address
    phone: String
    website: String
    company: Company
  }

  type Query {
    user(id: Int): User
    users: [User]
  }
`;

const resolvers = {
  Query: {
    user: (parent, args, context, info) => {
      return data.find(user => user.id === args.id);
    },
    users: () => data,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.get('/api/users', function(req, res) {
  res.json(data);
});

app.get('/api/users/:id', function(req, res) {
  const id = Number(req.params.id);
  const user = data.find(user => user.id === id);

  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

app.get('/*', function(req, res) {
  res.sendStatus(404);
});

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}`),
);
