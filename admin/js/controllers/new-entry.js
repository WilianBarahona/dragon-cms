$(document).ready(()=>{
    CKEDITOR.replace('editor-entry', {
      extraPlugins: 'codemirror',
    });

    CKEDITOR.config.height = '70vh'

    llenarCategorias()
    llenarAutores()
})


$('#btn-create-entry').click(()=>{
  createEntry()
})
  
/*
=====================================
=============Validaciones===============
=====================================
*/
let camposForm = [
    {id:'txt-title-entry', isValid:false},
    {id:'slc-autor', isValid:false},
    {id:'txt-img', isValid:false},
    {id:'slc-category', isValid:false},
    {id:'slc-comentario', isValid:false}
  ]
  
  
function validarRegistro(){
  for (let i = 0; i < camposForm.length; i++)
    camposForm[i].isValid = marcarInput(camposForm[i].id,($(`#${camposForm[i].id}`).val() == "" || $(`#${camposForm[i].id}`).val() == 0) ? false : true)
  
  
  for (let i = 0; i < camposForm.length; i++)
    if(!camposForm[i].isValid)
      return  // Si hay un campo invalido salir de  la funcion registrar

  let post = CKEDITOR.instances["editor-entry"].getData()
  
  if(post == '')
    return printMessage('El contenido del post no puede estar vacio')

  let entry = {
      title: $('#txt-title-entry').val(),
      autor: $('#slc-autor').val(),
      image: $('#txt-img').val(),
      commentary: ($('#slc-comentario').val() == "1") ? true : false,
      postHtml: post.replace(/\n/g, '')
  }

  return entry
  
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

function llenarCategorias(){
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": `/admin/categories/categories`,
      "method": "GET",
      "dataType": "json",
      "headers": {
        "content-type": "application/x-www-form-urlencoded"
      }
    }

    $.ajax(settings).done((res)=>{
          res.forEach(elem => {
              $('#slc-category').append(`
                <option value="${elem._id}">${elem.category}</option>
              `)
          });
    })

  }

function llenarAutores(){
  let settings = {
    "async": true,
    "crossDomain": true,
    "url": `/admin/users/users`,
    "method": "GET",
    "dataType": "json",
    "headers": {
      "content-type": "application/x-www-form-urlencoded"
    }
  }

  $.ajax(settings).done((res)=>{
        res.forEach(elem => {
            $('#slc-autor').append(`
              <option value="${elem._id}">${elem.firstName} ${elem.lastName}</option>
            `)
        });
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

function printMessageCreate(msg){
  $.alert({
      title:'',
      content: `${msg}`,
      type:'blue',
      closeIcon: function(){
        return  window.location.href = '/admin/entries'
      },
      closeIconClass: 'fas fa-times',
      theme: 'material',
      buttons: {
          Ok: {
            text: 'Ok',
            btnClass: 'btn-primary',
            keys: ['enter', 'shift'],
            action:function(){
              window.location.href = '/admin/entries'
            }
          }
      }

   })
}

function createEntry(){
  let entry = validarRegistro()
  if(entry != undefined){
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": `/admin/entries/entries`,
      "method": "POST",
      "dataType": "json",
      "data": entry,
      "headers": {
        "content-type": "application/x-www-form-urlencoded"
      }
    }

    $.ajax(settings).done((res)=>{
          printMessageCreate(`Post ${res.title} creado con exito!`)
    })
  }
}