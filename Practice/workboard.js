const express = require('express');
const app = express();

app.use(express.json());

let tasks = [
    {
        id: 1,
        title: "Set up project repository",
        status: "completed"
    },
    {
        id: 2,
        title: "Implement authentication middleware",
        status: "in-progress"
    },
    {
        id: 3,
        title: "Write unit tests for workboard",
        status: "pending"
    }
];

// Helper to keep IDs continuous and avoid collision
const getNextId = () => tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

app.get('/api/tasks', (req, res) => {
    return res.status(200).json({
        message: "Tasks retrieved successfully",
        tasks: tasks
    });
});

app.post('/api/tasks', (req, res) => {
    const title = req.body.title;
    const status = req.body.status;
    const allowed_status = ['pending', 'in-progress', 'completed'];
    const isValidStatus = (status) => typeof status === 'string' && allowed_status.includes(status.trim().toLowerCase());
    const isValidTitle = (title) => typeof title === 'string' && title.trim() > 0; 
    if(!isValidStatus(status) || !isValidTitle(title)) {
        return res.status(400).json({message : "Please provide valid task details"});
    }
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1: 1;
    const newTask = {
        id: newId,
        title: title.trim(),
        status: status.trim().toLowerCase()
    }

    tasks.push(newTask);
    res.status(201).json(tasks);

})

app.patch('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if(!task) {
        return res.status(404).json({message : "Task not found"});
    }
    

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});