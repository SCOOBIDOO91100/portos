const express = require("express");
const multer  = require('multer');
const router = express.Router();
const Database = require('../models/database');
const Project = require('../models/projectModel');
const Contact = require('../models/contactModel');

const db = new Database();

//configuration de mutler
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })
var upload = multer({ storage: storage })



//Afficher la page admin.ejs à l'url /admin
router.get('/admin', (req,res) => {
    res.render('admin.ejs');
});


//Afficher la page admin_contacts à l'url /admin/contacts
router.get('/admin/contacts', (req,res) => {
    Contact.find((err, contacts) => {
        console.log(contacts)
        res.render('admin_contacts', {contacts: contacts});
    }) 
});


//Afficher la page admin_projects.ejs à l'url /display-post
router.get('/admin/display-post', (req, res) => {
    Project.find((err, projects) => {
        res.render('admin_projects', {projects: projects});
    })
});


//Afficher la page /admin/display-post ou se fera la suppression d'un projet
router.get('/admin/delete', (req, res) => {
    Project.findById({ _id: req.body.id}).then((response) => {
       res.redirect('/admin/display-post')
    })
});


//Afficher la page admin_edit à /admin/edit/ par son id
router.get('/admin/edit/:_id', (req, res) => {
    const id = req.params._id;
    Project.findById(id, (err, project) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.render('admin_edit', {project : project});
    })
});


//-----------------------------------------------------------


//Supprimer les projets de /display-post
router.post('/admin/delete', (req, res) => {
    Project.deleteOne({ _id: req.body.id}).then((response) => {
       res.redirect('/admin/display-post')
    })
});


//Creer un projet et le rediriger vers l'url / quand on a submit
router.post('/admin/create-project', upload.single('image'), (req,res) => {
    const project = new Project(req.body);
    project.image = req.file.filename;
    project.save (err => {
        if(err) {
            res.send(err);
        }
        res.redirect('/');
    })
});


//Rediriger vers l'url /admin/edit quand on a submit un projet par son id à l'url /admin/edit 
 router.post('/admin/edit', (req, res) => {
     console.log(req.body)
     Project.findByIdAndUpdate(req.body.id, {$set:req.body}, (err, result) => {
         console.log(result)
         res.redirect('/admin/edit/' + req.body.id)
     })
 });


module.exports = router;