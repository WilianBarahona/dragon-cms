$(document).ready(function() {
    $(".loader").fadeOut(200);
    // llenarUsuarios()
});

$("#txt-email").keyup(()=> { 
    validarEmail()
});

$('#btn-nuevo-usuario').click(()=>{
    $('#modal-agregar-usuario').modal('show')
})

$('#btn-agregar-usuario').click(()=>{
    validarRegistro()
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


function validarRegistro(){
    for (let i = 0; i < camposForm.length; i++)
        camposForm[i].isValid = marcarInput(camposForm[i].id,($(`#${camposForm[i].id}`).val() == "" || $(`#${camposForm[i].id}`).val() == 0) ? false : true)
    
    let email = validarEmail()

    for (let i = 0; i < camposForm.length; i++)
        if(!camposForm[i].isValid)
            return  // Si hay un campo invalido salir de  la funcion registrar

    if(!email)
        return

    let user = {
        nombre: $('#txt-nombre').val(),
        apellido: $('#txt-apellido').val(),
        email: $('#txt-email').val(),
        password: $('#txt-password').val()
    }

    console.log(user)
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


function validarEmail(){
    let reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let reTest = reEmail.test($("#txt-email").val())
    marcarInput("txt-email",reTest)
    return reTest
}




// function llenarUsuarios(){
//     $('#table-users').DataTable({
//         pageLength: 5,
//         searching: true,
//         ordering: true,
//         paging: true,
//         responsive: true,
//         ajax: 'test/data.json',
//         tabIndex: null,
//         language: {
//             url: "vendor/data-tables/spanish.json",
//             oPaginate: {
//                 sNext: '<i class="fas fa-forward"></i>',
//                 sPrevious: '<i class="fas fa-backward"></i>'
//             }
//             },
//             columnDefs: [
//         {
//             "targets": 2, // columna (Rol)
//             "className": "text-center"
//         },
//         {
//             "targets": 3, // columna (Accion)
//             "className": "text-center"
//         }
//         ],
//         columns : [ 
//             {data : "name", title:"Miembro del equipo",
//             render:function (data, type, row){
//             return `<span><img src="img/user.jpg" class="mr-2" style="border-radius: 34px; height: 40px;">${row.name}</span>`
//             }}, 
//             {data: "email", title: "Email"},
//             { data: "rol", title: "Rol",
//             render: function (data, type, row) {
//             if(row.rol == "Administrador"){
//                 return `<span class="badge badge-success" style="width:55%;">${row.rol}</span>`
//             }
//             if(row.rol == "Registrado"){
//                 return `<span class="badge badge-info" style="width:55%;">${row.rol}</span>`
//             }
//             if(row.rol == "No registrado"){
//                 return `<span class="badge badge-secondary" style="width:55%;">${row.rol}</span>`
//             }
//         }},
//         { data: null, title: "Accion",
//             render: function (data, type, row) {
//             return `<div class="accion">
//                         <button type="button" class="btn btn-default btn-sm btn-edit"><span class="far fa-edit edit"></span></button>
//                         <button type="button" class="btn btn-default btn-sm btn-delete"><span class="far fa-trash-alt trash"></span></button>
//                     </div>`;
//         }},
                    
//         ]
//     });
// }