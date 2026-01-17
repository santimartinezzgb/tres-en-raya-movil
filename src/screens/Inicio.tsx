import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, BackHandler } from 'react-native';

export default function Inicio({ navigation }: any): React.ReactElement {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logoApp.png')}
                style={styles.logo}
            />

            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => navigation.navigate('Menu')}
            >
                <Text style={styles.text}>Jugar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => console.log('Historial')}
            >
                <Text style={styles.text}>Historial</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => BackHandler.exitApp()}
            >
                <Text style={styles.text}>Salir</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        backgroundColor: '#000000ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 40,
    },
    touchableOpacity: {
        width: 200,
        height: 50,
        backgroundColor: '#ffffffff',
        borderRadius: 10,
    },
    text: {
        color: '#000000ff',
        fontSize: 22,
        textAlign: 'center',
        lineHeight: 50,
        fontWeight: 'bold',
    },
});
