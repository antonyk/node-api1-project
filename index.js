// imports
const express = require('express')

// server config
const server = express();
server.use(express.json());


// ENDPOINTS



// SERVER BASIC TEST
server.get('/', (req, res) => {
  res.status(200).send("\nHello World!\n\nGet docs at /docs/(topic)");
})

// SERVER LISTEN
server.listen(5000, () => console.log('\n== API is up ==\n'))