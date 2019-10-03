$(document).ready(()=>{
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