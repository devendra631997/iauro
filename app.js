require('dotenv').config();
const mongoose = require('mongoose');
const { SeedDB } = require("./database/seeders/user/user")
mongoose
  .connect(
    "mongodb://mongodb-myapp:27017/myapp",
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .then(() =>{
    SeedDB()
  })
  .catch(err => console.log(err));
const server = require('./server/app');
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Localhost:${PORT}`));