const express = require('express')
const router = express.Router();

// Import Fake DB
const listingModel = require("../models/listings");

//Setting up router
router.get("/", (req,res) => {
    
    res.render("home", {
        title:"Home",
        headingInfo: "Home page",
        dynamicContent: "something",
        listings: listingModel.getallListings()
    });
})

router.get("/registration", (req,res) => {
    
    res.render("registration", {
        title:"Registration",
        headingInfo: "Registration Page",
        dynamicContent: "something"
    });
})

router.get("/login", (req,res) => {
    
    res.render("login", {
        title:"Log In",
        headingInfo: "Log In Page",
        dynamicContent: "something"
    });
})

router.post("/registration",(req,res)=>{
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

router.post("/login",(req,res)=>{
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

router.get("/", (req,res) => {
    
  res.render("about", {
      title:"About",
      headingInfo: "About",
      dynamicContent: "something"
  });
})

module.exports=router;
