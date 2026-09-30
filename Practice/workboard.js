const express = require('express');
const app = express();

let tasks = [
  {
    "id": 1,
    "title": "Set up project repository",
    "status": "completed"
  },
  {
    "id": 2,
    "title": "Design REST endpoints",
    "status": "in-progress"
  },
  {
    "id": 3,
    "title": "Write unit tests",
    "status": "pending"
  }
];

app.use(express.json());

app.get('/api/tasks', (req, res) => {
    return res.status(200).json({tasks : tasks})
})

app.post('/api/tasks', (req, res) => {
    const {title, status} = req.body;
    const taskStatus = ["pending", "in-progress", "completed"];
    const isValid = () => typeof title === 'string' && title.trim().length > 0;
    const isValidStatus = () => typeof status === 'string' && status.trim().length > 0 && taskStatus.includes(status);
    
    if(title === undefined || status === undefined){
        return res.status(400).json({message : "title or status is not given, Please provide to add them!!!"})
    }
    if(!isValid(title) || !isValidStatus(status)){
        return res.status(400).json({message : "Please provide valid task details"});
    }

    const newId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;

    const newTask = {
        id : newId,
        title : title.trim(),
        status : status.trim()
    };

    tasks.push(newTask);
    return res.status(201).json({new_Task : newTask});

})

app.patch('/api/tasks/:id', (req, res) => {
    const task_Id = parseInt(req.params.id);
    const status = req.body.status;
    const isValid = () => typeof status === 'string' && status.trim().length > 0;
    if(!isValid(status)){
        return res.status(400).json({message : "provide valid task"});
    }

    const task = tasks.find(t => t.id === task_Id);
    if(task === undefined){
        return res.status(404).json({message : "Not found"})
    }
    task.status = status.trim();
    return res.status(200).json({message : "updated",
        updatedTask : {
            id : task.id,
            title : task.title,
            status : task.status
        }
    });
})



app.listen(3000, () => {
    console.log('started at http://localhost:3000')
})