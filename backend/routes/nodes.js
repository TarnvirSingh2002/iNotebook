const express= require('express');
const router=express.Router();
const fetchUser=require("../middleware/fetchUser");
const Notes=require("../models/Notes");
const {body, validationResult } = require('express-validator');


//Get all the notes using GET:"api/auth/getuser",Login required
router.get('/fetchallnotes',fetchUser,async(req,res)=>{
    try {
        const notes=await Notes.find({user:req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    } 
})

//Fetch all the notes by using POST:"api/auth/addnote"
router.post("/addnote",fetchUser,[
    body('title',"Enter a valid Title").isLength({min:3}),
    body('description',"Description must be atleast 5 characters").isLength({min:5})
  ],async(req,res)=>{
    try {
        const {title,description,tag}=req.body;
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            res.send(400).json({errors:errors.array()});
        }
        const data=await Notes.create({
            title, description, tag, user :req.user.id
        })
        res.send(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error 2");      
    }

})

//Get update the User Details using PUT:"/auth/login/updatenote"
router.put('/updatenote/:id',fetchUser,async (req, res) => {
    const {title,description,tag}=req.body;

    //Create a newnote object
    const newnote={};
    if(title){
        newnote.title=title
    };
    if(description){
        newnote.description=description
    };
    if(tag){
        newnote.tag=tag
    };

    //Find the note to be updated and update it
    let note= await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("File not found!");
    }
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not allowed");
    }
    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
    res.json({note});

})

//Delete an existing data by using DELETE:"/auth/login/deletenote" login required
router.delete('/deletenote/:id',fetchUser,async (req, res) => {
    const {title, description, tag}=req.body;
    //Find the note to delete
    let note= await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("File not found!");
    }

    //Allow deletion only if user owns this Notes
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not allowed");
    }
    note= await Notes.findByIdAndDelete(req.params.id);
    res.json({note});
    
})
module.exports=router