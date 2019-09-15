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
                        <img src="files-bank/img/${i+1}.jpg" class="img-card-thumbnail">
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
            <!-- Card -->
            <div onclick="detalleVideo(${i+1})" class="col-6 col-md-3 col-lg-2 tarjeta">
                <div class="card card-body">
                    <div class="thumbnail">
                        <img src="files-bank/img/${i+1}.jpg" class="img-card-thumbnail">
                        <i class="fas fa-video fa-1x mt-1 type"></i>
                    </div>
                </div>
            </div>
            <!-- Fin Card -->
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
            <div class="col-6 col-md-3 col-lg-2 tarjeta text-center">
                <i class="far fa-file-pdf fa-7x pdf"></i> 
                <p>doc lorem...</p>
            </div>
        `) 
    }

    for (let i = 0; i < 5; i++) {
        $('#container-files').append(`
            <div class="col-6 col-md-3 col-lg-2 tarjeta text-center">
                <i class="far fa-file-word fa-7x word"></i> 
                <p>doc lorem...</p>
            </div>
        `) 
    }

    for (let i = 0; i < 5; i++) {
        $('#container-files').append(`
            <div class="col-6 col-md-3 col-lg-2 tarjeta text-center">
                <i class="far fa-file-archive fa-7x archive"></i>   
                <p>doc lorem...</p> 
            </div>
        `) 
    }

    for (let i = 0; i < 5; i++) {
        $('#container-files').append(`
            <div class="col-6 col-md-3 col-lg-2 tarjeta text-center">
                <i class="far fa-file-audio fa-7x audio"></i> 
                <p>doc lorem...</p>
            </div>
        `) 
    }

    for (let i = 0; i < 5; i++) {
        $('#container-files').append(`
            <div class="col-6 col-md-3 col-lg-2 tarjeta text-center">
                <i class="far fa-file-alt fa-7x alt"></i> 
                <p>doc lorem...</p>
            </div>
        `) 
    }

    for (let i = 0; i < 5; i++) {
        $('#container-files').append(`
            <div class="col-6 col-md-3 col-lg-2 tarjeta text-center">
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
        <div id="modal-view-img" class="col-12">
            <img src="files-bank/img/${codigo}.jpg" class="img-modal-view" alt="">
        </div>
        <div class="col-12 codigo-badge mt-1">
            <span class="badge badge-success">Codigo:</span>
            <span class="span-codigo">08982834y=eff787-${codigo}</span>
        </div>
    `)

    $('#modal-detalle-archivo').modal('show')
}


function detalleVideo(codigo){
    $("#modal-view").html('')
    $("#modal-view").append(`
        <div class="col-12">
            <video width="320" height="240" autoplay>
                <source src="files-bank/videos/videos/video.mp4" type="video/mp4">
            </video>
        </div>
    `)

    $('#modal-detalle-archivo').modal('show')
}
