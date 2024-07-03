import express from 'express';
import Contacts from '../models/user'
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
  res.render('index', { title: 'Edit Page', page: 'edit', displayName: ''  });
});
router.get('/contact-list', function(req, res, next) {
  Contacts.find().then(function(contacts){
    console.log(`Found Documents: ${contacts}`);
  }).catch(function(err){
    console.log(`Failed to retrieve Contacts | ${err}`);
    res.end()
  })

  //res.render('index', { title: 'List of Contacts', page: 'contact-list', displayName: '' });
});

export default router;
