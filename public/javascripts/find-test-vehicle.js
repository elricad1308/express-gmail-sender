const container = $('#results');

function findVehicle(data) {
  return 
}

function dumpSql(results) {
  let data = [],
    siniestro = null,
    found = 0,
    notFound = 0

  container.html('')

  for(var i = 1; i < results.data.length; i++) {
  //for(var i = 1; i < 5; i++) {
    data = {
      modelo: results.data[i][32].trim().replace(/\s\s+/g, ' ', ' '),
      nombre: results.data[i][35].trim().replace(/\s\s+/g, ' ', ' ')
    }

    $.post('http://localhost:3005/express/find-vehicle', data)
      .done((result) => {
        if(result)
          found += 1
        else 
          notFound += 1

        if(result.siniestro != 'NOT FOUND') {
          siniestro = JSON.parse(result.siniestro)
          container.append(`${siniestro.ubicacion.lat},${siniestro.ubicacion.lon}<br>`)
        } else {
          container.append(`0,0<br>`)
        }
      })
      .fail((err) => {
        container.append(`request failed: ${err}<br>`)
      })
  }
  console.log(`found: ${found}, not found: ${notFound}`)
}

function parse(){
  $('#file').parse({
      config: {
          delimiter: ",",
          header: false,
          complete: dumpSql
      }, 
      complete: function(){
          alert('Todas las pruebas procesadas con éxito');
      }
  })
}

$(function(){
  $('#analyze').click(function(evt){
      evt.preventDefault();
      parse();
  });
});