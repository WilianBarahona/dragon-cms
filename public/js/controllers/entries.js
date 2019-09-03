$(document).ready(()=>{
    var entries = ["La muerte de Iron Man", "Marvel 4ta fase" , "La bruja escarlata", "Muerte Black Widow", "Loki y el teseracto"]
    llenarEntries()
    
    $('#btn-new-entry').click(()=>{
        $('#container-entries').html('')
        $('#script').html('')
        
        $('#container-entries').load('templates/pages/new-entrie.html')
        $('#script').append(`
        <script src="js/controllers/new-entrie.js"></script>
        `)
    })
    

function llenarEntries(){
    $('#container-entries-list').html('')
    for (let i = 0; i < entries.length; i++) {
        $('#container-entries-list').append(`
        <div class="col-12">
            <h5>${entries[i]}</h5>
            <p class="font-08rem"><span class="fas fa-history"></span>hace 1 mes</p>
            <hr>
        </div>
        `)
    }
    
}
})
