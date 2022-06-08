require('dotenv').config();

const server = require('./server/app');

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Localhost:${PORT}`));