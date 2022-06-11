require('dotenv').config();
const mongoose = require('mongoose');
const { SeedUsers } = require("./database/seeders/user/user")
const { SeedProducts } = require("./database/seeders/product/product")
mongoose
  .connect(
    "mongodb://mongodb-myapp:27017/myapp",
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .then(() =>{
    SeedProducts()
    SeedUsers()
  })
  .catch(err => console.log(err));
const server = require('./server/app');
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Localhost:${PORT}`));