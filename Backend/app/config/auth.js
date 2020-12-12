module.exports = {
    ensureAuthentication: function(req,res,next) {
        if(req.isAuthenticated()) {
            next();
        }else {
            res.json(401, {message: "You are not authenticated to view this site!"});
        }
    }
}