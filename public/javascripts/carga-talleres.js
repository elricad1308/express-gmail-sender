const headers = {
    idu                      : 0,
    oficina_regional         : 1,
    oficina_cargada          : 2,
    rfc                      : 3,
    indice_normalizado       : 4,
    regla_asignacion         : 5,
    tipo_prioridad           : 6,
    nivel_asignacion         : 7,
    observacion              : 8,
    clave_mx                 : 9,
    razon_social             : 10,
    nombre_comercial         : 11,
    calle                    : 12,
    numero                   : 13,
    num_int                  : 14,
    cve_col                  : 15,
    colonia                  : 16,
    cp                       : 17,
    cve_mpio                 : 18,
    delegacion_municipio     : 19,
    cve_estado               : 20,
    estado                   : 21,
    latitud                  : 22,
    longitud                 : 23,
    clave_proveedor          : 24,
    recibe_grua              : 25,
    tipo_proveedor           : 26,
    clave_categoria          : 27,
    tipo_unidad              : 28,
    multimarca               : 29,
    clave_marca              : 30,
    marcas_atienden          : 31,
    clave_anios              : 32,
    modelos                  : 33,
    telefono1                : 34,
    extension1               : 35,
    telefono2                : 36,
    extension2               : 37,
    telefono3                : 38,
    extension3               : 39, 
    capacidad_maxima         : 40,
    capacidad_actual         : 41,
    supervisor_encargado     : 42,
    correo_supervisor        : 43,
    nombre_anexo             : 44,
    calle_anexo              : 45,
    numero_anexo             : 46,
    num_int_anexo            : 47,
    cve_col_anexo            : 48,
    colonia_anexo            : 49,
    cp_anexo                 : 50,
    cve_mpio_anexo           : 51,
    delg_municipio_anexo     : 52,
    cve_edo_anexo            : 53,
    estado_anexo             : 54,
    latitud_anexo            : 55,
    longitud_anexo           : 56,
    telefono_anexo           : 57,
    extension_anexo          : 58,
    horario_anexo            : 59,
    responsable_anexo        : 60,
    correo_responsable_anexo : 61
};


let container = $('#results');

function createStatement(row, i){
    let indice_normalizado = getNumeric(row[headers.indice_normalizado], 0),

        regla_asignacion = row[headers.regla_asignacion].trim() != '' ? 1 : 0,

        prioridad = getPrioridad(row[headers.tipo_prioridad].trim()),

        nivel_asignacion = getNumeric(row[headers.nivel_asignacion], 0),

        observacion = getObservacion(row[headers.observacion].trim()),

        cve_col = getNumeric(row[headers.cve_col], 0),

        cp = getNumeric(e(row[headers.cp]), 0),

        cve_mpio = getNumeric(row[headers.cve_mpio], 0),

        cve_estado = getNumeric(row[headers.cve_estado], 0),

        clave_categoria = getClaveCategoria(row[headers.clave_categoria]),

        extension1 = getNumeric(row[headers.extension1], 0),

        extension2 = getNumeric(row[headers.extension2], 0),

        extension3 = getNumeric(row[headers.extension3], 0),

        cve_col_anexo = getNumeric(row[headers.cve_col_anexo], 0),

        cve_mpio_anexo = getNumeric(row[headers.cve_mpio_anexo], 0),

        cve_estado_anexo = getNumeric(row[headers.cve_edo_anexo], 0),

        cp_anexo = getNumeric(e(row[headers.cp_anexo]), 0),

        latitud_anexo = getReal(row[headers.latitud_anexo], 0),

        longitud_anexo = getReal(row[headers.longitud_anexo], 0),

        extension_anexo = getNumeric(row[headers.extension_anexo], 0);

    return `(
         '${i}'
        ,'${row[headers.idu]}'
        ,'${row[headers.oficina_regional]}'
        ,'${row[headers.oficina_cargada]}'
        ,'${row[headers.rfc]}'
        ,'${indice_normalizado}'
        ,'${regla_asignacion}'
        ,'${prioridad}'
        ,'${nivel_asignacion}'
        ,'${observacion}'
        ,'${row[headers.clave_mx]}'
        ,'${e(row[headers.razon_social])}'
        ,'${e(row[headers.nombre_comercial])}'
        ,'${row[headers.calle]}'
        ,'${row[headers.numero]}'
        ,'${row[headers.num_int]}'
        ,'${cve_col}'
        ,'${row[headers.colonia]}'
        ,'${cp}'
        ,'${cve_mpio}'
        ,'${row[headers.delegacion_municipio]}'
        ,'${cve_estado}'
        ,'${row[headers.estado]}'
        ,'${row[headers.latitud]}'
        ,'${row[headers.longitud]}'
        ,'${row[headers.clave_proveedor]}'
        ,'${row[headers.tipo_proveedor]}'
        ,'${clave_categoria}'
        ,'${row[headers.tipo_unidad]}'
        ,'${row[headers.multimarca]}'
        ,'${row[headers.clave_marca]}'
        ,'${row[headers.marcas_atienden]}'
        ,'${row[headers.clave_anios]}'
        ,'${row[headers.modelos]}'
        ,'${row[headers.telefono1]}'
        ,'${extension1}'
        ,'${row[headers.telefono2]}'
        ,'${extension2}'
        ,'${row[headers.telefono3]}'
        ,'${extension3}'
        ,'${row[headers.capacidad_maxima]}'
        ,'${row[headers.capacidad_actual]}'
        ,'${row[headers.supervisor_encargado]}'
        ,'${e(row[headers.correo_supervisor])}'
        ,'${e(row[headers.nombre_anexo])}'
        ,'${row[headers.calle_anexo]}'
        ,'${row[headers.numero_anexo]}'
        ,'${row[headers.num_int_anexo]}'
        ,'${cve_col_anexo}'
        ,'${row[headers.colonia_anexo]}'
        ,'${cp_anexo}'
        ,'${cve_mpio_anexo}'
        ,'${row[headers.delg_municipio_anexo]}'
        ,'${cve_estado_anexo}'
        ,'${row[headers.estado_anexo]}'
        ,'${latitud_anexo}'
        ,'${longitud_anexo}'
        ,'${row[headers.telefono_anexo]}'
        ,'${extension_anexo}'
        ,'${row[headers.horario_anexo]}'
        ,'${row[headers.responsable_anexo]}'
        ,'${e(row[headers.correo_responsable_anexo])}'
    ),`;
}

function dumpSql(results){
    let data = results.data;

    container.html('').append(`INSERT INTO talleres (
        id_taller
        ,idu
        ,oficina_regional
        ,oficina_cargada
        ,rfc
        ,indice_normalizado
        ,regla_asignacion
        ,prioridad
        ,nivel_asignacion
        ,observacion
        ,clave_mx
        ,razon_social
        ,nombre_comercial
        ,calle
        ,numero
        ,num_int
        ,cve_col
        ,colonia
        ,cp
        ,cve_mpio
        ,delegacion_municipio
        ,cve_estado
        ,estado
        ,latitud
        ,longitud
        ,clave_proveedor
        ,tipo_proveedor
        ,clave_categoria
        ,tipo_unidad
        ,multimarca
        ,clave_marca
        ,marcas_atienden
        ,clave_anios
        ,modelos
        ,telefono1
        ,extension1
        ,telefono2
        ,extension2
        ,telefono3
        ,extension3
        ,capacidad_maxima
        ,capacidad_actual
        ,supervisor_encargado
        ,correo_supervisor
        ,nombre_anexo
        ,calle_anexo
        ,num_anexo
        ,num_int_anexo
        ,cve_col_anexo
        ,colonia_anexo
        ,cp_anexo
        ,cve_mpio_anexo
        ,delg_municipio_anexo
        ,cve_estado_anexo
        ,estado_anexo
        ,latitud_anexo
        ,longitud_anexo
        ,telefono_anexo
        ,extension_anexo
        ,horario_anexo
        ,responsable_anexo
        ,correo_responsable_anexo
    ) VALUES <br> `);

    var i = 0;
    for(const row of data) {
        if(i != 0) 
            container.append(`${createStatement(row, i)}<br>`);
        
        i++;
    }
}

function e(s){
    return s.toString().replace(/\'/gi, '');
}

function getClaveCategoria(val){
    let cve_cat = 0;

    if(val == '0')
        cve_cat = 8;
    else {
        let aux = val.split(',');
        for(i of aux){
            cve_cat += parseInt(i);
        }
    }

    return cve_cat;
}

function getNumeric(val, def) {
    let num = parseInt(val)

    return !isNaN(num) ? num : def
}

function getObservacion(val) {
    let observacion = 0;

    switch(val){
        case 'BLINDAJE':
            observacion = 1;
            break;

        case 'CDR DEL GRUPO':
            observacion = 2;
            break;

        case 'CENTRO':
            observacion = 3;
            break;

        case 'CON LOS DEMAS DE LA ZONA':
            observacion = 4;
            break;

        case 'CON LOS DEMAS DE LA ZONA (DE LA SERNA)':
            observacion = 5;
            break;

        case 'CON LOS DEMAS DE LA ZONA (PICACHO TLAHUAC)':
            observacion = 6;
            break;

        case 'CON LOS DEMAS DE LA ZONA (TOLSA)' :
            observacion = 7;
            break;

        case 'DAÑOS MENORES A $21,000 (PARA ASEGURADO A PARTIR DEL 4TO AÑO; PARA TERCEROS TODOS)':
            observacion = 8;
            break;

        case 'DAÑOS NO MAYORES A $7,000 (PARA ASEGURADO A PARTIR DEL 4TO AÑO; PARA TERCEROS TODOS)':
            observacion = 9;
            break;

        case 'EP':
            observacion = 10;
            break;

        case 'MOTOS':
            observacion = 11;
            break;

        case 'NO COMPITE CON "EXPRESS, GRUPO, ALTA, MEDIA, BAJA", POR MODELO, BACK TO HOME Y/O BACK TO BRAND':
            observacion = 12;
            break;

        case 'POR DEBAJO DE FORD ACASA':
            observacion = 13;
            break;

        case 'POR DEBAJO DE FORD PICACHO':
            observacion = 14;
            break;

        case 'SUR':
            observacion = 15;
            break;

        case 'TRASLADO GRUA PT\'S':
            observacion = 16;
            break;

        case 'UNICO':
            observacion = 17;
            break;

        case 'UNICO BICICLETAS':
            observacion = 18;
            break;

        case 'UNICO EP':
            observacion = 19;
            break;

        case 'UNICO MOTOS':
            observacion = 20;
            break;

        case 'VARILLAJE':
            observacion = 21;
            break;

        case 'SOLO UNIDADES ALTA GAMMA':
            observacion = 22;
            break;
    }

    return observacion;
}


function getPrioridad(val){
    let prioridad = 3;

    switch(val){
        case 'AGENCIA':
            prioridad = 1; 
            break;

        case 'ALTA':
            prioridad = 2; 
            break;

        case 'BAJA':
            prioridad = 3; 
            break;

        case 'DEL GRUPO':
            prioridad = 4; 
            break;

        case 'DEL GRUPO/ AGENCIA':
            prioridad = 5; 
            break;

        case 'EXPRESS':
            prioridad = 6; 
            break;

        case 'MEDIA':
            prioridad = 7; 
            break;
    }

    return prioridad;
}

function getReal(val, def) {
    let real = parseFloat(val)

    return !isNaN(real) ? real : def
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