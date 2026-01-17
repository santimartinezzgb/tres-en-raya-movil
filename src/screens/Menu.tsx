import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';


async function getNombreAleatorio(nombre: string): Promise<string> {
    if (nombre !== '') {
        return nombre;
    }
    try {
        const response = await fetch('https://thesimpsonsapi.com/api/characters');
        const data = await response.json();
        const nombreAleatorio = data[Math.floor(Math.random() * data.length)].name;
        return nombreAleatorio;
    } catch (error) {
        console.error(error);
        return 'Jugador';
    }
}

export default function Menu({ navigation }: any): React.ReactElement {
    const [nombre, setNombre] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.contenedorLogo}>
                <Image
                    source={require('../../assets/logoApp.png')}
                    style={styles.logo}
                />
            </View>

            <View style={styles.contenedorDatos}>

                {/* Input para ingresar el nombre */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Nombre"
                        placeholderTextColor="#666"
                        value={nombre}
                        onChangeText={setNombre}
                    />
                    <TouchableOpacity
                        style={styles.inputButton}
                        onPress={async () => {
                            const nuevoNombre = await getNombreAleatorio('');
                            setNombre(nuevoNombre);
                        }}
                    >
                        <Text style={styles.textButton}>🎲</Text>
                    </TouchableOpacity>
                </View>

                {/* Botones de dificultad */}
                <View style={styles.botonesDificultad}>
                    <TouchableOpacity onPress={() => navigation.navigate('Juego', { nombre, dificultad: 'facil' })}>
                        <Text style={styles.textFacil}>Fácil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Juego', { nombre, dificultad: 'dificil' })}>
                        <Text style={styles.textDificil}>Difícil</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.contenedorBotones}>
                    {/* Boton de iniciar */}
                    <TouchableOpacity style={styles.contenedorIniciar}>
                        <Text style={styles.textBlack}>Iniciar</Text>
                    </TouchableOpacity>

                    {/* Boton de volver */}
                    <TouchableOpacity style={styles.contenedorVolver} onPress={() => navigation.navigate('Inicio', { nombre })}>
                        <Text style={styles.textBlack}>Volver</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
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

    /* Contenedor principal */
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#000000ff',
        gap: 50,
    },

    /* Contenedor de logo */
    contenedorLogo: {
        gap: 20,
    },

    /* Contenedor de datos */
    contenedorDatos: {
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    /* Logo */
    logo: {
        width: 250,
        height: 250,
    },

    /* Input para ingresar el nombre */
    inputContainer: {
        flexDirection: 'row',
        width: 250,
        gap: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputText: {
        width: 190,
        height: 40,
        backgroundColor: '#ffffff',
        color: '#000000',
        paddingHorizontal: 15,
        borderRadius: 5,
        fontSize: 18,
    },
    inputButton: {
        width: 50,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        color: '#ffffffff',
        fontSize: 32,
        textAlign: 'center',
        lineHeight: 40,
        fontWeight: 'bold',
    },

    /* Botones de dificultad */
    botonesDificultad: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 250,
        height: 40,
    },
    textFacil: {
        color: '#00ff00ff',
        width: 110,
        fontSize: 22,
        textAlign: 'center',
        lineHeight: 40,
        fontWeight: 'bold',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        paddingHorizontal: 15,
    },
    textDificil: {
        color: '#ff0000ff',
        width: 110,
        fontSize: 22,
        textAlign: 'center',
        lineHeight: 40,
        fontWeight: 'bold',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        paddingHorizontal: 15,
    },

    /* Botones de iniciar y volver */
    contenedorBotones: {
        position: 'relative',
        top: '30%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: 250,
        height: 40,
    },

    /* Boton de iniciar juego */
    contenedorIniciar: {
        width: 100,
        height: 40,
        backgroundColor: '#ffffffff',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    /* Boton de volver */
    contenedorVolver: {
        width: 100,
        height: 40,
        backgroundColor: '#ffffffff',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

