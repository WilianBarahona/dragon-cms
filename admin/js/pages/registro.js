$(document).ready(function() {
    $(".loader").fadeOut(200);
 });
 
$("#btn-registrarse").click(()=> {  
   createUser()
 });

$("#txt-email").keyup(()=> { 
  validarEmail()
});


/*
=====================================
=============Validaciones===============
=====================================
*/
let camposForm = [
   {id:'txt-nombre', isValid:false},
   {id:'txt-apellido', isValid:false},
   {id:'txt-email', isValid:false},
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
        firstName: $('#txt-nombre').val(),
        lastName: $('#txt-apellido').val(),
        email: $('#txt-email').val(),
        password: $('#txt-password').val(),
        type: 'Admin'
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

 function validarEmail(){
    let reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let reTest = reEmail.test($("#txt-email").val())
    marcarInput("txt-email",reTest)
    return reTest
 }

 function createUser(){
   let user = validarRegistro()
   if(user != undefined){
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": `/user/registro`,
      "method": "POST",
      "dataType": "json",
      "headers": {
        "content-type": "application/x-www-form-urlencoded"
      },
      "data":user
    }

    $.ajax(settings).done(function(data){

    })
   }
 }


function printMessage(msg){
  $.alert({
      title:'',
      content: `${msg}`,
      type:'blue',
      closeIcon: function(){
        return  window.location.href = 'login'
      },
      closeIconClass: 'fas fa-times',
      theme: 'material',
      buttons: {
          Ok: {
            text: 'Ok',
            btnClass: 'btn-primary',
            keys: ['enter', 'shift'],
            action:function(){
              window.location.href = 'login'
            }
          }
      }

   })
}