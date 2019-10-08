$(document).ready(()=>{
    llenarSelectEntradas()
})

$('#slc-entry').change(function(){
    llenarData($('#slc-entry').val())
})

/*
=====================================
=============Validaciones===============
=====================================
*/
let camposFormEdit = [
    {id:'slc-reported', isValid:false},
]


function validarRegistroEdit(){
    for (let i = 0; i < camposFormEdit.length; i++)
      camposFormEdit[i].isValid = marcarInput(camposFormEdit[i].id,($(`#${camposFormEdit[i].id}`).val() == "" || $(`#${camposFormEdit[i].id}`).val() == 0) ? false : true)
    

    for (let i = 0; i < camposFormEdit.length; i++)
        if(!camposFormEdit[i].isValid)
        return  // Si hay un campo invalido salir de  la funcion registrar


    let comment = {
        reported: ($('#slc-reported').val() == "1") ? true : false
    }

    return comment
    
}

function marcarInput(id, isValid){
    if (isValid) {
        $(`#${id}`).removeClass('is-invalid')
        $(`#${id}`).addClass('is-valid')
    }else{
        $(`#${id}`).removeClass('is-valid')
        $(`#${id}`).addClass('is-invalid')
    }
    
    return isValid
}

function llenarSelectEntradas(){
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/admin/entries/entries`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }
  
      $.ajax(settings).done((res)=>{
          res.forEach(elem => {
                $('#slc-entry').append(`
                    <option value="${elem._id}">${elem.title}</option>
                `)
          }); 
      })
}

function llenarData(codigo){
    if(codigo != 0){
        $('#tbl-dynamic').html(`
            <table id="tbl-comments-${codigo}" class="table table-striped table-bordered" style="width: 100%"></table>
        `)
        $(`#tbl-comments-${codigo}`).DataTable({
        pageLength: 5,
        searching: true,
        ordering: true,
        paging: true,
        responsive: true,
        ajax: {
            "async": true,
            "crossDomain": true,
            "url": `/admin/comments/commentsByEntry/${codigo}`,
            "method": "GET",
            "dataType": "json",
            "headers": {
            "content-type": "application/x-www-form-urlencoded"
            },
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
                "targets": 3,
                "className": "text-center"
            },
            {
                "targets": 4,
                "className": "text-center"
            }
        ],
        columns : [ 
            {data : null, title:"Usuario que comento",
            render:function (data, type, row){
                return `<span><img src="${row.user[0].avatar}" class="mr-2" style="border-radius: 34px; height: 40px;">${row.user[0].firstName} ${row.user[0].lastName}</span>`
            }}, 

            {data: "comment", title: "comentario"},

            {data: "entry[0].title", title: "Entrada"},

            { data: null, title: "Inapropiado",
            render: function (data, type, row) {
                if(row.reported)
                    return `<span class="badge badge-success" style="width:55%;">Si</span>`
                else
                    return `<span class="badge badge-secondary" style="width:55%;">No</span>`
            }},

            {data: null, title: "Accion",
                render: function (data, type, row) {
                        return `<div class="accion">
                                    <button type="button" onclick="fillComment('${row._id}', '${codigo}')" class="btn btn-default btn-sm btn-edit"><span class="far fa-edit edit"></span></button>
                                    <button type="button" onclick="deleteCommet('${row._id}', '${codigo}')" class="btn btn-default btn-sm btn-delete"><span class="far fa-trash-alt trash"></span></button>
                                </div>`; 
            }}
        ]

        });
    }
}

function deleteCommet(codigo, idTable){
    $.confirm({
        theme: 'material',
        closeIcon: true,
        type: 'blue',
        title:'',
        content:'¿Esta seguro de eliminar esta comentario?',
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
                    "url": `/admin/comments/comments/${codigo}`,
                    "method": "DELETE",
                    "dataType": "json",
                    "headers": {
                      "content-type": "application/x-www-form-urlencoded"
                    }
                  }
            
                $.ajax(settings).done((data)=>{
                   if(data.ok == 1){
                       $(`#tbl-comments-${idTable}`).DataTable().ajax.reload(null, false)
                       printMessage('El comentario se ha eliminado con exito!')
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

  function fillComment(codigo, idTable){
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/admin/comments/comments/${codigo}`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }

    $.ajax(settings).done((res)=>{
        $('#text-comment').html(`${res.comment}`)
        if(res.reported){
            $('#slc-reported').val('1')
        }else{
            $('#slc-reported').val('2')
        }
       
        $('#modal-footer-edit').html('')
        $('#modal-footer-edit').append(`
            <button id="btn-aceptar-${res._id}" onclick="editComment('${res._id}', '${idTable}')" class="btn btn-primary">Aceptar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        `)
    
        $('#modal-editar-comentario').modal('show')
    })
  }

function editComment(codigo, idTable){
    let comment = validarRegistroEdit()
    if(comment != undefined){
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": `/admin/comments/comments/${codigo}`,
            "method": "PUT",
            "dataType": "json",
            "data": comment,
            "headers": {
              "content-type": "application/x-www-form-urlencoded"
            }
        }
    
        $.ajax(settings).done((res)=>{
            if(res.ok == 1){
                $(`#tbl-comments-${idTable}`).DataTable().ajax.reload(null, false)
                printMessage(`El comentarios se ha actualizado con exito!`)
                $('#modal-editar-comentario').modal('toggle')
            }
        })
    }
}