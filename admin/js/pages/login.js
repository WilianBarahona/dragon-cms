$(document).ready(function() {
   $(".loader").fadeOut(200);
});

$("#chk-show").click(()=>{
   if ($('#txt-password').attr('type') == 'text') {
     $('#txt-password').attr('type', 'password');
   } else {
     $('#txt-password').attr('type', 'text');
   }
 })

 $("#btn-ingresar").click(()=> { 
   validarRegistro()
 });

 $("#txt-email").keyup(()=> { 
  validarEmail()
});

$('#txt-password').on('keypress', function (e) {
  if(e.keyCode == 13){
    validarRegistro()
  }
});

$('#txt-email').on('keypress', function (e) {
 if(e.keyCode == 13){
   validarRegistro()
 }
});

/*
=====================================
=============Validaciones===============
=====================================
*/
let camposForm = [
  //  {id:'txt-email', isValid:false},
   {id:'txt-password', isValid:false}
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
     email: $("#txt-email").val(),
     password: $("#txt-password").val()
   }

   let settings = {
      "async": true,
      "crossDomain": true,
      "url": "/user/login",
      "method": "POST",
      "dataType": "json",
      "data": user,
      "headers": {
        "content-type": "application/x-www-form-urlencoded"
      }
    }

  $.ajax(settings).done((res)=>{
     if(res.err == 1){
        $.alert({
          title:'',
          content: `${res.message}`,
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
     }else{
      renderIndex()
    }

  })

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

$('#btn-registro').click(()=>{
  // window.location.href = '/admin/registro'
})

function renderIndex(){
  window.location.href = '/index'
}
 