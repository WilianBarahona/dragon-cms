$(document).ready(()=>{
    var pages = ["Acerca de", "Contactos", "Informacion", "Derechos reservador", "Terminos y condiciones"]
    llenarPages(pages)

    $('#btn-new-page').click(()=>{
        $('#container-paginas').html('')
        $('#script').html('')

        $('#container-paginas').load('templates/pages/new-page.html')
        $('#script').append(`
            <script src="js/controllers/new-page.js"></script>
        `)
    })
})

function llenarPages(pages){
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