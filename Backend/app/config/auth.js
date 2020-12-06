module.exports = {
    ensureAuthentication: function(req,res,next) {
        if(req.isAuthenticated()) {
            return next();
        }
        //TODO Error Message an Frontend übergeben ("Please log in to view this site");
    }
}