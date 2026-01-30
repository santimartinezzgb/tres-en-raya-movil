import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';

enum ResultadoPartida {
    VICTORIA = 'Victoria',
    DERROTA = 'Derrota',
    EMPATE = 'Empate',
}
const URL_API_ULTIMAS_PARTIDAS = 'http://10.0.2.2:3000/api/partidas/ultimas';

export default function Historial({ navigation }: any): React.ReactElement {

    const [partidas, setPartidas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const cargarHistorial = async () => {
        try {
            const response = await fetch(URL_API_ULTIMAS_PARTIDAS);
            const result = await response.json();
            if (result.success) {
                setPartidas(result.data);
            }
        } catch (error) {
            console.error('Error al cargar historial:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarHistorial();
    }, []);

    const getEstiloResultado = (resultado: string) => {
        switch (resultado) {
            case ResultadoPartida.VICTORIA: return styles.textVictoria;
            case ResultadoPartida.DERROTA: return styles.textDerrota;
            case ResultadoPartida.EMPATE: return styles.textEmpate;
            default: return styles.textWhite;
        }
    };

    const renderItem = ({ item }: { item: any }) => ( // Renderizar cada partida en el historial
        <View style={styles.partidaItem}>

            {/* Nombre del jugador */}
            <Text style={styles.textNombre}>{item.nombrejugador}</Text>

            {/* Resultado de la partida */}
            <Text style={getEstiloResultado(item.resultado)}>
                {item.resultado}
            </Text>

            {/* Fecha de la partida */}
            <Text style={styles.textFecha}>
                {new Date(item.fecha).toLocaleDateString()}
            </Text>
        </View>
    );

    return (
        <View style={styles.contenedor}>
            <Text style={styles.textTitulo}>Historial de Partidas</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#ffffff" />
            ) : (
                <FlatList
                    data={partidas}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.lista}
                    ListEmptyComponent={<Text style={styles.textWhite}>No hay partidas registradas</Text>}
                />
            )}

            <TouchableOpacity style={styles.contenedorVolver} onPress={() => navigation.navigate('Inicio')}>
                <Text style={styles.textWhite}>Volver</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    /* Texto blanco */
    textWhite: {
        color: '#ffffffff',
        fontSize: 20,
        textAlign: 'center',
        lineHeight: 40,
        fontWeight: 'bold',
    },

    /* Texto negro */
    textBlack: {
        color: '#000000ff',
        fontSize: 20,
        textAlign: 'center',
        lineHeight: 40,
        fontWeight: 'bold',
    },
    contenedor: {
        flex: 1,
        padding: 40,
        backgroundColor: '#000000ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#ffffffff',
        fontSize: 22,
        textAlign: 'center',
        lineHeight: 50,
        fontWeight: 'bold',
    },
    /* Boton de volver */
    contenedorVolver: {
        width: 100,
        height: 50,
        backgroundColor: 'black',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    textTitulo: {
        color: '#ffffffff',
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 20,
    },
    lista: {
        width: '90%',
    },
    partidaItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
    },
    textNombre: {
        color: '#fff',
        fontSize: 18,
        flex: 2,
    },
    textVictoria: {
        color: '#00ff00',
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    textDerrota: {
        color: '#ff0000',
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    textEmpate: {
        color: '#ffff00',
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    textFecha: {
        color: '#888',
        fontSize: 14,
        flex: 1,
        textAlign: 'right',
    },
});


