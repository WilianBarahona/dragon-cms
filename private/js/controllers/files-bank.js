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
        "url": "/files",
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
        "url": "/files",
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
    $('#container-others').html(`
        <div class="col-12">
            <h5>Others</h5>
            <hr>
        </div>
    `)
    
    // for (let i = 0; i < 5; i++) {
    //     $('#container-files').append(`
    //         <div onclick="detallePdf(${i+1})" class="col-6 col-md-3 col-lg-2 tarjeta text-center">
    //             <i class="far fa-file-pdf fa-7x pdf"></i> 
    //             <p>doc lorem...</p>
    //         </div>
    //     `) 
    // }

    // for (let i = 0; i < 5; i++) {
    //     $('#container-files').append(`
    //         <div onclick="detalleWord(${i+1})" class="col-6 col-md-3 col-lg-2 tarjeta text-center">
    //             <i class="far fa-file-word fa-7x word"></i> 
    //             <p>doc lorem...</p>
    //         </div>
    //     `) 
    // }

    // for (let i = 0; i < 5; i++) {
    //     $('#container-files').append(`
    //         <div onclick="detalleZip(${i+1})" class="col-6 col-md-3 col-lg-2 tarjeta text-center">
    //             <i class="far fa-file-archive fa-7x archive"></i>   
    //             <p>doc lorem...</p> 
    //         </div>
    //     `) 
    // }

    // for (let i = 0; i < 5; i++) {
    //     $('#container-files').append(`
    //         <div onclick="detalleAudio(${i+1})" class="col-6 col-md-3 col-lg-2 tarjeta text-center">
    //             <i class="far fa-file-audio fa-7x audio"></i> 
    //             <p>doc lorem...</p>
    //         </div>
    //     `) 
    // }

    // for (let i = 0; i < 5; i++) {
    //     $('#container-files').append(`
    //         <div onclick="detalleTxt(${i+1})" class="col-6 col-md-3 col-lg-2 tarjeta text-center">
    //             <i class="far fa-file-alt fa-7x alt"></i> 
    //             <p>doc lorem...</p>
    //         </div>
    //     `) 
    // }

    // for (let i = 0; i < 5; i++) {
    //     $('#container-files').append(`
    //         <div onclick="detalleArchivo(${i+1})" class="col-6 col-md-3 col-lg-2 tarjeta text-center">
    //             <i class="far fa-file fa-7x file"></i>  
    //             <p>doc lorem...</p>
    //         </div>
    //     `) 
    // }
    
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
        "url": `/files/${codigo}`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }

    $.ajax(settings).done((res)=>{
        $("#modal-view").html('')
        $("#modal-view").append(`
            <div id="modal-view-img" class="col-12 mb-1">
                <img src="${res.url}" class="img-modal-view" alt="">
            </div>
            <div class="col-12 mb-n2">
                <p>Nombre: ${res.name}</p>
            </div>
            <div id="description-${res._id}" class="col-12 mb-n2">
                <p>Descripción: ${res.description}<p>
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
        "url": `/files/${codigo}`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }

    $.ajax(settings).done((res)=>{
        $("#modal-view").html('')
        $("#modal-view").append(`
            <div class="col-12 mb-2 text-center">
                <video id="video-view-${res._id}" class="video-js" controls preload="none" style="width: 100%; height: 270px;">
                     <source src="${res.url}" type="${res.mimeType}">
                </video>
            </div>
            <div class="col-12 mb-n2">
                <p>Nombre: ${res.name}</p>
            </div>
            <div id="description-${res._id}" class="col-12 mb-n2">
                <p>Descripción: ${res.description}<p>
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
    $("#modal-view").html('')
    $("#modal-view").append(`
        <div class="col-12 mb-2 text-center">
            <audio id="audio-${codigo}" controls style="width: 100%;">
                <source src="files-bank/audios/audio.mp3" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-12 codigo-badge mt-1">
            <span class="badge badge-success">Codigo:</span>
            <span class="span-codigo">08982834y=eff787-${codigo}</span>
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
        <button id="btn-eliminar" class="btn btn-danger btn-eliminar">Eliminar</button>
        <button onclick="audioPause()" type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
    `)

    $('#modal-detalle-archivo').modal('show')
}

function detallePdf(codigo){
    $("#modal-view").html('')
    $("#modal-view").append(`
        <div onclick="viewPdf(${codigo})" class="col-4 mb-2 text-center">
            <i class="far fa-file-pdf fa-7x pdf"></i> 
        </div>
        <div class="col-8">
            <p>Nombre: pdf-lorem-ipsum-dolor.pdf</p>
        </div>
        <div class="col-12 codigo-badge mt-1">
            <span class="badge badge-success">Codigo:</span>
            <span class="span-codigo">08982834y=eff787-${codigo}</span>
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
        <button id="btn-eliminar" class="btn btn-danger btn-eliminar">Eliminar</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
    `)

    $('#modal-detalle-archivo').modal('show')
}

function detalleWord(codigo){
    $("#modal-view").html('')
    $("#modal-view").append(`
        <div onclick="viewWord(${codigo})" class="col-4 mb-2 text-center">
            <i class="far fa-file-word fa-7x word"></i> 
        </div>
        <div class="col-8">
            <p>Nombre: docx-lorem-ipsum-dolor.docx</p>
        </div>
        <div class="col-12 codigo-badge mt-1">
            <span class="badge badge-success">Codigo:</span>
            <span class="span-codigo">08982834y=eff787-${codigo}</span>
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
        <button id="btn-eliminar" class="btn btn-danger btn-eliminar">Eliminar</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
    `)

    $('#modal-detalle-archivo').modal('show')
}

function detalleZip(codigo){
    $("#modal-view").html('')
    $("#modal-view").append(`
        <div onclick="viewZip(${codigo})" class="col-4 mb-2 text-center">
            <i class="far fa-file-archive fa-7x archive"></i> 
        </div>
        <div class="col-8">
            <p>Nombre: zip-lorem-ipsum-dolor.zip</p>
        </div>
        <div class="col-12 codigo-badge mt-1">
            <span class="badge badge-success">Codigo:</span>
            <span class="span-codigo">08982834y=eff787-${codigo}</span>
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
        <button id="btn-eliminar" class="btn btn-danger btn-eliminar">Eliminar</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
    `)

    $('#modal-detalle-archivo').modal('show')
}

function detalleTxt(codigo){
    $("#modal-view").html('')
    $("#modal-view").append(`
        <div onclick="viewTxt(${codigo})" class="col-4 mb-2 text-center">
            <i class="far fa-file-alt fa-7x alt"></i> 
        </div>
        <div class="col-8">
            <p>Nombre: txt-lorem-ipsum-dolor.txt</p>
        </div>
        <div class="col-12 codigo-badge mt-1">
            <span class="badge badge-success">Codigo:</span>
            <span class="span-codigo">08982834y=eff787-${codigo}</span>
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
        <button id="btn-eliminar" class="btn btn-danger btn-eliminar">Eliminar</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
    `)

    $('#modal-detalle-archivo').modal('show')
}

function detalleArchivo(codigo){
    $("#modal-view").html('')
    $("#modal-view").append(`
        <div onclick="viewArchivo(${codigo})" class="col-4 mb-2 text-center">
            <i class="far fa-file fa-7x file"></i> 
        </div>
        <div class="col-8">
            <p>Nombre: other-lorem-ipsum-dolor.js</p>
        </div>
        <div class="col-12 codigo-badge mt-1">
            <span class="badge badge-success">Codigo:</span>
            <span class="span-codigo">08982834y=eff787-${codigo}</span>
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
        <button id="btn-eliminar" class="btn btn-danger btn-eliminar">Eliminar</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
    `)

    $('#modal-detalle-archivo').modal('show')
}

function audioPause(){
    var audio = document.getElementsByTagName('audio')
    audio[0].pause()
 }
 
 function videoPause(){
     var video = document.getElementsByTagName('video')
     video[0].pause()
 }


 function viewPdf(codigo){
     window.open('files-bank/pdf/pdf.pdf', '_blank')
 }

 function viewWord(codigo){
   var link = document.createElement("a");
   link.download = 'pdf2';
   link.href = 'files-bank/pdf/pdf.pdf';
   link.click();
}

function viewZip(codigo){
    var link = document.createElement("a");
    link.download = 'pdf2';
    link.href = 'files-bank/pdf/pdf.pdf';
    link.click();
 }

 function viewTxt(codigo){
    var link = document.createElement("a");
    link.download = 'pdf2';
    link.href = 'files-bank/pdf/pdf.pdf';
    link.click();
 }

 function viewArchivo(codigo){
    var link = document.createElement("a");
    link.download = 'pdf2';
    link.href = 'files-bank/pdf/pdf.pdf';
    link.click();
 }
//action='/files' 
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
       url:'/files',
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
        "url": `/files/${codigo}`,
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
         $('#modal-detalle-archivo').modal('toggle')
         if(type == 'image'){
             llenarImagenes()
         }
         if(type == 'video'){
            llenarVideos()
        }
        if(type == 'other'){
            llenarOtros()
        }
       }
    })

 }
 

 function fillContent(codigo){
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/files/${codigo}`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }

    $.ajax(settings).done((data)=>{
        $(`#description-${data._id}`).html(`
            <p class="mb-1">Descripción:</p>
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
        "url": `/files/${codigo}`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }

    $.ajax(settings).done((data)=>{
        let dataUpdate ={
            id: codigo,
            name: data.name,
            url: data.url,
            description: $(`#txt-description-${data._id}`).val(),
            category: data.category,
            date:data.date,
            mimeType: data.mimeType,
            size: data.size,
            thumbnail: data.thumbnail,
        }

        let sett = {
            "async": true,
            "crossDomain": true,
            "url": `/files/${codigo}`,
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
                // detalleImagen(codigo)
            }
        })
    })
 }


