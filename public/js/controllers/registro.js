$(document).ready(function() {
    $(".loader").fadeOut(200);
 });
 
$("#btn-registrarse").click(()=> {  
   validarRegistro()
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
   {id:'txt-password-1', isValid:false},
   {id:'txt-password-2', isValid:false}

 ]
 
 
 function validarRegistro(){
   for (let i = 0; i < camposForm.length; i++)
     camposForm[i].isValid = marcarInput(camposForm[i].id,($(`#${camposForm[i].id}`).val() == "" || $(`#${camposForm[i].id}`).val() == 0) ? false : true)
   
   // let email = validarEmail()
   // if (!validoChk || !validoRadio || !email)
   //   return
   
   for (let i = 0; i < camposForm.length; i++)
     if(!camposForm[i].isValid)
       return  // Si hay un campo invalido salir de  la funcion registrar

    
    let email = validarEmail()
    if(!email)
      return
    


   
 
   let json = {
     email: $("#txt-email").val(),
     password: $("#txt-password").val(),
   }

   console.log(json)
 
   return json
   
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