const express = require('express');
const app = express();

app.use(express.json());

let candidates = [
    {
        id: 1,
        name: "Alice Johnson",
        votes: 0
    },
    {
        id: 2,
        name: "Bob Smith",
        votes: 0
    },
    {
        id: 3,
        name: "Charlie Brown",
        votes: 0
    }
];

app.get('/candidates', (req, res) => {
    res.status(200).json({message : "All candidates retrieved successfully",
        candidates : candidates
    })
})

app.post('/vote', (req, res) => {
    const candidateId = req.body.candidateId;
    if(candidateId=== undefined){
        return res.status(400).json({message : "candidateId is required"});
    }
    const candidate = candidates.find(s => s.id == candidateId);
    if(!candidate){
        return res.status(404).json({message : "Candidate not found"})
    }
    candidate.votes++;
    res.status(200).json({message : "Vote cast successfully"});
})

app.get('/result', (req, res) => { 
    const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);
    const result = candidates.map(c => ({
        id: c.id,
        name: c.name,
        votes: c.votes
    }))
    res.status(200).json({message : "Voting result",
        result: result
    });
})




app.listen(8000, () => {
    console.log("server started at http://localhost:8000");
})