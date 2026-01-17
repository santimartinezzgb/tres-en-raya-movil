import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default function Historial(): React.ReactElement {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Historial</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
});
