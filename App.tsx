import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './src/screens/Inicio';
import Menu from './src/screens/Menu';
import Juego from './src/screens/Juego';
import Historial from './src/screens/Historial';

const Stack = createNativeStackNavigator();

export default function App(): React.ReactElement {
    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator
                initialRouteName="Inicio"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Inicio" component={Inicio} />
                <Stack.Screen name="Menu" component={Menu} />
                <Stack.Screen name="Juego" component={Juego} />
                <Stack.Screen name="Historial" component={Historial} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}