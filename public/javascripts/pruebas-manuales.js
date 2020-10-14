const mayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const minusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros    = '0123456789';

let container = $('#results');

function createStatement(row){
    // Objeto a guardar
    let body = {
        poliza: [
            {
                moneda: row[7],
                ramo: row[8],
                subramo: row[9],
                sucursal: row[10],
                poliza : row[11],
                endoso : row[12],
                inciso : row[13],
                vigencia: row[14],
                finVigencia: row[15],
                back_to_home: row[20] == 'S' ? 'S' : 'N',
                agencia_bth: row[22],
                back_to_brand: row[23] == 'S' ? 'S' : 'N',
                acuerdos: row[24] == 'S' ? 'S' : 'N',
                cdr_asignados: [],
                agente : [
                    {
                        agente: row[16],
                        marca : row[17],
                        tipo  : row[19],
                        regla : row[18] ? row[18] : 0
                    }
                ]
            }
        ],
        siniestro : [
            {
                moneda: row[0],
                ramo: row[1],
                subramo: row[2],
                oficina: row[3],
                siniestro: row[4],
                anio: row[5],
                ajustador: [
                    {
                        usuario: "AjjoseM",
                        nombre: "Jose Martínez Araujo",
                        correo: "ajustador@correo.com",
                        telefono: "55 6677 8899"
                    }
                ],
                vehiculos: [
                    {
                        access_token: '',
                        nombre: row[35],
                        aPaterno: row[36],
                        aMaterno: row[37],
                        direccion: 'CALLE 21 6 GUSTAVO A. MADERO',
                        correo: row[38],
                        telefono: row[39],
                        placas: 'MKH 4567',
                        marca: row[32].split(' ')[0],
                        modelo: row[32],
                        anio: row[33],
                        ramo: "1",
                        subramo: "2",
                        asegurado: 100,
                        necesita_grua: 0,
                        valuacion: row[27].replace(',', ''),
                        folio: row[6],
                        tipo: row[28],
                        coberturas: [ { idCobertura: row[26] } ],
                        orden_digital: "www.atlas.com/orden1.pdf"
                    }
                ]
            }
        ]
    };

    let access_token = generateTestToken();

    container.append(`INSERT INTO batch_pruebas_csv SET
    moneda_siniestro='${body.siniestro[0].moneda}'
   ,ramo_siniestro='${body.siniestro[0].ramo}'
   ,subramo_siniestro='${body.siniestro[0].subramo}'
   ,oficina='${body.siniestro[0].oficina}'
   ,siniestro='${body.siniestro[0].siniestro}'
   ,anio_siniestro='${body.siniestro[0].anio}'
   ,folio='${body.siniestro[0].vehiculos[0].folio}'
   ,moneda_poliza='${body.poliza[0].moneda}'
   ,ramo_poliza='${body.poliza[0].ramo}'
   ,subramo_poliza='${body.poliza[0].subramo}'
   ,sucursal='${body.poliza[0].sucursal}'
   ,poliza='${body.poliza[0].poliza}'
   ,endoso='${body.poliza[0].endoso}'
   ,inciso='${body.poliza[0].inciso}'
   ,inicio_vigencia='${body.poliza[0].vigencia}'
   ,fin_vigencia='${body.poliza[0].finVigencia}'
   ,agente='${body.poliza[0].agente[0].agente}'
   ,marca='${body.poliza[0].agente[0].marca}'
   ,regla='${body.poliza[0].agente[0].regla}'
   ,tipo='${body.poliza[0].agente[0].tipo}'
   ,bth='${body.poliza[0].back_to_home}'
   ,idu=0
   ,agencia_bth='${body.poliza[0].agencia_bth}'
   ,btb='${body.poliza[0].back_to_brand}'
   ,convenio='${body.poliza[0].acuerdos}'
   ,causa='PRUEBA'
   ,cobertura='${body.siniestro[0].vehiculos[0].coberturas[0].idCobertura}'
   ,estimacion='${body.siniestro[0].vehiculos[0].valuacion}'
   ,tipo_vehiculo='${body.siniestro[0].vehiculos[0].tipo}'
   ,descripcion_tipo='PRUEBA'
   ,idn=NULL
   ,marca_vehiculo='${body.siniestro[0].vehiculos[0].marca}'
   ,descripcion_vehiculo='PRUEBA'
   ,anio_vehiculo='${body.siniestro[0].vehiculos[0].anio}'
   ,serie='PRUEBA'
   ,nombre_conductor='${body.siniestro[0].vehiculos[0].nombre}'
   ,ap_pat_conductor='${body.siniestro[0].vehiculos[0].aPaterno}'
   ,ap_mat_conductor='${body.siniestro[0].vehiculos[0].aMaterno}'
   ,correo='${body.siniestro[0].vehiculos[0].correo}'
   ,celular='${body.siniestro[0].vehiculos[0].telefono}'
   ,lat_referencia=NULL
   ,lon_referencia=NULL
   ,estado=NULL
   ,resultado=NULL
   ,manual=1
   ,token='${access_token}';`);

    container.append(`SET @id_prueba = LAST_INSERT_ID();<br>`);
    container.append(`INSERT INTO agentes SET clave_agente='${body.poliza[0].agente[0].agente}',marca='${body.poliza[0].agente[0].marca}',regla='${body.poliza[0].agente[0].regla}';<br>`);
    container.append(`SET @id_agente = LAST_INSERT_ID();<br>`);

    let num_poliza = body.poliza[0].moneda + body.poliza[0].ramo + body.poliza[0].subramo + body.poliza[0].sucursal + body.poliza[0].poliza + body.poliza[0].endoso + body.poliza[0].inciso;
    container.append(`
    INSERT INTO polizas
    SET num_poliza='${num_poliza}'
       ,moneda='${body.poliza[0].moneda}'
       ,ramo='${body.poliza[0].ramo}'
       ,subramo='${body.poliza[0].subramo}'
       ,sucursal='${body.poliza[0].sucursal}'
       ,poliza='${body.poliza[0].poliza}'
       ,endoso='${body.poliza[0].endoso}'
       ,inciso='${body.poliza[0].inciso}'
       ,vigencia='${body.poliza[0].vigencia}'
       ,back_to_home='${body.poliza[0].back_to_home}'
       ,back_to_brand='${body.poliza[0].back_to_brand}'
       ,acuerdos='${body.poliza[0].acuerdos}'
       ,cdr_asignados='[]'
       ,id_agente=@id_agente
       ,agencia_back_to_home='${body.poliza[0].agencia_bth}'
       ,es_prueba=1;<br>`);
    container.append(`SET @id_poliza = LAST_INSERT_ID();<br>`);

    let num_siniestro = body.siniestro[0].ramo + body.siniestro[0].subramo + body.siniestro[0].oficina + body.siniestro[0].siniestro + body.siniestro[0].anio;
    container.append(`INSERT INTO siniestros
       SET id_poliza     = @id_poliza
          ,num_siniestro = '${num_siniestro}'
          ,ramo          = '${body.siniestro[0].ramo}'
          ,subramo       = '${body.siniestro[0].subramo}'
          ,oficina       = '${body.siniestro[0].oficina}'
          ,siniestro     = '${body.siniestro[0].siniestro}'
          ,anio          = '${body.siniestro[0].anio}'
          ,id_ajustador  = 1
          ,moneda        = '${body.siniestro[0].moneda}';<br>`);
    container.append(`SET @id_siniestro = LAST_INSERT_ID();<br>`);

    
    let familia = getFamiliaVehiculo(body.siniestro[0].vehiculos[0].tipo);
    container.append(`
    INSERT INTO vehiculos
       SET id_siniestro  = @id_siniestro
          ,access_token  = '${access_token}'
          ,nombre        = '${body.siniestro[0].vehiculos[0].nombre}'
          ,aPaterno      = '${body.siniestro[0].vehiculos[0].aPaterno}'
          ,aMaterno      = '${body.siniestro[0].vehiculos[0].aMaterno}'
          ,direccion     = '123 Main St'
          ,correo        = '${body.siniestro[0].vehiculos[0].correo}'
          ,telefono      = '${body.siniestro[0].vehiculos[0].telefono}'
          ,placas        = 'PRUEBAS'
          ,marca         = '${body.siniestro[0].vehiculos[0].marca}'
          ,modelo        = '${body.siniestro[0].vehiculos[0].modelo}'
          ,anio          = '${body.siniestro[0].vehiculos[0].anio}'
          ,ramo          = '${body.siniestro[0].ramo}'
          ,subramo       = '${body.siniestro[0].subramo}'
          ,valuacion     = '${body.siniestro[0].vehiculos[0].valuacion}'
          ,coberturas    = '${JSON.stringify(body.siniestro[0].vehiculos[0].coberturas)}'
          ,orden_digital = 'www.atlas.com/orden1.pdf'
          ,folio         = '${body.siniestro[0].vehiculos[0].folio}'
          ,tipo          = '${familia}'
          ,submarca      = NULL
          ,version       = NULL;<br>`);
}

function dumpSql(results){
    let idx = 0
    for(const row of results.data){
        if(idx != 0)
            createStatement(row);

        idx += 1;
    }
}

function getFamiliaVehiculo(_tipo) {
    let familia = 0;

    switch(_tipo){
        case 0 : case 1 : case 3 : case 6 : case 8 : case 11 : case 13 : case 16 :
            familia = 1;
            break;

        case 2 : case 4 : case 7 : case 9 : case 12 : case 14 : case 17 :
            familia = 3;
            break;

        case 5 : case 15 :
            familia = 2;
            break;
    }

    return familia;
}

/** 
 * Genera un token de prueba.
 * 
 * Este método se utiliza para generar tokens de prueba, razón por la
 * cual empiezan con los caracteres TEST. 
 * 
 * ESTE MÉTODO NO DEBE USARSE PARA GENERAR TOKENS PARA DATOS REALES !!!
 */
function generateTestToken(){
    let token = 'TEST';

    for(var _i = 0; _i < 8; _i++)
        token += getChar(getRandomValue(100.0));

    return token;
}

function getChar(val) {
    let char = '';
    if(0.0 < val && val <= 33.33)
        char = mayusculas[parseInt(getRandomValue(25.0))];
    else if(33.33 < val && val <= 66.66)
        char = minusculas[parseInt(getRandomValue(25.0))];
    else
        char = numeros[parseInt(getRandomValue(10.0))];

    return char;
}

function getRandomValue(maxRange){
    let val = null;

    do {
        val = (Math.random() * (maxRange + 1))
    } while(val < 0.0 || val > maxRange);

    return val;
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
};

$(function(){
    $('#analyze').click(function(evt){
        evt.preventDefault();
        parse();
    });
});