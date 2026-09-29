const mongoose = require("mongoose");
const Teachers = require("./teacherModel.js");
const express = require("express");
const router = express.Router();
const checkRole = require('./role_middleware');

let teachers = [
    {
        id: 1,
        name: "John",
        subject: "Math"
    },
    {
        id : 2,
        name : "Alice",
        subject : "Science"
    },
    {
        id : 3,
        name : "Bob",
        subject : "History"
    },
    {
        id : 4,
        name : "Eve",
        subject : "English"
    }
];

router.use(express.json());

router.get("/", (req, res) => {
    if(teachers){
        return res.status(200).json(teachers);
    }
})

router.delete("/:id", checkRole("admin"), (req, res) => {
   const userId = parseInt(req.params.id);
   const len = teachers.length;
   teachers = teachers.filter(s => s.id !== userId);
   if(len > teachers.length){
    return res.status(200).json({message : "Deleted Teacher Successfully"});
   }
   else {
    return res.status(404).json({message : "Teacher was not found"});
   }
});

router.post("/", checkRole("admin"), async(req, res, next) => {
    try {
        const {name, age, teaches} = req.body;
        const newTeacher = new Teachers({name, age, teaches});

        const savedTeacher = await newTeacher.save();
        res.status(201).json(savedTeacher);
    }

    catch(err) {
        console.log(err);
        next(err);
    }
    // const name = req.body.name;
    // const subject = req.body.subject;
    // if(!name || !subject) return res.status(400).json({message : "Name was not found"});

    // const newTeacher = {
    //     id : teachers.length > 0 ? Math.max(...teachers.map(s => s.id)) + 1 : 1,
    //     name : name,
    //     subject : subject
    // }
    // teachers.push(newTeacher);

    // res.status(201).json({
    //     message : "Successfully Added New Teacher",
    //     Teacher : newTeacher
    // })
    

})

// router.patch("/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     const teacher = teachers.find(t => t.id === id);
//     if(!teacher) return res.status(404).json({message : "Teacher was not found"});
//     teacher.subject = req.body.subject;
//     res.status(200).json({ message : "Skill updated"})

// })

// router.put("/:id", async(req, res) => {
//     try {
//         const id = req.params.id;
//         const teacher = await teachers.find(t => t.id === id);

//     }
//     const teacher = teachers.find(t => t.id === id);
//     if(!teacher) return res.status(404).json({message : "Teacher was not found"});
//     if(!req.body.name || !req.body.subject) {
//         return res.status(404).json({message : "Name OR Subject is not given"});
//     }
//     teacher.name = req.body.name;
//     teacher.subject = req.body.subject;
//     res.status(200).json({message : "Data is Updated"})
// })
app.use((err, req, res, next) => {
    
})

module.exports = router;
