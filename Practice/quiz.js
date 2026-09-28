const express = require('express');
const app = express();

let questions = [
  {
    id: 1,
    question: "What does the next(err) call do in Express?",
    options: [
      "Restarts the server",
      "Skips to the next error-handling middleware",
      "Moves to the next regular middleware",
      "Sends a 200 OK response"
    ],
    correctAnswer: "Skips to the next error-handling middleware"
  },
  {
    id: 2,
    question: "How many arguments does an Express error-handling middleware function take?",
    options: ["2", "3", "4", "5"],
    correctAnswer: "4"
  }
];
app.get('/quiz', (req, res) => {
  res.json(questions);
});

app.post('/score', (req, res) => {
    const userAnswer = [];
    Answer = req.body.Answer;
    userAnswer.push(Answer);

    const correct = questions.map(c => c.correctAnswer);
    let score = 0;
    for(let i = 0; i < userAnswer.length; i++){
        if(correct.includes(userAnswer[i])){
            score++;
        }
    }
    return res.status(200).json({score : score});
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})