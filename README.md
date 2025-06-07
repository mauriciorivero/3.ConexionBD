# Parking Lot Manual ORM

This folder contains a complete manual Object-Relational Mapping (ORM) implementation for the Parking Lot Management System database. Each table in the database has a corresponding model class with full CRUD operations.

## Models Overview

### 1. PerfilUsuario.js
- **Table**: `PERFIL_USUARIO`
- **Purpose**: Manages user profiles/roles (administrator, operator, user)
- **Key Methods**:
  - `create()` - Insert new profile
  - `findById(id)` - Find profile by ID
  - `findAll()` - Get all profiles
  - `update()` - Update profile
  - `delete()` - Delete profile

### 2. Usuario.js
- **Table**: `USUARIO`
- **Purpose**: Manages user information
- **Key Methods**:
  - `create()` - Insert new user
  - `findById(id)` - Find user by ID
  - `findByDocument(numero_documento)` - Find user by document number
  - `findAll()` - Get all users
  - `update()` - Update user
  - `delete()` - Delete user

### 3. Vehiculo.js
- **Table**: `VEHICULO`
- **Purpose**: Manages vehicle information
- **Key Methods**:
  - `create()` - Insert new vehicle
  - `findById(id)` - Find vehicle by ID
  - `findByPlaca(placa)` - Find vehicle by license plate
  - `findByUserId(userId)` - Find vehicles by user ID
  - `findAll()` - Get all vehicles
  - `update()` - Update vehicle
  - `delete()` - Delete vehicle

### 4. Celda.js
- **Table**: `CELDA`
- **Purpose**: Manages parking cells/spaces
- **Key Methods**:
  - `create()` - Insert new cell
  - `findById(id)` - Find cell by ID
  - `findByTipo(tipo)` - Find cells by type (Carro/Moto)
  - `findByEstado(estado)` - Find cells by status
  - `findAvailableByType(tipo)` - Find available cells by type
  - `countByTypeAndStatus(tipo, estado)` - Count cells
  - `changeStatus(newStatus)` - Change cell status
  - `update()` - Update cell
  - `delete()` - Delete cell

### 5. AccesoSalida.js
- **Table**: `ACCESO_SALIDAS`
- **Purpose**: Manages vehicle entry/exit records
- **Key Methods**:
  - `create()` - Insert new access record
  - `findById(id)` - Find record by ID
  - `findByVehicleId(vehiculoId)` - Find records by vehicle
  - `findByMovimiento(movimiento)` - Find by movement type (Entrada/Salida)
  - `findByDateRange(fechaInicio, fechaFin)` - Find by date range
  - `findAll()` - Get all records
  - `update()` - Update record
  - `delete()` - Delete record

### 6. PicoPlaca.js
- **Table**: `PICO_PLACA`
- **Purpose**: Manages traffic restriction rules
- **Key Methods**:
  - `create()` - Insert new rule
  - `findById(id)` - Find rule by ID
  - `findByVehicleTypeAndDay(tipo, dia)` - Find rules by vehicle type and day
  - `findByNumberAndDay(numero, dia)` - Find rules by number and day
  - `findAll()` - Get all rules
  - `update()` - Update rule
  - `delete()` - Delete rule

### 7. Incidencia.js
- **Table**: `INCIDENCIA`
- **Purpose**: Manages incident types
- **Key Methods**:
  - `create()` - Insert new incident type
  - `findById(id)` - Find incident by ID
  - `findByNombre(nombre)` - Find incidents by name
  - `findAll()` - Get all incidents
  - `update()` - Update incident
  - `delete()` - Delete incident

### 8. ReporteIncidencia.js
- **Table**: `REPORTE_INCIDENCIA` (Junction table)
- **Purpose**: Manages incident reports linking vehicles and incidents
- **Key Methods**:
  - `create()` - Insert new report
  - `findByIds(vehiculoId, incidenciaId)` - Find by both IDs
  - `findByVehicleId(vehiculoId)` - Find reports by vehicle
  - `findByIncidentId(incidenciaId)` - Find reports by incident
  - `findByDateRange(fechaInicio, fechaFin)` - Find by date range
  - `findAll()` - Get all reports
  - `update()` - Update report
  - `delete()` - Delete report

### 9. HistorialParqueo.js
- **Table**: `HISTORIAL_PARQUEO` (Junction table)
- **Purpose**: Manages parking history linking cells and vehicles
- **Key Methods**:
  - `create()` - Insert new history record
  - `findByIds(celdaId, vehiculoId)` - Find by both IDs
  - `findByVehicleId(vehiculoId)` - Find history by vehicle
  - `findByCellId(celdaId)` - Find history by cell
  - `findByDateRange(fechaInicio, fechaFin)` - Find by date range
  - `getCurrentVehicleInCell(celdaId)` - Get current vehicle in cell
  - `getParkingStatistics()` - Get parking statistics
  - `findAll()` - Get all history
  - `update()` - Update history
  - `delete()` - Delete history

## Usage Examples

### Basic Usage
```javascript
const { Usuario, Vehiculo, Celda } = require('./model');

// Find a user by document
const usuario = new Usuario();
await usuario.findByDocument('651684841');
console.log(usuario.toJSON());

// Get all available car cells
const celdasDisponibles = await Celda.findAvailableByType('Carro');
console.log('Available cells:', celdasDisponibles.length);

// Find vehicles for a user
const vehiculos = await Vehiculo.findByUserId(1);
console.log('User vehicles:', vehiculos.map(v => v.toJSON()));
```

### Creating New Records
```javascript
// Create new user
const newUser = new Usuario(
  null, 'CC', '123456789', 'Juan', 'Carlos', 'Perez', 'Lopez',
  'juan.perez@email.com', '3001234567', 'img/juan.jpg',
  'activo', 'password123', 3 // profile ID
);
await newUser.create();

// Create new vehicle for the user
const newVehicle = new Vehiculo(
  null, 'XYZ999', 'Azul', '2023', 'Honda', 'Carro', newUser.id_usuario
);
await newVehicle.create();
```

### Updating Records
```javascript
// Update user phone number
const usuario = new Usuario();
await usuario.findById(1);
usuario.numero_celular = '3009876543';
await usuario.update();

// Change cell status
const celda = new Celda();
await celda.findById(1);
await celda.changeStatus('Ocupada');
```

## Features

- **Complete CRUD Operations**: All models support Create, Read, Update, Delete
- **Async/Await Support**: All operations are promise-based
- **Error Handling**: Comprehensive error handling with descriptive messages
- **Connection Management**: Automatic database connection handling
- **Data Validation**: Built-in parameter validation
- **Flexible Queries**: Support for various query patterns
- **JSON Serialization**: Easy conversion to JSON format
- **Static Methods**: Class-level operations for bulk queries

## Database Connection

All models use the `DatabaseConnection.js` class for database connectivity. Make sure to configure your database connection parameters in `DatabaseConnection.js` before using the ORM.

## Files Structure

```
model/
├── index.js                 # Exports all models
├── PerfilUsuario.js         # User profiles model
├── Usuario.js               # Users model
├── Vehiculo.js              # Vehicles model
├── Celda.js                 # Parking cells model
├── AccesoSalida.js          # Access/exit records model
├── PicoPlaca.js             # Traffic restrictions model
├── Incidencia.js            # Incident types model
├── ReporteIncidencia.js     # Incident reports model
├── HistorialParqueo.js      # Parking history model
└── README.md                # This documentation
```

## Testing

See `example-orm-usage.js` in the root directory for comprehensive usage examples and testing scenarios. 