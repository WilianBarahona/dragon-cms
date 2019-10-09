$(document).ready(function() {
    llenarUsuarios()
});

$("#txt-email").keyup(()=> { 
    validarEmail('txt-email')
});

$("#txt-email-edit").keyup(()=> { 
    validarEmail('txt-email-edit')
});

$('#btn-nuevo-usuario').click(()=>{
    $('#modal-agregar-usuario').modal('show')
})

$('#btn-agregar-usuario').click(()=>{
   createUser()
})

/*
=====================================
=============Validaciones===============
=====================================
*/
let camposForm = [
    {id:'txt-nombre', isValid:false},
    {id:'txt-apellido', isValid:false},
    {id:'txt-email', isValid:false},
    {id:'txt-password', isValid:false},
]

let camposFormEdit = [
    {id:'txt-nombre-edit', isValid:false},
    {id:'txt-apellido-edit', isValid:false},
    {id:'txt-email-edit', isValid:false},
]

function validarRegistro(){
    for (let i = 0; i < camposForm.length; i++)
      camposForm[i].isValid = marcarInput(camposForm[i].id,($(`#${camposForm[i].id}`).val() == "" || $(`#${camposForm[i].id}`).val() == 0) ? false : true)
    
    let email = validarEmail('txt-email')
    if(!email) return

    for (let i = 0; i < camposForm.length; i++)
        if(!camposForm[i].isValid)
        return  // Si hay un campo invalido salir de  la funcion registrar


    let user = {
        firstName: $('#txt-nombre').val(),
        lastName: $('#txt-apellido').val(),
        email: $('#txt-email').val(),
        password: $('#txt-password').val(),
        type: 'Admin'
    }

    return user
    
}

function validarRegistroEdit(){
    for (let i = 0; i < camposFormEdit.length; i++)
      camposFormEdit[i].isValid = marcarInput(camposFormEdit[i].id,($(`#${camposFormEdit[i].id}`).val() == "" || $(`#${camposFormEdit[i].id}`).val() == 0) ? false : true)
    
    let email = validarEmail('txt-email-edit')
    if(!email) return

    for (let i = 0; i < camposFormEdit.length; i++)
        if(!camposFormEdit[i].isValid)
        return  // Si hay un campo invalido salir de  la funcion registrar


    let user = {
        firstName: $('#txt-nombre-edit').val(),
        lastName: $('#txt-apellido-edit').val(),
        email: $('#txt-email-edit').val(),
    }

    return user
    
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


function validarEmail(id){
    let reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let reTest = reEmail.test($(`#${id}`).val())
    marcarInput(`${id}`,reTest)
    return reTest
}




function llenarUsuarios(){
    $('#tbl-users').DataTable({
        pageLength: 5,
        searching: true,
        ordering: true,
        paging: true,
        responsive: true,
        ajax: {
            "url": "/admin/users/users",
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
                "targets": 2, // columna (Rol)
                "className": "text-center"
            },
            {
                "targets": 3, // columna (Accion)
                "className": "text-center"
            }
        ],
        columns : [ 
            {data : null, title:"Miembro del equipo",
                render:function (data, type, row){
                    return `<span><img src="${row.avatar}" class="mr-2" style="border-radius: 34px; height: 40px;">${row.firstName} ${row.lastName}</span>`
            }}, 

            {data: "email", title: "Email"},

            { data: null, title: "Rol",
            render: function (data, type, row) {
                if(row.type == 'Admin'){
                    return `<span class="badge badge-success" style="width:55%;">Administrador</span>`
                }else{
                    return `<span class="badge badge-secondary" style="width:55%;">Registrado</span>`
                }
            }},

            {data: null, title: "Accion",
                render: function (data, type, row) {
                    if(row.email == 'admin@dragoncms.com'){
                        return `<div class="accion">
                                    <button type="button" onclick="printMessage('El Administrador por defecto no se puede editar')" class="btn btn-default btn-sm btn-edit"><span class="far fa-edit edit"></span></button>
                                    <button type="button" onclick="printMessage('El Administrador por defecto no se puede eliminar')" class="btn btn-default btn-sm btn-delete"><span class="far fa-trash-alt trash"></span></button>
                                </div>`;
                    }else{
                        if(row.type == 'Admin' ){
                            return `<div class="accion">
                                        <button type="button" onclick="fillUser('${row._id}')" class="btn btn-default btn-sm btn-edit"><span class="far fa-edit edit"></span></button>
                                        <button type="button" onclick="deleteUser('${row._id}')" class="btn btn-default btn-sm btn-delete"><span class="far fa-trash-alt trash"></span></button>
                                    </div>`;
                        }else{
                            return `<div class="accion">
                                        <button type="button" onclick="printMessage('No puede modificar un usuario registrado!')" class="btn btn-default btn-sm btn-edit"><span class="far fa-edit edit"></span></button>
                                        <button type="button" onclick="printMessage('No puede eliminar un usuario registrado!')" class="btn btn-default btn-sm btn-delete"><span class="far fa-trash-alt trash"></span></button>
                                    </div>`;
                        }
                    }
            }}
        ]
    });
}

function createUser(){
    let user = validarRegistro()
    if(user != undefined){
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": `/admin/users/users`,
            "method": "POST",
            "dataType": "json",
            "headers": {
              "content-type": "application/x-www-form-urlencoded"
            },
            "data":user
          }
    
          $.ajax(settings).done(function(data){
                if(data._id != undefined){
                   $('#tbl-users').DataTable().ajax.reload(null, false)
                   printMessage(`Usuario ${data.firstName} ${data.lastName} agregado con exito!`)
                   limpiarModal()
                }else{
                    printMessage('El email no se puede repetir')
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
    $('#modal-agregar-usuario').modal('toggle')

    $('#txt-nombre').val('')
    $('#txt-apellido').val('')
    $('#txt-email').val(''),
    $('#txt-password').val('')

    $('#txt-nombre').removeClass('is-valid')
    $('#txt-apellido').removeClass('is-valid')
    $('#txt-email').removeClass('is-valid')
    $('#txt-password').removeClass('is-valid')
    
}

function limpiarModalEditar(){
    $('#modal-editar-usuario').modal('toggle')

    $('#txt-nombre-edit').val(''),
    $('#txt-apellido-edit').val(''),
    $('#txt-email-edit').val(''),
   
    $('#txt-nombre-edit').removeClass('is-valid')
    $('#txt-apellido-edit').removeClass('is-valid')
    $('#txt-email-edit').removeClass('is-valid')
    
    
}

function fillUser(codigo){
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/admin/users/users/${codigo}`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }

    $.ajax(settings).done((res)=>{
        $('#txt-nombre-edit').val(`${res.firstName}`)
        $('#txt-apellido-edit').val(`${res.lastName}`)
        $('#txt-email-edit').val(`${res.email}`)
      
        $('#modal-footer-edit').html('')
        $('#modal-footer-edit').append(`
            <button id="btn-aceptar-${res._id}" onclick="editUser('${res._id}')" class="btn btn-primary">Aceptar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        `)
    
        $('#modal-editar-usuario').modal('show')
    })
}

function editUser(codigo){
    let user = validarRegistroEdit()
    if(user != undefined){
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": `/admin/users/users/${codigo}`,
            "method": "PUT",
            "dataType": "json",
            "data": user,
            "headers": {
              "content-type": "application/x-www-form-urlencoded"
            }
        }
    
        $.ajax(settings).done((res)=>{
            if(res.ok == 1){
                $('#tbl-users').DataTable().ajax.reload(null, false)
                printMessage(`El usuario ${user.firstName} ${user.lastName} se ha actualizado con exito!`)
                limpiarModalEditar()
            }
        })
    }

}

function deleteUser(codigo){
    $.confirm({
        theme: 'material',
        closeIcon: true,
        type: 'blue',
        title:'',
        content:'¿Esta seguro de eliminar este usuario?',
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
                    "url": `/admin/users/users/${codigo}`,
                    "method": "DELETE",
                    "dataType": "json",
                    "headers": {
                      "content-type": "application/x-www-form-urlencoded"
                    }
                  }
            
                $.ajax(settings).done((data)=>{
                   if(data.ok == 1){
                       $('#tbl-users').DataTable().ajax.reload(null, false)
                       printMessage('El usuario se ha eliminado con exito!')
                   }
                })
            }
          },
          Cancelar:function(){

          }
        }
      })

}
