$(document).ready(()=>{
    CKEDITOR.replace('editor1', {
        uiColor: ''
    });

    $('#btn-create-entry').click(()=>{
        validarRegistro()
    })
    
/*
=====================================
=============Validaciones===============
=====================================
*/
let camposForm = [
  //  {id:'txt-email', isValid:false},
    {id:'txt-title-entry', isValid:false}
  ]
  
  
function validarRegistro(){
  for (let i = 0; i < camposForm.length; i++)
    camposForm[i].isValid = marcarInput(camposForm[i].id,($(`#${camposForm[i].id}`).val() == "" || $(`#${camposForm[i].id}`).val() == 0) ? false : true)
  
  
  for (let i = 0; i < camposForm.length; i++)
    if(!camposForm[i].isValid)
      return  // Si hay un campo invalido salir de  la funcion registrar


  let json = {
    email: $('#txt-title-entry').val(),
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
  

})
  