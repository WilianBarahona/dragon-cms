$(document).ready(()=>{
    llenarEntries()
})

$('#btn-new-entry').click(()=>{
   window.location.href = '/admin/new-entry'
})

function llenarEntries(){
    $('#tbl-entries').DataTable({
        pageLength: 5,
        searching: true,
        ordering: true,
        paging: true,
        responsive: true,
        ajax: {
            "url": "/admin/entries/entries",
            "method": "GET",
            "dataSrc": "",
        },
        tabIndex: null,
        language: {
            url: "vendor/data-tables/spanish.json",
            oPaginate: {
                sNext: '<i class="fas fa-forward"></i>',
                sPrevious: '<i class="fas fa-backward"></i>'
            }
        },
        columnDefs: [
            {
                "targets": 1, 
                "className": "text-center"
            },
            {
                "targets": 2, 
                "className": "text-center"
            }
        ],
        columns : [ 
            {data : "title", title:"Titulo post"},
            { data: null, title: "Comentarios",
            render: function (data, type, row) {
                if(row.commentary){
                    return `<span class="badge badge-success" style="width:55%;">Permitido</span>`
                }else{
                    return `<span class="badge badge-secondary" style="width:55%;">Denegado</span>`
                }
            }},

            {data: null, title: "Accion",
                render: function (data, type, row) {
                    return `<div class="accion">
                                <button type="button" onclick="fillEntry('${row._id}')" class="btn btn-default btn-sm btn-edit"><span class="far fa-edit edit"></span></button>
                                <button type="button" onclick="deleteEntry('${row._id}')" class="btn btn-default btn-sm btn-delete"><span class="far fa-trash-alt trash"></span></button>
                            </div>`;
                    
            }}
        ]
    });
    
}

function deleteEntry(codigo){
    $.confirm({
        theme: 'material',
        closeIcon: true,
        type: 'blue',
        title:'',
        content:'¿Esta seguro de eliminar esta entrada?',
        closeIconClass: 'fas fa-times',
        columnClass: 'small',
        buttons:{
          Cerrar:{
            text:"¡Si, seguro!",
            btnClass:"btn-primary",
            action:function(){
                let settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": `/admin/entries/entries/${codigo}`,
                    "method": "DELETE",
                    "dataType": "json",
                    "headers": {
                      "content-type": "application/x-www-form-urlencoded"
                    }
                  }
            
                $.ajax(settings).done((data)=>{
                   if(data.ok == 1){
                       $('#tbl-entries').DataTable().ajax.reload(null, false)
                       printMessage('La entrada se ha eliminado con exito!')
                   }
                })
            }
          },
          Cancelar:function(){

          }
        }
      })

}

function printMessage(msg){
    $.alert({
        title:'',
        content: `${msg}`,
        type:'blue',
        closeIcon: true,
        closeIconClass: 'fas fa-times',
        theme: 'material',
        buttons: {
            Ok: {
              text: 'Ok',
              btnClass: 'btn-primary',
              keys: ['enter', 'shift'],
            }
        }
  
     })
  }