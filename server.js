const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const users = require('./routes/users');
//Connect to database
mongoose.connect(config.database);

mongoose.connection.on('connected',()=>{
    console.log('connected to database'+config.database)
})
mongoose.connection.on('error',(err)=>{
    console.log('database error' + err)
})


const app = express();

//Body Parser Middleware (to get data from post req)
app.use(bodyParser.json());

//Passport Middleware (jwt)
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


//Port Number
const port = 3000;

//Autoriser les requetes cross-domain vers l'API
app.use(cors());

app.use('/users',users)


//sTATIC fOLDER
app.use(express.static(path.join(__dirname,'public')));

//Index Route
app.get('*', (req,res)=>{
    res.send('Invalid Endpoint')
})


//Start Server
app.listen(port, ()=>{
    console.log('Server Running on port' + port)
})
