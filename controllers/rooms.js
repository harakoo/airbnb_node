const express = require('express')
const router = express.Router();
const roomModel  = require("../models/UploadRoom");


router.get("/add",(req,res)=>
{
    res.render("rooms/roomAddForm");
});

router.post("/add",(req,res)=>
{
        const newRoom = {
            title : req.body.title,
            description : req.body.description,
            price : req.body.price,
            location: req.body.location,
            photo: req.body.photo,
            dateCreated: req.body.dateCreated
        }

     const room =  new roomModel(newRoom);
     task.save()
     .then(()=>{
         res.redirect("/room/list")
     })
     .catch(err=>console.log(`Error happened when inserting in the database :${err}`));
});

router.get("/list",(req,res)=>
{

    roomModel.find()
    .then((rooms)=>{

  
        const filteredRooms =   rooms.map(room=>{

                return {
                    id: room._id,
                    title:room.title,
                    description:room.description,
                    price :room.price,
                    dateCreated: room.dateCreated,
                    location: room.location,
                    photo: room.photo
                }
        });



        res.render("rooms/roomDashboard",{
           data : filteredRooms
        });

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));

    
  
});




// Route to direct user to the task profile page
router.get("/description",(req,res)=>{

    

})


router.get("/edit/:id",(req,res)=>{

    taskModel.findById(req.params.id)
    .then((task)=>{

        const {_id,title,description,dueDate,priority,status} = task;
        res.render("Task/taskEditForm",{
            _id,
            title,
            description,
            dueDate,
            priority,
            status  
        })

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));


})



router.put("/update/:id",(req,res)=>{

    const task =
    {
        title:req.body.title,
        description:req.body.description,
        dueDate:req.body.dueDate,
        status:req.body.status,
        priority:req.body.priority
    }

    taskModel.updateOne({_id:req.params.id},task)
    .then(()=>{
        res.redirect("/task/list");
    })
    .catch(err=>console.log(`Error happened when updating data from the database :${err}`));


});


router.delete("/delete/:id",(req,res)=>{
    
    taskModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.redirect("/task/list");
    })
    .catch(err=>console.log(`Error happened when updating data from the database :${err}`));

});



module.exports=router;