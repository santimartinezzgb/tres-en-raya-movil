import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

enum ResultadoPartida {
    VICTORIA = 'Victoria',
    DERROTA = 'Derrota',
    EMPATE = 'Empate',
}
const tiempoEsperaIA = 500;
const URL_API_PARTIDAS = 'http://10.0.2.2:3000/api/partidas';
const posibilidadesVictoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
];

async function guardarPartida(nombrejugador: string, resultado: string) {
    try {
        const response = await fetch(URL_API_PARTIDAS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombrejugador: nombrejugador, resultado }),
        });
        const result = await response.json();
        if (result.success) console.log('Partida guardada correctamente');
    } catch (error) {
        console.error('Error al guardar partida:', error);
    }
}

export default function Juego({ navigation }: any): React.ReactElement {

    const route: any = useRoute(); // Obtener los parámetros de la ruta de la API
    const { nombre, dificultad } = route.params; // Obtener datos de la partida

    const [tablero, setTablero] = useState(Array(9).fill(null));
    const [turnoX, setTurnoX] = useState(true);
    const [ganador, setGanador] = useState<string | null>(null);

    const calcularGanador = (celdas: any[]) => {

        for (let i = 0; i < posibilidadesVictoria.length; i++) {
            const [a, b, c] = posibilidadesVictoria[i];
            if (celdas[a] && celdas[a] === celdas[b] && celdas[a] === celdas[c]) return celdas[a];
        }
        return null;
    };

    const controlarMovimiento = (i: number) => {

        if (tablero[i] || ganador) return;

        const nuevoTablero = tablero.slice();
        nuevoTablero[i] = turnoX ? 'X' : 'O';

        setTablero(nuevoTablero);

        const resultado = calcularGanador(nuevoTablero);

        if (resultado) {
            setGanador(resultado);
            guardarPartida(nombre, resultado === 'X' ? ResultadoPartida.VICTORIA : ResultadoPartida.DERROTA);
        } else if (!nuevoTablero.includes(null)) {
            setGanador(ResultadoPartida.EMPATE);
            guardarPartida(nombre, ResultadoPartida.EMPATE);
        } else {
            setTurnoX(!turnoX);
        }
    };

    useEffect(() => { // useEffect automatiza el turno de la máquina
        if (!turnoX && !ganador) {
            const tiempoEspera = tiempoEsperaIA;
            const temporizador = setTimeout(() => {
                realizarMovimientoIA();
            }, tiempoEspera);
            return () => clearTimeout(temporizador);
        }
    }, [turnoX, ganador]);

    const realizarMovimientoIA = () => {
        let indiceMovimiento = -1;

        if (dificultad === 'facil') {
            indiceMovimiento = obtenerMovimientoAleatorio();
        } else {
            indiceMovimiento = obtenerMovimientoDificil();
        }

        if (indiceMovimiento !== -1) {
            controlarMovimiento(indiceMovimiento);
        }
    };

    const obtenerMovimientoAleatorio = () => {
        const disponibles = tablero.map((v, i) => v === null ? i : null).filter(v => v !== null);
        if (disponibles.length === 0) return -1;
        const indiceAleatorio = Math.floor(Math.random() * disponibles.length);
        return disponibles[indiceAleatorio] as number;
    };

    const obtenerMovimientoDificil = () => {

        const disponibles = tablero.map((valorCelda, i) => valorCelda === null ? i : null).filter(valorCelda => valorCelda !== null); // Índices de celdas disponibles
        if (disponibles.length === 0) return -1; // No hay movimientos disponibles

        // PRIORIDAD DE MOVIMIENTOS DE LA IA

        // Intentar ganar
        for (let i of disponibles) {
            if (i === null) continue;
            const tableroSimulado = [...tablero];
            tableroSimulado[i] = 'O';
            if (calcularGanador(tableroSimulado) === 'O') {
                return i;
            }
        }

        // Bloquear al jugador para que no gane
        for (let i of disponibles) {
            if (i === null) continue;
            const tableroSimulado = [...tablero];
            tableroSimulado[i] = 'X';
            if (calcularGanador(tableroSimulado) === 'X') {
                return i;
            }
        }

        // Tomar el centro si está disponible
        if (tablero[4] === null) return 4;

        // Aleatorio
        return obtenerMovimientoAleatorio();
    };

    const reiniciarJuego = () => {
        setTablero(Array(9).fill(null));
        setTurnoX(true);
        setGanador(null);
    };

    return (
        <View style={styles.contenedor}>

            {/* Contenedor de titulo */}
            <View style={styles.contenedorTitulo}>
                <Text style={styles.textoTitulo}>Turno de: {turnoX ? 'X' : 'O'}</Text>
                <Text style={styles.textoSubtitulo}>Jugador: {nombre}</Text>
            </View>

            {/* Tablero */}
            <View style={styles.tablero}>
                {tablero.map((celda, i) => (
                    <TouchableOpacity key={i} style={styles.celda} onPress={() => controlarMovimiento(i)}>
                        <Text style={celda === 'X' ? styles.textoJugadorX : styles.textoJugadorO}>{celda}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Info ganador */}
            {ganador && (
                <View style={styles.infoGanador}>
                    <Text style={styles.textoGanador}>
                        {ganador === ResultadoPartida.EMPATE ? ResultadoPartida.EMPATE : `¡Ganó ${ganador}!`}
                    </Text>
                    <TouchableOpacity style={styles.botonReiniciar} onPress={reiniciarJuego}>
                        <Text style={styles.textoNegro}>Reiniciar</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Boton volver */}
            <TouchableOpacity style={styles.contenedorVolver} onPress={() => navigation.navigate('Inicio')}>
                <Text style={styles.textoBlanco}>Volver</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    /* TIPOS DE TEXTOS */
    textoBlanco: {
        color: '#ffffffff',
        fontSize: 20,
        textAlign: 'center',
        lineHeight: 30,
        fontWeight: 'bold',
    },
    textoNegro: {
        color: '#000000ff',
        fontSize: 20,
        textAlign: 'center',
        lineHeight: 40,
        fontWeight: 'bold',
    },
    textoTitulo: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    textoSubtitulo: {
        color: '#aaa',
        fontSize: 18,
        marginBottom: 30,
    },
    textoJugadorX: {
        color: '#00ff00',
        fontSize: 60,
        fontWeight: 'bold',
    },
    textoJugadorO: {
        color: '#ff0000',
        fontSize: 60,
        fontWeight: 'bold',
    },
    textoGanador: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    /* =========================== */

    contenedorTitulo: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    contenedor: {
        flex: 1,
        gap: 50,
        backgroundColor: '#000000ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tablero: {
        width: 310,
        height: 310,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#444',
        borderRadius: 10,
        padding: 5,
        justifyContent: 'center',
        alignContent: 'center',
    },
    celda: {
        width: 90,
        height: 90,
        backgroundColor: '#1a1a1a',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#333',
    },
    infoGanador: {
        position: 'absolute',
        top: '20%',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#111',
        borderRadius: 10,
        width: '70%',
    },
    botonReiniciar: {
        width: 120,
        height: 40,
        backgroundColor: '#ffffffff',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    contenedorVolver: {
        width: 100,
        height: 40,
        backgroundColor: 'black',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
});
