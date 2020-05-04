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
// 1. USERS
// 1.1 Get Users -- returns all users
api.get('/users', (req, res) => {

  res.status(200).json(users)
})
// 1.2 New User -- ensure bio and name are not empty and generate new unique id
api.post('/users', (req, res) => {
  if (req.body["name"] && req.body["bio"]) {
    const data = req.body;
    const user = {...initialUser, ...data};
    user.id = shortid.generate();
    // append to users array
    users.push(user);

    res.status(200).json(user);
  } else {

    res.status(400).json({ errorMessage: "Please provide name and bio for the user" })
  }

})


// api.delete()

// api.patch()





// SERVER BASIC TEST
server.get('/', (req, res) => {
  res.status(200).send("\nHello World!\n\nGet docs at /docs/(topic)");
})

// SERVER LISTEN
server.listen(port, () => console.log(`\n== API is up and listening on port: ${port} ==\n`))