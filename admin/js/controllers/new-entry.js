$(document).ready(()=>{
    CKEDITOR.replace('editor-entry', {
      extraPlugins: 'codemirror',
    });

    CKEDITOR.config.height = '80vh'

    llenarCategorias()
})


$('#btn-create-entry').click(()=>{
  createEntry()
})

$('#btn-view-entry').click(()=>{
  viewEntry()
})
  
/*
=====================================
=============Validaciones===============
=====================================
*/
let camposForm = [
    {id:'txt-title-entry', isValid:false},
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

  let postCkeditor = CKEDITOR.instances["editor-entry"].getData()
  
  if(postCkeditor == '')
    return printMessage('El contenido del post no puede estar vacio')
  
  // autorName: $('#slc-autor option:selected').text(),
  //postHtml: post.replace(/\n/g, '')
  let postHtml = getEntryHtml()

  let entry = {
      title: $('#txt-title-entry').val(),
      autorId: $('#userId').val(),
      imageId: $('#txt-img').val(),
      categoryId: $('#slc-category').val(),
      commentary: ($('#slc-comentario').val() == "1") ? true : false,
      postHtml: postHtml,
      postCkeditor: postCkeditor
     
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

function getEntryHtml(){
  let ckeditorHTML = (CKEDITOR.instances["editor-entry"].getData()).split('\n')
  let post = ''
  ckeditorHTML.forEach(line => {
    let str = line.replace(/&#39;/g, '\"').replace(/&quot;/g, '\"').replace(/&nbsp;/g, '')
    let json =  extractJSON(`'${str}'`)
    if(json != undefined){
      if(json.tipo != undefined){
          let embed = embedElement(json)
          post+=embed
      }
    }else{
      post+= line
    }
   
  });

 return post

}


function extractJSON(str) {
  var firstOpen, firstClose, candidate;
  firstOpen = str.indexOf('{', firstOpen + 1);
  do {
      firstClose = str.lastIndexOf('}');
      // console.log('firstOpen: ' + firstOpen, 'firstClose: ' + firstClose);
      if(firstClose <= firstOpen) {
          return null;
      }
      do {
          candidate = str.substring(firstOpen, firstClose + 1);
          // console.log('candidate: ' + candidate);
          try {
              var res = JSON.parse(candidate);
              // console.log('...found');
              // return [res, firstOpen, firstClose + 1];
              return res
          }
          catch(e) {
              // console.log('...failed');
          }
          firstClose = str.substr(0, firstClose).lastIndexOf('}');
      } while(firstClose > firstOpen);
      firstOpen = str.indexOf('{', firstOpen + 1);
  } while(firstOpen != -1);
}

function embedElement(json){
    //ShortCut image
    if(json.tipo == 'imagen'){
      if(json.id != undefined){
          let response = ''
          let style = ''
          if(json.estilo != undefined){
            if(json.estilo != 'izquierda' && json.estilo != 'derecha' && json.estilo != 'centro'){
              style = 'center'
            }else{
              if(json.estilo == 'izquierda'){
                style = 'left'
              }
              if(json.estilo == 'derecha'){
                style = 'right'
              }
              if(json.estilo == 'centro'){
                style = 'center'
              }
            }
          }else{
            style = 'center'
          }
          let settings = {
            "async": false,
            "crossDomain": true,
            "url": `/admin/files-bank/files/${json.id}`,
            "method": "GET",
            "dataType": "json",
            "headers": {
              "content-type": "application/x-www-form-urlencoded"
            }
          }

          $.ajax(settings).done((res)=>{
            if(res.category == 'image'){
              response = `<div style=" text-align: ${style};">
                              <img src="${res.url}" style="width: 50%; height: auto;">
                          </div>    
                          <br>`
            }
          })

          return response
        }
    }
    
    //Shortcut video
    if(json.tipo == 'video'){
      if(json.id != undefined){
          let response = ''
          let style = ''
          if(json.estilo != undefined){
            if(json.estilo != 'izquierda' && json.estilo != 'derecha' && json.estilo != 'centro'){
              style = 'center'
            }else{
              if(json.estilo == 'izquierda'){
                style = 'left'
              }
              if(json.estilo == 'derecha'){
                style = 'right'
              }
              if(json.estilo == 'centro'){
                style = 'center'
              }
            }
          }else{
            style = 'center'
          }
          let settings = {
            "async": false,
            "crossDomain": true,
            "url": `/admin/files-bank/files/${json.id}`,
            "method": "GET",
            "dataType": "json",
            "headers": {
              "content-type": "application/x-www-form-urlencoded"
            }
          }

          $.ajax(settings).done((res)=>{
            if(res.category == 'video'){
              response = `<div style=" text-align: ${style};">
                              <video controls preload="none" style="width: 50%; height: auto;">
                                    <source src="${res.url}" type="${res.mimeType}">
                              </video>
                          </div>
                          <br>`
            }
          })

          return response
      }
    }

    //Shortcut audio
    if(json.tipo == 'audio'){
      if(json.id != undefined){
          let response = ''
          let style = ''
          if(json.estilo != undefined){
            if(json.estilo != 'izquierda' && json.estilo != 'derecha' && json.estilo != 'centro'){
              style = 'center'
            }else{
              if(json.estilo == 'izquierda'){
                style = 'left'
              }
              if(json.estilo == 'derecha'){
                style = 'right'
              }
              if(json.estilo == 'centro'){
                style = 'center'
              }
            }
          }else{
            style = 'center'
          }
          let settings = {
            "async": false,
            "crossDomain": true,
            "url": `/admin/files-bank/files/${json.id}`,
            "method": "GET",
            "dataType": "json",
            "headers": {
              "content-type": "application/x-www-form-urlencoded"
            }
          }

          $.ajax(settings).done((res)=>{
            if(res.category == 'audio'){
              response = `<div style=" text-align:${style};">
                              <audio  controls="" style="width: 50%;">
                                  <source src="${res.url}" type="${res.mimeType}">
                              </audio>
                          </div>
                          <br>`
            }
          })

          return response
      }
    }


    //Shortcut galeria de imagenes
    if(json.tipo == 'galeria'){
      if(json.imagenes != undefined && json.imagenes.length != 0){
        let response = ''
        json.imagenes.forEach(elem =>{
              let settings = {
              "async": false,
              "crossDomain": true,
              "url": `/admin/files-bank/files/${elem}`,
              "method": "GET",
              "dataType": "json",
              "headers": {
                "content-type": "application/x-www-form-urlencoded"
              }
            }

            $.ajax(settings).done((res)=>{
              if(res.category == 'image'){
                response += `<img src="${res.url}" style="width: 50%; height: auto;">`
              }
            })
        })
        return response + '<br>'
      }
    
    }

    //Shortcut enlaces
    if(json.tipo == 'enlace'){
      if(json.id != undefined && json.titulo != undefined){
          let response = ''
          let settings = {
            "async": false,
            "crossDomain": true,
            "url": `/admin/files-bank/files/${json.id}`,
            "method": "GET",
            "dataType": "json",
            "headers": {
              "content-type": "application/x-www-form-urlencoded"
            }
          }

          $.ajax(settings).done((res)=>{
            if(res._id != undefined){
              response = `<a href="${res.url}" download>${json.titulo}</a><br>`
            }
          })

          return response
        }
    }

     //Shortcut entradas
     if(json.tipo == 'entrada'){
      if(json.id != undefined){
          let response = ''
          let settings = {
            "async": false,
            "crossDomain": true,
            "url": `/admin/entries/entries/${json.id}`,
            "method": "GET",
            "dataType": "json",
            "headers": {
              "content-type": "application/x-www-form-urlencoded"
            }
          }

          $.ajax(settings).done((res)=>{
            if(res[0]._id != undefined){
              let post = res[0].postHtml
              response = post
            }
          })

          return response
        }
    }

}

function viewEntry(){
  let posthtml = getEntryHtml()
  $('#container-view-post').html(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
      </head>
      <body>
        ${posthtml}
      </body>
      </html>
  `)

  $('#modal-vista-previa-entrada').modal('show')


}