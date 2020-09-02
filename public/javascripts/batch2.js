const container = $('#results');

const tipos1 = [ 
    { tipo:  0, descripcion: 'Autos Reaseguro'},
    { tipo:  1, descripcion: 'Autos'},
    { tipo:  2, descripcion: 'Camiones'},
    { tipo:  3, descripcion: 'Turistas'},
    { tipo:  4, descripcion: 'Autobuses'},
    { tipo:  5, descripcion: 'Motos'},
    { tipo:  6, descripcion: 'Multianual Autos'},
    { tipo:  7, descripcion: 'Multianual Camiones'},
    { tipo:  8, descripcion: 'Autos Fronterizos'},
];

const tipos2 = [
    { tipo:  9, descripcion: 'Camiones Fronterizos'},
    { tipo: 11, descripcion: 'Autos Obligatorio'},
    { tipo: 12, descripcion: 'Camiones Obligarotio'},
    { tipo: 13, descripcion: 'Turistas Obligatorio'},
    { tipo: 14, descripcion: 'Autobuses Obligatorio'},
    { tipo: 15, descripcion: 'Motos Obligatorio'},
    { tipo: 16, descripcion: 'Multianual Autos Obligatorio'},
    { tipo: 17, descripcion: 'Multianual Camiones Obligatorio'},
    { tipo: 22, descripcion: 'Emisión Hombre Camión'},
    { tipo: 99, descripcion: 'Sin Ramo'} 
];

const marcas1 = [
    'ACURA','AUDI','BAIC','BMW','BUICK','CADILLAC','CHEVROLET','CHRYSLER',
    'DODGE','DUCATI','FERRARI','FIAT','FORD','FREIGHTLINER','GENERAL MOTORS',
    'GMC','HARLEY DAVIDSON','HONDA','HYUNDAI','INFINITI','ISUZU','JEEP',
]

const marcas2 = [
    'KENWORTH','KIA','LEXUS','LINCOLN','MAZDA','MERCEDES BENZ','MINI',
    'MITSUBISHI','NISSAN','OPEL','PEUGEOT','PORSCHE','RAM','RENAULT','SEAT',
    'SMART','SUBARU','SUZUKI','TESLA','TOYOTA','VOLKSWAGEN','VOLVO','YAMAHA'
];

const ubicaciones1 = [
    { lat: 19.70078,  lon: -101.18443 },
    { lat: 18.7475,   lon: -99.070278 },
    { lat: 21.5039,   lon: -104.895 },
    { lat: 25.67507,  lon: -100.31847 },
    { lat: 17.0669,   lon: -96.7203 },
    { lat: 19.03793,  lon: -98.20346 },
    { lat: 20.5931,   lon: -100.392 },
    { lat: 21.17429,  lon: -86.84656 },
    { lat: 22.14982,  lon: -100.97916 },
    { lat: 25.8257,   lon: -108.214 },
    { lat: 29.1026,   lon: -110.97732 },
    { lat: 17.986944, lon: -92.919444 },
    { lat: 23.696460, lon: -98.5064000 },
    { lat: 19.3122,   lon: -98.2394 },
    { lat: 19.180950, lon: -96.1429000 },
    { lat: 20.97537,  lon: -89.61696 },
    { lat: 22.7709,   lon: -102.583 }
];

const ubicaciones2 = [
    { lat: 21.8818,   lon: -102.291 } ,
    { lat: 32.5027,   lon: -117.00371 },
    { lat: 32.62781,  lon: -115.45446 },
    { lat: 19.8454,   lon: -90.5237 },
    { lat: 16.41,     lon: -92.408611 },
    { lat: 29.1026,   lon: -110.97732 },
    { lat: 27.30222,  lon: -102.044722 },
    { lat: 19.096667, lon: -103.960833 },
    { lat: 24.0277,	  lon: -104.653 },
    { lat: 19.47851,  lon: -99.23963 },
    { lat: 19.3467,   lon: -99.16174 },
    { lat: 19.35529,  lon: -99.06224 },
    { lat: 19.42847,  lon: -99.12766 },
    { lat: 19.60492,  lon: -99.06064 },
    { lat: 21.033333, lon: -101.241667 },
    { lat: 17.613056, lon: -99.95 },
    { lat: 20.478333, lon: -98.863611 },
    { lat: 20.66682,  lon: -103.39182 },
]

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

function createSqlStatement(row, folio, tipo, marca, ubicacion){
    return (`(
          ${row[headers.moneda_siniestro]}
        , ${row[headers.ramo_siniestro]}
        , ${row[headers.subramo_siniestro]}
        ,'${row[headers.oficina]}'
        , ${row[headers.siniestro]}
        , ${row[headers.anio_siniestro]}
        , ${folio}
        , ${row[headers.moneda_poliza]}
        , ${row[headers.ramo_poliza]}
        , ${row[headers.subramo_poliza]}
        ,'${row[headers.sucursal]}'
        , ${row[headers.poliza]}
        , ${row[headers.endoso]}
        , ${row[headers.inciso]}
        ,'${to_sql_date(row[headers.inicio_vigencia])}'
        ,'${to_sql_date(row[headers.fin_vigencia])}'
        ,'${row[headers.agente]}'
        ,'${row[headers.marca]}'
        , ${row[headers.regla]}
        ,'${row[headers.tipo]}'
        ,'${row[headers.bth]}'
        , ${row[headers.idu]}
        ,'${row[headers.agencia_bth]}'
        ,'${row[headers.btb]}'
        ,'${row[headers.convenio]}'
        ,'${row[headers.causa]}'
        , ${row[headers.cobertura]}
        , ${parseInt(row[headers.estimacion])}
        , ${tipo.tipo}
        ,'${tipo.descripcion}'
        , 0
        ,'${marca}'
        ,'${row[headers.descripcion_vehiculo]}'
        ,'${row[headers.anio_vehiculo]}'
        ,'${row[headers.serie]}'
        ,'${row[headers.nombre_conductor]}'
        ,'${row[headers.ap_pat_conductor]}'
        ,'${row[headers.ap_mat_conductor]}'
        ,'${row[headers.correo]}'
        ,'${row[headers.celular]}'
        , ${ubicacion.lat}
        , ${ubicacion.lon}
    )`);
}

function dumpSql(results){
    container.append(`INSERT INTO batch_pruebas_csv (
         moneda_siniestro  
        ,ramo_siniestro
        ,subramo_siniestro
        ,oficina
        ,siniestro
        ,anio_siniestro
        ,folio
        ,moneda_poliza
        ,ramo_poliza
        ,subramo_poliza
        ,sucursal
        ,poliza
        ,endoso
        ,inciso
        ,inicio_vigencia
        ,fin_vigencia
        ,agente
        ,marca
        ,regla
        ,tipo
        ,bth
        ,idu
        ,agencia_bth
        ,btb
        ,convenio
        ,causa
        ,cobertura
        ,estimacion
        ,tipo_vehiculo
        ,descripcion_tipo
        ,idn
        ,marca_vehiculo
        ,descripcion_vehiculo
        ,anio_vehiculo
        ,serie
        ,nombre_conductor
        ,ap_pat_conductor
        ,ap_mat_conductor
        ,correo
        ,celular
        ,lat_referencia
        ,lon_referencia
    ) VALUES `);
    results.data.forEach((el, idx) => {
        console.log(`processing row ${idx}`);

        if(idx !=0 )
            for(const t of tipos2) 
                for(const m of marcas2) 
                    for(const u of ubicaciones2)
                        container.append(`
                            ${createSqlStatement(el, 100, t, m, u)},<br>
                            ${createSqlStatement(el, 101, t, m, u)},<br>`
                        );
                    
            
        
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