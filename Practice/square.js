const express = require('express');
const router = express.Router();

router.get('/area', (req, res) => {
    const width = req.query.width;
    if(!width) {
        return res.status(404).send("Width is not found");
    }
    const area = width*width;
    return res.json({area : area});
})

router.get('/parameter', (req, res) => {
    const width = req.query.width;
    if(!width) {
        return res.status(404).send("width is not found")
    }
    const parameter = 4*width;
    return res.json({parameter : parameter});
})

module.exports = router;