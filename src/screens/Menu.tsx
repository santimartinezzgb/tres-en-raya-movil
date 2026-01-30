import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';

enum Dificultad {
    FACIL = 'facil',
    DIFICIL = 'dificil',
}
enum Navegar {
    INICIO = 'Inicio',
    JUEGO = 'Juego',
}

function getNombreAleatorio(): string {
    const nombre = 'Jugador';
    const numeroAleatorio = Math.floor(Math.random() * 9000) + 1000;
    const nombreAleatorio = nombre + numeroAleatorio;
    return nombreAleatorio;
}

function controlNombre(): string {
    let nombre;
    if (nombre == null) {
        nombre = getNombreAleatorio();
    }
    return nombre;
}


export default function Menu({ navigation }: any): React.ReactElement {
    const [nombre, setNombre] = useState(controlNombre());
    const [dificultad, setDificultad] = useState(Dificultad.FACIL);

    return (
        <View style={styles.contenedorPrincipal}>

            {/* Contenedor de logo */}
            <View style={styles.contenedorLogo}>
                <Image
                    source={require('../../assets/tictactoe-logo.png')}
                    style={styles.logo}
                />
            </View>

            {/* Contenedor de datos */}
            <View style={styles.contenedorDatos}>

                {/* Input para ingresar el nombre */}
                <View style={styles.inputContenedor}>
                    <TextInput
                        style={styles.inputTexto}
                        placeholder="Nombre"
                        placeholderTextColor="#666"
                        onChangeText={setNombre}
                    />
                </View>

                {/* Botones de dificultad */}
                <View style={styles.botonesDificultad}>
                    <TouchableOpacity onPress={() => setDificultad(Dificultad.FACIL)}>
                        <Text style={[styles.textDificultad, dificultad === Dificultad.FACIL ? styles.textoFacil : styles.textoDesactivado]}>Fácil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setDificultad(Dificultad.DIFICIL)}>
                        <Text style={[styles.textDificultad, dificultad === Dificultad.DIFICIL ? styles.textoDificil : styles.textoDesactivado]}>Difícil</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.contenedorBotones}>
                    {/* Boton de iniciar */}
                    <TouchableOpacity style={styles.contenedorIniciar} onPress={() => navigation.navigate(Navegar.JUEGO, { nombre, dificultad })}>
                        <Text style={styles.textoBotonesInicioYVolver}>Iniciar</Text>
                    </TouchableOpacity>

                    {/* Boton de volver */}
                    <TouchableOpacity style={styles.contenedorVolver} onPress={() => navigation.navigate(Navegar.INICIO)}>
                        <Text style={styles.textoBotonesInicioYVolver}>Volver</Text>
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
    contenedorPrincipal: {
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
        height: 150,
        objectFit: 'contain',
    },

    /* Input para ingresar el nombre */
    inputContenedor: {
        flexDirection: 'row',
        width: 250,
        gap: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ffffff',
        borderRadius: 5,
        paddingHorizontal: 5,
    },
    inputTexto: {
        backgroundColor: '#000000',
        color: '#ffffff',
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        fontSize: 18,
    },

    /* Botones de dificultad */
    botonesDificultad: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 250,
        height: 50,
    },
    textDificultad: {
        width: 110,
        fontSize: 22,
        textAlign: 'center',
        lineHeight: 40,
        fontWeight: 'bold',
        borderRadius: 10,
        paddingHorizontal: 15,
        borderWidth: 2,
    },
    textoFacil: {
        color: '#000000ff',
        backgroundColor: '#00ff00',
        borderColor: '#00ff00',
    },
    textoDificil: {
        color: '#ffffffff',
        backgroundColor: '#ff0000',
        borderColor: '#ff0000',
    },
    textoDesactivado: {
        color: '#ffffff',
        backgroundColor: 'transparent',
        borderColor: '#ffffff',
    },

    /* Botones de iniciar y volver */
    contenedorBotones: {
        position: 'relative',
        top: '30%',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: 250,
        height: 60,
    },

    textoBotonesInicioYVolver: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 30,
        fontWeight: 'bold',
    },

    /* Boton de iniciar juego */
    contenedorIniciar: {
        width: 100,
        height: 40,
        backgroundColor: 'black',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },

    /* Boton de volver */
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

