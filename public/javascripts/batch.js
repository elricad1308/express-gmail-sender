const headers = {
    moneda_siniestro     : 0,
    ramo_siniestro       : 1,
    subramo_siniestro    : 2,
    oficina              : 3,
    siniestro            : 4,
    anio_siniestro       : 5,
    folio                : 6,
    moneda_poliza        : 7,
    ramo_poliza          : 8,
    subramo_poliza       : 9,
    sucursal             : 10,
    poliza               : 11,
    endoso               : 12,
    inciso               : 13,
    inicio_vigencia      : 14,
    fin_vigencia         : 15,
    agente               : 16,
    marca                : 17,
    regla                : 18,
    tipo                 : 19,
    bth                  : 20,
    idu                  : 21,
    agencia_bth          : 22,
    btb                  : 23,
    convenio             : 24,
    causa                : 25,
    cobertura            : 26,
    estimacion           : 27,
    tipo_vehiculo        : 28,
    descripcion_tipo     : 29,
    idn                  : 30,
    marca_vehiculo       : 31,
    descripcion_vehiculo : 32,
    anio_vehiculo        : 33,
    serie                : 34,
    nombre_conductor     : 35,
    ap_pat_conductor     : 36,
    ap_mat_conductor     : 37,
    correo               : 38,
    celular              : 39
};

function createStatement(row){
    return `(
        ${row[headers.subramo_siniestro]},
        '${row[headers.oficina]}',
        ${row[headers.siniestro]},
        ${row[headers.folio]},
        ${row[headers.subramo_poliza]},
        '${row[headers.sucursal]}',
        ${row[headers.poliza]},
        ${row[headers.endoso]},
        ${row[headers.inciso]},
        '${to_sql_date(row[headers.inicio_vigencia])}',
        '${to_sql_date(row[headers.fin_vigencia])}',
        '${row[headers.agente]}',
        '${row[headers.marca]}',
        ${row[headers.regla] != '' ? row[headers.regla] : 0},
        '${row[headers.tipo]}',
        '${row[headers.bth] != '' ? row[headers.bth] : 'N'}',
        '${row[headers.agencia_bth]}',
        '${row[headers.btb] != '' ? row[headers.btb] : 'N'}',
        '${row[headers.convenio] != '' ? row[headers.convenio] : 'N'}',
        '${row[headers.causa]}',
        ${row[headers.cobertura]},
        ${parseFloat(row[headers.estimacion])},
        ${row[headers.tipo_vehiculo]},
        '${row[headers.descripcion_tipo]}',
        '${row[headers.descripcion_vehiculo]}',
        ${row[headers.anio_vehiculo]},
        '${row[headers.serie]}',
        '${row[headers.nombre_conductor]}',
        '${row[headers.ap_pat_conductor]}',
        '${row[headers.ap_mat_conductor]}',
        '${row[headers.correo]}'
    )`;
}

function dumpMarca(results){
    var data = results.data;
    var container = $('#results');

    var tipo = 1;
    

    data.forEach((el, idx) => {
        switch(parseInt(el[headers.tipo_vehiculo]))
        {
            case 5 : case 15 :
                tipo = 2; break;
            case 2 : case 4 : case 7 : case 9 : case 12 : case 14 : case 17 :
                tipo = 3; break;
            case 0 : case 1 : case 3 : case 6 : case 8 : case 11 : case 16 : default :
                tipo = 1; break;
        }
        if(idx != 0)
            container.append(`UPDATE batch_pruebas_csv t1 INNER JOIN vehiculos t2 ON t1.token = t2.access_token SET t1.marca_vehiculo = '${el[headers.marca_vehiculo]}', t2.marca = '${el[headers.marca_vehiculo]}', t2.tipo = ${tipo} WHERE t1.id_prueba = ${idx};<br>`)
    });
}

function dumpSql(results){
    var data = results.data;
    var container = $('#results');

    container.append(`INSERT INTO batch_pruebas_csv (
        subramo_siniestro,
        oficina,
        siniestro,
        folio,
        subramo_poliza,
        sucursal,
        poliza,
        endoso,
        inciso,
        inicio_vigencia,
        fin_vigencia,
        agente,
        marca,
        regla,
        tipo,
        bth,
        agencia_bth,
        btb,
        convenio,
        causa,
        cobertura,
        estimacion,
        tipo_vehiculo,
        descripcion_tipo,
        descripcion_vehiculo,
        anio_vehiculo,
        serie,
        nombre_conductor,
        ap_pat_conductor,
        ap_mat_conductor,
        correo
    ) VALUES <br> `);

    data.forEach((el, idx) => {
        console.log(`processing row ${idx}`);
        if (idx != 0)
            container.append(`${createStatement(el)}, <br>`);
    });
}

function parse(){
    $('#file').parse({
        config: {
            delimiter: ",",
            header: false,
            complete: dumpMarca
        }, 
        complete: function(){
            alert('Todas las pruebas procesadas con éxito');
        }
    })
}

function to_sql_date(value){
    let aux = value.split('/');

    return `${aux[2]}-${aux[1]}-${aux[0]}`;
}

$(function(){
    $('#analyze').click(function(evt){
        evt.preventDefault();
        parse();
    });
});