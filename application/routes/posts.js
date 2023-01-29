const express = require('express'); //makes routes
const router = express.Router(); 
const db = require('../conf/database');
const sharp = require('sharp'); //makes thumbnails - image processing
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) { //cb moves file
      cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) { //cb changes file name
        //take off file extention
        let fileExt = file.mimetype.split("/")[1] //image/jpeg --> gets just jpeg
      cb(null, `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}.${fileExt}`);
    }
})

  const upload = multer({storage : storage})

router.post('/create', upload.single("uploadImage"), function(req, res, next){    
    let fileUploaded = req.file.path;
    let thumbnailFile = `thumbnail-${req.file.filename}`;
    let destinationThumbnail = `${req.file.destination}/${thumbnailFile}`;
    const {title, description} = req.body;
    let userId = req.session.userId;
    
    sharp(fileUploaded)
        .resize(200)
        .toFile(destinationThumbnail)
        .then(function() {
            let baseSQL =
            `INSERT INTO posts (title, description, image, thumbnail, foreignkey_authorid) VALUE (?, ?, ?, ?, ?)`;
            return db.query(baseSQL, [title, description, fileUploaded, destinationThumbnail, userId]) //has to be same names from postimage.hbs
        })
        .then(function([results, fields]) { //checck the results of the query statement
            if (results && results.affectedRows) {
                //console.log(results);
                req.flash("success", "Your post was created");
                req.session.save(function(saveErr){
                    res.redirect('/');
                })
            }
        })
        .catch(function(err){
            next(err);
        })

})

//localhost:3000/posts/search
router.get('/search', function(req, res, next){
    let searchTerm = `%${req.query.searchTerm}%`;
    let originalSearchTerm = req.query.searchTerm;
    let baseSQL = 
    `
    SELECT id, title, description, thumbnail, concat_ws(" ", title, description) as haystack
    FROM posts
    HAVING haystack like ?;`;
    db.execute(baseSQL, [searchTerm])
        .then(function([results, fields]){
            res.locals.results = results;
            res.locals.searchValue = originalSearchTerm;
            req.flash("success", `${results.length} results found!`);
            req.session.save(function(saveErr) {
                res.render('index');
            })
        })
});


module.exports = router;