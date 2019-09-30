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
    User.find(req.params.id)
    .then(data => {
        res.send(data)
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
        email: req.body.email
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


function singIn(req, res){
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send({ message: `Error al ingresar: ${err}` , err: 1})
        if (!user) return res.status(404).send({ message: `No existe el usuario con email ${req.body.email}` , err: 1})
    
        return user.comparePassword(req.body.password, (err, isMatch) => {
          if (err) return res.status(500).send({ message: `Error al ingresar: ${err}` , err: 1})
          if (!isMatch) return res.status(404).send({ message: `Contraseña incorrecta!`, err:1 })

          let data = {
              firstName: user.firstName,
              lastName: user.lastName,
              avatar: user.avatar,
              email: user.email
          }

          return res.status(200).send({ message: 'Te has logueado correctamente', data, ok: 1})
        });
    
    }).select('_id firstName lastName avatar email + password');
}


module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    singIn
}