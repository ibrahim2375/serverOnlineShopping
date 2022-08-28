const Admin = require('../../../../models/Admin');
const express = require('express');
const session = require('express-session');
const router = express.Router();
//middlewares 
const authenticateAdmin = require('../../../../middlewares/authenticateAdmin');
router.get('/:id', authenticateAdmin, async (req, res) => {
    res.render('Admin/Profile/profile.ejs', { admin: req?.session?.admin });
});

module.exports = router;