'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    avatar: String,
    type: String,
    email: {type: String , unique: true, lowercase: true},
    password: {type: String, select: false},
    signupDate: {type: Date, default: Date.now()}
})

userSchema.pre('save', function (next){
    let user = this
    if(!user.isModified('password')) // si el usuario no ha modificado el password
        //no encriptar
        return next() //next middleware

    //Encriptacion, usar salt(tecnica criptologica que generan datosAleatorios como entrada adicional al password)
    bcrypt.genSalt(10, (err, salt)=>{
        if(err) return next()

        bcrypt.hash(user.password, salt, null, (err, hash)=>{
            if(err) return next()

            user.password = hash
            next()
        })
    })

})

//Methods mongoose
userSchema.methods.gravatar = function(){ //generar un avatar aleatorio con gravatar
    if (!this.email) 
        return  `https://gravatar.com/avatar/?s=200&d=retro`

    // por defecto gravatar usa md5 en sus url para generar el avatar
    const md5 = crypto.createHash('md5').update(this.email).digest('hex')

    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`

}

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      cb(err, isMatch)
    });
}

module.exports = mongoose.model('users', userSchema)