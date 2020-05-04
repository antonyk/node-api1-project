// imports
const express = require('express')

// server config
const server = express();
server.use(express.json());
const port = 5000;

// ENDPOINTS

// USERS
// Get Users
// server.get('')

// server.post()


// server.delete()

// server.patch()





// SERVER BASIC TEST
server.get('/', (req, res) => {
  res.status(200).send("\nHello World!\n\nGet docs at /docs/(topic)");
})

// SERVER LISTEN
server.listen(port, () => console.log(`\n== API is up and listening on port: ${port} ==\n`))