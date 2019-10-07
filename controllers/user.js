'use strict'
const User = require('../models/user')

function getUser(req, res){
    User.findById(req.params.id)
    .then(data => {
        res.send(data)
        res.end()
    })
    .catch(err => {
        res.send(err)
        res.end()
    })
}

function getUsers(req, res){
    User.find()
    .then(data => {
        res.send(data)
        res.end()
    })
    .catch(err => {
        res.send(err)
        res.end()
    })
    
}

function getUsersNumber(req, res){
    User.find()
    .then(data => {
        res.send({number: data.length})
        res.end()
    })
    .catch(err => {
        res.send(err)
        res.end()
    })
}

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

function updateUser(req, res){
    User.updateOne(
        {_id: req.params.id},
        //$set: actualizar solo ciertos parametros
        {$set:
            {firstName: req.body.firstName,
             lastName: req.body.lastName,
             email: req.body.email
            }
        }
        )
        .then(data => {
            res.send(data)
            res.end()
        })
        .catch(err => {
            res.send(err)
            res.end()
        })
    
}

function deleteUser(req, res){
    User.deleteOne({_id: req.params.id})
    .then(data =>{
        res.send(data)
        res.end()
    })
    .catch(err => {
        res.send(err)
        res.end()
    })
}


function loginUserAdmin(req, res){
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.send({ message: `Error al ingresar: ${err}` , err: 1})
        if (!user) return res.send({ message: `No existe el usuario con email ${req.body.email}` , err: 1})
        if (user.type != 'Admin') return res.send({ message: `No es un usuario administrador` , err: 1})
    
        return user.comparePassword(req.body.password, (err, isMatch) => {
          if (err) return res.send({ message: `Error al ingresar: ${err}` , err: 1})
          if (!isMatch) return res.send({ message: `Contraseña incorrecta!`, err:1 })

          req.session._id = user._id
          req.session.email = user.email
          req.session.firstName = user.firstName
          req.session.lastName = user.lastName
          req.session.avatar = user.avatar

          return res.status(200).send({ message: 'Te has logueado correctamente', ok: 1})
        });
    
    }).select('_id firstName lastName avatar email type + password');
}

function logoutUserAdmin(req, res){
    req.session.destroy();
    res.send({message: 'Ha cerrado sesion', ok: 1})
    res.end()
}

function getUserAdminData(req, res){
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
    getUser,
    getUsers,
    getUsersNumber,
    createUser,
    updateUser,
    deleteUser,
    loginUserAdmin,
    logoutUserAdmin,
    getUserAdminData
}