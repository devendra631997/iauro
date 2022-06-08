const mongoose = require('mongoose');
mongoose
  .connect(
    "mongodb://mongodb-myapp:27017/myapp",
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));