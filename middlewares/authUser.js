function authenticateUser(req, res, next){
    if(!req.session.email){
        res.redirect('/login')
    }else{
        next()
    }
   // next()
}

module.exports = authenticateUser