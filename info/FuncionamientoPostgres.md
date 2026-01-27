# Flujo de Datos: PostgreSQL + React Native

Breve resumen de cómo se comunican las partes.

## 1. Arquitectura
`App (React Native)` <--> `API (Express + Node)` <--> `PostgreSQL`

## 2. Base de Datos
La tabla principal es `partida`:
- `id`: Serial (Auto-Incremental)
- `nombrejugador`: String (100)
- `victoria`: Boolean
- `fecha`: Timestamp (Default NOW)

## 3. La API (Endpoints)
Base URL: `http://localhost:3000/api/partidas`

- **POST `/`**: Guarda una partida. Recibe JSON: `{ "nombrejugador": "...", "victoria": true/false }`.
- **GET `/ultimas`**: Devuelve las últimas 8 partidas para el historial.

## 4. Conexión en Screens

### Guardar (Menu.tsx)
Usamos `fetch` con método `POST`.
```javascript
fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombrejugador, victoria })
})
```

### Leer (Historial.tsx)
Usamos `useEffect` para pedir los datos al cargar la pantalla.
```javascript
const response = await fetch('http://localhost:3000/api/partidas/ultimas');
const data = await response.json();
// Guardar data.data en un estado (useState)
```

## 5. Flujo de ejecución
1. **Servidor**: `npm run api` (Inicia la conexión y crea la tabla si no existe).
2. **App**: `npm run start`.
3. Al terminar una partida o pulsar botones, se dispara el `fetch` hacia la API.
