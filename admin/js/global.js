$(document).ready(()=>{
  $(".loader").fadeOut(200);
  renderDataUser()
})

function renderDataUser(){
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "/admin/users/userData",
      "method": "GET",
      "dataType": "json",
      "headers": {
        "content-type": "application/x-www-form-urlencoded"
      }
    }

    $.ajax(settings).done(function(data){
      $('.img-profile').attr("src", data.avatar);
      $('#user-name').html(`
        <b>${data.firstName} ${data.lastName}</b>
      `)
    })
}

function logoutUser(){
    $.confirm({
      theme: 'material',
      closeIcon: true,
      type: 'blue',
      title:'',
      content:'¿Esta seguro de cerrar sesión?',
      closeIcon: true,
      closeIconClass: 'fas fa-times',
      columnClass: 'small',
      buttons:{
        Cerrar:{
          text:"¡Si, seguro!",
          btnClass:"btn-primary",
          action:function(){
            var settings = {
              "async": true,
              "crossDomain": true,
              "url": "/admin/users/users/logout",
              "method": "POST",
              "dataType": "json",
              "headers": {
                "content-type": "application/x-www-form-urlencoded"
              },
            }

            $.ajax(settings).done(function (res) {
              if(res.ok == 1){
                window.location.href = '/admin/login'
              }
            })
          }
        },
        Cancelar:function(){
        // --
        }
      }
    })
}

function dashboard(){
  window.location.href = '/admin/dashboard'

}
function pages(){
  window.location.href = '/admin/pages'
}

function entries(){
  window.location.href = '/admin/entries'
}

function comments(){
  window.location.href = '/admin/comments'
}

function filesBank(){
  window.location.href = '/admin/files-bank'
}

function menus(){
  window.location.href = '/admin/menus'
}

function breadcrumbs(){
  window.location.href = '/admin/breadcrumbs'
}

function themes(){
  window.location.href = '/admin/themes'
}

function users(){
  window.location.href = '/admin/users'
}

function roles(){
  window.location.href = '/admin/roles'
}

function category(){
  window.location.href = '/admin/categories'
}