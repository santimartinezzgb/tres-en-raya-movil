# Problema y solución

## Resumen

Había un error en `App.js` relacionado con la importación y el uso del componente `Button`.

## Problema

- Línea problemática (import):
  ```js
  import { Button } from 'react-native/types_generated/index';
  ```
  Esa ruta no es la correcta para obtener `Button`.

- Uso problemático del componente:
  ```jsx
  <Button style={styles.button} />
  ```
  El componente `Button` de React Native no acepta `style` con `fontSize`/`color` como en un `Text`; tiene props como `title`, `color` y `onPress`.

## Solución aplicada

- Importar `Button` desde `react-native`:
  ```js
  import { StatusBar } from 'expo-status-bar';
  import { StyleSheet, Text, View, Button } from 'react-native';
  ```

- Cambiar el uso por una forma válida:
  ```jsx
  <Button title="Pulsar" color="#FFFFFF" onPress={() => {}} />
  ```

Se eliminó el bloque de estilos `button` porque no era aplicable al componente `Button` nativo.

## Cómo probar

1. Desde la raíz del proyecto ejecuta:

```bash
npm install
npx expo start
```

2. Abrir en un emulador o en Expo Go. Comprobar que la app carga y que aparece el botón funcional.

Si prefieres un botón con estilos personalizados (texto grande, fondo, padding), usa `TouchableOpacity` con un `Text` dentro en lugar de `Button`.

---
Archivo modificado: `App.js` — se corrigió import y uso de `Button`.
