const direcciones = [
    { lat: 19.422581, lon:  -99.159150 },
    { lat: 19.399578, lon:  -99.143821 },
    { lat: 19.434254, lon:  -99.151156 },
    { lat: 19.422360, lon:  -99.232779 },
    { lat: 19.539476, lon:  -99.196352 },
    { lat: 19.400325, lon:  -99.160393 },
    { lat: 19.339817, lon:  -99.138962 },
    { lat: 19.376156, lon:  -99.257531 },
    { lat: 28.608734, lon: -106.101321 },
    { lat: 31.722291, lon: -106.469390 },
    { lat: 29.097559, lon: -110.968025 },
    { lat: 29.128569, lon: -111.017203 }
]

const headers = {
    id_taller: 0,
    oficina_regional: 1,
    oficina_cargada: 2,
    rfc: 3,
    clave_mx: 4,
    razon_social: 5,
    nombre_comercial: 6,
    calle: 7,
    numero: 8, 
    num_int: 9,
    colonia: 10,
    cp: 11,
    delegacion_municipio: 12,
    estado: 13,
    idu: 14,
    clave_proveedor: 15,
    tipo_proveedor: 16,
    marcas_atienden: 17, 
    multimarca: 18,
    tipo_unidad: 19,
    modelos: 20,
    telefono1: 21,
    telefono2: 22,
    telefono3: 23,
    capacidad_maxima: 24,
    capacidad_actual: 25,
    horario: 26,
    indice_normalizado: 27,
    supervisor_encargado: 28,
    correo_supervisor: 29,
    anexo: 30,
    nombre_anexo: 31,
    calle_anexo: 32, 
    num_anexo: 33,
    num_int_anexo: 34,
    colonia_anexo: 35,
    cp_anexo: 36,
    delg_municipio_anexo: 37,
    estado_anexo: 38,
    telefono_anexo: 39,
    horario_anexo: 40,
    responsable_anexo: 41,
    correo_responsable_anexo: 42,
    latitud: 43,
    longitud: 44,
    latitud_anexo: 45,
    longitud_anexo: 46
};

const container = $('#results');

function calcDistancias(results){
    var data = results.data;

    // Index placeholders
    let length = data[0].length;
    let lat = length - 6;
    let lon = length - 5;
    let lat_anx = length - 4;
    let lon_anx = length - 3;

    // Coordenadas de origan
    var sel_dir = $('#direccion');
    let origin = direcciones[parseInt(sel_dir.val())];
    
    container.html('');

    // Distancia y distancia anexo se añaden al final
    let dist_idx = length - 2;
    let dist_anx_idx = length - 1;

    // Geodist configuration
    let conf = { unit: 'meters', exact: true };

    for(var i=1; i < data.length; i++){
        console.log(`processing row ${i}`);

        let dest = {lat: data[i][lat], lon: data[i][lon] };
        let dist = getDistance(origin, dest, conf);
        data[i][dist_idx] = dist;

        // No todos los talleres tienen anexo
        if(data[i][lat_anx].trim() != '') {
            let dest_anx = {lat: data[i][lat_anx], lon: data[i][lon_anx]};
            let dist_anx = getDistance(origin, dest_anx, conf);
            data[i][dist_anx_idx] = dist_anx;
        }

        container.append(`${data[i].join('|')}<br>`);
    }
}

function createSqlStatement(row){
    return `(
        '${row[headers.id_taller].trim()}',
        '${row[headers.oficina_regional].trim()}',
        '${row[headers.oficina_cargada].trim()}',
        '${row[headers.rfc].trim()}',
        '${row[headers.razon_social].trim()}',
        '${row[headers.nombre_comercial].trim()}',
        '${row[headers.calle].trim()}',
        '${row[headers.numero].trim()}',
        '${row[headers.num_int].trim()}',
        '${row[headers.colonia].trim()}',
        '${row[headers.cp].trim().startsWith("\'") ? row[headers.cp].trim().substring(1) : row[headers.cp].trim() }',
        '${row[headers.delegacion_municipio].trim()}',
        '${row[headers.estado].trim()}',
        '${row[headers.idu].trim()}',
        '${row[headers.clave_proveedor].trim()}',
        '${row[headers.tipo_proveedor].trim()}',
        '${row[headers.marcas_atienden].trim()}',
        '${row[headers.tipo_unidad].trim()}',
        '${row[headers.modelos].trim()}',
        '${row[headers.telefono1].trim()}',
        '${row[headers.telefono2].trim()}',
        '${row[headers.telefono3].trim()}',
        '${row[headers.capacidad_maxima].trim()}',
        '${row[headers.capacidad_actual].trim()}',
        '${row[headers.horario].trim()}',
        '${row[headers.supervisor_encargado].trim()}',
        '${row[headers.correo_supervisor].trim()}',
        '${row[headers.anexo].trim()}',
        '${row[headers.nombre_anexo].trim()}',
        '${row[headers.calle_anexo].trim()}',
        '${row[headers.num_anexo].trim()}',
        '${row[headers.num_int_anexo].trim()}',
        '${row[headers.colonia_anexo].trim()}',
        '${row[headers.cp_anexo].trim().startsWith("\'") ? row[headers.cp_anexo].trim().substring(1) : row[headers.cp_anexo].trim() }',
        '${row[headers.delg_municipio_anexo].trim()}',
        '${row[headers.estado_anexo].trim()}',
        '${row[headers.telefono_anexo].trim()}',
        '${row[headers.horario_anexo].trim()}',
        '${row[headers.responsable_anexo].trim()}',
        '${row[headers.correo_responsable_anexo].trim()}',
        '${row[headers.latitud].trim()}',
        '${row[headers.longitud].trim()}',
        ${row[headers.latitud_anexo].trim() != '' ? "\'" + row[headers.latitud_anexo].trim() + "\'" : 'NULL'},
        ${row[headers.longitud_anexo].trim() != '' ? "\'" + row[headers.longitud_anexo].trim() + "\'" : 'NULL'}
    ),`
}

function dumpSql(results){
    var data = results.data;

    // Imprime el encabezado de la consulta
    container.append(`INSERT INTO talleres (
        id_taller,
        oficina_regional,
        oficina_cargada,
        rfc,
        razon_social,
        nombre_comercial,
        calle,
        numero,
        num_int,
        colonia,
        cp,
        delegacion_municipio,
        estado,
        idu,
        clave_proveedor,
        tipo_proveedor,
        marcas_atienden,
        tipo_unidad,
        modelos,
        telefono1,
        telefono2,
        telefono3,
        capacidad_maxima,
        capacidad_actual,
        horario,
        supervisor_encargado,
        correo_supervisor,
        anexo,
        nombre_anexo,
        calle_anexo,
        num_anexo,
        num_int_anexo,
        colonia_anexo,
        cp_anexo,
        delg_municipio_anexo,
        estado_anexo,
        telefono_anexo,
        horario_anexo,
        responsable_anexo,
        correo_responsable_anexo,
        latitud,
        longitud,
        latitud_anexo,
        longitud_anexo
    ) VALUES `);

    for(var i=1; i < data.length; i++){
        console.log(`processing row ${i}`);
        container.append(`${createSqlStatement(data[i])}<br>`);
    }
}

async function getCoordsActuales(results){
    var data = results.data;

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

async function getCoordsAnexoActuales(results){
    var data = results.data;

    container.html('');

    // Latitud y longitud se añaden al final de la fila como dos nuevas
    // columnas
    data[0].push(['latitud anexo']);
    data[0].push(['longitud anexo']);
    container.append(`${data[0].join('|')}<br>`);
    
    for(var i = 228; i < data.length; i++){
        console.log(`processing row ${i}`);

        // En la hoja Actuales la dirección del anexo está en mútiples columnas
        var dir = [
            data[i][32].trim(),
            data[i][33].trim(),
            data[i][35].trim(),
            data[i][36].trim(),
            data[i][37].trim(),
            data[i][38].trim(),

        ].join(' ');

        var lat = '';
        var long = '';

        // Muchos anexos no existen
        if(data[i][31].trim() != '') {
            var jqxhr = await getLatLong(dir);

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
        } 

        data[i].push([lat]);
        data[i].push([long]);

        container.append(`${data[i].join('|')}<br>`);
    }
}

async function getCoordsBaja(results){
    var data = results.data;

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

async function getCoordsPowerBI(results){
    let data = results.data,
        jqxhr = null,
        direccion = null;

    container.html('');

    for(var i = 1; i < data.length; i++){
        // Algunos talleres ya tienen coordenadas
        if(data[i][6] == '' && data[i][7] == '') {
            direccion = `${data[i][3]} ${data[i][4]} ${data[i][5]}`;
            jqxhr = await getLatLong(direccion);

            try {
                const location = jqxhr.results[0].geometry.location;
                data[i][6] = location.lat;
                data[i][7] = location.lng;
            } catch(err) {
                console.error(err);
                data[i][6] = 'Unknown';
                data[i][7] = 'Unknown';
            }

            
        } else {
            console.error(`skipped row ${i}`);
        }

        container.append(`${data[i].join('|')}<br>`);
    }
}

function getLatLong(dir) {
    var base = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyD8v8wSeERbORdMB-byl7XhF2ki-P2PMO0&';
    var encoded_dir = encodeURIComponent(dir);

    // Usa jQuery para realizar la petición 
    return $.get(`${base}address=${encoded_dir}`);
}

function parse(){
    // Carga el archivo CSV en memoria
    $('#file').parse({
        config: {
            delimiter: ",",
            header: false,
            // complete: getCoordsActuales          // Función diseñada para la estructura de la hoja 'Actuales'
            // complete: getCoordsBaja              // Función diseñada para la estructura de la hoja 'Baja'
            // complete: getCoordsAnexoActuales     // Función diseñada para los anexos de actuales
            // complete: calcDistancias             // Función para calcular distancias
            complete: getCoordsPowerBI              // Función para crear sentencias sql
        },
        complete: function(){
            alert('Todas las direcciones fueron procesadas');
        }
    });
};

// Este snippet añade la funcionalidad a los botones
$(function(){
    $('#submit-file').click(function(evt){
        evt.preventDefault();
        parse();
    });
});