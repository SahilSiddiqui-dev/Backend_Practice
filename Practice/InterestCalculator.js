const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/simple-interest', (req, res) => {
    
    const { principal, rate, time } = req.body;
    const isValid = (val) => typeof val !== 'number' && isNaN(val) && val < 0;

    if(isValid(principal) && isValid(rate) && isValid(time)){
        const simpleInterest = (principal*rate*time)/100;
        return res.status(200).json({"calculated Interest" : simpleInterest})
    }

    else {
        return res.status(400).json({message : "Please provide valid input"})
    }
    
})

app.listen(8000,() => {
    console.log("server running at http://localhost:8000");
})