var express = require('express');
var router = express.Router();
const{isLoggedIn} = require('../middleware/protectors');
const {getRecentPosts, getPostById, getCommentsForPostsById} = require('../middleware/posts');

/* GET home page. */
router.get("/", getRecentPosts, function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Aleia Natividad" });
});

router.get("/login", function(req, res, next) {
  res.render('login', { title: 'Login Page'});
});

router.get("/postimage", isLoggedIn, function(req, res, next) {
  res.render('postimage', { title: 'Post an Image'});
});

router.get("/registration", function(req, res, next) {
  res.render('registration', { title: 'Register with Us'});
});

router.get("/posts/:id(\\d+)", getPostById, getCommentsForPostsById, function(req, res, next) {
  res.render('viewpost', { title: 'View Post'});
});



module.exports = router;
