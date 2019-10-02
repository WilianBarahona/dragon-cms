function logoutUser(){
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "/admin/users/users/logout",
        "method": "POST",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }
  
    $.ajax(settings).done((res)=>{
       console.log(res)
    })
  }