require('./config/config');
require('./models/db');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routesIdx = require('./routes/index.router');

const app = express();

// configuration of middleware

// body parser is needed for passing json data in this app
app.use(bodyParser.json());
// cors is needed for communication between client and server because they run on different port numbers
app.use(cors());
// request /api/signup will be handled by signup function
app.use('/api', routesIdx);

// handle errors
app.use((err,req,res,next) => {
    res.status(500).send(err);
    next();
})

// start server
app.listen(process.env.PORT, () => 
    console.log(`Server started at port: ${process.env.PORT}`)
);