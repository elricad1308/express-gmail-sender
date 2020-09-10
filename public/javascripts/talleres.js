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

const headers_baja = {
    oficina_regional         : 0,
    oficina_cargada          : 1,
    rfc                      : 2,
    clave_mx                 : 3,
    razon_social             : 4,
    nombre_comercial         : 5,
    calle                    : 6,
    numero                   : 7,
    num_int                  : 8,
    colonia                  : 9,
    cp                       : 10,
    delegacion_municipio     : 11,
    estado                   : 12,
    idu                      : 13,
    clave_proveedor          : 14,
    tipo_proveedor           : 15,
    marcas_atienden          : 16,
    tipo_unidad              : 17,
    modelos                  : 18,
    telefono1                : 19,
    telefono2                : 20,
    telefono3                : 21,
    capacidad_maxima         : 22,
    capacidad_actual         : 23,

    supervisor_encargado     : 25,
    correo_supervisor        : 26,

    nombre_anexo             : 28,
    calle_anexo              : 29,
    numero_anexo             : 30,
    num_int_anexo            : 31,
    colonia_anexo            : 32,
    cp_anexo                 : 33,
    delg_municipio_anexo     : 34,
    estado_anexo             : 35,
    telefono_anexo           : 36,
    horario_anexo            : 37,
    responsable_anexo        : 38,
    correo_responsable_anexo : 38
}

let container = $('#results');

function createStatement(row, idx){
    let indice_normalizado = row[headers.indice_normalizado].trim().endsWith('%') ? 
            parseInt(row[headers.indice_normalizado]) : 0,

        regla_asignacion = row[headers.regla_asignacion].trim() != '' ? 1 : 0,

        prioridad = getPrioridad(row[headers.tipo_prioridad].trim()),

        nivel_asignacion = row[headers.nivel_asignacion].trim() != '' ?
            parseInt(row[headers.nivel_asignacion]) : 0,

        observacion = getObservacion(row[headers.observacion].trim()),

        cve_col = row[headers.cve_col] != 'NULL' && row[headers.cve_col].trim() != '' && row[headers.cve_col] != '#N/A' ?
            parseInt(row[headers.cve_col]) : 0,

        cp = row[headers.cp].startsWith("'") ? 
            parseInt(row[headers.cp].substring(1)) : parseInt(row[headers.cp]),

        cve_mpio = row[headers.cve_mpio] != 'NULL' && row[headers.cve_mpio] != '#N/A' && row[headers.cve_mpio].trim() != '' ?
            parseInt(row[headers.cve_mpio]) : 0,

        cve_estado = row[headers.cve_estado] != 'NULL' && row[headers.cve_estado] != '#N/A' && row[headers.cve_estado].trim() != '' ?
            parseInt(row[headers.cve_estado]) : 0,

        recibe_grua = row[headers.recibe_grua].trim() != 'NO' ? 1 : 0,

        clave_categoria = getClaveCategoria(row[headers.clave_categoria]),

        extension1 = row[headers.extension1].trim() != '' && row[headers.extension1].trim() != '#N/A' ? 
            parseInt(row[headers.extension1]) : 0,

        extension2 = row[headers.extension2].trim() != '' && row[headers.extension2].trim() != '#N/A' ? 
            parseInt(row[headers.extension2]) : 0,

        extension3 = row[headers.extension3].trim() != '' && row[headers.extension3].trim() != '#N/A' ? 
            parseInt(row[headers.extension3]) : 0,

        cve_col_anexo = row[headers.cve_col_anexo].trim() != '#N/A' && row[headers.cve_col_anexo].trim() != '' ?
            parseInt(row[headers.cve_col_anexo]) : 0,

        cve_mpio_anexo = row[headers.cve_mpio_anexo].trim() != '#N/A' && row[headers.cve_mpio_anexo].trim() != ''?
            parseInt(row[headers.cve_mpio_anexo]) : 0,

        cve_estado_anexo = row[headers.cve_edo_anexo].trim() != '#N/A' && row[headers.cve_edo_anexo].trim() != '' ?
            parseInt(row[headers.cve_edo_anexo]) : 0,

        cp_anexo = row[headers.cp_anexo].trim() != '' ? 
            parseInt(row[headers.cp_anexo]) : 0,

        latitud_anexo = row[headers.latitud_anexo] != '#N/A' && row[headers.latitud_anexo].trim() != '' ?
            parseFloat(row[headers.latitud_anexo]) : 'NULL',

        longitud_anexo = row[headers.longitud_anexo] != '#N/A' && row[headers.longitud_anexo].trim() != '' ?
            parseFloat(row[headers.longitud_anexo]) : 'NULL',

        extension_anexo = row[headers.extension_anexo].trim() != '' && row[headers.extension_anexo].trim() != '#N/A' ? 
            parseInt(row[headers.extension_anexo]) : 0;

    return `(
          ${idx}
        , ${row[headers.idu]}
        ,'${row[headers.oficina_regional]}'
        ,'${row[headers.oficina_cargada]}'
        ,'${row[headers.rfc]}'
        , ${indice_normalizado}
        , ${regla_asignacion}
        , ${prioridad}
        , ${nivel_asignacion}
        , ${observacion}
        ,'${row[headers.clave_mx]}'
        ,'${row[headers.razon_social]}'
        ,'${row[headers.nombre_comercial]}'
        ,'${row[headers.calle]}'
        ,'${row[headers.numero]}'
        ,'${row[headers.num_int]}'
        , ${cve_col}
        ,'${row[headers.colonia]}'
        , ${cp}
        , ${cve_mpio}
        ,'${row[headers.delegacion_municipio]}'
        , ${cve_estado}
        ,'${row[headers.estado]}'
        , ${row[headers.latitud]}
        , ${row[headers.longitud]}
        ,'${row[headers.clave_proveedor]}'
        , ${recibe_grua}
        ,'${row[headers.tipo_proveedor]}'
        , ${clave_categoria}
        ,'${row[headers.tipo_unidad]}'
        ,'${row[headers.multimarca]}'
        ,'${row[headers.clave_marca]}'
        ,'${row[headers.marcas_atienden]}'
        ,'${row[headers.clave_anios]}'
        ,'${row[headers.modelos]}'
        ,'${row[headers.telefono1]}'
        , ${extension1}
        ,'${row[headers.telefono2]}'
        , ${extension2}
        ,'${row[headers.telefono3]}'
        , ${extension3}
        , ${row[headers.capacidad_maxima]}
        , ${row[headers.capacidad_actual]}
        ,'${row[headers.supervisor_encargado]}'
        ,'${e(row[headers.correo_supervisor])}'
        ,'${e(row[headers.nombre_anexo])}'
        ,'${row[headers.calle_anexo]}'
        ,'${row[headers.numero_anexo]}'
        ,'${row[headers.num_int_anexo]}'
        , ${cve_col_anexo}
        ,'${row[headers.colonia_anexo]}'
        , ${cp_anexo}
        , ${cve_mpio_anexo}
        ,'${row[headers.delg_municipio_anexo]}'
        , ${cve_estado_anexo}
        ,'${row[headers.estado_anexo]}'
        ,${latitud_anexo}
        ,${longitud_anexo}
        ,'${row[headers.telefono_anexo]}'
        ,${extension_anexo}
        ,'${row[headers.horario_anexo]}'
        ,'${row[headers.responsable_anexo]}'
        ,'${e(row[headers.correo_responsable_anexo])}'
    )`;
}

function e(s){
    return s.replace(/\'/gi, '');
}

function createStatementBaja(row, idx){
    let cp = row[headers_baja.cp].startsWith("'") ? 
            parseInt(row[headers_baja.cp].substring(1)) : parseInt(row[headers_baja.cp]),

        cp_anexo = row[headers_baja.cp_anexo].trim() != '#N/A' && row[headers_baja.cp_anexo].trim() != '' ? 
            parseInt(row[headers_baja.cp_anexo]) : 0,
            
        multimarca = row[headers_baja.marcas_atienden] == 'TALLER MULTIMARCA' ? 
            'MULTIMARCA' : '',
            
        actual = row[headers_baja.capacidad_actual] != '' && row[headers_baja.capacidad_actual] != '#N/A' 
            ? row[headers_baja.capacidad_actual] : 0,

        maxima = row[headers_baja.capacidad_maxima] != '' && row[headers_baja.capacidad_maxima] != '#N/A' 
            ? row[headers_baja.capacidad_maxima] : 0;

    return `(
         '${row[headers_baja.idu]}'
        ,'${row[headers_baja.oficina_regional]}'
        ,'${row[headers_baja.oficina_cargada]}'
        ,'${row[headers_baja.rfc]}'
        ,'${row[headers_baja.clave_mx]}'
        ,'${row[headers_baja.razon_social]}'
        ,'${row[headers_baja.nombre_comercial]}'
        ,'${row[headers_baja.calle]}'
        ,'${row[headers_baja.numero]}'
        ,'${row[headers_baja.num_int]}'
        ,'${row[headers_baja.colonia]}'
        ,'${cp}'
        ,'${row[headers_baja.delegacion_municipio]}'
        ,'${row[headers_baja.estado]}'
        ,'${row[headers_baja.clave_proveedor]}'
        ,'${row[headers_baja.tipo_proveedor]}'
        ,'${row[headers_baja.tipo_unidad]}'
        ,'${multimarca}'
        ,'${row[headers_baja.marcas_atienden]}'
        ,'${row[headers_baja.modelos]}'
        ,'${row[headers_baja.telefono1]}'
        ,'${row[headers_baja.telefono2]}'
        ,'${row[headers_baja.telefono3]}'
        ,'${maxima}'
        ,'${actual}'
        ,'${row[headers_baja.supervisor_encargado]}'
        ,'${row[headers_baja.correo_supervisor]}'
        ,'${row[headers_baja.nombre_anexo]}'
        ,'${row[headers_baja.calle_anexo]}'
        ,'${row[headers_baja.numero_anexo]}'
        ,'${row[headers_baja.num_int_anexo]}'
        ,'${row[headers_baja.colonia_anexo]}}'
        ,'${cp_anexo}'
        ,'${row[headers_baja.delg_municipio_anexo]}'
        ,'${row[headers_baja.estado_anexo]}'
        ,'${row[headers_baja.telefono_anexo]}'
        ,'${row[headers_baja.horario_anexo]}'
        ,'${row[headers_baja.responsable_anexo]}'
        ,'${row[headers_baja.correo_responsable_anexo]}'
    )`;
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
        ,recibe_grua
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

    data.forEach((el, idx) => {
        console.log(`processing row ${idx}`);
        if(idx != 0)
            container.append(`${createStatement(el, idx)}, <br>`);
    });
}

function dumpSqlBaja(results){
    let data = results.data;

    container.html('').append(`INSERT INTO talleres (
         idu
        ,oficina_regional
        ,oficina_cargada
        ,rfc
        ,clave_mx
        ,razon_social
        ,nombre_comercial
        ,calle
        ,numero
        ,num_int
        ,colonia
        ,cp
        ,delegacion_municipio
        ,estado
        ,clave_proveedor
        ,tipo_proveedor
        ,tipo_unidad
        ,multimarca
        ,marcas_atienden
        ,modelos
        ,telefono1
        ,telefono2
        ,telefono3
        ,capacidad_maxima
        ,capacidad_actual
        ,supervisor_encargado
        ,correo_supervisor
        ,nombre_anexo
        ,calle_anexo
        ,num_anexo
        ,num_int_anexo
        ,colonia_anexo
        ,cp_anexo
        ,delg_municipio_anexo
        ,estado_anexo
        ,telefono_anexo
        ,horario_anexo
        ,responsable_anexo
        ,correo_responsable_anexo
    ) VALUES <br> `);

    data.forEach((el, idx) => {
        console.log(`processing row ${idx}`);
        if(idx != 0)
            container.append(`${createStatementBaja(el, idx)}, <br>`);
    });
}

function getClaveCategoria(val){
    let cve_cat = 0;

    if(val == '0')
        cve_cat = 8;
    else {
        let aux = val.split(',');
        for(i of aux){
            cve_cat += parseInt(i.trim());
        }
    }

    return cve_cat;
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
        case 'AGENCIA'            :
            prioridad = 1; 
            break;

        case 'ALTA'               :
            prioridad = 2; 
            break;

        case 'BAJA'               :
            prioridad = 3; 
            break;

        case 'DEL GRUPO'          :
            prioridad = 4; 
            break;

        case 'DEL GRUPO/ AGENCIA' :
            prioridad = 5; 
            break;

        case 'EXPRESS'            :
            prioridad = 6; 
            break;

        case 'MEDIA'              :
            prioridad = 7; 
            break;
    }

    return prioridad;
}

function dumpLatex(results){
    let data = results.data;

    container.html('');
    data.forEach(el => {
        container.append(`${el.join('&')} \\\\ <br> \\hline <br>`)
    });
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