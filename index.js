const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors');
const path = require('path')

connectToMongo();
const app = express()     //to use express
const port = 5000         //initializing port 

//middleware required in order to use routes
app.use(cors())
app.use(express.json())



// Available Routes
app.use('/auth', require('./routes/auth'));
app.use('/blog', require('./routes/blog'));


app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })