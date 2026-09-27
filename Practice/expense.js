const express = require("express");
const app = express();

let expenses = [
    {
        id: 1,
        title: "Groceries",
        amount: 50,
        category: "Food"
    },
    {
        id: 2,
        title: "Bus Pass",
        amount: 25,
        category: "Transport"
    },
    {
        id: 3,
        title: "Coffee",
        amount: 5,
        category: "Food"
    }
];

let nextId = 4; // Use this to increment and assign unique IDs in POST

app.use(express.json());

app.get('/api/expenses', (req, res) => {
    return res.status(200).json({
        message: "All expenses retrieved successfully",
        expenses: expenses
    });
});

app.post('/api/expenses', (req, res) => {
    const {title,amount,category } = req.body;
    const isInvalidStr = (str) => typeof str !== 'string' || !str.trim();
    const isInvalidNum = (num) => typeof num !== 'number' || isNaN(num) || num <= 0;
    if(isInvalidStr(title) || isInvalidStr(category) || isInvalidNum(amount)){
        return res.status(400).json({message: "Please provide valid expense details"});
    }
    const newID= expenses.length > 0 ? Math.max(...expenses.map(expense => expense.id)) + 1: 1;
    const newExpense = {
        id: newID,
        title : title.trim(),
        amount : amount,
        category : category.trim()
    }

    expenses.push(newExpense);
    res.status(200).json({
        expenses: expenses
    })
})

app.get('/api/expenses/category/:category', (req, res) => {
    const category = req.params.category;
    const filterExpense = expenses.filter(ex => ex.category.toLowerCase() === category.toLowerCase());

    res.status(200).json(filterExpense);
})

app.get('/api/expenses/summary', (req, res) => {
    const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
    const noOfExpenses = expenses.length;
    res.status(200).json({totalAmount: totalAmount, 
        noOfExpenses: noOfExpenses
    })
})

app.delete('/api/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if(!id){
        return res.status(404).json({message : "Expense not found"})
    }
    const newExpense = expenses.filter(e => e.id !== id);
    if(newExpense.length < expenses.length){
        res.status(200).json({message : "successfully deleted"});
    }
    
})
app.listen(8000, () =>  {
    console.log("Server is running http://localhost:8000");
})