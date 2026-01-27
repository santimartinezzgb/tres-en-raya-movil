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
                onPress={() => navigation.navigate('Historial')}
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
        backgroundColor: 'black',
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
        height: 70,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'white',
    },
    text: {
        color: 'white',
        fontSize: 26,
        textAlign: 'center',
        lineHeight: 60,
        fontWeight: 'bold',
    },
});
