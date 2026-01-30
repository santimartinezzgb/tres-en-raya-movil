#!/bin/bash
# Script para iniciar la API y el emulador de Android simultáneamente


# Comprobar que el puerto 8081 no esté en uso
if lsof -i :8081 > /dev/null; then
    kill -9 $(lsof -t -i :8081)
fi

echo "🚀 Iniciando API y Aplicación Android..."
npm run full-dev
