const express = require("express");
const router = express.Router();
const Database = require('../models/database');
const Project = require('../models/projectModel');


//je connecte ma database à la route admin
const db = new Database();


//GET
router.get('/auth', (req, res) => {
    res.render('auth.ejs');
});

module.exports = router;