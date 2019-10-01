function authenticate(req, res, next){
    if(req.session.email){
        return next()
    }else{
        res.redirect('login.html')
    }
}

module.exports = authenticate