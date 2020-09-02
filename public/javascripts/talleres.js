const headers = {
    idu                      : 0,
    oficina_regional         : 1,
    oficina_cargada          : 2,
    rfc                      : 3,
    indice_normalizado       : 4,
    tipo_prioridad           : 5,
    nivel_asignacion         : 6,
    observacion              : 7,
    clave_mx                 : 8,
    razon_social             : 9,
    nombre_comercial         : 10,
    calle                    : 11,
    numero                   : 12,
    num_int                  : 13,
    cve_col                  : 14,
    colonia                  : 15,
    cp                       : 16,
    cve_mpio                 : 17,
    delegacion_municipio     : 18,
    cve_estado               : 19,
    estado                   : 20,
    latitud                  : 21,
    longitud                 : 22,
    clave_proveedor          : 23,
    tipo_proveedor           : 24,
    clave_categoria          : 25,
    tipo_unidad              : 26,
    multimarca               : 27,
    clave_marca              : 28,
    marcas_atienden          : 29,
    clave_anios              : 30,
    modelos                  : 31,
    telefono1                : 32,
    extension1               : 33,
    telefono2                : 34,
    extension2               : 35,
    telefono3                : 36,
    extension3               : 37, 
    capacidad_maxima         : 38,
    capacidad_actual         : 39,
    supervisor_encargado     : 40,
    correo_supervisor        : 41,
    nombre_anexo             : 42,
    calle_anexo              : 43,
    numero_anexo             : 44,
    num_int_anexo            : 45,
    cve_col_anexo            : 46,
    colonia_anexo            : 47,
    cp_anexo                 : 48,
    cve_mpio_anexo           : 49,
    delg_municipio_anexo     : 50,
    cve_edo_anexo            : 51,
    estado_anexo             : 52,
    latitud_anexo            : 53,
    longitud_anexo           : 54,
    telefono_anexo           : 55,
    extension_anexo          : 56,
    horario_anexo            : 57,
    responsable_anexo        : 58,
    correo_responsable_anexo : 59
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
    let indice_normalizado = row[headers.indice_normalizado].trim() != '' ? 
            parseInt(row[headers.indice_normalizado]) : 0,

        prioridad = getPrioridad(row[headers.tipo_prioridad].trim()),

        nivel_asignacion = row[headers.nivel_asignacion].trim() != '' ?
            parseInt(row[headers.nivel_asignacion]) : 0,

        observacion = getObservacion(row[headers.observacion].trim()),

        cve_col = row[headers.cve_col] != 'NULL' ?
            parseInt(row[headers.cve_col]) : 0,

        cp = row[headers.cp].startsWith("'") ? 
            parseInt(row[headers.cp].substring(1)) : parseInt(row[headers.cp]),

        cve_mpio = row[headers.cve_mpio] != 'NULL' ?
            parseInt(row[headers.cve_mpio]) : 0,

        cve_estado = row[headers.cve_estado] != 'NULL' ?
            parseInt(row[headers.cve_estado]) : 0,

        clave_categoria = getClaveCategoria(row[headers.clave_categoria]),

        extension1 = row[headers.extension1].trim() != '' ? 
            parseInt(row[headers.extension1]) : 0,

        extension2 = row[headers.extension2].trim() != '' ? 
            parseInt(row[headers.extension2]) : 0,

        extension3 = row[headers.extension3].trim() != '' ? 
            parseInt(row[headers.extension3]) : 0,

        cve_col_anexo = row[headers.cve_col_anexo].trim() != '#N/A' ?
            parseInt(row[headers.cve_col_anexo]) : 0,

        cve_mpio_anexo = row[headers.cve_mpio_anexo].trim() != '#N/A' ?
            parseInt(row[headers.cve_mpio_anexo]) : 0,

        cve_estado_anexo = row[headers.cve_edo_anexo].trim() != '#N/A' ?
            parseInt(row[headers.cve_edo_anexo]) : 0,

        cp_anexo = row[headers.cp_anexo].trim() != '' ? 
            parseInt(row[headers.cp_anexo]) : 0,

        latitud_anexo = row[headers.latitud_anexo] != '#N/A' && row[headers.latitud_anexo].trim() != '' ?
            parseInt(row[headers.latitud_anexo]) : 'NULL',

        longitud_anexo = row[headers.longitud_anexo] != '#N/A' && row[headers.longitud_anexo].trim() != '' ?
            parseInt(row[headers.longitud_anexo]) : 'NULL',

        extension_anexo = row[headers.extension_anexo].trim() != '' && row[headers.extension_anexo].trim() != '#N/A' ? 
            parseInt(row[headers.extension_anexo]) : 0;

    return `(
          ${idx}
        , ${row[headers.idu]}
        ,'${row[headers.oficina_regional]}'
        ,'${row[headers.oficina_cargada]}'
        ,'${row[headers.rfc]}'
        , ${indice_normalizado}
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
        ,'${row[headers.correo_supervisor]}'
        ,'${row[headers.nombre_anexo]}'
        ,'${row[headers.calle_anexo]}'
        ,'${row[headers.numero_anexo]}'
        ,'${row[headers.num_int_anexo]}'
        , ${cve_col_anexo}
        ,'${row[headers.colonia_anexo]}}'
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
        ,'${row[headers.correo_responsable_anexo]}'
    )`;
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

        case 'CON LOS DEMAS DE LA ZONA (PICACHO TLAHUAC':
            observacion = 6;
            break;

        case 'CON LOS DEMAS DE LA ZONA (TOLSA)' :
            observacion = 7;
            break;

        case 'DAÑOS NO MAYORES A $21,000':
            observacion = 8;
            break;

        case 'DAÑOS NO MAYORES A $7,000':
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
            complete: dumpSqlBaja
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