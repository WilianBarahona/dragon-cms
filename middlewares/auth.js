function authenticateUser(req, res, next){
    if(!req.session.email){
        res.redirect('/admin/login')
    }else{
        next()
    }
}

module.exports = authenticateUser