var user = ''
$(document).ready(()=>{
    llenarPost()
    userData()
})

function llenarPost(){
    $('#container-post').html('')
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/user/entries`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
    }

    $.ajax(settings).done((res)=>{
        res.forEach(data => {
            $('#container-post').append(`
                <div class="col-9 mx-auto">
                    <div class="post-preview">
                        <a href="">
                            <h2 class="post-title">
                            ${data.title}
                            </h2>
                        </a>
                        <p class="post-meta">Autor <b>${data.autor[0].firstName} ${data.autor[0].lastName}</b></p>
                        <div id="post-${data._id}">
                            ${data.postHtml}
                        </div>
                        <hr>
                        <div id="post-comments-${data._id}">
                        </div>
                        <div id="form-comment-${data._id}"></div>   
                    </div>
                    <hr>
                </div>
            `)

            if(data.commentary){
                $(`#post-comments-${data._id}`).append(`
                    <i><h4>Comentarios:</h4></i>
                `)
                llenarComentarios(data._id)
            }else{
                $(`#post-comments-${data._id}`).append(`
                    <i><h4>Comentarios:</h4></i>
                    <p>Los comentarios para este post estan desactivados</p>
                `) 
            }
        });


    })
    
}

function llenarComentarios(codigo){
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/admin/comments/commentsByEntry/${codigo}`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
    }

    $.ajax(settings).done((res)=>{
        if(res.length != 0){
            res.forEach(data => {
                if(!data.reported){
                    $(`#post-comments-${codigo}`).append(`
                        <div id="comment-${data._id}">
                            <span style="font-size: 1rem!important"><img src="${data.user[0].avatar}" class="mr-2" style="border-radius: 34px; height: 40px;"><span style="color:gray">${data.user[0].firstName} ${data.user[0].lastName}</span><span style="color: black">  ${data.comment}</span></span>
                        </div>
                        <hr>
                    `)
                }
            });
        }

        $(`#form-comment-${codigo}`).append(`
            <div class="row">
                <div class="col-6">
                    <textarea id="text-comment-${codigo}" style="resize: none" class="form-control"></textarea>
                </div>
                <div class="col-6">
                    <button onclick="commentPost('${codigo}')" class="btn btn-primary" type="button" style="border-radius: 1px; font-size: .7rem">Comentar</button>
                </div>
            </div>
        `)
    })
}




function userData(){
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/user/dataUser`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        },
      }

      $.ajax(settings).done(function(data){
          $('#userId').val(JSON.stringify(data))
      })
}

function commentPost(codigo){
    if($(`#text-comment-${codigo}`).val() == ""){
        printMessage('El comentario esta vacio')
    }else{
        let userData = JSON.parse($('#userId').val())
        let comment = {
            comment: $(`#text-comment-${codigo}`).val(),
            userId: userData._id,
            entryId: codigo,
            reported: false,

        }
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": `/user/comments`,
            "method": "POST",
            "dataType": "json",
            "headers": {
              "content-type": "application/x-www-form-urlencoded"
            },
            "data": comment
          }
    
          $.ajax(settings).done(function(data){
              if(data._id != undefined){
                $(`#post-comments-${codigo}`).append(`
                    <div id="comment-${data._id}">
                        <span style="font-size: 1rem!important"><img src="${userData.avatar}" class="mr-2" style="border-radius: 34px; height: 40px;"><span style="color:gray">${userData.firstName} ${userData.lastName}</span><span style="color: black">  ${data.comment}</span></span>
                    </div>
                    <hr>
                `)
                $(`#text-comment-${codigo}`).val("")
                printMessage('Ha comentado con exito')

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