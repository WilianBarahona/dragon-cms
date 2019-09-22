'use strict'
const express = require('express');
const fileUpload = require('express-fileupload')
const database = require('./modules/database')

const app = express();

//Carpeta publica
app.use(express.static("private"));

//Middlewares
app.use(fileUpload())

app.listen(3333, function(){
    console.log("Servidor levantado");
});

app.post('/upload',(req,res) => {
    let file = req.files.file
    let categoria = ''
    let ruta = './private/files-bank'
    let img = ['image/jpeg','image/png','image/svg+xml']
    let video = ['video/3gpp','video/mp4']
    let text = ['text/plain', 'text/csv', 'text/html']
    let audio = ['audio/wave', 'audio/wav', 'audio/ogg', 'audio/mpeg3']
    let word = ['application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    let archive = ['application/zip','application/x-rar-compressed']
    let  mimeType = file.mimetype

    //Image
    img.forEach(img => {
        if(img == mimeType){
            categoria = 'image'
            ruta = `${ruta}/images/${file.name}`
        }
    });

    //Video
    video.forEach(video => {
        if(video == mimeType){
            categoria = 'video'
            ruta = `${ruta}/videos/${file.name}`
        }
    });

    //Audio
    audio.forEach(audio => {
        if(audio == mimeType){
            categoria = 'audio'
            ruta = `${ruta}/audios/${file.name}`
        }
    });

     //Word
     word.forEach(word => {
        if(word == mimeType){
            categoria = 'word'
            ruta = `${ruta}/word/${file.name}`
        }
     });

    //Text
    text.forEach(text => {
        if(text == mimeType){
            categoria = 'text'
            ruta = `${ruta}/text/${file.name}`
        }
    });

    //Compressed
    archive.forEach(archive => {
        if(archive == mimeType){
            categoria = 'compressed'
            ruta = `${ruta}/compressed/${file.name}`
        }
    });

    //PDF
    if(mimeType == 'application/pdf'){
        categoria = 'pdf'
        ruta = `${ruta}/pdf/${file.name}`
    }

    if(categoria == ''){
        categoria = 'others'
        ruta = `${ruta}/others/${file.name}`
    }

    switch(categoria){
        case 'image':
            file.mv(ruta ,err => {
                if(err) return res.status(500).send({ message : err })
                return res.status(200).send({message:'uploaded image'})
            })
            break
        case 'video':
            file.mv(ruta ,err => {
                if(err) return res.status(500).send({ message : err })
                return res.status(200).send({message:'uploaded video'})
            })
            break
        case 'audio':
            file.mv(ruta ,err => {
                if(err) return res.status(500).send({ message : err })
                return res.status(200).send({message:'uploaded audio'})
            })
            break
        case 'word':
            file.mv(ruta ,err => {
                if(err) return res.status(500).send({ message : err })
                return res.status(200).send({message:'uploaded docx'})
            })
            break
        case 'text':
            file.mv(ruta ,err => {
                if(err) return res.status(500).send({ message : err })
                return res.status(200).send({message:'uploaded text'})
            })
            break
        case 'compressed':
            file.mv(ruta ,err => {
                if(err) return res.status(500).send({ message : err })
                return res.status(200).send({message:'uploaded compressed'})
            })
            break
        case 'pdf':
            file.mv(ruta ,err => {
                if(err) return res.status(500).send({ message : err })
                return res.status(200).send({message:'uploaded pdf'})
            })
            break
        case 'others':
            file.mv(ruta ,err => {
                if(err) return res.status(500).send({ message : err })
                return res.status(200).send({message:'uploaded others'})
            })
            break
    }
})