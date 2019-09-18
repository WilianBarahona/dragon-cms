var express = require('express');
var fileUpload = require('express-fileupload')
var app = express();

//Exponer una carpeta como publica para archivos estaticos
app.use(express.static("public"));
app.use(fileUpload())

app.listen(3333, function(){
    console.log("Servidor levantado");
});

app.post('/upload',(req,res) => {
    let EDFile = req.files.file
    EDFile.mv(`./public/files-bank/${EDFile.name}`,err => {
        if(err) return res.status(500).send({ message : err })

        return res.status(200).send({ message : 'File upload' })
    })
})