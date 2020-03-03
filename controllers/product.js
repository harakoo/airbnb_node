const express = require('express')
const router = express.Router();

// Import  DB
const roomModel = require("../models/room");

router.get("/listing", (req,res) => {
    
    res.render("listing", {
        title:"Rental Listing",
        headingInfo: "Retal Listings Page",
        dynamicContent: "something",
        room: roomModel.getallRooms()
    });
})
module.exports=router;
