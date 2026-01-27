# API Tres en Raya - Servidor Express con PostgreSQL

## Estructura del Proyecto

```
api/
├── server.ts                 # Servidor principal
├── modules/
│   ├── db.ts                # Configuración de PostgreSQL
│   └── partidaModel.ts      # Modelo de datos Partida
└── routes/
    └── partidaRoutes.ts     # Rutas de la API
```

## Modelo de Datos

### Tabla: partida
- `id` (SERIAL PRIMARY KEY) - Identificador único
- `nombrejugador` (VARCHAR(100)) - Nombre del jugador
- `victoria` (BOOLEAN) - Indica si ganó o perdió
- `fecha` (TIMESTAMP) - Fecha y hora de la partida (automática)

## Endpoints de la API

### GET /api/partidas/ultimas
Obtiene las últimas 8 partidas jugadas, ordenadas por fecha descendente.

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombrejugador": "Juan",
      "victoria": true,
      "fecha": "2026-01-18T10:30:00.000Z"
    }
  ],
  "count": 8
}
```

### GET /api/partidas
Obtiene todas las partidas registradas.

### GET /api/partidas/:id
Obtiene una partida específica por su ID.

### POST /api/partidas
Crea una nueva partida.

**Body:**
```json
{
  "nombrejugador": "Juan",
  "victoria": true
}
```

## Configuración

1. Instala las dependencias:
```bash
npm install pg @types/pg
```

2. Copia `.env.example` a `.env` y configura tus credenciales de PostgreSQL:
```bash
cp .env.example .env
```

3. Crea la base de datos en PostgreSQL:
```sql
CREATE DATABASE "tres-en-raya";
```

4. Inicia el servidor (la tabla se creará automáticamente):
```bash
npm run start
```

## Variables de Entorno

- `PORT` - Puerto del servidor (default: 3000)
- `DB_HOST` - Host de PostgreSQL (default: localhost)
- `DB_PORT` - Puerto de PostgreSQL (default: 5432)
- `DB_NAME` - Nombre de la base de datos (default: tres-en-raya)
- `DB_USER` - Usuario de PostgreSQL (default: postgres)
- `DB_PASSWORD` - Contraseña de PostgreSQL (default: postgres)
