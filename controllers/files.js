'use strict'
const File = require('../models/files')
const mt = require('media-thumbnail')

function getFile(req, res){
    File.findById(req.params.id)
    .then(data => {
        res.send(data)
        res.end()
    })
    .catch(err => {
        res.send(err)
        res.end()
    })
}

function getFiles(req, res){
    File.find()
    .then(data => {
        res.send(data)
        res.end()
    })
    .catch(err => {
        res.send(err)
        res.end()
    })
}

function updateFile(req, res){
    File.updateOne(
        {   _id: req.params.id},
        {
            name: req.body.name,
            url: req.body.url,
            description: req.body.description,
            category: req.body.category,
            date: req.body.date,
            mimeType: req.body.mimeType,
            size: req.body.size,
            thumbnail: req.body.thumbnail,
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

function deletFile(req, res){
    File.deleteOne({_id: req.params.id})
    .then(data =>{
        res.send(data)
        res.end()
    })
    .catch(err => {
        res.send(err)
        res.end()
    })
}

function createFile(req, res){
    if (req.files == null) 
        return res.send({message: "Seleccione un archivo", err: 1})

    let file = req.files.file
    let  mimeType = file.mimetype //mimeType => tipo de archivo a subir

    let ruta = './private/files-bank' // ruta donde guardar
    let url = `/files-bank/` //url para acceder al archivo 
    let categoria = ''

    let files = {
        img:     ['image/jpeg','image/png','image/svg+xml'],
        video:   ['video/3gpp','video/mp4'],
        text:    ['text/plain', 'text/csv', 'text/html'],
        audio:   ['audio/wave', 'audio/wav', 'audio/ogg', 'audio/mpeg3'],
        word:    ['application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        archive: ['application/zip','application/x-rar-compressed'],
    }

    //Image
    files.img.forEach(img => {
        if(img == mimeType){
            categoria = 'image'
            ruta = `${ruta}/images/${file.name}`
            url = `${url}/images/${file.name}`
        }
    });

    //Video
    files.video.forEach(video => {
        if(video == mimeType){
            categoria = 'video'
            ruta = `${ruta}/videos/${file.name}`
            url = `${url}/videos/${file.name}`
        }
    });

    //Audio
    files.audio.forEach(audio => {
        if(audio == mimeType){
            categoria = 'audio'
            ruta = `${ruta}/audios/${file.name}`
            url = `${url}/audios/${file.name}`
        }
    });

     //Word
     files.word.forEach(word => {
        if(word == mimeType){
            categoria = 'word'
            ruta = `${ruta}/word/${file.name}`
            url = `${url}/word/${file.name}`
        }
     });

    //Text
    files.text.forEach(text => {
        if(text == mimeType){
            categoria = 'text'
            ruta = `${ruta}/text/${file.name}`
            url = `${url}/text/${file.name}`
        }
    });

    //Compressed
    files.archive.forEach(archive => {
        if(archive == mimeType){
            categoria = 'compressed'
            ruta = `${ruta}/compressed/${file.name}`
            url = `${url}/compressed/${file.name}`
        }
    });

    //PDF
    if(mimeType == 'application/pdf'){
        categoria = 'pdf'
        ruta = `${ruta}/pdf/${file.name}`
        url = `${url}/pdf/${file.name}`
    }

    if(categoria == ''){
        categoria = 'others'
        ruta = `${ruta}/others/${file.name}`
        url = `${url}/others/${file.name}`
    }

    switch(categoria){
        case 'image':
            file.mv(ruta ,err => {
                if(err) return res.status(500).send({ message : err , err: 1})
                saveFile(res, req, file, categoria, url)
            })
            break
        case 'video':
            file.mv(ruta ,err => {
                if(err) return res.status(500).send({ message : err , err: 1})
                 saveFile(res, req, file, categoria, url)
            })
            break
        case 'audio':
            file.mv(ruta ,err => {
                if(err) return res.status(500).send({ message : err , err: 1})
                 saveFile(res, req, file, categoria, url)
            })
            break
        case 'word':
            file.mv(ruta ,err => {
                if(err) return res.status(500).send({ message : err , err: 1})
                 saveFile(res, req, file, categoria, url)
            })
            break
        case 'text':
            file.mv(ruta ,err => {
                if(err) return res.status(500).send({ message : err , err: 1})
                 saveFile(res, req, file, categoria, url)
            })
            break
        case 'compressed':
            file.mv(ruta ,err => {
                if(err) return res.status(500).send({ message : err , err: 1})
                 saveFile(res, req, file, categoria, url)
            })
            break
        case 'pdf':
            file.mv(ruta ,err => {
                if(err) return res.status(500).send({ message : err , err: 1})
                 saveFile(res, req, file, categoria, url)
            })
            break
        case 'others':
            file.mv(ruta ,err => {
                if(err) return res.status(500).send({ message : err , err: 1})
                 saveFile(res, req, file, categoria, url)
            })
            break
    }
}

function saveFile(res, req, file, categoria, ruta){
    let thumbnail = ''
    let thumbnailUrl = `/files-bank/videos/thumbnails/tb-${file.name}.png`
   
    File.find({name: file.name})
    .then(data =>{
       if(data.length != 0) return res.send({message: 'El archivo ya existe', err: 1})
       let fs = new File({
                name: file.name,
                url: ruta,
                description: req.body.description,
                category: categoria,
                mimeType: file.mimetype,
                size: file.size,
                thumbnail: thumbnailUrl
            })
    
        if(categoria == 'video'){
            thumbnail = `./private/files-bank/videos/thumbnails/tb-${file.name}.png`
            mt.forVideo(
                `./private/files-bank/videos/${file.name}`,
                    thumbnail,{
                    width: 200
                }).then(()=>{
                    fs.save()
                    .then(file=>{
                        res.send(file)
                        res.end()
                    })
                    .catch(err=>{
                        res.send(err)
                        res.end()
                    })
                })
            }else{
                fs.save()
                .then(file=>{
                    res.send(file)
                    res.end()
                })
                .catch(err=>{
                    res.send(err)
                    res.end()
                })
            }
    })
    .catch(err => {
        res.send(err)
        res.end()
    }) 
}

module.exports = {
    getFile,
    getFiles,
    updateFile,
    deletFile,
    createFile
}