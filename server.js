//Import express into file
const express = require("express");

//Import express-handlebars package
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');   

// MongoDB
const mongoose = require('mongoose');

const fileUpload = require('express-fileupload');
const session = require('express-session')

// Environment variable file
require('dotenv').config({path:"./config/keys.env"}) 

//import your router objects
const userRoutes = require("./controllers/user");
const roomRoutes = require("./controllers/rooms");
const generalController = require("./controllers/general");

//create express app object
const app = express();

//Setting handlebars as a template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Link static assests
app.use(express.static('public'));

// //Handlebars middlware
app.engine("handlebars",exphbs());
app.set("view engine","handlebars");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req,res,next)=>{

    if(req.query.method=="PUT")
    {
        req.method="PUT"
    }

    else if(req.query.method=="DELETE")
    {
        req.method="DELETE"
    }

    next();
})

app.use(fileUpload());


app.use(session({secret: `${process.env.SESSION_SECRET}` , resave: false,saveUninitialized: true}))

  
//custom middleware functions
app.use((req,res,next)=>{

    //res.locals.user is a global handlebars variable. This means that ever single handlebars file can access 
    //that user variable
    res.locals.user = req.session.user;
    next();
});


//map each controller to the app object
app.use("/",generalController);
app.use("/rooms",roomRoutes);

//MAPs EXPRESS TO ALL OUR  ROUTER OBJECTS
app.use("/",(req,res)=>{
    res.render("General/404");
});

const htmlTemplate = section => `
<!DOCTYPE html>ß
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title> ${section.title} </title>
  <link rel="stylesheet" href="css/index.css">
</head>

<body>
    ${section.html}
</body>
</html>
`

// Mongo DB
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Connected to MongoDB Database`);
})
.catch(err=>console.log(`Error occured when connecting to database ${err}`));


//Create a Web server
const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`Web server is connected.`);
})
