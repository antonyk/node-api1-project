// imports
const express = require('express')

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
  bio: ""
}


// ENDPOINTS
// 1. USERS
// 1.1 Get Users
api.get('/users', (req, res) => {

  res.status(200).json(initialUser)
})

// server.post()


// server.delete()

// server.patch()





// SERVER BASIC TEST
server.get('/', (req, res) => {
  res.status(200).send("\nHello World!\n\nGet docs at /docs/(topic)");
})

// SERVER LISTEN
server.listen(port, () => console.log(`\n== API is up and listening on port: ${port} ==\n`))