const express = require('express');
const app = express();
const router = express.Router();

router.get('/area', (req, res) => {
    const length = req.query.length;
    const width = req.query.width;
    if(!length || !width) {
        return res.status(404).send("length or width is not found");
    }
    const area = length * width;
    return res.json({area : area});
})

router.get('/parameter', (req, res) => {
    const length = req.query.length;
    const width = req.query.width;
    if(!length || !width) {
        return res.status(404).send("length or width is not found");
    }
    const parameter = 2*(length + width);
    return res.json({parameter : parameter});
})

module.exports = router;