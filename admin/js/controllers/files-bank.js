$(document).ready(()=>{
    $(".loader").fadeOut(200);
    llenarTodos()  
})   

$('#btn-file-bank-all').click(()=>{
    llenarTodos()
})
$('#btn-file-bank-images').click(()=>{
    limpiarContainer()
    llenarImagenes()
})
$('#btn-file-bank-videos').click(()=>{
    limpiarContainer()
    llenarVideos()
    $('#mt-videos').removeClass('mt-4')
    
})
$('#btn-file-bank-others').click(()=>{
    limpiarContainer()
    llenarOtros()
    $('#mt-others').removeClass('mt-4')
    
})  



function llenarTodos(){
    limpiarContainer()
    llenarImagenes()
    llenarVideos()
    llenarOtros()
    $('#mt-videos').addClass('mt-4')
    $('#mt-others').addClass('mt-4')

}


function llenarImagenes(){
    $('#container-images').html(`
        <div class="col-12">
            <h5>Imagenes</h5>
            <hr>
        </div>
    `)
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "/admin/files-bank/files",
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }

    $.ajax(settings).done((res)=>{
        res.forEach(elem => {
            if(elem.category == 'image'){
                addItemImage(elem)
            }
        });
    })
    
}

function addItemImage(image){
    $('#container-images').append(`
        <div onclick="detalleImagen('${image._id}')" class="col-6 col-md-3 col-lg-2 tarjeta">
            <div class="card card-body">
                <div class="thumbnail">
                    <img src="${image.url}" class="img-card-thumbnail">
                    <i class="fas fa-image fa-1x mt-1 type"></i>
                </div>
            </div>
        </div>
    `) 
}


function llenarVideos(){
    $('#container-videos').html(`
        <div class="col-12">
            <h5>Videos</h5>
            <hr>
        </div>
    `)
    
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "/admin/files-bank/files",
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }

    $.ajax(settings).done((res)=>{
        res.forEach(elem => {
            if(elem.category == 'video'){
                addItemVideo(elem)
            }
        });
    })
    
}


function addItemVideo(video){
    $('#container-videos').append(`
        <div onclick="detalleVideo('${video._id}')" class="col-6 col-md-3 col-lg-2 tarjeta">
            <div class="card card-body">
                <div class="thumbnail">
                    <img src="${video.thumbnail}" class="img-card-thumbnail">
                    <i class="fas fa-video fa-1x mt-1 type"></i>
                </div>
            </div>
        </div>
    `)
}


function llenarOtros(){
    let audio = []
    let word = []
    let text = []
    let compressed = []
    let pdf = []
    let others = []
    $('#container-others').html(`
        <div class="col-12">
            <h5>Others</h5>
            <hr>
        </div>
    `)
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "/admin/files-bank/files",
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }

    $.ajax(settings).done((res)=>{
        res.forEach(elem => {
            if(elem.category == 'audio'){
                audio.push(elem)
            }
            if(elem.category == 'word'){
                word.push(elem)
            }
            if(elem.category == 'compressed'){
                compressed.push(elem)
            }
            if(elem.category == 'text'){
                text.push(elem)
            }
            if(elem.category == 'pdf'){
                pdf.push(elem)
            }
            if(elem.category == 'others'){
                others.push(elem)
            }
        });

        pdf.forEach(elem => {
            addItemPdf(elem)
        });
        
        word.forEach(elem => {
            addItemWord(elem)
        });
        
        compressed.forEach(elem => {
            addItemCompressed(elem)
        });

        audio.forEach(elem => {
            addItemAudio(elem)
        });

        text.forEach(elem => {
            addItemText(elem)
        });

        others.forEach(elem => {
            addItemOther(elem)
        });  
    }) 
}

function addItemAudio(elem){
    let name = (elem.name.toLowerCase(elem.name)).substr(0,13) + '...'
    $('#container-others').append(`
        <div onclick="detalleAudio('${elem._id}')" class="col-6 col-md-3 col-lg-2 tarjeta text-center">
            <i class="far fa-file-audio fa-7x audio"></i> 
            <p>${name}</p>
        </div>
    `) 
}

function addItemWord(elem){
    let name = (elem.name.toLowerCase(elem.name)).substr(0,13) + '...'
    $('#container-others').append(`
        <div onclick="detalleWord('${elem._id}')" class="col-6 col-md-3 col-lg-2 tarjeta text-center">
            <i class="far fa-file-word fa-7x word"></i> 
            <p>${name}</p>
        </div>
    `) 
}

function addItemText(elem){
    let name = (elem.name.toLowerCase(elem.name)).substr(0,13) + '...'
    $('#container-others').append(`
        <div onclick="detalleTxt('${elem._id}')" class="col-6 col-md-3 col-lg-2 tarjeta text-center">
            <i class="far fa-file-alt fa-7x alt"></i>
            <p>${name}</p>
        </div>
    `) 
}

function addItemCompressed(elem){
    let name = (elem.name.toLowerCase(elem.name)).substr(0,13) + '...'
    $('#container-others').append(`
        <div onclick="detalleZip('${elem._id}')" class="col-6 col-md-3 col-lg-2 tarjeta text-center">
            <i class="far fa-file-archive fa-7x archive"></i>   
            <p>${name}</p>
        </div>
    `) 
}

function addItemPdf(elem){
    let name = (elem.name.toLowerCase(elem.name)).substr(0,13) + '...'
    $('#container-others').append(`
        <div onclick="detallePdf('${elem._id}')" class="col-6 col-md-3 col-lg-2 tarjeta text-center">
            <i class="far fa-file-pdf fa-7x pdf"></i> 
            <p>${name}</p>
        </div>
    `) 
}

function addItemOther(elem){
    let name = (elem.name.toLowerCase(elem.name)).substr(0,13) + '...'
    $('#container-others').append(`
        <div onclick="detalleArchivo('${elem._id}')" class="col-6 col-md-3 col-lg-2 tarjeta text-center">
            <i class="far fa-file fa-7x file"></i>  
            <p>${name}</p>
        </div>
    `) 
}


function limpiarContainer(){
    $('#container-images').html('')
    $('#container-videos').html('')
    $('#container-others').html('')
}

function detalleImagen(codigo){
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/admin/files-bank/files/${codigo}`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }

    $.ajax(settings).done((res)=>{
        let name = res.name.toLowerCase(res.name)
        $("#modal-view").html('')
        $("#modal-view").append(`
            <div id="modal-view-img" class="col-12 mb-1">
                <img src="${res.url}" class="img-modal-view" alt="">
            </div>
            <div class="col-12 mb-n2">
                <p><b>Nombre:</b> ${name}</p>
            </div>
            <div id="description-${res._id}" class="col-12 mb-n2">
                <p><b>Descripción:</b> ${res.description}<p>
            </div>
            <div class="col-12 codigo-badge mt-1">
                <span class="badge badge-success">Codigo:</span>
                <span class="span-codigo">${res._id}</span>
            </div>
        `)
    
        $('#modal-header').html('')
        $('#modal-header').append(`
            <h4 class="modal-title w-100 font-weight-bold">Detalle de archivo</h4>
            <button id="btn-close" type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        `)
    
        $('#modal-footer').html('')
        $('#modal-footer').append(`
            <button id="btn-aceptar-${res._id}" onclick="editFile('${res._id}')" class="btn btn-primary d-none">Aceptar</button>
            <button id="btn-editar-${res._id}"  onclick="fillContent('${res._id}')" class="btn btn-success">Editar</button>
            <button id="btn-eliminar-${res._id}"  onclick="deleteFile('${res._id}','image')" class="btn btn-danger btn-eliminar">Eliminar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        `)
    
        $('#modal-detalle-archivo').modal('show')
    })
}


function detalleVideo(codigo){
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/admin/files-bank/files/${codigo}`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }

    $.ajax(settings).done((res)=>{
        let name = res.name.toLowerCase(res.name)
        $("#modal-view").html('')
        $("#modal-view").append(`
            <div class="col-12 mb-2 text-center">
                <video id="video-view-${res._id}" class="video-js" controls preload="none" style="width: 100%; height: 270px;">
                     <source src="${res.url}" type="${res.mimeType}">
                </video>
            </div>
            <div class="col-12 mb-n2">
                <p><b>Nombre:</b> ${name}</p>
            </div>
            <div id="description-${res._id}" class="col-12 mb-n2">
                <p><b>Descripción:</b> ${res.description}<p>
            </div>
            <div class="col-12 codigo-badge mt-1">
                <span class="badge badge-success">Codigo:</span>
                <span class="span-codigo">${res._id}</span>
            </div>
        `)
    
        $('#modal-header').html('')
        $('#modal-header').append(`
            <h4 class="modal-title w-100 font-weight-bold">Detalle de archivo</h4>
            <button onclick="videoPause()" type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        `)
    
        $('#modal-footer').html('')
        $('#modal-footer').append(`
            <button id="btn-aceptar-${res._id}" onclick="editFile('${res._id}')" class="btn btn-primary d-none">Aceptar</button>
            <button id="btn-editar-${res._id}"  onclick="fillContent('${res._id}')" class="btn btn-success">Editar</button>
            <button id="btn-eliminar-${res._id}"  onclick="deleteFile('${res._id}','video')" class="btn btn-danger btn-eliminar">Eliminar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        `)
    
        $('#modal-detalle-archivo').modal('show')
    })
}

function detalleAudio(codigo){
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/admin/files-bank/files/${codigo}`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }

    $.ajax(settings).done((res)=>{
        let name = res.name.toLowerCase(res.name)
        $("#modal-view").html('')
        $("#modal-view").append(`
            <div class="col-12 mb-2 text-center">
                <audio id="audio-${res._id}" controls style="width: 100%;">
                    <source src="${res.url}" type="${res.mimeType}">
                </audio>
            </div>
            <div class="col-12 mb-n2">
                <p><b>Nombre:</b> ${name}</p>
            </div>
            <div id="description-${res._id}" class="col-12 mb-n2">
                <p><b>Descripción:</b> ${res.description}<p>
            </div>
            <div class="col-12 codigo-badge mt-1">
                <span class="badge badge-success">Codigo:</span>
                <span class="span-codigo">${res._id}</span>
            </div>
        `)

        $('#modal-header').html('')
        $('#modal-header').append(`
            <h4 class="modal-title w-100 font-weight-bold">Detalle de archivo</h4>
            <button onclick="audioPause()" type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        `)

        $('#modal-footer').html('')
        $('#modal-footer').append(`
            <button id="btn-aceptar-${res._id}" onclick="editFile('${res._id}')" class="btn btn-primary d-none">Aceptar</button>
            <button id="btn-editar-${res._id}"  onclick="fillContent('${res._id}')" class="btn btn-success">Editar</button>
            <button id="btn-eliminar-${res._id}"  onclick="deleteFile('${res._id}','others')" class="btn btn-danger btn-eliminar">Eliminar</button>
            <button onclick="audioPause()" type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        `)

        $('#modal-detalle-archivo').modal('show')
    })
    
}

function detallePdf(codigo){
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/admin/files-bank/files/${codigo}`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }

    $.ajax(settings).done((res)=>{
        let name = res.name.toLowerCase(res.name)
        $("#modal-view").html('')
        $("#modal-view").append(`
            <div onclick="viewPdf('${res.url}')" class="col-4 mb-2 text-center">
                <i class="far fa-file-pdf fa-7x pdf"></i> 
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col-12 mb-n2">
                        <p><b>Nombre:</b> ${name}</p>
                    </div>
                    <div id="description-${res._id}" class="col-12 mb-n2">
                        <p><b>Descripción:</b> ${res.description}<p>
                    </div>
                </div>
            </div>
            <div class="col-12 codigo-badge mt-1">
                <span class="badge badge-success">Codigo:</span>
                <span class="span-codigo">${res._id}</span>
            </div>
        `)

        $('#modal-header').html('')
        $('#modal-header').append(`
            <h4 class="modal-title w-100 font-weight-bold">Detalle de archivo</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        `)

        $('#modal-footer').html('')
        $('#modal-footer').append(`
            <button id="btn-aceptar-${res._id}" onclick="editFile('${res._id}')" class="btn btn-primary d-none">Aceptar</button>
            <button id="btn-editar-${res._id}"  onclick="fillContent('${res._id}')" class="btn btn-success">Editar</button>
            <button id="btn-eliminar-${res._id}"  onclick="deleteFile('${res._id}','others')" class="btn btn-danger btn-eliminar">Eliminar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        `)

        $('#modal-detalle-archivo').modal('show')
    })
    
}

function detalleWord(codigo){
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/admin/files-bank/files/${codigo}`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }

    $.ajax(settings).done((res)=>{
        let name = res.name.toLowerCase(res.name)
        $("#modal-view").html('')
        $("#modal-view").append(`
            <div onclick="viewWord('${res.url}','${res.name}')" class="col-4 mb-2 text-center">
                <i class="far fa-file-word fa-7x word"></i> 
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col-12 mb-n2">
                        <p><b>Nombre:</b> ${name}</p>
                    </div>
                    <div id="description-${res._id}" class="col-12 mb-n2">
                        <p><b>Descripción:</b> ${res.description}<p>
                    </div>
                </div>
            </div>
            <div class="col-12 codigo-badge mt-1">
                <span class="badge badge-success">Codigo:</span>
                <span class="span-codigo">${res._id}</span>
            </div>
        `)
    
        $('#modal-header').html('')
        $('#modal-header').append(`
            <h4 class="modal-title w-100 font-weight-bold">Detalle de archivo</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        `)
    
        $('#modal-footer').html('')
        $('#modal-footer').append(`
            <button id="btn-aceptar-${res._id}" onclick="editFile('${res._id}')" class="btn btn-primary d-none">Aceptar</button>
            <button id="btn-editar-${res._id}"  onclick="fillContent('${res._id}')" class="btn btn-success">Editar</button>
            <button id="btn-eliminar-${res._id}"  onclick="deleteFile('${res._id}','others')" class="btn btn-danger btn-eliminar">Eliminar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        `)
    
        $('#modal-detalle-archivo').modal('show')
    
    })
}

function detalleZip(codigo){
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/admin/files-bank/files/${codigo}`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }

    $.ajax(settings).done((res)=>{
        let name = res.name.toLowerCase(res.name)
        $("#modal-view").html('')
        $("#modal-view").append(`
            <div onclick="viewZip('${res.url}', '${res.name}')" class="col-4 mb-2 text-center">
                <i class="far fa-file-archive fa-7x archive"></i> 
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col-12 mb-n2">
                        <p><b>Nombre:</b> ${name}</p>
                    </div>
                    <div id="description-${res._id}" class="col-12 mb-n2">
                        <p><b>Descripción:</b> ${res.description}<p>
                    </div>
                </div>
            </div>
            <div class="col-12 codigo-badge mt-1">
                <span class="badge badge-success">Codigo:</span>
                <span class="span-codigo">${res._id}</span>
            </div>
        `)
    
        $('#modal-header').html('')
        $('#modal-header').append(`
            <h4 class="modal-title w-100 font-weight-bold">Detalle de archivo</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        `)
    
        $('#modal-footer').html('')
        $('#modal-footer').append(`
            <button id="btn-aceptar-${res._id}" onclick="editFile('${res._id}')" class="btn btn-primary d-none">Aceptar</button>
            <button id="btn-editar-${res._id}"  onclick="fillContent('${res._id}')" class="btn btn-success">Editar</button>
            <button id="btn-eliminar-${res._id}"  onclick="deleteFile('${res._id}','others')" class="btn btn-danger btn-eliminar">Eliminar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        `)
    
        $('#modal-detalle-archivo').modal('show')
    })

}

function detalleTxt(codigo){
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/admin/files-bank/files/${codigo}`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }

    $.ajax(settings).done((res)=>{
        let name = res.name.toLowerCase(res.name)
        $("#modal-view").html('')
        $("#modal-view").append(`
            <div onclick="viewTxt('${res.url}', '${res.name}')" class="col-4 mb-2 text-center">
                <i class="far fa-file-alt fa-7x alt"></i> 
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col-12 mb-n2">
                        <p><b>Nombre:</b> ${name}</p>
                    </div>
                    <div id="description-${res._id}" class="col-12 mb-n2">
                        <p><b>Descripción:</b> ${res.description}<p>
                    </div>
                </div>
            </div>
            <div class="col-12 codigo-badge mt-1">
                <span class="badge badge-success">Codigo:</span>
                <span class="span-codigo">${res._id}</span>
            </div>
        `)
    
        $('#modal-header').html('')
        $('#modal-header').append(`
            <h4 class="modal-title w-100 font-weight-bold">Detalle de archivo</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        `)
    
        $('#modal-footer').html('')
        $('#modal-footer').append(`
            <button id="btn-aceptar-${res._id}" onclick="editFile('${res._id}')" class="btn btn-primary d-none">Aceptar</button>
            <button id="btn-editar-${res._id}"  onclick="fillContent('${res._id}')" class="btn btn-success">Editar</button>
            <button id="btn-eliminar-${res._id}"  onclick="deleteFile('${res._id}','others')" class="btn btn-danger btn-eliminar">Eliminar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        `)
    
        $('#modal-detalle-archivo').modal('show')
    })
}

function detalleArchivo(codigo){
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/admin/files-bank/files/${codigo}`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }

    $.ajax(settings).done((res)=>{
        let name = res.name.toLowerCase(res.name)
        $("#modal-view").html('')
        $("#modal-view").append(`
            <div onclick="viewArchivo('${res.url}', '${res.name}')" class="col-4 mb-2 text-center">
                <i class="far fa-file fa-7x file"></i> 
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col-12 mb-n2">
                        <p><b>Nombre:</b> ${name}</p>
                    </div>
                    <div id="description-${res._id}" class="col-12 mb-n2">
                        <p><b>Descripción:</b> ${res.description}<p>
                    </div>
                </div>
            </div>
            <div class="col-12 codigo-badge mt-1">
                <span class="badge badge-success">Codigo:</span>
                <span class="span-codigo">${res._id}</span>
            </div>
        `)
    
        $('#modal-header').html('')
        $('#modal-header').append(`
            <h4 class="modal-title w-100 font-weight-bold">Detalle de archivo</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        `)
    
        $('#modal-footer').html('')
        $('#modal-footer').append(`
            <button id="btn-aceptar-${res._id}" onclick="editFile('${res._id}')" class="btn btn-primary d-none">Aceptar</button>
            <button id="btn-editar-${res._id}"  onclick="fillContent('${res._id}')" class="btn btn-success">Editar</button>
            <button id="btn-eliminar-${res._id}"  onclick="deleteFile('${res._id}','others')" class="btn btn-danger btn-eliminar">Eliminar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        `)
    
        $('#modal-detalle-archivo').modal('show')

    })
}

function audioPause(){
    var audio = document.getElementsByTagName('audio')
    audio[0].pause()
 }
 
 function videoPause(){
     var video = document.getElementsByTagName('video')
     video[0].pause()
 }


 function viewPdf(url){
     window.open(url, '_blank')
 }

 function viewWord(url, name){
   var link = document.createElement("a");
   link.download = name;
   link.href = url;
   link.click();
}

function viewZip(url, name){
    var link = document.createElement("a");
    link.download = name;
    link.href = url;
    link.click();
 }

 function viewTxt(url, name){
    var link = document.createElement("a");
    link.download = name;
    link.href = url;
    link.click();
 }

 function viewArchivo(url, name){
    var link = document.createElement("a");
    link.download = name;
    link.href = url;
    link.click();
 }


 $('#btn-agregar-archivo').click(()=>{
    $('#modal-view-file').html('')
    $('#modal-view-file').append(`
    <form id="form-file" method="POST" enctype="multipart/form-data">
        <div class="row">
            <div class="col-12">
                <div class="custom-file">
                    <input name="file" type="file" class="custom-file-input" id="customFile">
                    <label class="custom-file-label" for="customFile">Seleccionar Archivo</label>
                </div>
            </div>
            <div class="col-12 mt-2">
                <textarea id="description" name="description" class="form-control" style="resize: none;" placeholder="Descripción"></textarea>
            </div>
            <div class="col-12 mb-n2">
                <hr>
            </div>
            <div class="col-12 text-center">
                <button type="submit" class="btn btn-success">Subir Archivo</button>
            </div>
        </div>
    </form>
    `)

    $('#modal-header-file').html('')
    $('#modal-header-file').append(`
        <h4 class="modal-title w-100 font-weight-bold">Subir Archivo</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    `)

    $('#modal-subir-archivo').modal('show')

    $(".custom-file-input").on("change", function() {
       var fileName = $(this).val().split("\\").pop();
       $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
   });

   
   
   $('#form-file').ajaxForm({
       url:'/admin/files-bank/files',
       dataType: 'json',
       success: function(res){
          if(res.err == 1){
            $.alert({
                title:'',
                content: `${res.message}`,
                type:'blue',
                closeIcon: true,
                closeIconClass: 'fas fa-times',
                theme: 'material',
                buttons: {
                    Ok: {
                    text: 'Ok',
                    btnClass: 'btn-primary',
                    keys: ['enter', 'shift']
                    }
                }
        
             })
          }else{
            console.log(res)
            $.alert({
                title:'',
                content: 'El archivo se ha subido con exito',
                type:'blue',
                closeIcon: true,
                closeIconClass: 'fas fa-times',
                theme: 'material',
                buttons: {
                    Ok: {
                    text: 'Ok',
                    btnClass: 'btn-primary',
                    keys: ['enter', 'shift']
                    }
                }
        
             })
             $('#modal-subir-archivo').modal('toggle')

             if(res.category == 'image'){
                 addItemImage(res)
             }

             if(res.category == 'video'){
                addItemVideo(res)
             }

             if(res.category == 'pdf'){
                addItemPdf(res)
             }

             if(res.category == 'text'){
                addItemText(res)
             }

             if(res.category == 'word'){
                addItemWord(res)
             }

             if(res.category == 'audio'){
                addItemAudio(res)
             }

             if(res.category == 'compressed'){
                addItemCompressed(res)
             }

             if(res.category == 'others'){
                addItemOther(res)
             }


          }
       },
       error: err =>{
           console.log(err)
       }
   })
 })


 function deleteFile(codigo, type){
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/admin/files-bank/files/${codigo}`,
        "method": "DELETE",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }

    $.ajax(settings).done((data)=>{
       if(data.ok == 1){
            $.alert({
                title:'',
                content: 'El archivo se ha eliminado con exito',
                type:'blue',
                closeIcon: true,
                closeIconClass: 'fas fa-times',
                theme: 'material',
                buttons: {
                    Ok: {
                    text: 'Ok',
                    btnClass: 'btn-primary',
                    keys: ['enter', 'shift']
                    }
                }
        
            })
            
            if(type == 'image'){
                llenarImagenes()
            }
            if(type == 'video'){
                llenarVideos()
            }
            if(type == 'others'){
                llenarOtros()
            }
            
            $('#modal-detalle-archivo').modal('toggle')
       }
    })

 }
 

 function fillContent(codigo){
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/admin/files-bank/files/${codigo}`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }

    $.ajax(settings).done((data)=>{
        $(`#description-${data._id}`).html(`
            <p class="mb-1"><b>Descripción:</b></p>
            <input id="txt-description-${data._id}" type=text class="form-control mb-2" value="${data.description}">
        `)
        $(`#btn-editar-${data._id}`).addClass('d-none')
        $(`#btn-aceptar-${data._id}`).removeClass('d-none')
    })
 }

 
 

 function editFile(codigo){
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/admin/files-bank/files/${codigo}`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }

    $.ajax(settings).done((data)=>{
        let dataUpdate ={
            description: $(`#txt-description-${data._id}`).val(),
        }

        let sett = {
            "async": true,
            "crossDomain": true,
            "url": `/admin/files-bank/files/${codigo}`,
            "method": "PUT",
            "dataType": "json",
            "data": dataUpdate,
            "headers": {
              "content-type": "application/x-www-form-urlencoded"
            }
          }
        $.ajax(sett).done((res)=>{
            if(res.ok == 1){
                $.alert({
                    title:'',
                    content: 'El archivo se ha actualizado con exito',
                    type:'blue',
                    closeIcon: true,
                    closeIconClass: 'fas fa-times',
                    theme: 'material',
                    buttons: {
                        Ok: {
                        text: 'Ok',
                        btnClass: 'btn-primary',
                        keys: ['enter', 'shift']
                        }
                    }
            
                })

                if(data.category == 'image'){
                    detalleImagen(codigo)
                }

                if(data.category == 'video'){
                    detalleVideo(codigo)
                }

                if(data.category == 'text'){
                    detalleTxt(codigo)
                }

                if(data.category == 'pdf'){
                    detallePdf(codigo)
                }

                if(data.category == 'word'){
                    detalleWord(codigo)
                }

                if(data.category == 'audio'){
                    detalleAudio(codigo)
                }

                if(data.category == 'compressed'){
                    detalleZip(codigo)
                }

                if(data.category == 'others'){
                    detalleArchivo(codigo)
                }

            }
        })
    })
 }