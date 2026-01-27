import { query } from './db';

export interface Partida {
    id?: number;
    nombrejugador: string;
    resultado: string;
    fecha?: Date;
}

export class PartidaModel {

    static async crearTabla() { // Crear tabla partidas si no existe
        const sql = `
            CREATE TABLE IF NOT EXISTS partidas (
                id SERIAL PRIMARY KEY,
                nombrejugador VARCHAR(100) NOT NULL,
                resultado VARCHAR(20) NOT NULL,
                fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        try {
            await query(sql);
            console.log('Tabla partidas creada/verificada correctamente');
        } catch (error) {
            console.error('Error al crear tabla partidas:', error);
            throw error;
        }
    }

    static async obtenerUltimas8() { // Obtener las últimas 8 partidas
        const sql = `
            SELECT id, nombrejugador, resultado, fecha
            FROM partidas
            ORDER BY fecha DESC, id DESC
            LIMIT 8;
        `;
        try {
            const result = await query(sql);
            return result.rows;
        } catch (error) {
            console.error('Error al obtener partidas:', error);
            throw error;
        }
    }

    static async crear(partida: Partida) { // Crear nueva partida
        const sql = `
            INSERT INTO partidas (nombrejugador, resultado)
            VALUES ($1, $2)
            RETURNING *;
        `;
        try {
            const result = await query(sql, [partida.nombrejugador, partida.resultado]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al crear partida:', error);
            throw error;
        }
    }

    static async obtenerTodas() { // Obtener todas las partidas
        const sql = `
            SELECT id, nombrejugador, resultado, fecha
            FROM partidas
            ORDER BY fecha DESC, id DESC;
        `;
        try {
            const result = await query(sql);
            return result.rows;
        } catch (error) {
            console.error('Error al obtener todas las partidas:', error);
            throw error;
        }
    }

    static async obtenerPorId(id: number) { // Obtener partida por ID
        const sql = `
            SELECT id, nombrejugador, resultado, fecha
            FROM partidas
            WHERE id = $1;
        `;
        try {
            const result = await query(sql, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al obtener partida por ID:', error);
            throw error
        }
    }

    // interface Partida: Define la estructura de una partida
    // const sql: Define una consulta SQL
    // query(): Ejecuta la consulta SQL y devuelve una promesa

}
