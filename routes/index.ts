import express from 'express';
import Contacts from '../models/user'
import Contact = core.Contact;
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', page: 'home', displayName: ''});
});
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home', page: 'home', displayName: ''});
});
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Home', page: 'home', displayName: ''});
});
router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact Page', page: 'contact', displayName: '' });
});
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About Page', page: 'about', displayName: ''  });
});
router.get('/products', function(req, res, next) {
  res.render('index', { title: 'Products Page', page: 'products', displayName: ''  });
});
router.get('/register', function(req, res, next) {
  res.render('index', { title: 'Register', page: 'register', displayName: ''  });
});
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login', page: 'login', displayName: ''  });
});
router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services Page', page: 'services', displayName: ''  });
});
router.get('/edit', function(req, res, next) {
  res.render('index', { title: 'Add Page', page: 'edit', contact: {}, displayName: ''  });
});
router.get('/edit/:id', function(req, res, next) {

  Contacts.findById(req.params.id).then(function(foundContact){
    console.log("FOUND OBJECT: " + foundContact);
    res.render('index', { title: 'Edit Page', page: 'edit', contact: foundContact, displayName: '' });
  }).catch(function(err){
    console.log(`Couldn't find Contact with ID ${req.params.id}`);
  })
});

router.post('/edit', function(req, res, next) {
  // let newContactToAdd = new Contact(req.body.fullName, req.body.contactNumber, req.body.emailAddress);
  // console.log(newContactToAdd);
  console.log(req.body);
  res.send("CHECK console");
});

router.get('/contact-list', function(req, res, next) {

  Contacts.find().then(function(foundContacts){
    res.render('index', { title: 'Contact List', page: 'contact-list', contacts: foundContacts, displayName: ''  });

  }).catch(function(err){
    console.log(`Failed to retrieve Contacts | ${err}`);
    res.end()
  })
});

export default router;
