import { Router, Request, Response } from 'express';
import { PartidaModel } from '../modules/partidaModel';

const router = Router();

router.get('/ultimas', async (req: Request, res: Response) => {
    try {
        const partidas = await PartidaModel.obtenerUltimas8();
        res.json({ success: true, data: partidas, count: partidas.length });
    } catch (error) {
        throw error;
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const partidas = await PartidaModel.obtenerTodas();
        res.json({ success: true, data: partidas, count: partidas.length });
    } catch (error) {
        throw error;
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ success: false, message: 'ID inválido' });

        const partida = await PartidaModel.obtenerPorId(id);
        if (!partida) return res.status(404).json({ success: false, message: 'Partida no encontrada' });

        res.json({ success: true, data: partida });
    } catch (error) {
        throw error;
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { nombrejugador, resultado } = req.body;
        const validResultados = ['Victoria', 'Derrota', 'Empate'];

        if (!nombrejugador || typeof resultado !== 'string') {
            return res.status(400).json({ success: false, message: 'Datos inválidos. Se requiere nombrejugador (string) y resultado (string)' });
        }

        if (!validResultados.includes(resultado)) {
            return res.status(400).json({ success: false, message: 'Resultado inválido. Debe ser: Victoria, Derrota o Empate' });
        }

        const nuevaPartida = await PartidaModel.crear({ nombrejugador, resultado });
        res.status(201).json({ success: true, data: nuevaPartida, message: 'Partida creada exitosamente' });
    } catch (error) {
        throw error;
    }
});

export default router;


// res.status(): Usa códigos de estado HTTP para indicar el resultado de la solicitud:
// - 200 OK: La solicitud fue exitosa.
// - 201 Created: Un nuevo recurso fue creado exitosamente.
// - 400 Bad Request: La solicitud es inválida o faltan datos requeridos.
// - 404 Not Found: El recurso solicitado no fue encontrado.