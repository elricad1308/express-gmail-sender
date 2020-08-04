function parse(){
    $('#file').parse({
        config: {
            delimiter: ",",
            header: false,
            complete: getCoordsActuales     // Función diseñada para la estructura de la hoja 'Actuales'
            // complete: getCoordsBaja         // Función diseñada para la estructura de la hoja 'Baja'
        },
        complete: function(){
            console.log('All done');
        }
    });
};

async function getCoordsActuales(results){
    var data = results.data;
    var container = $('#results');

    container.html('');

    // Latitud y longitud se añaden al final de la fila como dos nuevas
    // columnas
    data[0].push(['new lat']);
    data[0].push(['new long']);
    container.append(`${data[0].join('|')}<br>`);
    
    for(var i = 1; i < data.length; i++){
        console.log(`processing row ${i}`);

        // En la hoja Actuales la dirección está en una sola columna
        var dir = data[i][14];
        var jqxhr = await getLatLong(dir);

        var lat = null;
        var long = null;

        // Extrae lat y long del resultado
        try {
            const location = jqxhr.results[0].geometry.location;
            lat = location.lat;
            long = location.lng;
        } catch(err) {
            console.error(err);
            lat = 'Unknown';
            long = 'Unknown';
        }

        data[i].push([lat]);
        data[i].push([long]);

        container.append(`${data[i].join('|')}<br>`);
    }
}

async function getCoordsBaja(results){
    var data = results.data;
    var container = $('#results');

    container.html('');

    // Latitud y longitud se añaden al final de la fila como dos nuevas
    // columnas
    data[0].push(['new lat']);
    data[0].push(['new long']);
    container.append(`${data[0].join('|')}<br>`);
    
    for(var i = 10; i < data.length; i++){   
        console.log(`processing row ${i}`);
        // En la hoja baja la dirección está dividida en múltiples
        // columnas.
        var dir = [
            data[i][7].trim(), 
            data[i][8].trim(), 
            data[i][10].trim(), 
            data[i][11].trim(), 
            data[i][12].trim(), 
            data[i][13].trim()
        ].join(' ');

        var jqxhr = await getLatLong(dir);
        var lat = null;
        var long = null;

        // Extrae lat y long del resultado
        try {
            const location = jqxhr.results[0].geometry.location;
            lat = location.lat;
            long = location.lng;
        } catch(err) {
            console.error(err);
            lat = 'Unknown';
            long = 'Unknown';
        }

        data[i].push([lat]);
        data[i].push([long]);

        container.append(`${data[i].join('|')}<br>`);
    }
}

function getLatLong(dir) {
    var base = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyD8v8wSeERbORdMB-byl7XhF2ki-P2PMO0&';
    var encoded_dir = encodeURIComponent(dir);

    // Usa jQuery para realizar la petición 
    return $.get(`${base}address=${encoded_dir}`);
}

// Este snippet añade la funcionalidad al botón 'Analizar'
$(function(){
    $('#submit-file').click(function(evt){
        evt.preventDefault();
        parse();
    });
});