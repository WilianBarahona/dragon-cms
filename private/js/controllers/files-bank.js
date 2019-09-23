$(document).ready(()=>{
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
    $('#title-videos').removeClass('mt-4')
    
})
$('#btn-file-bank-others').click(()=>{
    limpiarContainer()
    llenarOtros()
    $('#title-others').removeClass('mt-4')
    
})  



function llenarTodos(){
    limpiarContainer()
    llenarImagenes()
    llenarVideos()
    llenarOtros()
}



function llenarImagenes(){
    $('#container-files').append(`
        <div class="col-12">
            <h5>Imagenes</h5>
            <hr>
        </div>
    `)
    
    for (let i = 0; i < 12; i++) {
        $('#container-files').append(`
            <!-- Card -->
            <div onclick="detalleImagen(${i+1})" class="col-6 col-md-3 col-lg-2 tarjeta">
                <div class="card card-body">
                    <div class="thumbnail">
                        <img src="files-bank/images/${i+1}.jpg" class="img-card-thumbnail">
                        <i class="fas fa-image fa-1x mt-1 type"></i>
                    </div>
                </div>
            </div>
            <!-- Fin Card -->
        `) 
    }
    
}

function llenarVideos(){
    $('#container-files').append(`
        <div class="col-12">
            <h5 id="title-videos" class="mt-4">Videos</h5>
            <hr>
        </div>
    `)
    
    for (let i = 0; i < 12; i++) {
        $('#container-files').append(`
            <div onclick="detalleVideo(${i+1})" class="col-6 col-md-3 col-lg-2 tarjeta text-center">
                <i class="far fa-file-video fa-7x video"></i> 
                <p>video lorem...</p>
            </div>
        `) 
    }
    
}


function llenarOtros(){
    $('#container-files').append(`
        <div class="col-12">
            <h5 id="title-others" class="mt-4">Archivos genericos</h5>
            <hr>
        </div>
    `)
    
    for (let i = 0; i < 5; i++) {
        $('#container-files').append(`
            <div onclick="detallePdf(${i+1})" class="col-6 col-md-3 col-lg-2 tarjeta text-center">
                <i class="far fa-file-pdf fa-7x pdf"></i> 
                <p>doc lorem...</p>
            </div>
        `) 
    }

    for (let i = 0; i < 5; i++) {
        $('#container-files').append(`
            <div onclick="detalleWord(${i+1})" class="col-6 col-md-3 col-lg-2 tarjeta text-center">
                <i class="far fa-file-word fa-7x word"></i> 
                <p>doc lorem...</p>
            </div>
        `) 
    }

    for (let i = 0; i < 5; i++) {
        $('#container-files').append(`
            <div onclick="detalleZip(${i+1})" class="col-6 col-md-3 col-lg-2 tarjeta text-center">
                <i class="far fa-file-archive fa-7x archive"></i>   
                <p>doc lorem...</p> 
            </div>
        `) 
    }

    for (let i = 0; i < 5; i++) {
        $('#container-files').append(`
            <div onclick="detalleAudio(${i+1})" class="col-6 col-md-3 col-lg-2 tarjeta text-center">
                <i class="far fa-file-audio fa-7x audio"></i> 
                <p>doc lorem...</p>
            </div>
        `) 
    }

    for (let i = 0; i < 5; i++) {
        $('#container-files').append(`
            <div onclick="detalleTxt(${i+1})" class="col-6 col-md-3 col-lg-2 tarjeta text-center">
                <i class="far fa-file-alt fa-7x alt"></i> 
                <p>doc lorem...</p>
            </div>
        `) 
    }

    for (let i = 0; i < 5; i++) {
        $('#container-files').append(`
            <div onclick="detalleArchivo(${i+1})" class="col-6 col-md-3 col-lg-2 tarjeta text-center">
                <i class="far fa-file fa-7x file"></i>  
                <p>doc lorem...</p>
            </div>
        `) 
    }
    
}

function limpiarContainer(){
    $('#container-files').html('')
}

function detalleImagen(codigo){
    $("#modal-view").html('')
    $("#modal-view").append(`
        <div id="modal-view-img" class="col-12 mb-1">
            <img src="files-bank/images/${codigo}.jpg" class="img-modal-view" alt="">
        </div>
        <div class="col-12 codigo-badge mt-1">
            <span class="badge badge-success">Codigo:</span>
            <span class="span-codigo">08982834y=eff787-${codigo}</span>
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
        <button id="btn-eliminar" class="btn btn-danger btn-eliminar">Eliminar</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
    `)

    $('#modal-detalle-archivo').modal('show')
}


function detalleVideo(codigo){
    $("#modal-view").html('')
    $("#modal-view").append(`
        <div class="col-12 mb-2 text-center">
            <video id="video-view-${codigo}" class="video-js" controls preload="none" style="width: 100%; height: 270px;">
                 <source src="files-bank/videos/video.mp4" type="video/mp4">
            </video>
        </div>
        <div class="col-12 codigo-badge mt-1">
            <span class="badge badge-success">Codigo:</span>
            <span class="span-codigo">08982834yeff787-${codigo}</span>
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
        <button id="btn-eliminar" class="btn btn-danger btn-eliminar">Eliminar</button>
        <button onclick="videoPause()" type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
    `)

    $('#modal-detalle-archivo').modal('show')
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

 $('#btn-agregar-archivo').click(()=>{
    $('#modal-view-file').html('')
    $('#modal-view-file').append(`
    <form action='/files' method="POST" enctype="multipart/form-data">
        <div class="row">
            <div class="col-12">
                <div class="custom-file">
                    <input name="file" type="file" class="custom-file-input" id="customFile">
                    <label class="custom-file-label" for="customFile">Seleccionar Archivo</label>
                </div>
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
   
 })


