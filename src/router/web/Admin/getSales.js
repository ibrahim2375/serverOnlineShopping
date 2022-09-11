const Sales = require('../../../../models/Sales');
const express = require('express');
const router = express.Router();
const authenticateAdmin = require('../../../../middlewares/authenticateAdmin');
router.get('/', authenticateAdmin, async (req, res) => {
    await Sales.find().then((result) => {
        res.status(200).send(result);
    }).catch((error) => { res.status(200).send("no sales"); })
})
module.exports = router