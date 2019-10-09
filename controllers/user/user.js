
'use strict'
const User = require('../../models/user')

function createUser(req, res){
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email,
        type: req.body.type
    })

    user.avatar = user.gravatar()

    user.save()
    .then(data => {
        res.send(data)
        res.end()
    })
    .catch(err => {
        res.send(err)
        res.end()
    })  
}

function loginUser(req, res){
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.send({ message: `Error al ingresar: ${err}` , err: 1})
        if (!user) return res.send({ message: `No existe el usuario con email ${req.body.email}` , err: 1})
       
        return user.comparePassword(req.body.password, (err, isMatch) => {
          if (err) return res.send({ message: `Error al ingresar: ${err}` , err: 1})
          if (!isMatch) return res.send({ message: `Contraseña incorrecta!`, err:1 })

          req.session._id = user._id
          req.session.emailUser = user.email
          req.session.firstName = user.firstName
          req.session.lastName = user.lastName
          req.session.avatar = user.avatar

          return res.status(200).send({ message: 'Te has logueado correctamente', ok: 1})
        });
    
    }).select('_id firstName lastName avatar email type + password');
}

function logoutUser(req, res){
    req.session.destroy();
    res.send({message: 'Ha cerrado sesion', ok: 1})
    res.end()
}

function getUserData(req, res){
    User.findById(req.session._id)
    .then(data=>{
      res.send(data);
      res.end()
    })
    .catch(err=>{
      res.send(err);
      res.end()
    });
}

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    getUserData
}