import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, BackHandler } from 'react-native';
import { useFonts, FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';

export default function Inicio({ navigation }: any): React.ReactElement {
    let [fontsLoaded] = useFonts({
        FredokaOne_400Regular,
    });
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/tictactoe-logo.png')}
                style={styles.logo}
            />

            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => navigation.navigate('Menu')}
            >
                <Text style={[styles.text, styles.infantilFont]}>Jugar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => navigation.navigate('Historial')}
            >
                <Text style={[styles.text, styles.infantilFont]}>Historial</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => BackHandler.exitApp()}
            >
                <Text style={[styles.text, styles.infantilFont]}>Salir</Text>
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
        width: 250,
        height: 150,
        objectFit: 'contain',
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
        fontSize: 20,
        textAlign: 'center',
        lineHeight: 40,
        fontWeight: 'bold',
    },
    infantilFont: {
        fontFamily: 'FredokaOne_400Regular',
        letterSpacing: 1,
        fontSize: 28,
    },
});
