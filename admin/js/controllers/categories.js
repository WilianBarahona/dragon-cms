$(document).ready(function() {
    llenarCategories()
});

$('#btn-new-category').click(()=>{
    $('#modal-agregar-categoria').modal('show')
})

$('#btn-create-category').click(()=>{
   createCategory()
})

/*
=====================================
=============Validaciones===============
=====================================
*/
let camposForm = [
    {id:'txt-category', isValid:false},
    {id:'txt-description', isValid:false},
]

let camposFormEdit = [
    {id:'txt-category-edit', isValid:false},
    {id:'txt-description-edit', isValid:false}
]

function validarRegistro(){
    for (let i = 0; i < camposForm.length; i++)
      camposForm[i].isValid = marcarInput(camposForm[i].id,($(`#${camposForm[i].id}`).val() == "" || $(`#${camposForm[i].id}`).val() == 0) ? false : true)
    
    for (let i = 0; i < camposForm.length; i++)
        if(!camposForm[i].isValid)
        return  // Si hay un campo invalido salir de  la funcion registrar


    let category = {
        category: $('#txt-category').val(),
        description: $('#txt-description').val(),
    }

    return category
    
}

function validarRegistroEdit(){
    for (let i = 0; i < camposFormEdit.length; i++)
      camposFormEdit[i].isValid = marcarInput(camposFormEdit[i].id,($(`#${camposFormEdit[i].id}`).val() == "" || $(`#${camposFormEdit[i].id}`).val() == 0) ? false : true)
    
    for (let i = 0; i < camposFormEdit.length; i++)
        if(!camposFormEdit[i].isValid)
        return  // Si hay un campo invalido salir de  la funcion registrar


    let category = {
        category: $('#txt-category-edit').val(),
        description: $('#txt-description-edit').val(),
    }

    return category
    
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


function llenarCategories(){
    $('#tbl-categories').DataTable({
        pageLength: 5,
        searching: true,
        ordering: true,
        paging: true,
        responsive: true,
        ajax: {
            "url": "/admin/categories/categories",
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
                "targets": 2,
                "className": "text-center"
            }
        ],
        columns : [ 
            {data : "category", title:"Nombre categoria"}, 
            {data: "description", title: "Descripcion"},

            {data: null, title: "Accion",
                render: function (data, type, row) {
                    return `<div class="accion">
                                <button type="button" onclick="fillCategory('${row._id}')" class="btn btn-default btn-sm btn-edit"><span class="far fa-edit edit"></span></button>
                                <button type="button" onclick="deleteCategory('${row._id}')" class="btn btn-default btn-sm btn-delete"><span class="far fa-trash-alt trash"></span></button>
                            </div>`;
                    
            }}
        ]
    });

}

function createCategory(){
    let category = validarRegistro()
    if(category != undefined){
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": `/admin/categories/categories`,
            "method": "POST",
            "dataType": "json",
            "headers": {
              "content-type": "application/x-www-form-urlencoded"
            },
            "data":category
          }
    
          $.ajax(settings).done(function(data){
                if(data._id != undefined){
                   $('#tbl-categories').DataTable().ajax.reload(null, false)
                   printMessage(`Categoria ${data.category} agregado con exito!`)
                   limpiarModal()
                }else{
                    printMessage('Erro al agregar la categoria!')
                }
          })
    }
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
            keys: ['enter', 'shift']
            }
        }

     })
}

function limpiarModal(){
    $('#modal-agregar-categoria').modal('toggle')

    $('#txt-category').val('')
    $('#txt-description').val('')
   
    $('#txt-category').removeClass('is-valid')
    $('#txt-description').removeClass('is-valid')
   
}

function limpiarModalEditar(){
    $('#modal-editar-categoria').modal('toggle')

    $('#txt-category-edit').val('')
    $('#txt-description-edit').val('')
   
    $('#txt-category-edit').removeClass('is-valid')
    $('#txt-description-edit').removeClass('is-valid')
    
    
}

function fillCategory(codigo){
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/admin/categories/categories/${codigo}`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }

    $.ajax(settings).done((res)=>{
        $('#txt-category-edit').val(`${res.category}`)
        $('#txt-description-edit').val(`${res.description}`)
       
        $('#modal-footer-edit').html('')
        $('#modal-footer-edit').append(`
            <button id="btn-aceptar-${res._id}" onclick="editCategory('${res._id}')" class="btn btn-primary">Aceptar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        `)
    
        $('#modal-editar-categoria').modal('show')
    })

}

function editCategory(codigo){
    let category = validarRegistroEdit()
    if(category != undefined){
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": `/admin/categories/categories/${codigo}`,
            "method": "PUT",
            "dataType": "json",
            "data": category,
            "headers": {
              "content-type": "application/x-www-form-urlencoded"
            }
        }
    
        $.ajax(settings).done((res)=>{
            if(res.ok == 1){
                $('#tbl-categories').DataTable().ajax.reload(null, false)
                printMessage(`La categoria ${category.category} se ha actualizado con exito!`)
                limpiarModalEditar()
            }
        })
    }

}

function deleteCategory(codigo){
    $.confirm({
        theme: 'material',
        closeIcon: true,
        type: 'blue',
        title:'',
        content:'¿Esta seguro de eliminar esta categoria?',
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
                    "url": `/admin/categories/categories/${codigo}`,
                    "method": "DELETE",
                    "dataType": "json",
                    "headers": {
                      "content-type": "application/x-www-form-urlencoded"
                    }
                  }
            
                $.ajax(settings).done((data)=>{
                   if(data.ok == 1){
                       $('#tbl-categories').DataTable().ajax.reload(null, false)
                       printMessage('La categoria se ha eliminado con exito!')
                   }
                })
            }
          },
          Cancelar:function(){

          }
        }
      })

}