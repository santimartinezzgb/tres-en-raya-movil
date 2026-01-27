# Configuración de PostgreSQL en Ubuntu

### 1. Instalación
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

### 2. Gestión del Servicio
```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
sudo systemctl status postgresql
```

### 3. Acceso y Usuario
Entrar a la consola de Postgres (usuario por defecto `postgres`):
```bash
sudo -iu postgres psql
```

Crear un usuario y base de datos (dentro de `psql`):
```sql
CREATE USER mi_usuario WITH PASSWORD 'mi_password';
CREATE DATABASE mi_db OWNER mi_usuario;
\q
```

### 4. Acceso Directo (Opcional)
Para entrar sin `sudo`:
```bash
psql -U mi_usuario -d mi_db -h localhost
```

### 5. Solución de Problemas (Comunes)

#### A. Error: `SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string`
Este error ocurre cuando la API intenta conectar a la base de datos **antes** de cargar las variables del archivo `.env`.

**Solución:**
Asegurar que `dotenv.config()` se ejecute al principio del archivo de entrada (`server.ts`) o antes de instanciar el `Pool`:
```typescript
import dotenv from 'dotenv';
dotenv.config(); // Debe ir antes de importar módulos que usen la DB
```

#### B. Error: `permission denied for schema public`
Si la API conecta pero falla al crear tablas:

```bash
# 1. Asegurar que el usuario es el dueño de la DB
sudo -u postgres psql -c "ALTER DATABASE \"nombre_db\" OWNER TO mi_usuario;"

# 2. Dar permisos sobre el esquema público (Postgres 15+)
sudo -u postgres psql -d "nombre_db" -c "GRANT ALL ON SCHEMA public TO mi_usuario;"
```
