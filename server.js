//Import express into file
const express = require("express");

//Import express-handlebars package
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');    

//create express app object
const app = express();

//Setting handlebars as a template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Link static assests
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Load controllers
const generalController = require("./controllers/general");
const productController = require("./controllers/product");

//map each controller to the app object

app.use("/",generalController);
app.use("/product",productController);

const htmlTemplate = section => `
<!DOCTYPE html>
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

/*
const getListingsAsUl = () => {
    let ulString = '';
    listings.forEach(prob => {
        ulString += `
                    <article>
                    <img src="${listings.image}" alt="">
                    <div class="name">
                    <h3> ${listings.name} </h3> 
                    <p class="category"> ${listings.category}</p>
                    <p class="price"> $${listings.price}</p>
                    <p class="review"> ${listings.reduce} </p>
                    <p class="host"> ${listings.host} </p>
                    </div>
                    </article>
                    `
    })
}
*/



//Create a Web server
const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`Web server is connected.`);
})
