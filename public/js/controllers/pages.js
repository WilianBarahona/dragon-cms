$(document).ready(()=>{
    llenarPages()
})

let pages = ["Acerca de", "Contactos", "Informacion", "Derechos reservador", "Terminos y condiciones"]
function llenarPages(){
    $('#container-pages').html('')
    for (let i = 0; i < pages.length; i++) {
        $('#container-pages').append(`
        <div class="col-12">
            <h5>${pages[i]}</h5>
            <p class="font-08rem"><span class="fas fa-history"></span>hace 8meses</p>
            <hr>
        </div>
        `)
    }
    
}