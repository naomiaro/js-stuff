// @TODO:
// - Server runs on port 4848 (because reasons...)
// - `/api/users` endpoint serves all the data under `data/data.json` with status code 200
// - `/api/users/${id}` endpoint serves a single user data by ID
// - `/api/users/xxx` serves 404 Not Found, as do all the other paths
// - BONUS: Add GraphQL and GraphiQL endpoints for bonus

const express = require('express');
const data = require('./data/data');

const PORT = 4848;
const app = express();

app.get('/api/users', function(req, res) {
  res.json(data);
});

app.get('/api/users/:id', function(req, res) {
  const id = req.params.id;
  res.json(data[id]);
});

app.get('/*', function(req, res) {
  res.sendStatus(404);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
