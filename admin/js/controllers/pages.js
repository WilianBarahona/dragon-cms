$(document).ready(()=>{
    llenarPages()
})

$('#btn-new-page').click(()=>{
  window.location.href='/admin/new-page'
})

/*
=====================================
=============Validaciones===============
=====================================
*/
let camposForm = [
    {id:'txt-title', isValid:false},
    {id:'txt-description', isValid:false},
    {id:'txt-menu-title', isValid:false},
    {id:'txt-url', isValid:false},
    {id:'txt-keywords', isValid:false},
    {id:'slc-parent-page', isValid:false},
    {id:'slc-status', isValid:false},
    {id:'slc-header', isValid:false},
    {id:'slc-menu', isValid:false},
    {id:'slc-footer', isValid:false},
    {id:'slc-breadcrumb', isValid:false},
  ]
  
  
function validarRegistro(){
    for (let i = 0; i < camposForm.length; i++)
      camposForm[i].isValid = marcarInput(camposForm[i].id,($(`#${camposForm[i].id}`).val() == "" || $(`#${camposForm[i].id}`).val() == 0) ? false : true)
    
    
    for (let i = 0; i < camposForm.length; i++)
      if(!camposForm[i].isValid)
        return  // Si hay un campo invalido salir de  la funcion registrar
  
    let pageCkeditor = CKEDITOR.instances["editor-page"].getData()
  
    if(pageCkeditor == '')
      return printMessage('El contenido del post no puede estar vacio')
    
    
    let pageHtml = getPageHtml()
  
    let page = {
        title: $('#txt-title').val(),
        description: $('#txt-description').val(),
        menuTitle: $('#txt-menu-title').val(),
        keywords: $('#txt-keywords').val(),
        status: ($('#slc-status').val() == "1") ? true : false,
        parentPage: $('#slc-parent-page').val(),
        url: $('#txt-url').val(),
        options: {
          header: ($('#slc-header').val() == "1") ? true : false,
          footer: ($('#slc-footer').val() == "1") ? true : false,
          menu: ($('#slc-menu').val() == "1") ? true : false,
          breadcrumb: ($('#slc-breadcrumb').val() == "1") ? true : false
        },
        settings: null,
        type: 'static',
        pageHtml: pageHtml,
        pageCkeditor: pageCkeditor
    }
  
    return page
    
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
  


function llenarPages(){
    $('#tbl-pages').DataTable({
        pageLength: 5,
        searching: true,
        ordering: true,
        paging: true,
        responsive: true,
        ajax: {
            "url": "/admin/pages/pages",
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
                "targets": 6, 
                "className": "text-center"
            }
        ],
        columns : [ 
            {data : "_id", title:"Codigo"},
            {data : "title", title:"Pagina"},
            { data: null, title: "Estado",
             render: function (data, type, row) {
                if(row.status){
                    return `<span class="badge badge-success" style="width:70%;">Activa</span>`
                }else{
                    return `<span class="badge badge-secondary" style="width:70%;">Inactiva</span>`
                }
            }},
            { data: null, title: "Encabezado",
             render: function (data, type, row) {
                if(row.options.header){
                    return `<span class="badge badge-success" style="width:70%;">Si</span>`
                }else{
                    return `<span class="badge badge-secondary" style="width:70%;">No</span>`
                }
            }},
            { data: null, title: "Footer",
             render: function (data, type, row) {
                if(row.options.footer){
                    return `<span class="badge badge-success" style="width:70%;">Si</span>`
                }else{
                    return `<span class="badge badge-secondary" style="width:70%;">No</span>`
                }
            }},
            { data: null, title: "Menu",
            render: function (data, type, row) {
               if(row.options.menu){
                   return `<span class="badge badge-success" style="width:70%;">Si</span>`
               }else{
                   return `<span class="badge badge-secondary" style="width:70%;">No</span>`
               }
           }},

            {data: null, title: "Accion",
                render: function (data, type, row) {
                    if(row.type == 'principal'){
                        return `<div class="accion">
                                <button type="button" onclick="printMessage('La pagina por defecto debera actualizarla en configuraciones del sitio')" class="btn btn-default btn-sm btn-edit"><span class="far fa-edit edit"></span></button>
                                <button type="button" onclick="printMessage('No se puede eliminar la pagina por defecto')" class="btn btn-default btn-sm btn-delete"><span class="far fa-trash-alt trash"></span></button>
                            </div>`;
                    }else{
                        return `<div class="accion">
                                <button type="button" onclick="fillPage('${row._id}')" class="btn btn-default btn-sm btn-edit"><span class="far fa-edit edit"></span></button>
                                <button type="button" onclick="deletePage('${row._id}')" class="btn btn-default btn-sm btn-delete"><span class="far fa-trash-alt trash"></span></button>
                            </div>`;
                    }
                    
            }}
        ]
    });
    
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

function deletePage(codigo){
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
                    "url": `/admin/pages/pages/${codigo}`,
                    "method": "DELETE",
                    "dataType": "json",
                    "headers": {
                      "content-type": "application/x-www-form-urlencoded"
                    }
                  }
            
                $.ajax(settings).done((data)=>{
                   if(data.ok == 1){
                       $('#tbl-pages').DataTable().ajax.reload(null, false)
                       printMessage('La pagina se ha eliminado con exito!')
                   }
                })
            }
          },
          Cancelar:function(){

          }
        }
      })

}

function fillPage(codigo){
    $("#container").html(`
        <div class="row pages">
                <div class="col-12 mb-1">
                    <h2>Nueva Pagina</h2>
                    <hr>
                </div>
                <div class="col-12 mb-4">
                    <div class="row">
                    <div class="col-6 mb-2">
                        <input id="txt-title" type="text" class="form-control" placeholder="Titulo de la pagina">
                        <div class="text-left invalid-feedback">Titulo vacio</div>                  
                    </div>
                    <div class="col-6 mb-2">
                        <input id="txt-description" type="text" class="form-control" placeholder="Descripción">
                        <div class="text-left invalid-feedback">Descripcion vacia</div>                  
                    </div>
                    <div class="col-6 mb-2">
                        <input id="txt-menu-title" type="text" class="form-control" placeholder="Titulo del menu">
                        <div class="text-left invalid-feedback">Titulo menu vacio</div>                  
                    </div>
                    <div class="col-6 mb-2">
                        <input id="txt-url" type="text" class="form-control" placeholder="Url">
                        <div class="text-left invalid-feedback">Url vacio</div>                  
                    </div>
                    <div class="col-6 mb-2">
                        <input id="txt-keywords" type="text" class="form-control" placeholder="Palabras claves">
                        <div class="text-left invalid-feedback">Campo vacio</div>                  
                    </div>
                    <div class="col-6 mb-2">
                        <select id="slc-status" class="form-control font-09rem">
                            <option value="0">Estado de la pagina</option>
                            <option value="1">Activa</option>
                            <option value="2">Inactiva</option>
                        </select>    
                        <div class="text-left invalid-feedback">Seleccione una opción</div>                  
                    </div>
                    <div class="col-6 mb-2">
                        <select id="slc-parent-page" class="form-control font-09rem">
                            <option value="0">Pagina padre</option>
                        </select>    
                        <div class="text-left invalid-feedback">Seleccione una opción</div>                  
                    </div>
                    </div>
                </div>
                <div class="col-12 mb-1">
                    <h4>Otras opciones</h4>
                    <hr>
                </div>
                <div class="col-12 mb-4">
                    <div class="row">
                        <div class="col-6 mb-2">
                            <select id="slc-header" class="form-control font-09rem">
                                <option value="0">¿Incluir encabezado?</option>
                                <option value="1">Si</option>
                                <option value="2">No</option>
                            </select>    
                            <div class="text-left invalid-feedback">Seleccione una opción</div>                  
                        </div>
                        <div class="col-6 mb-2">
                            <select id="slc-footer" class="form-control font-09rem">
                                <option value="0">¿Incluir pie de pagina?</option>
                                <option value="1">Si</option>
                                <option value="2">No</option>
                            </select>    
                            <div class="text-left invalid-feedback">Seleccione una opción</div>                  
                        </div>
                        <div class="col-6 mb-2">
                            <select id="slc-menu" class="form-control font-09rem">
                                <option value="0">¿Incluir menu?</option>
                                <option value="1">Si</option>
                                <option value="2">No</option>
                            </select>    
                            <div class="text-left invalid-feedback">Seleccione una opción</div>                  
                        </div>
                        <div class="col-6 mb-2">
                            <select id="slc-breadcrumb" class="form-control font-09rem">
                                <option value="0">¿Incluir breadcrumb</option>
                                <option value="1">Si</option>
                                <option value="2">No</option>
                            </select>    
                            <div class="text-left invalid-feedback">Seleccione una opción</div>                  
                        </div>
                        <div class="col-6 mt-3">
                            <button id="btn-edit-page" type="button" class="btn btn-success">Aceptar</button>
                            <button id="btn-view-page" type="button" class="btn btn-primary" style="font-size: 0.9rem!important">Vista previa</button>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <textarea  id="editor-page" name="editor-page"></textarea>
                </div>
            </div>
    `)

    CKEDITOR.replace('editor-page', {
        extraPlugins: 'codemirror',
      });
  
    CKEDITOR.config.height = '70vh'

    llenarPagesSelect()

    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/admin/pages/pages/${codigo}`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }
  
      $.ajax(settings).done((res)=>{
            $('#txt-title').val(`${res.title}`)
            $('#txt-description').val(`${res.description}`)
            $('#txt-menu-title').val(`${res.menuTitle}`)
            $('#txt-keywords').val(`${res.keywords}`)
            if(status){
                $('#slc-status').val('1')
            }else{
                $('#slc-status').val('2')
            }
            $('#slc-parent-page').val(`${res.parentPage}`),
            $('#txt-url').val(`${res.url}`)
            if(res.options.header){
                $('#slc-header').val('1')
            }else{
                $('#slc-header').val('2')
            }
            if(res.options.footer){
                $('#slc-footer').val('1')
            }else{
                $('#slc-footer').val('2')
            }
            if(res.options.menu){
                $('#slc-menu').val('1')
            }else{
                $('#slc-menu').val('2')
            }
            if(res.options.breadcrumb){
                $('#slc-breadcrumb').val('1')
            }else{
                $('#slc-breadcrumb').val('2')
            }
        
            CKEDITOR.instances["editor-page"].setData(res.pageCkeditor)

            $('#btn-view-page').click(()=>{
                viewPage()
            })
      
            $('#btn-edit-page').click(()=>{
              editPage(codigo)
            })
            

      })

}


function llenarPagesSelect(){
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/admin/pages/pages`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }
    
      $.ajax(settings).done((res)=>{
          res.forEach(elem => {
             $('#slc-parent-page').append(`
                <option value="${elem._id}">${elem.title}</option>
             `)
          });
      })
}

function viewPage(){
    let pagehtml = getPageHtml()
    $('#container-view-page').html(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            ${pagehtml}
        </body>
        </html>
    `)
    
    $('#modal-vista-previa-pagina').modal('show')
         
}


function getPageHtml(){
    let ckeditorHTML = (CKEDITOR.instances["editor-page"].getData()).split('\n')
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

function editPage(codigo){
    let page = validarRegistro()
    if(page != undefined){
      let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/admin/pages/pages/${codigo}`,
        "method": "PUT",
        "dataType": "json",
        "data": page,
        "headers": {
            "contentType": 'application/json'
        }
      }
  
      $.ajax(settings).done((res)=>{
          if(res.ok == 1){
              printMessageEdit(`Pagina ${page.title} actualizado con exito!`)
          }
      })
    }
  }

function printMessageEdit(msg){
    $.alert({
        title:'',
        content: `${msg}`,
        type:'blue',
        closeIcon: function(){
          return  window.location.href = '/admin/pages'
        },
        closeIconClass: 'fas fa-times',
        theme: 'material',
        buttons: {
            Ok: {
              text: 'Ok',
              btnClass: 'btn-primary',
              keys: ['enter', 'shift'],
              action:function(){
                window.location.href = '/admin/pages'
              }
            }
        }
  
     })
  }
  