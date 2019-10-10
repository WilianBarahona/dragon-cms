function authenticateUser(req, res, next){
    if(!req.session.emailUser){
        res.redirect('/login')
    }else{
        next()
    }
}

module.exports = authenticateUser