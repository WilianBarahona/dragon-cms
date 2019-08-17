$(document).ready(()=>{
    llenarTodos()
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
            <h5 class="mb-n3">Imagenes</h5>
        </div>
    `)
    
    for (let i = 0; i < 12; i++) {
        $('#container-files').append(`
            <!-- Card -->
            <div class="col-6 col-md-3 col-lg-2 tarjeta">
                <div class="card card-body">
                    <div class="thumbnail">
                        <img src="bank-files/img/${i+1}.jpg" class="img-card-thumbnail">
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
            <h5 id="title-videos" class="mb-n3 mt-4">Videos</h5>
        </div>
    `)
    
    for (let i = 0; i < 12; i++) {
        $('#container-files').append(`
            <!-- Card -->
            <div class="col-6 col-md-3 col-lg-2 tarjeta">
                <div class="card card-body">
                    <div class="thumbnail">
                        <img src="bank-files/img/${i+1}.jpg" class="img-card-thumbnail">
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
            <h5 id="title-others" class="mb-n3 mt-4">Archivos genericos</h5>
        </div>
    `)
    
    for (let i = 0; i < 12; i++) {
        $('#container-files').append(`
            <!-- Card -->
            <div class="col-6 col-md-3 col-lg-2 tarjeta">
                <div class="card card-body">
                    <div class="thumbnail">
                        <img src="bank-files/img/file-icon.svg" class="img-card-thumbnail"
                    </div>
                </div>
            </div>
            <!-- Fin Card -->
        `) 
    }
    
}

function limpiarContainer(){
    $('#container-files').html('')
}

