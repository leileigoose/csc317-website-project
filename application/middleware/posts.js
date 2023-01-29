//Get's all the recent posts and put it on home page

const db = require('../conf/database');

module.exports = {
    getRecentPosts : function(req, res, next) {
        //id embedded in HTML
        //LIMIT # - Show only # of pics
        //ORDER BY ____ - Order the photos by date, id, etc
        db.query('SELECT id, title, thumbnail from posts ORDER BY createdAt DESC LIMIT 9;')
            .then(function([results, fields]) {
                if (results && results.length > 0) {
                    res.locals.results = results;
                }    
                next();
            })
            .catch(err=> next(err));
    }, 

    getPostById: function(req, res, next) {
        let postID = req.params.id;
        let baseSQL = `
        SELECT p.id, p.title, p.description, p.image, p.createdAt, u.username
        FROM posts p 
        JOIN users u
        ON p.foreignkey_authorid=u.id
        WHERE p.id=?;
        `;
        db.query(baseSQL, [postID])
            .then(function([results, fields]){
                //MAKE SURE ID EXISTS
                //GIVE 404 if image does not exits
                if (results && results.length == 1) {
                    res.locals.currentPost = results[0];
                }
                next();
            })
    }, 

    getCommentsForPostsById: function(req, res, next) {
        console.log("Running getCommentsForPostsById");
        let postID = req.params.id;
        let baseSQL = `
        SELECT c.id, c.text, c.createdAt, u.username
        FROM comments c
        JOIN users u
        ON c.fk_authorid=u.id
        WHERE fk_postid=?; `;
        db.execute(baseSQL, [postID])
            .then(function([results, fields]){
                res.locals.currentPost.comments = results;
                next();
            })
            .catch(err => next(err))
    }
};
