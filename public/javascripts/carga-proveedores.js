const headers = {
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

function createStatement(row, i) {
  let idu = getNumeric(row[headers.idu], 0)

      ,tipo_prioridad = row[headers.tipo_prioridad] == 'ALTA' ? 31 : 0

      ,nivel_asignacion = getNumeric(row[headers.nivel_asignacion], 0)

      ,observacion_regla = getObservacionRegla(row[headers.observacion_regla].trim())

      ,cp = getNumeric(e(row[headers.cp]), 0)

      ,latitud = getReal(row[headers.latitud], 0)

      ,longitud = getReal(row[headers.longitud], 0)

      ,tipo_proveedor = getTipoProveedor(row[headers.tipo_proveedor].trim())

      ,tipo_unidad = getTipoUnidad(row[headers.tipo_unidad].trim());

  return `(
      '${i}'
      ,'${idu}'
      ,'${row[headers.oficina_regional]}'
      ,'${row[headers.oficina_cargada]}'
      ,'${row[headers.rfc]}'
      ,'${tipo_prioridad}'
      ,'${nivel_asignacion}'
      ,'${observacion_regla}'
      ,'${row[headers.razon_social]}'
      ,'${row[headers.nombre_comercial]}'
      ,'${row[headers.calle]}'
      ,'${row[headers.numero]}'
      ,'${row[headers.num_int]}'
      ,'${row[headers.colonia]}'
      ,'${cp}'
      ,'${row[headers.delegacion_municipio]}'
      ,'${row[headers.estado]}'
      ,'${latitud}'
      ,'${longitud}'
      ,'${row[headers.clave_proveedor]}'
      ,'${tipo_proveedor}'
      ,'${tipo_unidad}'
      ,'${row[headers.telefono1]}'
      ,'${row[headers.extension1]}'
      ,'${row[headers.telefono2]}'
      ,'${row[headers.extension2]}'
      ,'${row[headers.telefono3]}'
      ,'${row[headers.extension3]}'
      ,'${row[headers.supervisor_encargado]}'
      ,'${row[headers.correo_supervisor]}'
  ),`;
}

function dumpSql(results) {
  var data = results.data;

  container.html('').append(`INSERT INTO proveedores (
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

function getNumeric(val, def) {
  let num = parseInt(val)

  return !isNaN(num) ? num : def
}

function getObservacionRegla(observacion) {
  let valor = 0;

  switch(observacion) {
      case 'POR UBICACIÓN':
          valor = 37; break;

      case 'POR UBICACIÓN Y TIPO DE DAÑO':
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

function getReal(val, def) {
  let real = parseFloat(val)

  return !isNaN(real) ? real : def
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

      case 'DAÑOS LEVES Y MEDIANOS':
          valor = 47; break;

      case 'DAÑOS LEVES Y MEDIOS':
          valor = 48; break;

      case 'HOSPITALARIO':
          valor = 49; break;

      case 'SOLO DAÑOS ECOLOGICOS':
          valor = 50; break;

      case 'TODOS':
          valor = 51; break;
  }

  return valor;
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