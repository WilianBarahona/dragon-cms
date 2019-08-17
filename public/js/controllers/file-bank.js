$(document).ready(()=>{
    llenarContenido()
})

function llenarContenido(){
    let date = new Date()
    $('#container-files').html('')
    $('#container-files').append(`
        <div class="col-12 mb-n2">
            <p class="font-08rem">Ago 16, 2019</p>
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