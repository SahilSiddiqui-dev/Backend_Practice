const express = require('express');
const router = express.Router();

let students = [
    {
        name: "sahil",
        contact_No : 7864923213,
        email: "sahil@gmail.com"
    },
    {
        name : "naman",
        contact_No : 8921831821,
        email: "naman@gamil.com"
    },
    {
        name : "mohit",
        contact_No : 1621612784,
        email : "mohit@gmail.com"
    }
]

router.get('/', (req, res) => {
    res.json({students : students});
})

module.exports = router;