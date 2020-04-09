// code away!
require('dotenv').config(); // require() is essentially like importing. Here I import dotenv and run a config function on it.

const server = require('./server.js') // Here I am importing the server.js file for use in index.js, which is what the actual file node reads

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`\n the server is running on http://localhost:${port}`);
})