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

const headers_proveedores = {
    idu: 0
    ,oficina_regional: 1
    ,oficina_cargada: 2
    ,rfc: 3
    ,indice_normalizado: 4
    ,regla_asignacion: 5
    ,tipo_prioridad: 6
    ,nivel_asignacion: 7
    ,observacion_regla: 8
    ,clave_mx: 9
    ,razon_social: 10
    ,nombre_comercial: 11
    ,calle: 12
    ,numero: 13
    ,num_int: 14
    ,cve_colonia: 15
    ,colonia: 16
    ,cp: 17
    ,cve_delegacion_municipio: 18
    ,delegacion_municipio: 19
    ,cve_estado: 20
    ,estado: 21
    ,latitud: 22
    ,longitud: 23
    ,clave_proveedor: 24
    ,recibe_grua: 25
    ,tipo_proveedor: 26
    ,clave_categoria: 27
    ,tipo_unidad: 28
    ,otras_marcas: 29
    ,clave_marca: 30
    ,marcas_atienden: 31
    ,clave_anios: 32
    ,modelos_atienden: 33
    ,telefono1: 34
    ,extension1: 35
    ,telefono2: 36
    ,extension2: 37
    ,telefono3: 38
    ,extension3: 39
    ,capacidad_maxima: 40
    ,capacidad_actual: 41
    ,supervisor_encargado: 42
    ,correo_supervisor: 43
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

    // Distancia y distancia anexo se a??aden al final
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

function createUpdateClavesSepomexStatement(results) {
    let data = results.data;
    container.html('');

    for(const row of data) {
        container.append(`UPDATE proveedores SET 
            cve_col=${row[3]} 
            ,cve_mpio=${row[5]}
            ,cve_estado=${row[7]}
        WHERE id_proveedor = ${row[0]};<br>`)
    }
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

async function dumpSqlProveedores(results) {
    var data = results.data;

    container.html('');

    // Insert header
    container.html(`INSERT INTO proveedores (
        id_proveedor
        ,idu
        ,oficina_regional
        ,oficina_cargada
        ,rfc
        ,tipo_prioridad
        ,nivel_asignacion
        ,observacion_regla
        ,razon_social
        ,nombre_comercial
        ,calle
        ,numero
        ,num_int
        ,colonia
        ,cp
        ,delegacion_municipio
        ,estado
        ,latitud
        ,longitud
        ,clave_proveedor
        ,tipo_proveedor
        ,tipo_unidad
        ,telefono1
        ,extension1
        ,telefono2
        ,extension2
        ,telefono3
        ,extension3
        ,supervisor_encargado
        ,correo_supervisor
    ) VALUES `);

    // Get coords and print statement for each row
    var i = 0;
    for(const row of data) {
        if(i != 0) {
            let statement = await getProveedorStatement(row, i);
            container.append(`${statement}<br>`);
        }

        i++;
    }
}

async function getCoordsActuales(results){
    var data = results.data;

    container.html('');

    // Latitud y longitud se a??aden al final de la fila como dos nuevas
    // columnas
    data[0].push(['new lat']);
    data[0].push(['new long']);
    container.append(`${data[0].join('|')}<br>`);
    
    for(var i = 1; i < data.length; i++){
        console.log(`processing row ${i}`);

        // En la hoja Actuales la direcci??n est?? en una sola columna
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

    // Latitud y longitud se a??aden al final de la fila como dos nuevas
    // columnas
    data[0].push(['latitud anexo']);
    data[0].push(['longitud anexo']);
    container.append(`${data[0].join('|')}<br>`);
    
    for(var i = 228; i < data.length; i++){
        console.log(`processing row ${i}`);

        // En la hoja Actuales la direcci??n del anexo est?? en m??tiples columnas
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

    // Latitud y longitud se a??aden al final de la fila como dos nuevas
    // columnas
    data[0].push(['new lat']);
    data[0].push(['new long']);
    container.append(`${data[0].join('|')}<br>`);
    
    for(var i = 10; i < data.length; i++){   
        console.log(`processing row ${i}`);
        // En la hoja baja la direcci??n est?? dividida en m??ltiples
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

    // Usa jQuery para realizar la petici??n 
    return $.get(`${base}address=${encoded_dir}`);
}

function getObservacionRegla(observacion) {
    let valor = 0;

    switch(observacion) {
        case 'POR UBICACI??N':
            valor = 37; break;

        case 'POR UBICACI??N Y TIPO DE DA??O':
            valor = 38; break;

        case 'TIPO DE LESIONADO Y UBICACION':
            valor = 39; break;

        case 'TODO TIPO DE LESIONADO':
            valor = 40; break;
    }

    return valor;
}

function getTipoProveedor(proveedor){
    let valor = 0;

    switch(proveedor) {
        case 'OBRA CIVIL':
            valor = 41; break;

        case 'CRISTALERA': 
            valor = 42; break;

        case 'HOSPITAL':
            valor = 43; break;
    }

    return valor;
}

function getTipoUnidad(unidad) {
    let valor = 0;

    switch(unidad){
        case 'AMBULATORIO':
            valor = 44; break;

        case 'AMPLIA':
            valor = 45; break;

        case 'CRISTALES':
            valor = 46; break;

        case 'DA??OS LEVES Y MEDIANOS':
            valor = 47; break;

        case 'DA??OS LEVES Y MEDIOS':
            valor = 48; break;

        case 'HOSPITALARIO':
            valor = 49; break;

        case 'SOLO DA??OS ECOLOGICOS':
            valor = 50; break;

        case 'TODOS':
            valor = 51; break;
    }

    return valor;
}

async function getProveedorStatement(row, i) {
    // Crea la direcci??n para geolocalizarla
    let direccion = [
        row[headers_proveedores.calle].trim()
        ,row[headers_proveedores.numero].trim()
        ,row[headers_proveedores.colonia].trim()
        ,row[headers_proveedores.delegacion_municipio].trim()
        ,row[headers_proveedores.estado].trim()
    ].join(' ');

    let geocode = await getLatLong(direccion);

    // Extrae la latitud y longitud del resultado
    let latitud = 0
        ,longitud = 0;

    try {
        const location = geocode.results[0].geometry.location;
        latitud = location.lat;
        longitud = location.lng;
    } catch(err) {
        console.error(err);
    }

    // Realiza el preprocesamiento de datos
    let idu = row[headers_proveedores.idu].trim() != '' ? row[headers_proveedores.idu] : 0

        ,tipo_prioridad = row[headers_proveedores.tipo_prioridad] == 'ALTA' ? 31 : 0

        ,observacion_regla = getObservacionRegla(row[headers_proveedores.observacion_regla].trim())

        ,cp = parseInt(row[headers_proveedores.cp].replace("'", ''))

        ,tipo_proveedor = getTipoProveedor(row[headers_proveedores.tipo_proveedor].trim())

        ,tipo_unidad = getTipoUnidad(row[headers_proveedores.tipo_unidad].trim());

    return `(
        '${i}'
        ,'${idu}'
        ,'${row[headers_proveedores.oficina_regional]}'
        ,'${row[headers_proveedores.oficina_cargada]}'
        ,'${row[headers_proveedores.rfc]}'
        ,'${tipo_prioridad}'
        ,'${parseInt(row[headers_proveedores.nivel_asignacion])}'
        ,'${observacion_regla}'
        ,'${row[headers_proveedores.razon_social]}'
        ,'${row[headers_proveedores.nombre_comercial]}'
        ,'${row[headers_proveedores.calle]}'
        ,'${row[headers_proveedores.numero]}'
        ,'${row[headers_proveedores.num_int]}'
        ,'${row[headers_proveedores.colonia]}'
        ,'${cp}'
        ,'${row[headers_proveedores.delegacion_municipio]}'
        ,'${row[headers_proveedores.estado]}'
        ,'${latitud}'
        ,'${longitud}'
        ,'${row[headers_proveedores.clave_proveedor]}'
        ,'${tipo_proveedor}'
        ,'${tipo_unidad}'
        ,'${row[headers_proveedores.telefono1]}'
        ,'${row[headers_proveedores.extension1]}'
        ,'${row[headers_proveedores.telefono2]}'
        ,'${row[headers_proveedores.extension2]}'
        ,'${row[headers_proveedores.telefono3]}'
        ,'${row[headers_proveedores.extension3]}'
        ,'${row[headers_proveedores.supervisor_encargado]}'
        ,'${row[headers_proveedores.correo_supervisor]}'
    ),`;
}

function parse(){
    // Carga el archivo CSV en memoria
    $('#file').parse({
        config: {
            delimiter: ",",
            header: false,
            // complete: getCoordsActuales          // Funci??n dise??ada para la estructura de la hoja 'Actuales'
            // complete: getCoordsBaja              // Funci??n dise??ada para la estructura de la hoja 'Baja'
            // complete: getCoordsAnexoActuales     // Funci??n dise??ada para los anexos de actuales
            // complete: calcDistancias             // Funci??n para calcular distancias
            // complete: getCoordsPowerBI              // Funci??n para crear sentencias sql
            // complete: dumpSqlProveedores
            complete: createUpdateClavesSepomexStatement
        },
        complete: function(){
            alert('Todas las direcciones fueron procesadas');
        }
    });
};

// Este snippet a??ade la funcionalidad a los botones
$(function(){
    $('#submit-file').click(function(evt){
        evt.preventDefault();
        parse();
    });
});