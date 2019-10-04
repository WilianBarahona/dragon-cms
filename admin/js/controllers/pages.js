var pagesArray = ["Acerca de", "Contactos", "Informacion", "Derechos reservador", "Terminos y condiciones"]

$(document).ready(()=>{
    llenarPages()
})

$('#btn-new-page').click(()=>{
  window.location.href='/admin/new-page'
})


function llenarPages(){
    $('#container-pages').html('')
    for (let i = 0; i < pagesArray.length; i++) {
        $('#container-pages').append(`
            <div class="col-12">
                <div class="row">
                <div class="col-8 page-info">
                    <h5>${pagesArray[i]}</h5>
                    <p class="font-08rem"><span class="fas fa-history"></span>hace 8meses</p>
                </div>
                <div class="col-4 accion">
                    <button type="button" class="btn btn-default btn-sm btn-view"><span class="fas fa-external-link-alt view"></span></button>
                    <button type="button" class="btn btn-default btn-sm btn-edit"><span class="far fa-edit edit"></span></button>
                    <button type="button" class="btn btn-default btn-sm btn-delete"><span class="far fa-trash-alt trash"></span></button>
                </div>
                <div class="col-12">
                    <hr>
                </div>
                </div>   
            </div>
        `)
    }
    
}


