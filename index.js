// imports
const express = require('express');
const shortid = require('shortid');

// Server config
const server = express();
server.use(express.json());
// Base URL config
const api = express.Router();
server.use('/api', api);
// Port config
const port = 5000;

// DATA
const initialUser = {
  id: "",
  name: "",
  bio: "",
  birthdate: "",
  location: "",
}
const users = []


// ENDPOINTS
// USERS
// 1. (R)ETRIEVE
// 1.1 Get All Users
api.get('/users', (req, res) => {
  try {
    res.status(200).json(users)
  }
  catch {
    res.status(500).json({ errorMessage: "The users information could not be retrieved." })
  }
})
// 1.2 Get User by ID -- return a single matching user
api.get('/users/:id', (req, res) => {
  // return error if id is invalid
  if (!shortid.isValid(req.params.id)) {
    res.status(400).json({ errorMessage: "Invalid User ID"})
  } 
  else {
    const user = users.find(item => item.id === req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
    }
  }
})

// 2. (C)REATE
// 1.2 New User -- ensure bio and name are not empty and generate new unique id
api.post('/users', (req, res) => {
  if (req.body["name"] && req.body["bio"]) {
    const data = req.body;
    const user = {...initialUser, ...data};
    let id = shortid.generate();
    while (true) {
      if (!users.find(item => item.id === id)) break;
      id = shortid.generate();
    }
    user.id = id;
    // append to users array
    try {
      users.push(user);
    } catch (error) {
      res.status(500).json({ errorMessage: "There was an error while saving the user to the database"})
    }

    res.status(200).json(user);
  } else {

    res.status(400).json({ errorMessage: "Please provide name and bio for the user" })
  }
})

// 3. (D)ELETE
// 1.3 Delete User by ID
api.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  // return error if id is invalid
  if (!shortid.isValid(id)) {
    res.status(400).json({ errorMessage: "Invalid User ID"})
  }
  else {
    const user = users.find(item => item.id === id);
    if (user) {
      users = users.filter(item => item.id === id)
      res.status(200).json(users);
    } else {
      res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
    }
  }
})

// 4. (U)PDATE
// api.put('/users')





// SERVER BASIC TEST
server.get('/', (req, res) => {
  res.status(200).send("\nHello World!\n\nGet docs at /docs/(topic)");
})

// SERVER LISTEN
server.listen(port, () => console.log(`\n== API is up and listening on port: ${port} ==\n`))