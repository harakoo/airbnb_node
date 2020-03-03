const express = require('express')
const router = express.Router();

// Import Fake DB
const listingModel = require("../models/listings");
const roomModel = require("../models/room");

//Setting up router
router.get("/", (req,res) => {
    
    res.render("home", {
        title:"Home",
        headingInfo: "Home page",
        dynamicContent: "something",
        listings: listingModel.getallListings()
    });
})

router.get("/listing", (req,res) => {
    
    res.render("listing", {
        title:"Rental Listing",
        headingInfo: "Rental Listings Page",
        dynamicContent: "something",
        room: roomModel.getallRooms()
    });
})

router.get("/dashboard", (req,res) => {
    
  res.render("dashboard", {
      title:"User Dashboard",
      headingInfo: "User Information Page",
      dynamicContent: "something"
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
  };

  const {firstName,lastName,email,phone} = req.body;
  
  const accountSid = 'AC1d8c8e1b23c5759a4f363c8b28b380dd';
  const authToken = 'ace4562a20527535cecea159508cb4a7';
  const client = require('twilio')(accountSid, authToken);

  client.messages
    .create({
      body: 'Welcome to AirBnb!',
      from: '+12017013064',
      to: `${phone}`
    })
    .then(message => console.log(message.sid));

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey("");
    const msg = {
    to: `haileykwon8@gmail.com`,
    from: `${email}`,
    subject: 'Welcome to AirBnb',
    html: 
    `Hello ${firstName} ${lastName} <br>
     Below is your registration information <br>
     Users's Email Address ${email} <br>
     Users's Phone number : ${phone}<br>
    `,
    };

    //Asynchornous operation 
    sgMail.send(msg)
    .then(()=>{
        res.redirect("/dashboard");
    })
    .catch(err=>{
        console.log(`Error ${err}`);
    });
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
