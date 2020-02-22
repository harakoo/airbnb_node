//Import express into file
const express = require("express");

//Import express-handlebars package
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');    

// Import Fake DB
const listingModel = require("./models/listings");

//create express app object
const app = express();

//Setting handlebars as a template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Link static assests
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Data
const listings = [
    { //0
        id:101,
        name: `Spacious&Family Friendly! Hot-tub & Lake View!`,
        image: `https://odis.homeaway.com/odis/listing/9ae72d05-efae-4904-80e8-8dd5ae06b0e5.f10.jpg`,
        category: `Entire place`,
        price: 285,
        review: 5,
        host: `super`
    }, { //1
        id:102,
        name: `Two bedrooms with ensuite bathroom & parking at YorkU`,
        image: `https://odis.homeaway.com/odis/listing/362ddd92-ada9-45e1-869f-d76a90dabae9.f10.jpg`,
        category: `Private room`,
        price: 60,
        review: 4,
        host: `general`
    }, { //2
        id:103,
        name: `Master bedroom with ensuite bathroom & parking`,
        image: `https://odis.homeaway.com/odis/listing/060df9ea-5baa-4e52-9e4b-9982304b97ee.f10.jpg`,
        category: `Shared room`,
        price: 40,
        review: 3,
        host: `general`
    }, { //3
        id:104,
        name: `A cozy home minutes walk from Eaton Centre`,
        image: `https://odis.homeaway.com/odis/listing/5a837c15-7891-4909-aab4-662ce7b45351.f10.jpg`,
        category: `Entire place`,
        price: 400,
        review: 4,
        host: `plus`
    }, { //4
        id:105,
        name: `Spacious Room near Downtown`,
        image: `https://odis.homeaway.com/odis/listing/7f65eb6a-0adb-4810-ae7d-8671f7f5ad2f.f10.jpg`,
        category: `Private room`,
        price: 75,
        review: 2,
        host: `plus`
    }, { //5
        id:106,
        name: `Walk to the EX and Entertainment District`,
        image: `https://odis.homeaway.com/odis/listing/25343abb-46c3-4d04-8135-8c49201c1125.f10.jpg`,
        category: `Entire place`,
        price: 175,
        review: 3,
        host: `super`
    }
]

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


//Setting up router
app.get("/", (req,res) => {
    
    res.render("home", {
        title:"Home",
        headingInfo: "Home page",
        dynamicContent: "something",
        listings: listingModel.getallListings()
    });
})

app.get("/listing", (req,res) => {
    
    res.render("listing", {
        title:"Rental Listing",
        headingInfo: "Retal Listings Page",
        listings: listings
    });
})

app.get("/registration", (req,res) => {
    
    res.render("registration", {
        title:"Registration",
        headingInfo: "Registration Page",
        dynamicContent: "something"
    });
})

app.get("/login", (req,res) => {
    
    res.render("login", {
        title:"Log In",
        headingInfo: "Log In Page",
        dynamicContent: "something"
    });
})

app.post("/registration",(req,res)=>{
    const errors= [];
  if(req.body.firstname== "")
  {
    console.log('has error')
    errors.push ("Sorry, you must enter first name");
  }
  if(req.body.lastname== "")
  {
    errors.push ("Sorry, you must enter last name");
  }
  if(req.body.email== "")
  {
    errors.push ("Sorry, you must enter email");
  }
  if(req.body.password== "")
  {
    errors.push ("Sorry, you must enter password");
  }
  if(errors.length > 0)
  {
    res.render("registration",{
        messages : errors
    })
  }
});

app.post("/login",(req,res)=>{
const errors= [];
  if(req.body.loginEmail== "")
  {
    errors.push ("You must enter email address");
  }
  if(req.body.loginPassword== "")
  {
    errors.push ("You must enter password");
  }
  if(errors.length > 0)
  {
    res.render("login",{
        message : errors
      })
  }
});

app.get("/", (req,res) => {
    
  res.render("about", {
      title:"About",
      headingInfo: "About",
      dynamicContent: "something"
  });
})


//Create a Web server
const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`Web server is connected.`);
})
