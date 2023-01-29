var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const UserError = require('../helpers/error/UserError');
const db = require('../conf/database');


//Method: POST
//localhost:3000/users/registration
router.post('/register', function(req, res, next) {
   const {username, email, password} = req.body;

   //Server side validation

   //check for duplicates
    db.query('select id from users where username=?', [username])
        .then(function([results, fields]){ 
            if (results && results.length == 0) {
                return db.query('select id from users where email=?', [email]);
            }else{
                throw new Error('Username already exists!');
            }
        }).then(function([results, fields]){
            if (results && results.length == 0) {
                return bcrypt.hash(password, 2);
            }else{
                throw new Error('Email already exists!');
            }
        }).then(function(hashedPassword){
            return db.query('insert into users (username, email, password) value (?, ?, ?)', [username, email, hashedPassword]);

        }).then(function([results, fields]){
            if (results && results.affectedRows == 1) {
                res.redirect('/login');
                return;
            }else{
                throw new Error('User could not be made');
            }
        }).catch(function(err){
            res.redirect('/registration');
            next(err);
        });
    //insert into database

    //respond
});

router.post("/login", function (req, res, next) {
    const {username, password} = req.body;
    let loggedUsername;
    let logggedUserId;

    db.query('select id, username, password from users where username=?', [username])
        .then (function([results, fields]) {
            if (results && results.length == 1) {
                logggedUserId = results[0].id;
                loggedUsername = results[0].username;
                let dbPassword = results[0].password;
                return bcrypt.compare(password, dbPassword);
            } else {
                throw new UserError('Failed login. Invalid username or password', "/login", 200);
            }
        }).then (function(passwordsMatched) {
            if (passwordsMatched) {
                req.session.userId = logggedUserId;
                req.session.username = loggedUsername;
                req.flash("success", 'You are now logged in!');
                req.session.save(function(saveErr) {
                    res.redirect('/'); 
                })
            }
            else {
                throw new UserError('Failed login. Invalid user credentials', "/login", 200);
            }
        }).catch (function(err) {
            if(err instanceof UserError) {
                req.flash("error", err.getMessage());
                req.session.save(function(saveErr){
                    res.redirect(err.getRedirectURL());
                })
            }else {
                next(err);
            }
        });
});


router.post('/logout', function(req, res, next) {
    req.session.destroy(function(destroyError) {
        if(destroyError) {
            next(err);
        } else {
            res.json({
                status:200,
                message:"You are now logged out"
            });
        }
    })
});

module.exports = router;
