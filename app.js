const mysql = require('mysql2');

// Configuración de la conexión
const connection = mysql.createConnection({
  host: 'ip o nombre de dominio',
  port: numero_puerto,
  user: 'nombre_usuario',        // Cambia por tu usuario de MySQL
  password: 'clave_usuario', // Cambia por tu contraseña
  database: 'Nombre_base_de_datos'  // Cambia por el nombre de tu base de datos
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.message);
    return;
  }
  console.log('Conectado a MySQL como ID:', connection.threadId);
  
  // Ejecutar consulta de selección
  ejecutarConsulta();
});

function ejecutarConsulta() {
  // Ejemplo de consulta SELECT
  const query = 'SELECT campo1, campo1, campo3 FROM nombre_tabla LIMIT 10'; // Cambia por tu consulta
  
  connection.query(query, (err, results, fields) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      return;
    }
    
    console.log('\n=== RESULTADOS DE LA CONSULTA ===');
    console.log('Número de registros encontrados:', results.length);
    console.log('\nDatos:');
    
    // Mostrar cada resultado
    results.forEach((row, index) => {
      console.log(`\nRegistro ${index + 1}:`);
      console.log(row);
    });
    
    // Cerrar la conexión
    connection.end((err) => {
      if (err) {
        console.error('Error cerrando la conexión:', err.message);
      } else {
        console.log('\nConexión cerrada correctamente.');
      }
    });
  });
}

// Manejar errores de conexión
connection.on('error', (err) => {
  console.error('Error de conexión:', err.message);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Conexión perdida, reconectando...');
  }
});