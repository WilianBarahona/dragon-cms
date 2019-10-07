$(document).ready(()=>{
    viewCardNumbers()
    viewChart()
})

function viewCardNumbers(){
    let post = {
        "async": true,
        "crossDomain": true,
        "url": `/admin/entries/number`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }

      $.ajax(post).done(res=>{
            $('#number-entries').html(`${res.number}`)
      })

      let files = {
        "async": true,
        "crossDomain": true,
        "url": `/admin/files-bank/number`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }

      $.ajax(files).done(res=>{
            $('#number-files').html(`${res.number}`)
      })

      let users = {
        "async": true,
        "crossDomain": true,
        "url": `/admin/users/number`,
        "method": "GET",
        "dataType": "json",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      }

      $.ajax(users).done(res=>{
            $('#number-users').html(`${res.number}`)
      })
}

function viewChart(){
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": `/admin/files-bank/files/`,
      "method": "GET",
      "dataType": "json",
      "headers": {
        "content-type": "application/x-www-form-urlencoded"
      }
    }

    $.ajax(settings).done((res)=>{
      let images = 0;
      let videos = 0;
      let others = 0;
      let data = []
      res.forEach(elem => {
          if(elem.category == 'image'){
            images = images + 1
          }else{
            if(elem.category == 'video'){
              videos = videos + 1
            }else{
              others = others + 1
            }
          }
      });

      pieChart([images, videos, others])
    })
}

function pieChart(dataArray){
  var ctx = document.getElementById("chart-files");
  var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ["Imagenes", "Videos", "Otros"],
      datasets: [{
        data: dataArray,
        backgroundColor: ['#3b5998', '#00AAA7', '#5a5c69'],
        hoverBackgroundColor: ['#233d75', '#039491', '#6e707e'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      cutoutPercentage: 80,
    },
  });

}