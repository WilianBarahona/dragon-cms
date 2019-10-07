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
                "targets": 4, 
                "className": "text-center"
            },
            {
                "targets": 5, 
                "className": "text-center"
            }
        ],
        columns : [ 
            {data : "_id", title:"Codigo"},
            {data : "title", title:"Titulo post"},
            { data: null, title: "Autor",
            render: function (data, type, row) {
                    return `<span>${row.autor[0].firstName} ${row.autor[0].lastName}</span>`
            }},

            {data : "category[0].category", title:"Categoria"},
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

function printMessageEdit(msg){
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
  
function editEntry(codigo){
    let entry = validarRegistro()
    if(entry != undefined){
      let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/admin/entries/entries/${codigo}`,
        "method": "PUT",
        "dataType": "json",
        "data": entry,
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }
  
      $.ajax(settings).done((res)=>{
          if(res.ok == 1){
              printMessageEdit(`Post ${entry.title} actualizado con exito!`)
          }
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
                response = `<div style="text-align: ${style};">
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

  function fillEntry(codigo){
      $("#container").html(`
        <div class="row entries">
            <div class="col-12 mb-1">
                <h2>Editar entrada</h2>
                <hr>
            </div>
            <div class="col-12 mb-4">
                <div class="row">
                    <div class="col-6 mb-2">
                        <input id="txt-title-entry" type="text" class="form-control font-09rem" placeholder="Titulo de la entrada">
                        <div class="text-left invalid-feedback">Titulo vacio</div>
                    </div>
                    <div class="col-6 mb-2">
                    <input type="text" id="txt-img" class="form-control font-09rem" placeholder="Codigo de imagen representativa">
                    <div class="text-left invalid-feedback">Imagen vacia</div>
                    </div>
                    <div class="col-6 mb-2">
                        <select id="slc-category" class="form-control font-09rem">
                        <option value="0">Seleccione una categoria</option>
                        </select>
                        <div class="text-left invalid-feedback">Seleccione una categoria</div>                      
                    </div>
                    <div class="col-6 mb-2">
                        <select id="slc-comentario" class="form-control font-09rem">
                            <option value="0">¿Permite comentarios?</option>
                            <option value="1">Si</option>
                            <option value="2">No</option>
                        </select>    
                        <div class="text-left invalid-feedback">Seleccione una opción</div>                  
                    </div>
                    <div class="col-12 mt-2">
                        <button id="btn-edit-entry" type="button" class="btn btn-success">Aceptar</button>
                        <button id="btn-view-entry" type="button" class="btn btn-primary" style="font-size: 0.9rem!important">Vista previa</button>
                    </div>
                </div>
            </div>
            <div class="col-12 mb-5">
                <textarea  id="editor-entry" name="editor-entry"></textarea>
            </div>
        </div>    
      `)

      CKEDITOR.replace('editor-entry', {
        extraPlugins: 'codemirror',
      });
  
      CKEDITOR.config.height = '70vh'
  
      llenarCategorias()

      let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/admin/entries/entries/${codigo}`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }
  
      $.ajax(settings).done((res)=>{
            $('#txt-title-entry').val(res[0].title)
            $('#txt-img').val(res[0].image[0]._id)
            $('#slc-category').val(res[0].category[0]._id)
            if(res[0].commentary){
                $('#slc-comentario').val('1')
            }else{
                $('#slc-comentario').val('2')
            }

            CKEDITOR.instances["editor-entry"].setData(res[0].postCkeditor)
            

      })
      
      $('#btn-view-entry').click(()=>{
          viewEntry()
      })

      $('#btn-edit-entry').click(()=>{
        editEntry(codigo)
      })
      
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


