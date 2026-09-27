const express = require('express');
const app = express();

app.use(express.json());

let polls = [
    {
        id: 1,
        question: "Which language do you prefer?",
        options: [
            {
                id: 1,
                text: "JavaScript",
                votes: 0
            },
            {
                id: 2,
                text: "Python",
                votes: 0
            },
            {
                id: 3,
                text: "Java",
                votes: 0
            }
        ]
    },
    {
        id: 2,
        question: "Which OS do you use?",
        options: [
            {
                id: 1,
                text: "Windows",
                votes: 0
            },
            {
                id: 2,
                text: "Linux",
                votes: 0
            }
        ]
    }
];

// get all polls
app.get('/api/polls', (req, res) => {
    return res.status(200).json({
        message: "Polls retrieved successfully",
        polls: polls,
        }
    );
   
    
})

app.get('/api/polls/:id', (req, res) => {
    const Id = parseInt(req.params.id);
    const poll = polls.find(s => s.id == Id);
    if(!poll){
        return res.status(404).json({message: "Poll not found"});
    }
    res.status(200).json(poll);
    
})

app.post('/api/vote', (req, res) => {

    const {pollId, optionId} = req.body;
    
    if (pollId === undefined || optionId === undefined) {
        return res.status(400).json({message: "poll and option are required"});
    }

    const poll = polls.find(s => s.id == pollId);
    if (!poll) {
        return res.status(404).json({message: "poll not found"});
    }

    const option = poll.options.find(s => s.id == optionId);
    if (!option) {
        return res.status(400).json({message: "invalid option"});
    }

    option.votes++;
    return res.status(200).json(poll);
})

app.get('/api/polls/:id/results', (req, res) => {
    const id = parseInt(req.params.id);
    const poll = polls.find(s => s.id == id);
    if(!poll) {
        return res.status(400).json({message : 'Not found'});
    }
    const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
    return res.status(200).json({
        pollId : poll.id,
        question : poll.question,
        totalResponse : totalVotes,
        options : poll.options
    });
})




app.listen(3000, () => {
    console.log("Server is running http://localhost:3000");
})
